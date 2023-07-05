const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const { Invoice, Income, Contact,Organization ,FinanceCategory} = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const { invoiceEmailTemplate } = require("../constants/emailTemplates");
var moment = require("moment");


exports.createInvoice = asyncHandler(async (req, res) => {
  try {
    let { _id: userId } = req.user;
    let payload = req.body;
    const { organization } = req.headers;
    userId = mongoose.Types.ObjectId(userId);
    const user = req.user;
    let q = {}
    if(organization){
      q = {organizationId: mongoose.Types.ObjectId(organization)}
    }
    else{
      q = {userId: userId}
    }
    const lastInvoice = await Invoice.findOne(
      q ,
      {},
      { sort: { createdAt: -1 } }
    );
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }

    let status = "DRAFT";
    if (payload.payNow < payload.totalAmount - (payload.discount || 0) + (payload.tax || 0)) {
      status = "PARTIAL PAYMENT";
    }

    payload = {
      userId,
      no,
      ...payload,
      status,
      organizationId:organization? mongoose.Types.ObjectId(organization):null,
      creatorType:organization? user.organizations.find((x) => x.organizationId.toString() === organization)
        .userType:user.userType,
      itemType:mongoose.Types.ObjectId(payload.itemType)
    };

    const data = await Invoice.create(payload);
    return res.status(201).send({ success: true, data: data });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoices = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { organization } = req.headers;
    let invoices = await Invoice.find({
      userId: mongoose.Types.ObjectId(_id),
      isDelete: false,
      organizationId:organization? mongoose.Types.ObjectId(organization):null,
    }).populate({ path: "customerId", model: Contact }).populate({path:"itemType",model:FinanceCategory});
    
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let invoice = await Invoice.findOne({
      _id: mongoose.Types.ObjectId(id),
          isDelete: false,
    }).populate({ path: "customerId", model: Contact }).populate({path:"itemType",model:FinanceCategory});
    if (invoice) {
      
      const paidAmount = invoice.paidAmount || 0;
      const balance = invoice.totalAmount > paidAmount ? invoice.totalAmount - paidAmount : 0;
      invoice.balance = balance;
      return res.status(200).json(invoice);
    }
    return res.status(404).json({ success: false, msg: "Not found" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    
    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (invoice.totalAmount + invoice?.tax - invoice?.discount <= invoice.paidAmount) {
      payload = { ...payload, status: "PAID" };
    } else if (
      invoice.payNow > 0 &&
      invoice.payNow < invoice.totalAmount + invoice?.tax - invoice?.discount
    ) {
      payload = { ...payload, status: "PARTIAL PAYMENT" };
    }

    await invoice.update(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.addPayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const{organization} = req.headers
    let payload = {
      ...req.body,
    };
    if (req.body.totalAmount + req.body?.tax - req.body?.discount <= req.body.paidAmount) {
      payload = { ...payload, status: "PAID" };
    } else if (req.body.payNow > 0) {
      payload = { ...payload, status: "PARTIAL PAYMENT" };
    }
  
    const data = await Invoice.findByIdAndUpdate(mongoose.Types.ObjectId(id), payload);
    const incomePayload = {
      userId: data.userId,
      clientId: data.customerId,
      name:"from invoice #" + data.no,
      amount: payload.payments[payload.payments.length - 1].amount,
      categoryId:data.itemType || null,
      note: "from invoice #" + data.no,
      invoiceId: data._id,
      organizationId:organization?mongoose.Types.ObjectId(organization):null
    };
    await Income.create(incomePayload);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Invoice.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },{ isDelete: true });
    return res.status(200).json({
      success: true,
      msg: "Delete invoice successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.sendInvoiceEmail = asyncHandler(async (req, res) => {
  const { email: invoiceOwner } = req.user;
  const { recipient, subject, message, invoiceId } = req.body;
  // need to put custom data for invoice template code
  const{organization} = req.headers;
  try {
    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(invoiceId) });
    const address = `${invoice?.companyAddress.street},${invoice?.companyAddress.city},${invoice?.companyAddress.state},${invoice?.companyAddress.zipCode},${invoice?.companyAddress.country}`;
    let org;
    if(organization){
      org = await Organization.findById(mongoose.Types.ObjectId(organization))
    }
    const emailBody = invoiceEmailTemplate({
      invoiceNo: invoice.no,
      dueDate: moment(invoice.dueDate).format("MM/DD/YYYY"),
      pay: invoice.payNow,
      message: message === "undefined" ? "" : message,
      address: address.includes("undefined") ? "" : address,
      email: invoiceOwner,
      logo: invoice.logoUrl === "" || invoice.logoUrl === undefined ? null : invoice.logoUrl,
      invoiceId: invoice._id,
      invoiceLink: organization?`https://${org.path}.mymanager.com/invoice-preview/${invoice._id}`:`https://me.mymanager.com/invoice-preview/${invoice._id}`,
    });
    await Invoice.findByIdAndUpdate(invoice._id, { status: "SENT" });
    SendMail({
      from: `via MyManager <hello@mymanager.com>`,
      recipient,
      subject: `Invoice #${invoice.no} | ${invoice.companyName?invoice.companyName:''}`,
      body: emailBody,
      replyTo: invoiceOwner,
    });
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

