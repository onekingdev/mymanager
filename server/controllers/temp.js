const { Temp } = require("../models/index/index");
const { Authenticate } = require("../models/index/index");
const { Contact } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const { generateOTP, sendEmailVerification, phoneOtpSend } = require("../Utilities/generateOTP");

exports.sendOTP = asyncHandler(async (req, res) => {
  let phone = "";
  let email = "";
  const { firstName, lastName, phoneOrEmail, countryCode, orgSignup } = req.body;
  const otp = generateOTP();
  var method = "phone";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }

  console.log("====================================");
  console.log("Identifyer is ", method);
  console.log("====================================");

  Authenticate.findOne({ email, phone }, (err, user) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
    if (user && orgSignup === undefined) {
      return res.status(500).json({
        errors: { common: { msg: "Phone or email already taken" } },
      });
    } else {
      Temp.findOne({ phoneOrEmail }).exec(async (err, user) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }

        if (user) {
          try {
            user.firstName = firstName;
            user.lastName = lastName;
            user.phoneOrEmail = phoneOrEmail;
            user.otp = otp;
            await user.save();
            // Send Otp
            if (method === "phone") {
              // Sent OTP to phone
              phoneOtpSend({ name: firstName, phone, otp, countryCode });
            } else {
              await sendEmailVerification(email, otp);
            }
            return res.status(201).json({
              success: "OTP re-generate successfull.",
            });
          } catch (error) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          let tempUser = new Temp({ firstName, lastName, phoneOrEmail, otp });
          // Send Otp
          if (method === "phone") {
            // Sent OTP to phone
            phoneOtpSend({ name: firstName, phone, otp, countryCode });
          } else {
            await sendEmailVerification(email, otp);
          }

          tempUser.save((err, success) => {
            if (err) {
              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            }

            if (success) {
              return res.status(201).json({
                success: "OTP generate successfull.",
              });
            }
          });
        }
      });
    }
  });
});

exports.sendContactOTP = asyncHandler(async (req, res) => {
  let phone = "",
    email = "",
    firstName = "",
    lastName = "";
  const { phoneOrEmail, countryCode, contactSignup } = req.body;
  const otp = generateOTP();
  var method = "phone";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }
  if (method === "email") {
    let contact = await Contact.findOne({ email: email });
    if (contact) {
      let fullName = contact.fullName;
      firstName = fullName.split(" ")[0];
      lastName = fullName.split(" ")?.length > 1 ? fullName.split(" ")[1] : "_";
    } else {
      return res.status(500).json({ errors: { common: { msg: "Contact not exist" } } });
    }
  }

  Authenticate.findOne({ email, phone }, (err, user) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (user && contactSignup === undefined) {
      return res.status(500).json({
        errors: { common: { msg: "Phone or email already taken" } },
      });
    } else {
      Temp.findOne({ phoneOrEmail }).exec(async (err, user) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }

        if (user) {
          try {
            user.firstName = firstName;
            user.lastName = lastName;
            user.phoneOrEmail = phoneOrEmail;
            user.otp = otp;
            await user.save();
            // Send Otp
            if (method === "phone") {
              // Sent OTP to phone
              phoneOtpSend({ name: firstName, phone, otp, countryCode });
            } else {
              await sendEmailVerification(email, otp);
            }
            return res.status(201).json({
              success: "OTP re-generate successfull.",
            });
          } catch (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          let tempUser = new Temp({ firstName, lastName, phoneOrEmail, otp });
          // Send Otp
          if (method === "phone") {
            // Sent OTP to phone
            phoneOtpSend({ name: firstName, phone, otp, countryCode });
          } else {
            await sendEmailVerification(email, otp);
          }

          tempUser.save((err, success) => {
            if (err) {
              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            }

            if (success) {
              return res.status(201).json({
                success: "OTP generate successfull.",
              });
            }
          });
        }
      });
    }
  });
});
