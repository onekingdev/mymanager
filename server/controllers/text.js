const { default: mongoose } = require("mongoose");
const textContact = require("../models/Text_contact");
const textMessage = require("../models/TextMessages");
const { socket_connections } = require("../service/socket-sender");
const { adminSockets } = require("../routes/socket");

// const { ClientContact, Authenticate } = require("../../models");
const Deposit = require("../models/Deposit");
const BillingHistory = require("../models/BillingHistory");
// const { ClientContact } = require("../../models");
const ClientContact = require("../models/ClientContact");

// Adding member in text contact list
exports.addTextContact = (req, res) => {
  res.send({ msg: "contact already added!", success: false });
  let contact = new textContact(req.body);
  contact.save((err, data) => {
    if (err) {
      res.send({ msg: "contact already added!", success: false });
    } else {
      res.send({ msg: "contact added!", data, success: true });
    }
  });
};

exports.getTextContact = async (req, res) => {
  try {
    let allTextContacts = await ClientContact.find();
    return res.status(200).send({ success: true, data: allTextContacts });
  } catch (error) {
    res.send({ msg: "Something went wrong!", success: false });
  }
};

// Send text message and store
exports.sendTextMessage = async (req, res) => {
  let accountSid = process.env.TWILIO_ACCOUNT_SID;
  let authToken = process.env.TWILIO_AUTH_TOKEN;

  // Please uncomment code below in production once we are setting correct twilio number for user
  // from, uid

  let { purchased_Num, smsCredits, voiceMinutes } = await Deposit.findOne({
    user_id: req.params.userId,
  });

  // let { twilio, textCredit, primaryPhone } = await textContact.findOne({
  //   _id: req.params.userId,
  // });
  let primaryPhone = req.body.task.phone;

  if (smsCredits > 0) {
    let twilioFormat = (phoneNumber) => {
      if (phoneNumber.charAt(0) !== "+") {
        return "+1" + phoneNumber;
      } else {
        return phoneNumber;
      }
    };
    let client = await require("twilio")(accountSid, authToken);

    if (primaryPhone) {
      // remove credit start

      // end remove credit
      await client.messages
        .create({
          body: req.body.task.textContent,
          to: twilioFormat(primaryPhone),
          from: twilioFormat(purchased_Num), // This is registered number for Twilio
        })
        .then((message) => {
          let textMsg = new textMessage(
            Object.assign({}, req.body.task, {
              time: new Date().toLocaleString("en-US", {
                timeZone: "America/New_York",
              }),
            })
          );
          textMsg.save(async (err, data) => {
            if (err) {
              res.send({ success: false, error: "message not stored" });
            } else {
              let doesUserExist = await Deposit.findOne({
                user_id: req.params.userId,
              });

              let remainingSMSCredits = smsCredits - 1;

              await BillingHistory.create({
                userId: req.params.userId,
                callType: "text",
                date: new Date(),
                phoneNumber: twilioFormat(primaryPhone),
                callPeriod: 0,
                remainingSMSCredits: remainingSMSCredits,
                remainingVoiceMins: voiceMinutes,
                spentCredits: 1,
              });

              await Deposit.findOneAndUpdate(
                { _id: doesUserExist?._id },
                { $set: { smsCredits: remainingSMSCredits } }
              );

              res.send({
                textMessage: data,
                success: true,
                msg: "Message Successfully sent!",
              });
            }
          });
        })
        .catch((error) => {
          res.send({ success: false, error: "Failed to send text message to " + primaryPhone });
        })
        .done();
    } else {
      res.send({ success: false, error: "message not sent" });
    }
  } else {
    res.send({ success: false, error: "No Text Credit Availabe, contact Admin! " });
  }
};

exports.searchTextContact = async (req, res) => {
  //let userId = req.params.userId;
  let search = req.query.search;

  try {
    let data = await ClientContact.find({
      $or: [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });

    res.send({ data: data, success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

// Seen text message and store
exports.seenContactTextMessages = (req, res) => {
  textContact.updateOne({ uid: req.params.contact }, req.body).exec((err, updateFolder) => {
    if (err) {
      res.send({ msg: "text contact is not update", success: false });
    } else {
      res.send({ msg: "text contact is update successfully", success: true });
    }
  });
};

// Get message list for user
exports.getTextMessages = async (req, res) => {
  const io = req.app.get("socketio");

  uidObj = {};
  let date = new Date();
  let uid = req.params.uid;
  let textContent = "test Message!";
  uidObj.time = date;
  uidObj.textContent = textContent;
  uidObj.uid = uid;
  await textMessage.updateMany({ uid: req.params.userId }, { $set: { isRead: true } });
  textMessage
    .find({ uid: req.params.userId })
    // .populate("textMessages")
    .exec((err, textContactList) => {
      if (err) {
        res.send({ success: false, error: "text contact list not found" });
      } else {
        res.send({ success: true, data: textContactList });
      }
    });
};

// Get Toast message for user
exports.getToastMessage = async (req, res) => {
  const io = req.app.get("socketio");

  uidObj = {};
  let date = new Date();
  let uid = req.params.uid;
  let textContent = "test Message!";
  uidObj.time = date;
  uidObj.textContent = textContent;
  uidObj.uid = uid;

  textMessage.find({ uid: req.params.userId }).exec((err, messages) => {
    if (err) {
      res.send({ success: false, error: "text contact list not found" });
    } else {
      let toastMessage = {};
      messages.map((msg, index) => {
        if (!msg.isRead) {
          toastMessage = msg;
        }
      });
      res.send({ success: true, data: toastMessage });
    }
  });
};

// Incoming Message API to test SMS
exports.listenIncomingSMS = async (req, res) => {
  let msg = req.body.Body,
    from = req.body.From,
    to = req.body.To;
  let userObj;
  let clientObj;

  try {
    userObj = await Deposit.findOne({
      purchased_Num: to,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, error: "No user found against this number" });
  }

  let clientObjs = await ClientContact.find({
    phone: from.split("+")[1],
  });
  let data = await ClientContact.find({
    phone: from.split("+")[1].slice(1, from.split("+")[1].length),
  });
  clientObjs.concat(data);
  if (clientObjs.length > 0) {
    clientObj = clientObjs.find((client) => client.userId.toString() == userObj.user_id);
    if (!clientObj) {
      res.send({ success: false, error: "No user found against this number" });
    }
  } else {
    res.send({ success: false, error: "No user found against this number" });
  }
  let textMsg = new textMessage(
    Object.assign(
      {},
      {
        isSent: false,
        textContent: msg,
        userId: userObj.user_id,
        uid: clientObj._id.toString(),
        email: clientObj.email,
      },
      {
        time: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
      }
    )
  );

  textMsg.save(async (err, data) => {
    if (err) {
      res.send({ success: false, error: "message not stored", message: err.message });
    } else {
      res.send({ success: true, msg: "message save successfully" });
    }
  });
  const adminActiveSockets = socket_connections.filter((item) => item.adminId == userObj.user_id);

  adminActiveSockets.map((socket) => {
    socket.socket.emit("incomingTextMessage", { clientId: clientObj._id });
  });

  // await member.findOneAndUpdate(
  //           { _id: stuid },
  //           {
  //             $set: {
  //               time: new Date().toLocaleString("en-US", {
  //                 timeZone: "America/New_York",
  //               }),
  //               textContent: msg,
  //             },
  //           }
  //         );

  // const getUserId = (phoneNumber) => {
  //   // Find userid of user with twilio number
  //   let phonen = "+" + phoneNumber;
  //   // Uncomment this in production once twilio number is added
  //   return user
  //     .findOne({ twilio: phonen })
  //     .then((data) => {
  //       return data._id;
  //     })
  //     .catch((err) => {
  //       return "";
  //     });
  // };

  // let userId = await getUserId(to);

  // let textMsg = new textMessage(
  //   Object.assign({}, req.body, {
  //     time: new Date().toLocaleString("en-US", {
  //       timeZone: "America/New_York",
  //     }),
  //   })
  // );
  // textMsg.save(async (err, data) => {
  //   if (err) {
  //     res.send({ success: false, error: "message not stored" });
  //   } else {
  //     res.send({ success: true, msg: "message save successfully" });
  //   }
  // });

  // Pass twilio number as parameter in webhooks

  // const getUserId = (phoneNumber) => {
  //   // Find userid of user with twilio number
  //   let phonen = "+" + phoneNumber;
  //   // Uncomment this in production once twilio number is added
  //   return user
  //     .findOne({ twilio: phonen })
  //     .then((data) => {
  //       return data._id;
  //     })
  //     .catch((err) => {
  //       return "";
  //     });
  // };
  // Uncomment this code in production when web hooks is placed for production twilio number
  // let userId = await getUserId(to);

  // const getUid = (phoneNumber, userId) => {
  //   let phonen = phoneNumber.slice(2);
  //   return member
  //     .findOne({ $and: [{ userId: userId }, { primaryPhone: phonen }] })
  //     .then((data) => {
  //       return data._id;
  //     })
  //     .catch((err) => {
  //       return "";
  //     });
  // };

  // const obj = {
  //   userId: await getUserId(to),
  //   uid: await getUid(from, userId),
  //   textContent: msg,
  //   isSent: false,
  // };
  // uidObj = {};
  // let stuid = await getUid(from, userId);
  // uidObj.uid = stuid;
  // uidObj.time = new Date();
  // uidObj.textContent = msg;
  // if (obj.userId !== "" && obj.uid !== "") {
  //   let text = new textMessage(
  //     Object.assign({}, obj, {
  //       time: new Date().toLocaleString("en-US", {
  //         timeZone: "America/New_York",
  //       }),
  //     })
  //   );
  //   text
  //     .save()
  //     .then(async (textMessage) => {
  //
  //       // socketIo.emit("textAlertWebhook", uidObj);
  //       // socketIo.emit("push-notification", obj.userId);
  //       await member.findOneAndUpdate(
  //         { _id: stuid },
  //         {
  //           $set: {
  //             time: new Date().toLocaleString("en-US", {
  //               timeZone: "America/New_York",
  //             }),
  //             textContent: msg,
  //           },
  //         }
  //       );
  //       res.send({ msg: "text sms sent successfully" });
  //     })
  //     .catch((error) => {
  //       res.send({ error: "txt msg not send" });
  //     });
  // } else {
  //   res.send({ error: "txt msg not send due to wrong twilio or phone number" });
  // }
};
