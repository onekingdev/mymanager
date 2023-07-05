const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const {
  BuyMembership,
  DocumentRecipient,
  Contact,
  Authenticate,
  User,
  Invoice,
  Shop,
  Membership,
  FinanceCategory,
  Income,
  Organization,
} = require("../models/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { invoiceEmailTemplate, documentEmailTemplate } = require("../constants/emailTemplates");
const { SendMail } = require("../service/sendMail");

exports.create = asyncHandler(async (req, res) => {
  const {organization} = req.headers
  try {
    //save membership to butMembership
    const {
      startDate,
      endDate,
      membership,
      buyer,
      stripeAccountId,
      stripeCustomerId,
      document,
      currentPath,
      members,
    } = req.body;
    //create contact
    let contact;
    if (buyer._id) {
      contact = { ...buyer };
      await Contact.findByIdAndUpdate(mongoose.Types.ObjectId(buyer._id), {
        stripe: { customerId: stripeCustomerId },
      });
    } else {
      let contactPayload = {
        ...buyer,
        contactType: mongoose.Types.ObjectId(buyer.contactType),
        userId: mongoose.Types.ObjectId(membership.userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? req.user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : req.user.userType,
      };
      contact = await Contact.create(contactPayload);
    }

    let membershipPayload = {
      amount: membership.amount,
      balance: membership.balance,
      downPayment: membership.downPayment,
      duration: membership.duration,
      durationType: membership.durationType,
      frequency: membership.frequency,
      isRecurring: membership.isRecurring,
      name: membership.name,
      noOfPayments: membership.noOfPayments,
      membershipType: mongoose.Types.ObjectId(membership.type._id),
      shopId: mongoose.Types.ObjectId(membership.shopId),
      total: membership.total,
      userId: mongoose.Types.ObjectId(membership.userId),
      startDate: startDate,
      endDate: endDate,
      //documentId: document._id,
      regFee: membership.regFee,
      startPaymentDate: membership.startPaymentDate,
      //nextPayment: membership.nextPayment,
      payInOut: membership.payInOut,
      buyerId: mongoose.Types.ObjectId(contact._id.toString()),
      dueStatus: "due",
      status: "inactive",
      membershipId: mongoose.Types.ObjectId(membership._id),
      members: members,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? req.user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : req.user.userType,
    };
    //create stripe subscription with connected account
    if (stripeAccountId) {
      const product = await stripe.products.create(
        {
          name: membership.name,
        },
        { stripeAccount: stripeAccountId }
      );
      let price;
      if (membership.frequency === "Months") {
        price = await stripe.prices.create(
          {
            unit_amount: Number(membershipPayload.amount) * 100,
            currency: "usd",
            recurring: { interval: "month" },
            product: product.id,
          },
          { stripeAccount: stripeAccountId }
        );
      } else if (membership.frequency === "Weeks") {
        price = await stripe.prices.create(
          {
            unit_amount: Number(membershipPayload.amount) * 100,
            currency: "usd",
            recurring: { interval: "week" },
            product: product.id,
          },
          { stripeAccount: stripeAccountId }
        );
      } else {
        // pif
        price = await stripe.prices.create(
          {
            unit_amount: Number(membershipPayload.amount) * 100,
            currency: "usd",
            product: product.id,
          },
          { stripeAccount: stripeAccountId }
        );
      }
      membershipPayload = {
        ...membershipPayload,
        stripe: {
          price: price.id,
          productId: product.id,
          customerId: stripeCustomerId,
          connectedAccount: stripeAccountId,
        },
      };
    } else {
      const product = await stripe.products.create({
        name: membership.name,
      });
      const price = await stripe.prices.create({
        unit_amount: Number(membershipPayload.amount) * 100,
        currency: "usd",
        recurring: { interval: membership.durationType === "Monthly" ? "month" : "week" },
        product: product.id,
      });

      membershipPayload = {
        ...membershipPayload,
        stripe: {
          price: price.id,
          productId: product.id,
          customerId: stripeCustomerId,
        },
      };
    }
    //add to buy membership
    const buyMembership = await BuyMembership.create(membershipPayload);
    //create document with type "contract"
    const user = await User.findOne({
      userId: mongoose.Types.ObjectId(membership.userId),
    }).populate({ path: "userId", model: Authenticate });

    // const rec1 = crypto.randomBytes(16).toString("hex")
    // const rec2 = crypto.randomBytes(16).toString("hex")
    const rec1 = Date.now();
    const rec2 = Date.now() + 1;
    // const rec1 = generateDocCode(document._id,contact.email)
    // const rec2 = generateDocCode(document._id,user.userId.email)
    let props = document.properties.map((x) => {
      let temp = x;
      if (temp.recipient.email === "firstparty") {
        temp = {
          ...temp,
          recipient: {
            name: contact.fullName,
            email: contact.email,
            hashCode: rec1.toString(),
            url: `https://${currentPath}.mymanager.com/document/email-link/${rec1}`,
            color: "#afcbff",
            active: true,
            roleOption: "sign",
            id: rec1.toString(),
          },
        };
      } else {
        temp = {
          ...temp,
          recipient: {
            name: user.fullName,
            email: user.userId.email,
            hashCode: rec2.toString(),
            url: `https://${currentPath}.mymanager.com/document/email-link/${rec2}`,
            color: "#c4faf8",
            active: true,
            roleOption: "sign",
            id: rec2.toString(),
          },
        };
      }
      return temp;
    });

    let contractPayload = {
      documentId: document.documentId,
      documentUrl: document.documentUrl,
      sender: user.userId.email,
      recipients: [
        {
          name: contact.fullName,
          email: contact.email,
          hashCode: rec1.toString(),
          url: `https://${currentPath}.mymanager.com/document/email-link/${rec1}`,
          color: "#afcbff",
          active: true,
          roleOption: "sign",
          id: rec1.toString(),
        },
        {
          name: user.fullName,
          email: user.userId.email,
          hashCode: rec2.toString(),
          url: `https://${currentPath}.mymanager.com/document/email-link/${rec2}`,
          color: "#c4faf8",
          active: true,
          roleOption: "sign",
          id: rec2.toString(),
        },
      ],
      properties: props,
      isDone: false,
      userId: membership.userId,
      title: `Contract for membership ${membership.name}`,
      docType: "contract",
      isTemplate: false,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? req.user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : req.user.userType,
      docMessage: document.docMessage,
      relateTo: buyMembership._id,
    };

    const customerContract = await DocumentRecipient.create(contractPayload);
    //send contract
    const shop = await Shop.findById(mongoose.Types.ObjectId(membership.shopId)).populate({
      path: "userId",
      model: Authenticate,
    });
    const emailBody = documentEmailTemplate({
      type: `new`,
      senderName: shop.name,
      docLink: customerContract.recipients[0].url,
      senderEmail: shop.userId.email,
      recipientName: customerContract.recipients[0].name,
      message:
        customerContract.docMessage.message && customerContract.docMessage.message !== ""
          ? customerContract.docMessage.message
          : "",
    });

    const buyMembershipUpdated = await BuyMembership.findByIdAndUpdate(buyMembership._id, {
      documentId: customerContract._id,
    });
    SendMail({
      from: `${shop.name} via MyManager <hello@mymanager.com>`,
      recipient: customerContract.recipients[0].email,
      subject:
        customerContract.docMessage && customerContract.docMessage.subject !== ""
          ? customerContract.docMessage.subject
          : `Contract for your membership from ${shop.name}`,
      body: emailBody,
      replyTo: shop.userId.email,
    });
    return res.status(200).json({
      success: true,
      data: { membership: buyMembershipUpdated, contract: customerContract, buyer: contact },
    });
  } catch (error) {

    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
//add membership to stripe
exports.activateMembership = asyncHandler(async (req, res) => {
  try {
    let {
      payment,
      buyer,
      shopId,
      membership,
      userId,
      status,
      membershipId,
      stripeDetails,
      startPaymentDate,
    } = req.body;
    const {organization} = req.headers
    const shop = await Shop.findOne({ _id: shopId }).populate({
      path: "userId",
      model: Authenticate,
    });
    let subscription;
    if (
      payment.paymentMethod !== "cash" &&
      payment.paymentMethod !== "cheque" &&
      membership.frequency !== "PIF" &&
      membership.paymentType === "Auto pay"
    ) {
      subscription = await stripe.subscriptions.create({
        customer: stripeDetails.customerId,
        default_payment_method: payment.paymentMethod,
        items: [{ price: stripeDetails.price }],
        billing_cycle_anchor: startPaymentDate, //timestamp
      });
      stripeDetails = { ...stripeDetails, subscriptionId: subscription.id };
    }

    //create invoice
    let q = {}
    if(organization){
      q = {organizationId: mongoose.Types.ObjectId(organization)}
    }
    else{
      q = {userId: userId}
    }
    const lastInvoice = await Invoice.findOne(q, {}, { sort: { createdAt: -1 } });
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
    let fc = financeCats.find(x=>x.type==='membership')
    let invoice = {
      userId: userId,
      customerId: mongoose.Types.ObjectId(buyer._id),
      itemType: fc._id,
      no: no,
      internalPaymentNote: "Generate automatically on activation of your membership",
      companyName: shop.name,
      date: new Date(),
      dueDate: membership.nextPayment,
      items: [
        {
          itemId: mongoose.Types.ObjectId(membershipId),
          rate: membership.total,
          quantity: 1,
          name: membership.name,
        },
      ],
      totalAmount: membership.total,
      paidAmount: membership.regFee + membership.downPayment,
      status: "PAID",
      payments: [{ ...payment, date: Date.now() }],
      payNow: membership.amount,
      logoUrl: shop.logoUrl,
    };
    const invoiceCreated = await Invoice.create(invoice);
    //add income
    
    let incomePayload = {
      userId: invoice.userId,
      clientId: invoice.customerId,
      name: "from invoice #" + invoice.no,
      amount: invoice.payments[invoice.payments.length - 1].amount,
      categoryId: fc._id || null,
      note: "from invoice #" + invoice.no,
      invoiceId: invoiceCreated._id,
      creatorType:organization? req.user.organizations.find(x=>x.organizationId.toString()===organization).userType: req.user.userType,
      organizationId:organization? mongoose.Types.ObjectId(organization):null
    };
    
    await Income.create(incomePayload);
    //add to buy membership
    payment = { ...payment, date: Date.now() };
    if (status === "paid") {
      status = "active";
    }
    await BuyMembership.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(membershipId) },
      {
        $set: { stripe: stripeDetails, status: status, invoiceId: invoiceCreated._id },
      }
    );

    let org;
    if(organization){
      org = await Organization.findById(mongoose.Types.ObjectId(organization))
    }
    
    const emailBody = invoiceEmailTemplate({
      invoiceNo: invoice.no,
      dueDate: moment(invoice.dueDate).format("MM/DD/YYYY"),
      pay: invoice.payNow,
      message: "Thanks for shopping with us! here is your invoice",
      address: "",
      email: shop.userId.email || "admin@mymanager.com",
      logo: shop.logoUrl,
      invoiceId: invoiceCreated._id.toString(),
      invoiceLink: organization?`https://${
        org.path
      }.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`:`https://me.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`,
    });

    //send invoice
    SendMail({
      from: `via MyManager <hello@mymanager.com>`,
      recipient: buyer.email,
      subject: `Invoice #${invoice.no} | ${shop.name} `,
      body: emailBody,
      replyTo: "",
    });
    return res.status(200).send({ success: true });
  } catch (error) {

    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getMembership = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const membership = await BuyMembership.findById(mongoose.Types.ObjectId(id))
      .populate({ path: "buyerId", model: Contact })
      .populate({ path: "membershipId", model: Membership })
      .populate({ path: "members", model: Contact })
      .populate({ path: "contract", model: DocumentRecipient })
      .populate({ path: "invoiceId", model: Invoice });
    return res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (error) {

    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOrders = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const memberships = await BuyMembership.find({ shopId: mongoose.Types.ObjectId(id) })
      .populate({ path: "buyerId", model: Contact })
      .populate({ path: "membershipId", model: Membership })
      .populate({ path: "members", model: Contact })
      .populate({ path: "contract", model: DocumentRecipient })
      .populate({ path: "invoiceId", model: Invoice });

    return res.status(200).json({
      success: true,
      data: memberships,
    });
  } catch (error) {

    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateBuyMembership = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await BuyMembership.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload);
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getClientContracts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const contracts = await BuyMembership.find({ members: mongoose.Types.ObjectId(id) })
      .populate({ path: "documentId", model: DocumentRecipient })
      .populate({ path: "invoiceId", model: Invoice })
      .populate({ path: "members", model: Contact });
    return res.status(200).send({ success: true, data: contracts });
  } catch (error) {

    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
