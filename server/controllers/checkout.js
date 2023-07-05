const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const { Membership, BuyMembership, BuyProduct, ClientContact } = require("../models/index/index");
const asyncHandler = require("express-async-handler");


const createPaymentIntent =asyncHandler( async (payment_id, total, customer_id) => {
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      payment_method: payment_id,
      amount: total,
      currency: "USD",
      payment_method_types: ["card"],
      confirm: true,
      customer: customer_id,
    });
  } catch (e) {}
  return paymentIntent;
});

exports.updateMembership = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  const { membershipId, pay_type, update } = req.body;
  try {
    const filter = { _id: membershipId }
    
    await BuyMembership.findOneAndUpdate(filter, update).then( async (data, err) => {
      if (data) {
        res.send({ 
          msg: "payment successfully done.",
          status: 'success',
          data
        });
      } else {
        res.send({ msg: `${err.message}`, status: "failed" });
      }
    });
  } catch (e) {
    res.send({ msg: `Server has an issue. Try again.`, status: "failed" });
  }
});

exports.buyMembership = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  const { contact, membership } =
    req.body;
  try {
    let due_status;
    if (membership.payment_type === "PIF") {
      due_status = "paid";
    } else {
      due_status = "due";
    }
    const payload = {
      ...membership,
      userId: mongoose.Types.ObjectId(_id),
      createdBy: contact,
      due_status: due_status,
    };

    await BuyMembership.create(payload).then(async (data, err) => {
      if (data) {
        res.send({
          msg: "buy successfully done.",
          status: "success",
          data
        });
      } else {
        res.send({ msg: `${err.message}`, status: "failed" });
      }
    });

  } catch (e) {
    switch (e.type) {
      default:
        res.send({ msg: `Server has an issue. Try again.`, status: "failed" });
        break;
    }
  }
});

exports.checkoutPublicMembership = asyncHandler(async (req, res) => {
  const {
    type,
    cardType,
    cardHolder,
    cardNumber,
    expiryDate,
    cvv,
    membership,
    cashNumber,
    total,
    email,
    name,
    phone,
    isSave,
    userId,
  } = req.body;
  const splitted_date = expiryDate.split("/");
  expire_month = splitted_date[0];
  expire_year = splitted_date[1];
  let paymentMethod;
  try {
    let due_status;
    if (membership.payment_type === "PIF") {
      due_status = "paid";
    } else {
      due_status = "due";
    }
    const payload = {
      ...membership,
      due_status: due_status,
    };

    if (isSave) {
      // Check Email exist or not
      if (email !== "") {
        const checkExist = await ClientContact.findOne({ email, userId });
        if (!checkExist) {
          const clientContact = new ClientContact({
            fullName: name,
            email,
            phone,
            userId,
          });
          if (type === "card") {
            clientContact.paymentMethods.push({
              cardType,
              cardHolder,
              cardNumber,
              expiryDate,
              cvv,
            });
          }
          clientContact.save((err, success) => {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    }

    if (type === "card") {
      paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: cardNumber,
          exp_month: expire_month,
          exp_year: expire_year,
          cvc: cvv,
        },
      });
      let customer = await stripe.customers.create({
        email: email,
        name: name,
      });
      createPaymentIntent(paymentMethod.id, total, customer.id).then(async (result, err) => {
        if (err) {
          res.send({ msg: `${err.message}`, status: "failed" });
        } else {
          await BuyMembership.create(payload).then(async (data, err) => {
            if (data) {
              res.send({ msg: "payment successfully done.", status: "success" });
            } else {
              res.send({ msg: `${err.message}`, status: "failed" });
            }
          });
        }
      });
    } else {
      await BuyMembership.create(payload).then(async (data, err) => {
        if (data) {
          res.send({ msg: "payment successfully done.", status: "success" });
        } else {
          res.send({ msg: `${err.message}`, status: "failed" });
        }
      });
    }
  } catch (e) {
    console.log(e);
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      default:
        res.send({ msg: `Server has an issue. Try again.`, status: "failed" });
        break;
    }
  }
});

exports.checkoutProduct = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  const {
    pay_type,
    cashNumber,
    productDetail,
    email,
    name,
    total_price,
  } = req.body;

  try {
    let due_status;

    due_status = "paid";

    // const payload = {
    //   ...productDetail,
    //   userId: mongoose.Types.ObjectId(_id),
    //   createdBy: productDetail.contact,
    //   due_status: due_status,
    // };

    let buyProductData = {
      buy_client: productDetail.buy_client,
      userId: mongoose.Types.ObjectId(_id),
      amount: total_price,
      pay_type: pay_type,
      check_no: cashNumber,
      // pay_time: productDetail.pay_time,
    };

    const res = await BuyProduct.create(buyProductData).then(async (data, err) => {
      if (data) {
        return "";
      } else {
        return err;
      }
    });

    return res;

  } catch (e) {
    console.log(e)
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      default:
        res.send({ msg: `Server has an issue. Try again.`, status: "failed" });
        break;
    }
  }
});

exports.buyProduct = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  const {
    pay_type,
    paymentMethod,
    amount,
    createdAt,
    currency,
    clientSecret,
    products,
  } = req.body;
  try {
    // let products = productDetail.productsInfo;
    let resAll = await Promise.all(
      products.map(async (item) => {
        const total_price = item.product.product_price * item.amount;
        let buyProductData = {}
        if (pay_type === "card") {
          buyProductData = {
            isEMI: true,
            userId: mongoose.Types.ObjectId(_id),
            pay_type,
            paymentMethod,
            pay_time: createdAt,
            currency,
            product_name: item.product.product_name,
            product_price: item.product.product_price,
            product_amount: item.amount,
            total_price,
            clientSecret
          };
        } else {
          buyProductData = {
            isEMI: true,
            due_status: due_status,
            // buy_client: productDetail.buy_client,
            userId: mongoose.Types.ObjectId(_id),
            total_price,
            pay_type,
            cheque_no: cashNumber,
            product_name: item.product.product_name,
            product_price: item.product.product_price,
            product_amount: item.amount,
            pay_time: createdAt,
          };
        } 
        console.log(buyProductData)
        const res = await BuyProduct.create(buyProductData).then(async (data, err) => {
          if (data) {
            return "";
          } else {
            return err;
          }
        });

        return res;
      })
    );

    if (resAll.filter((err) => err !== "").length > 0) {
      return res.send({ msg: "something went wrong.", status: "error" });
    } else {
      return res.send({ msg: "payment successfully done.", status: "success" });
    }
  } catch (e) {
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      default:
        console.error(e)
        res.send({ msg: `Server has an issue. Try again.`, status: "failed" });
        break;
    }
  }
});

exports.checkoutPublicProduct =asyncHandler(async (req, res) => {
  const {
    pay_type,
    cardType,
    cardHolder,
    cardNumber,
    expiryDate,
    cvv,
    cashNumber,
    productDetail,
    email,
    name,
    phone,
    isSave,
    userId,
    total_price,
  } = req.body;

  try {
    let due_status;

    due_status = "paid";

    const payload = {
      ...productDetail,
      due_status: due_status,
    };

    if (isSave) {
      // Check Email exist or not
      if (email !== "") {
        const checkExist = await ClientContact.findOne({ email, userId });
        if (!checkExist) {
          const clientContact = new ClientContact({
            fullName: name,
            email,
            phone,
            userId,
          });
          if (pay_type === "card") {
            clientContact.paymentMethods.push({
              cardType,
              cardHolder,
              cardNumber,
              expiryDate,
              cvv,
            });
          }
          clientContact.save((err, success) => {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    }
    if (pay_type === "card") {
      const splitted_date = expiryDate.split("/");
      expire_month = splitted_date[0];
      expire_year = splitted_date[1];

      let paymentMethod;
      paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: cardNumber,
          exp_month: expire_month,
          exp_year: expire_year,
          cvc: cvv,
        },
      });
      let customer = await stripe.customers.create({
        email: email,
        name: name,
      });

      createPaymentIntent(paymentMethod.id, total_price, customer.id).then(async (result, err) => {
        if (err) {
          res.send({ msg: `${err.message}`, status: "failed" });
        } else {
          let products = productDetail.productsInfo;
          let resAll = await Promise.all(
            products.map(async (item) => {
              let buyProductData = {
                isEMI: productDetail.isEMI,
                due_status: due_status,
                total_price: total_price,
                pay_type: pay_type,
                product_name: item.product_name,
                product_price: item.product_price,
                product_amount: item.amount,
                pay_time: productDetail.pay_time,
              };
              const res = await BuyProduct.create(buyProductData).then(async (data, err) => {
                if (data) {
                  return "";
                } else {
                  return err;
                }
              });

              return res;
            })
          );

          if (resAll.filter((err) => err !== "").length > 0) {
            return res.send({ msg: "something went wrong.", status: "error" });
          } else {
            return res.send({ msg: "payment successfully done.", status: "success" });
          }
        }
      });
    } else {
      let products = productDetail.productsInfo;
      let resAll = await Promise.all(
        products.map(async (item) => {
          let buyProductData = {
            isEMI: productDetail.isEMI,
            due_status: due_status,
            total_price: total_price,
            pay_type: pay_type,
            cheque_no: cashNumber,
            product_name: item.product_name,
            product_price: item.product_price,
            product_amount: item.amount,
            pay_time: productDetail.pay_time,
          };

          const res = await BuyProduct.create(buyProductData).then(async (data, err) => {
            if (data) {
              return "";
            } else {
              return err;
            }
          });

          return res;
        })
      );

      if (resAll.filter((err) => err !== "").length > 0) {
        return res.send({ msg: "something went wrong.", status: "error" });
      } else {
        return res.send({ msg: "payment successfully done.", status: "success" });
      }
    }
  } catch (e) {
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        res.send({ msg: `${e.message}`, status: "failed" });
        break;
      default:
        res.send({ msg: `Server has an issue. Try again.`, status: "failed" });
        break;
    }
  }
});
