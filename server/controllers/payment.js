require("dotenv").config();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { StripeCustomer, User, Shop, Invoice, Contact } = require("../models/index/index");

exports.createStripeCustomer = asyncHandler(async (req, res) => {
  try {
    const { name, email, stripeAccountId, isUser } = req.body;
    let customerExistsInDB;
    if (isUser) {
      //search in user
      const user = await User.findOne({ email: email });
      console.log(user);
      if (user.stripe !== undefined && user.stripe.customerId !== undefined) {
        return res.status(200).json({
          success: true,
          data: {
            customerId: stripe.customerId,
            email: email,
            name: name,
            isExisting: true,
          },
        });
      } else {
        const customer = await stripe.customers.create({ name, email });
        await User.findByIdAndUpdate(user._id, {
          stripe: { ...user.stripe, customerId: customer.id },
        });
        return res.status(200).json({
          success: true,
          data: {
            customerId: customer.id,
            email: email,
            name: name,
            isExisting: true,
          },
        });
      }
    } else {
      if (stripeAccountId) {
        //get contact by email
        const user = await User.findOne({ "stripe.accountId": stripeAccountId });
        //search in contact for the contact with user
        customerExistsInDB = await Contact.findOne({ userId: user.userId, email: email });
        if (customerExistsInDB && customerExistsInDB.stripe) {
          return res.status(200).json({
            success: true,
            data: {
              customerId: customerExistsInDB.stripe.customerId,
              email: email,
              name: name,
              isExisting: true,
            },
          });
        } else {
          //create stripe customer
          const customer = await stripe.customers.create(
            { name, email },
            { stripeAccount: stripeAccountId }
          );
          await Contact.findByIdAndUpdate(customerExistsInDB._id, {
            stripe: { ...customerExistsInDB.stripe, customerId: customer.id },
          });
          return res.status(200).json({
            success: true,
            data: {
              customerId: customer.id,
              email: email,
              name: name,
              isExisting: true,
            },
          });
        }
      } else {
        const customer = await stripe.customers.create({ name, email });
        return res.status(200).json({
          success: true,
          data: {
            customerId: customer.id,
            email: email,
            name: name,
            isExisting: false,
          },
        });
      }
    }
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.createStripeSubscription = asyncHandler(async (req, res) => {
  try {
    const { customerId, priceId } = req.body;
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    return res.status(200).json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      },
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

exports.createStripePaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency, accountId, customer } = req.body;
  let paymentIntent;
  try {
    //check if seller or mymanager
    //shopId -> get userId from shop -> get stripe from user
    // let paymentMethods;
    // if(customer){
    //   paymentMethods = await stripe.paymentMethods.list({
    //     customer: customer,
    //     type: 'card',
    //   });
    // }

    if (accountId) {
      if (customer) {
        paymentIntent = await stripe.paymentIntents.create(
          {
            amount: amount * 100,
            currency,
            customer,
            setup_future_usage: "off_session",
            automatic_payment_methods: { enabled: true },
          },
          { stripeAccount: accountId }
        );
      } else {
        paymentIntent = await stripe.paymentIntents.create(
          {
            amount: amount * 100,
            currency,
            setup_future_usage: "off_session",
            automatic_payment_methods: { enabled: true },
          },
          { stripeAccount: accountId }
        );
      }
    } else {
      if (customer) {
        paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency,
          customer,
          setup_future_usage: "off_session",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      } else {
        paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency,
          setup_future_usage: "off_session",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      }
    }

    return res.status(201).send(paymentIntent.client_secret);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getStripePaymentIntent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    return res.send(200).send(paymentIntent);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateStripePaymentIntent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.update(id, payload);
    return res.send(200).send(paymentIntent);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

// Alternatives for payment intent
exports.createStripeCard = asyncHandler(async (req, res) => {
  const { customerId, cardName, cardExpYear, cardExpMonth, cardNumber, cardCvc } = req.body;
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCvc,
      },
    });
    const card = await stripe.customers.createSource(customerId, { source: `${cardToken.id}` });
    return res.status(200).json({ card: card.id });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.createStripeCharge = asyncHandler(async (req, res) => {
  const { customerId, customerEmail, amount, currency, description, address, cardId } = req.body;
  try {
    const charge = await stripe.charges.create({
      receipt_email: customerEmail,
      amount,
      currency,
      card: cardId,
      customer: customerId,
      description,
      address,
    });
    //console.log(charge);
    return res.status(200).json(charge);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

//send publishable key
exports.sendPK = asyncHandler(async (req, res) => {
  try {
    //get connectedAccount
    const { id, type } = req.query;
    let user;
    let accountId;

    if (type === "shop") {
      const shop = Shop.findOne({ _id: mongoose.Types.ObjectId(id) });
      user = User.findOne({ userId: shop.userId });
    } else if (type === "invoice") {
      //invoice
      const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });
      user = User.findOne({ userId: invoice.userId });
    } else if (type === "ticket") {
    }
    if (user?.stripe) {
      accountId = user.stripe.accountId;
      const account = await stripe.accounts.retrieve(accountId);
      if (account.details_submitted === true) {
        res.status(200).json({ pk: process.env.STRIPE_PUBLISHABLE_KEY, accountId: accountId });
      } else {
        res.status(200).json({ pk: process.env.STRIPE_PUBLISHABLE_KEY });
      }
    } else {
      res.status(200).json({ pk: process.env.STRIPE_PUBLISHABLE_KEY });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

//stripe connect for sellers
exports.createStripeAccount = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, _id } = req.user;
  let accountId = "";
  try {
    const user = await User.findOne({ userId: mongoose.Types.ObjectId(_id) });
    if (user?.stripe?.accountId) {
      accountId = user.stripe.accountId;
    } else {
      const account = await stripe.accounts.create({
        type: "express",
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      await User.findOneAndUpdate(
        { userId: mongoose.Types.ObjectId(_id) },
        { stripe: { accountId: account.id } }
      );
      accountId = account.id;
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: "https://me.mymanager.com/setting",
      return_url: "https://me.mymanager.com/setting",
      type: "account_onboarding",
    });
    res.status(200).json({ success: true, account: accountLink });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getStripeAcount = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ userId: mongoose.Types.ObjectId(_id) });
    if (user && user.stripe) {
      const account = await stripe.accounts.retrieve(user.stripe.accountId);
      res.status(200).json({ success: true, account: account });
    } else {
      res.status(200).json({ success: false, message: "not found" });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

//webhook to update async the data
exports.updateStripeAsync = asyncHandler(async (req, res) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
    return res.sendStatus(400);
  }
  // Extract the object from the event.
  const dataObject = event.data.object;

  // Handle the event
  // Review important events for Billing webhooks
  // https://stripe.com/docs/billing/webhooks
  // Remove comment to see the various objects sent for this sample
  switch (event.type) {
    case "invoice.paid":
      // Used to provision services after the trial has ended.
      // The status of the invoice will show up as paid. Store the status in your
      // database to reference when a user accesses your service to avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // If the payment fails or the customer does not have a valid payment method,
      //  an invoice.payment_failed event is sent, the subscription becomes past_due.
      // Use this webhook to notify your user that their payment has
      // failed and to retrieve new card details.
      break;
    case "customer.subscription.updated":
      //create invoice and send to customer
      console.log(dataObject);

      break;
    case "customer.subscription.deleted":
      if (event.request != null) {
        // handle a subscription canceled by your request
        // from above.
      } else {
        // handle subscription canceled automatically based
        // upon your subscription settings.
      }
      break;
    default:
    // Unexpected event type
  }
  res.sendStatus(200);
});
