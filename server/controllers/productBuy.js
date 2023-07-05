const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const {
  Shop,
  ContactType,
  Contact,
  BuyProduct,
  Invoice,
  Product,
  Cart,
  Organization,
  FinanceCategory,
  Income
} = require("../models/index");
const { invoiceEmailTemplate } = require("../constants/emailTemplates");
const { SendMail } = require("../service/sendMail");
var moment = require("moment");

exports.createBuyProduct = asyncHandler(async (req, res) => {
  const { payment, products, buyer, status, total, shopId } = req.body;
  const { organization } = req.headers;
  try {
    let newProducts = [];
    for (const item of products) {
      let i = { ...item, product: mongoose.Types.ObjectId(item.product) };
      newProducts.push(i);
    }

    let payload = {
      //payment: payment,
      products: newProducts,
      status: status,
      total: total,
      shopId: mongoose.Types.ObjectId(shopId),
    };
    const shop = await Shop.findById(mongoose.Types.ObjectId(shopId));
    let userId = shop.userId;
    const pIds = [];
    for (const item of newProducts) {
      pIds.push(item.product);
    }
    let cartProducts = await Product.find({ _id: { $in: pIds } });
    cartProducts.forEach(async (element) => {
      let instock =
        element.inStock - Number(products.find((x) => x.product === element._id.toString()).count);

      await Product.findOneAndUpdate({ _id: element._id }, { inStock: instock });
    });
    //remove from cart

    if (buyer._id) {
      payload = { ...payload, buyer: mongoose.Types.ObjectId(buyer._id) };
      await Cart.deleteMany({ userId: buyer.userId });
    } else {
      await Cart.deleteMany({ userId: buyer.guestId });
      //add buyer to contact
      const contactExists = await Contact.findOne({ userId: userId, email: buyer.email });
      const clientType = await ContactType.findOne({ userId: userId, type: "client" });
      if (contactExists !== null) {
        let contact = {
          fullName: buyer.fullName,
          phone: buyer.phone,
          address: { ...buyer.address },
        };
        const buyerContact = await Contact.findOneAndUpdate(
          { userId: userId, email: buyer.email },
          contact
        );
        payload = {
          ...payload,
          buyer: buyerContact._id,
        };
      } else {
        let contact = {
          contactType: [clientType._id],
          userId: userId,
          fullName: buyer.fullName,
          email: buyer.email,
          phone: buyer.phone,
          address: { ...buyer.address },
        };
        const buyerContact = await Contact.create(contact);
        payload = {
          ...payload,
          buyer: buyerContact._id,
        };
      }
    }


    //create invoice with status paid all amount
    
    let items = [];
    for (const item of newProducts) {
      let x = {
        itemId: item.product,
        rate: item.price,
        quantity: item.count,
        name:cartProducts.find(x=>x._id.toString()===item.product.toString())?.name
      };
      items.push(x);
    }
 
    const lastInvoice = await Invoice.findOne({ userId: userId }, {}, { sort: { createdAt: -1 } });
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }
    let fcQ = {};
    if (organization) {
      fcQ = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
            userId: mongoose.Types.ObjectId(_id),
          },
        ],
      };
    } else {
      fcQ = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(_id),
            organizationId: null,
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }

    const financeCats = await FinanceCategory.find(fcQ)
    let fc = financeCats.find(x=>x.type==='product')
    let invoice = {
      userId: userId,
      customerId: payload.buyer,
      itemType: fc._id,
      no: no,
      internalPaymentNote: "Generate automatically on purchase from shop",
      companyName: shop.name,
      date: new Date(),
      dueDate: new Date().setMinutes(new Date().getMinutes() + 1),
      items: items,
      totalAmount: total,
      paidAmount: total,
      status: "PAID",
      payments: [{ ...payment }],
      payNow: 0,
      logoUrl: shop.logoUrl,
    };
    let org;
    if(organization){
      invoice = {...invoice,organizationId:mongoose.Types.ObjectId(organization)}
      org = await Organization.findById(mongoose.Types.ObjectId(organization))
    }
   
    const invoiceCreated = await Invoice.create(invoice);
    //add income 
    let incomePayload = {
      userId: invoice.userId,
      clientId: invoice.customerId,
      name:"",
      amount: invoice.payments[invoiceCreated.payments.length - 1].amount,
      categoryId:fc._id || null,
      note: "from invoice #" + invoice.no,
      invoiceId: invoiceCreated._id,
    };
    if(organization){
      incomePayload = {...incomePayload,organizationId:mongoose.Types.ObjectId(organization)}
    }
    
    await Income.create(incomePayload);
    //add to buy product
    payload = { ...payload, invoiceId: invoiceCreated._id };
    if(organization){
      payload = {...payload,organizationId:mongoose.Types.ObjectId(organization)}
    }
    
    await BuyProduct.create(payload);
    const emailBody = invoiceEmailTemplate({
      invoiceNo: invoice.no,
      dueDate: moment(invoice.dueDate).format("MM/DD/YYYY"),
      pay: invoice.payNow,
      message: "Thanks for shopping with us! here is your invoice",
      address: "",
      email: "admin@mymanager.com",
      logo: shop.logoUrl,
      invoiceId: invoiceCreated._id.toString(),
      invoiceLink: organization ? `https://${org.path}.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`:`https://me.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`,
    });

    //send invoice
    SendMail({
      from: `via MyManager <hello@mymanager.com>`,
      recipient: buyer.email,
      subject: `Invoice #${invoice.no} | ${shop?.name} `,
      body: emailBody,
      replyTo: "",
    });
    return res.status(200).send({ success: true });
  } catch (error) {

    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getShopSales = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  try {
    const boughtItems = await BuyProduct.find({ shopId: mongoose.Types.ObjectId(shopId) })
      .populate({ path: "buyer", model: Contact })
      .populate({ path: "products.product", model: Product })
      .populate({ path: "invoiceId", model: Invoice });
    return res.status(200).send({ success: true, data: boughtItems });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateBuyProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await BuyProduct.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload);
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
