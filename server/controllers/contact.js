const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { Event } = require("../models/index/index");
const { Retention } = require("../models/index/index");

const {
  Contact,
  ContactType,
  Organization,
  Automation,
  TextMessages,
  EmployeePosition,
  WorkHistory,
  User,
  Roles,
} = require("../models/index/index");

const { socket_connections } = require("../service/socket-sender");
// client
const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");
// const  = require('./../lib/upload');
const { buildPagination } = require("../Utilities/buildPagination");
const asyncHandler = require("express-async-handler");

// employee
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const bcrypt = require("bcryptjs");
const generateTokens = require("../Utilities/generateToken");

const sgMail = require("@sendgrid/mail");
const { SendMail } = require("../service/sendMail");
const { calculatePassedDays } = require("../Utilities/rating");
const {
  newContactMailTemplate,
  inviteWorkspaceMailTemplate,
} = require("../constants/emailTemplates");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Method to add contact
 * @method  POST
 * @param   {Object}  data receive data via req.body
 * @return  {JSON}  status message and data
 * @version 1.0.1
 */
exports.newContact = asyncHandler(async (req, res) => {
  try {
    const { contactType, fullName, email, phone, type, company, position, tags, leadSource } =
      req.body;
    const { organization, org_location } = req.headers;
    const user = req.user;
    let contactTypeResult = [];
    const getTypes = await Promise.all(
      contactType.map((item) => {
        return ContactType.findById(mongoose.Types.ObjectId(item)).then((res) => {
          contactTypeResult.push(res.name);
        });
      })
    );
    // Check Email exist or not
    if (email !== "") {
      if (organization) {
        if (org_location && org_location.trim() !== "null") {
          const existedContact = await Contact.findOne({
            userId: mongoose.Types.ObjectId(user._id),
            organizationId: mongoose.Types.ObjectId(organization),
            orgLocation: mongoose.Types.ObjectId(org_location),
            email,
            isDelete: false,
          });
          if (existedContact) {
            existedContact.fullName = fullName;
            existedContact.phone = phone;
            existedContact.contactType = contactType.map((x) => {
              if (typeof x == "string") {
                return mongoose.Types.ObjectId(x);
              } else return x;
            });
            existedContact.save();
          } else {
            const contact = new Contact({
              ...req.body,
              userId: user._id,
              organizationId: organization ? organization : null,
              orgLocation: org_location && org_location.trim() !== "null" ? org_location : null,
              contactType: contactType.map((x) => {
                if (typeof x == "string") {
                  return mongoose.Types.ObjectId(x);
                } else return x;
              }),
            });
            contact.save(async (err, success) => {
              if (err) {
                if (err) {
                  console.log("err", err);

                  return res.status(500).json({
                    errors: { common: { msg: err.message } },
                  });
                }
              } else
                try {
                  const findUponAutomationWithContact = await Automation.find({
                    $and: [
                      { "contactInfo.contactType": "Contacts" },
                      // { 'contactInfo.contacts': { $in: contactTypeResult } },
                      // { 'contactInfo.tags': { $in: tags } },
                      // { "contactInfo.leadSources": { $in: [leadSource] } },
                      { "activationUpon.uponType": "Upon Entry" },
                      { isActive: true },
                      { isDelete: false },
                    ],
                  });

                  const calculateTime = (startTime, actionDelay, setCustomtime, time) => {
                    let startAutomationTime = 0;
                    let startActionTime = 0;
                    if (!startTime.isImmediately) {
                      switch (startTime.unit) {
                        case "minutes":
                          startAutomationTime = startAutomationTime + startTime.time * 60;
                          break;
                        case "hours":
                          startAutomationTime = startAutomationTime + startTime.time * 60 * 60;
                          break;
                        case "days":
                          startAutomationTime = startAutomationTime + startTime.time * 60 * 60 * 24;
                          break;
                        default:
                          break;
                      }
                    }
                    if (setCustomtime) {
                      let fourDaysLater = new Date();
                      let timestamp = 0;
                      let now = 0;
                      switch (actionDelay.unit) {
                        case "days":
                          fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time);
                          fourDaysLater.setHours(time);
                          fourDaysLater.setMinutes(0);
                          fourDaysLater.setSeconds(0);
                          timestamp = fourDaysLater.getTime();

                          // Calculate the number of milliseconds until the scheduled time
                          now = new Date().getTime();
                          startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                          break;
                        case "weeks":
                          fourDaysLater = new Date();
                          fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time * 7);
                          fourDaysLater.setHours(time);
                          fourDaysLater.setMinutes(0);
                          fourDaysLater.setSeconds(0);
                          timestamp = fourDaysLater.getTime();

                          // Calculate the number of milliseconds until the scheduled time
                          now = new Date().getTime();
                          startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                          break;
                        case "months":
                          fourDaysLater = new Date();
                          fourDaysLater.setMonth(fourDaysLater.getMonth() + actionDelay.time);
                          fourDaysLater.setHours(time);
                          fourDaysLater.setMinutes(0);
                          fourDaysLater.setSeconds(0);
                          timestamp = fourDaysLater.getTime();

                          // Calculate the number of milliseconds until the scheduled time
                          now = new Date().getTime();
                          startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                          break;
                        default:
                          break;
                      }
                    } else {
                      switch (actionDelay.unit) {
                        case "days":
                          startActionTime = startActionTime + 60 * 60 * 24 * actionDelay.time;
                          break;
                        case "weeks":
                          startActionTime = startActionTime + 60 * 60 * 24 * 7 * actionDelay.time;
                          break;
                        case "months":
                          startActionTime = startActionTime + 60 * 60 * 24 * 30 * actionDelay.time;
                          break;
                        default:
                          break;
                      }
                    }

                    return startAutomationTime + startActionTime;
                  };

                  if (findUponAutomationWithContact.length > 0) {
                    findUponAutomationWithContact.map((automation) => {
                      const startTime = automation.activateTime;
                      const firstAction = automation.actions.find(
                        (action) => action.parentId == "0"
                      );

                      const actionProcess = () => {
                        const nextAction = automation.actions.find(
                          (action) => action.parentId == firstAction.id
                        );
                        let nextActionDelay = 0;

                        if (nextAction.duration.unit) {
                          if (nextAction.setCustomTime) {
                            let fourDaysLater = new Date();
                            let timestamp = 0;
                            let now = 0;
                            switch (nextAction.duration.unit) {
                              case "days":
                                fourDaysLater.setDate(
                                  fourDaysLater.getDate() + nextAction.duration.time
                                );
                                fourDaysLater.setHours(nextAction.customTime.time);
                                fourDaysLater.setMinutes(0);
                                fourDaysLater.setSeconds(0);
                                timestamp = fourDaysLater.getTime();

                                // Calculate the number of milliseconds until the scheduled time
                                now = new Date().getTime();
                                nextActionDelay =
                                  timestamp / 1000 + startAutomationTime - now / 1000;
                                break;
                              case "weeks":
                                fourDaysLater = new Date();
                                fourDaysLater.setDate(
                                  fourDaysLater.getDate() + nextAction.duration.time * 7
                                );
                                fourDaysLater.setHours(nextAction.customTime.time);
                                fourDaysLater.setMinutes(0);
                                fourDaysLater.setSeconds(0);
                                timestamp = fourDaysLater.getTime();

                                // Calculate the number of milliseconds until the scheduled time
                                now = new Date().getTime();
                                nextActionDelay =
                                  timestamp / 1000 + startAutomationTime - now / 1000;
                                break;
                              case "months":
                                fourDaysLater = new Date();
                                fourDaysLater.setMonth(
                                  fourDaysLater.getMonth() + nextAction.duration.time
                                );
                                fourDaysLater.setHours(nextAction.customTime.time);
                                fourDaysLater.setMinutes(0);
                                fourDaysLater.setSeconds(0);
                                timestamp = fourDaysLater.getTime();

                                // Calculate the number of milliseconds until the scheduled time
                                now = new Date().getTime();
                                nextActionDelay =
                                  timestamp / 1000 + startAutomationTime - now / 1000;
                                break;
                              default:
                                break;
                            }
                          } else {
                            switch (nextAction.duration.unit) {
                              case "days":
                                nextActionDelay =
                                  nextActionDelay + 60 * 60 * 24 * nextAction.duration.time;
                                break;
                              case "weeks":
                                nextActionDelay =
                                  nextActionDelay + 60 * 60 * 24 * 7 * nextAction.duration.time;
                                break;
                              case "months":
                                nextActionDelay =
                                  nextActionDelay + 60 * 60 * 24 * 30 * nextAction.duration.time;
                                break;
                              default:
                                break;
                            }
                          }
                        }

                        let _currentDate = new Date();
                        let _currentSecond = _currentDate.getTime() / 1000;
                        success.automation.push({
                          automationId: automation._id,
                          currentActionId: firstAction.id,
                          fireTime: _currentSecond + nextActionDelay,
                        });
                        success.save().then(console.log("success"));
                      };
                      const startEvent = () => {
                        let currentDate = new Date();
                        let currentSecond = currentDate.getTime() / 1000;
                        switch (firstAction.actionType) {
                          case "email":
                            SendMail({
                              recipient: success.email,
                              from: `admin@mymanager.com`,
                              replyTo: `admin@mymanager.com`,
                              subject: firstAction.subject,
                              body: firstAction.content,
                            });
                            actionProcess();
                            break;
                          case "text":
                            let accountSid = process.env.TWILIO_ACCOUNT_SID;
                            let authToken = process.env.TWILIO_AUTH_TOKEN;
                            const smsClient = require("twilio")(accountSid, authToken);
                            smsClient.messages
                              .create({
                                body: firstAction.content,
                                from: process.env.FROM_NUMBER,
                                to: success.phone,
                              })
                              .then((message) => console.log(message.sid));

                            actionProcess();
                            break;
                          case "notification":
                            if (firstAction.to.type == "ME") {
                              let manager = Contact.find({
                                _id: mongoose.Types.ObjectId(req.user._id),
                              });
                              switch (firstAction.method) {
                                case "EMAIL":
                                  SendMail({
                                    recipient: req.user.email,
                                    from: `admin@mymanager.com`,
                                    replyTo: `admin@mymanager.com`,
                                    subject: firstAction.subject,
                                    body: firstAction.content,
                                  });
                                  break;
                                case "TEXT":
                                  let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                  let authToken = process.env.TWILIO_AUTH_TOKEN;
                                  const smsClient = require("twilio")(accountSid, authToken);
                                  smsClient.messages
                                    .create({
                                      body: firstAction.content,
                                      from: process.env.FROM_NUMBER,
                                      to: req.user.phone,
                                    })
                                    .then((message) => console.log(message.sid));
                                  break;
                                case "TOOLBAR":
                                  const managerSocket = socket_connections.find(
                                    (item) => item.adminId == req.user._id
                                  );
                                  if (!managerSocket) {
                                    managerSocket.socket.emit("newNotification", {
                                      notification: firstAction.content,
                                    });
                                  }
                                  break;
                                default:
                                  break;
                              }
                            } else if (firstAction.to.type == "CONTACT") {
                              let contactsForNotification = [];
                              firstAction.to.contacts.map((contact) => {
                                ContactType.findOne({
                                  name: contact,
                                  userId: mongoose.Types.ObjectId(user._id),
                                  organizationId: mongoose.Types.ObjectId(organization),
                                  orgLocation: mongoose.Types.ObjectId(org_location),
                                }).then((contact_type) => {
                                  Contact.find({
                                    contactType: mongoose.Types.ObjectId(contact_type._id),
                                  }).then((noteContacts) =>
                                    contactsForNotification.push(noteContacts)
                                  );
                                });
                              });
                              switch (firstAction.method) {
                                case "EMAIL":
                                  contactsForNotification.map(async (item) => {
                                    try {
                                      const sendmail = await SendMail({
                                        recipient: item.email,
                                        from: `admin@mymanager.com`,
                                        replyTo: `admin@mymanager.com`,
                                        subject: firstAction.subject,
                                        body: firstAction.content,
                                      });
                                    } catch (error) {}
                                  });
                                  break;
                                case "TEXT":
                                  let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                  let authToken = process.env.TWILIO_AUTH_TOKEN;
                                  const smsClient = require("twilio")(accountSid, authToken);
                                  contactsForNotification.map(async (item) => {
                                    try {
                                      const sendsms = await smsClient.messages
                                        .create({
                                          body: firstAction.content,
                                          from: process.env.FROM_NUMBER,
                                          to: item.phone,
                                        })
                                        .then((message) => console.log(message.sid));
                                    } catch (error) {}
                                  });
                                case "TOOLBAR":
                                  contactsForNotification.map((item) => {
                                    const managerSocket = socket_connections.find(
                                      (i) => i.adminId == item._id
                                    );
                                    if (!managerSocket) {
                                      managerSocket.socket.emit("newNotification", {
                                        notification: firstAction.content,
                                      });
                                    }
                                  });
                                  break;
                                default:
                                  break;
                              }
                            }
                            actionProcess();
                            break;
                        }
                      };
                      console.log(firstAction);
                      const fireTime = calculateTime(
                        startTime,
                        firstAction.duration,
                        firstAction.setCustomTime,
                        firstAction.customTime.time
                      );
                      setTimeout(startEvent, fireTime * 1000);
                    });
                  }

                  return res.status(201).json({
                    success: "Contact created successfully",
                    contact: success,
                  });
                } catch (error) {
                  console.log(error);
                }
            });
          }
        } else {
          const existedContact = await Contact.findOne({
            userId: mongoose.Types.ObjectId(user._id),
            organizationId: mongoose.Types.ObjectId(organization),

            email,
            isDelete: false,
          });
          if (existedContact) {
            existedContact.fullName = fullName;
            existedContact.phone = phone;
            existedContact.contactType = contactType.map((x) => {
              if (typeof x == "string") {
                return mongoose.Types.ObjectId(x);
              } else return x;
            });
            existedContact.save();
          } else {
            const contact = new Contact({
              ...req.body,
              userId: user._id,
              organizationId: organization ? organization : null,
              contactType: contactType.map((x) => {
                if (typeof x == "string") {
                  return mongoose.Types.ObjectId(x);
                } else return x;
              }),
            });
            contact.save(async (err, success) => {
              if (err) {
                if (err) {
                  console.log("err", err);

                  return res.status(500).json({
                    errors: { common: { msg: err.message } },
                  });
                }
              } else
                try {
                  console.log(success);
                  const findUponAutomationWithContact = await Automation.find({
                    $and: [
                      { "contactInfo.contactType": "Contacts" },
                      // { 'contactInfo.contacts': { $in: contactTypeResult } },
                      // { 'contactInfo.tags': { $in: tags } },
                      // { "contactInfo.leadSources": { $in: [leadSource] } },
                      { "activationUpon.uponType": "Upon Entry" },
                      { isActive: true },
                      { isDelete: false },
                    ],
                  });

                  const calculateTime = (startTime, actionDelay, setCustomtime, time) => {
                    let startAutomationTime = 0;
                    let startActionTime = 0;
                    if (!startTime.isImmediately) {
                      switch (startTime.unit) {
                        case "minutes":
                          startAutomationTime = startAutomationTime + startTime.time * 60;
                          break;
                        case "hours":
                          startAutomationTime = startAutomationTime + startTime.time * 60 * 60;
                          break;
                        case "days":
                          startAutomationTime = startAutomationTime + startTime.time * 60 * 60 * 24;
                          break;
                        default:
                          break;
                      }
                    }
                    if (setCustomtime) {
                      let fourDaysLater = new Date();
                      let timestamp = 0;
                      let now = 0;
                      switch (actionDelay.unit) {
                        case "days":
                          fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time);
                          fourDaysLater.setHours(time);
                          fourDaysLater.setMinutes(0);
                          fourDaysLater.setSeconds(0);
                          timestamp = fourDaysLater.getTime();

                          // Calculate the number of milliseconds until the scheduled time
                          now = new Date().getTime();
                          startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                          break;
                        case "weeks":
                          fourDaysLater = new Date();
                          fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time * 7);
                          fourDaysLater.setHours(time);
                          fourDaysLater.setMinutes(0);
                          fourDaysLater.setSeconds(0);
                          timestamp = fourDaysLater.getTime();

                          // Calculate the number of milliseconds until the scheduled time
                          now = new Date().getTime();
                          startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                          break;
                        case "months":
                          fourDaysLater = new Date();
                          fourDaysLater.setMonth(fourDaysLater.getMonth() + actionDelay.time);
                          fourDaysLater.setHours(time);
                          fourDaysLater.setMinutes(0);
                          fourDaysLater.setSeconds(0);
                          timestamp = fourDaysLater.getTime();

                          // Calculate the number of milliseconds until the scheduled time
                          now = new Date().getTime();
                          startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                          break;
                        default:
                          break;
                      }
                    } else {
                      switch (actionDelay.unit) {
                        case "days":
                          startActionTime = startActionTime + 60 * 60 * 24 * actionDelay.time;
                          break;
                        case "weeks":
                          startActionTime = startActionTime + 60 * 60 * 24 * 7 * actionDelay.time;
                          break;
                        case "months":
                          startActionTime = startActionTime + 60 * 60 * 24 * 30 * actionDelay.time;
                          break;
                        default:
                          break;
                      }
                    }

                    return startAutomationTime + startActionTime;
                  };

                  if (findUponAutomationWithContact.length > 0) {
                    findUponAutomationWithContact.map((automation) => {
                      const startTime = automation.activateTime;
                      const firstAction = automation.actions.find(
                        (action) => action.parentId == "0"
                      );

                      const actionProcess = () => {
                        const nextAction = automation.actions.find(
                          (action) => action.parentId == firstAction.id
                        );
                        let nextActionDelay = 0;

                        if (nextAction.duration.unit) {
                          if (nextAction.setCustomTime) {
                            let fourDaysLater = new Date();
                            let timestamp = 0;
                            let now = 0;
                            switch (nextAction.duration.unit) {
                              case "days":
                                fourDaysLater.setDate(
                                  fourDaysLater.getDate() + nextAction.duration.time
                                );
                                fourDaysLater.setHours(nextAction.customTime.time);
                                fourDaysLater.setMinutes(0);
                                fourDaysLater.setSeconds(0);
                                timestamp = fourDaysLater.getTime();

                                // Calculate the number of milliseconds until the scheduled time
                                now = new Date().getTime();
                                nextActionDelay =
                                  timestamp / 1000 + startAutomationTime - now / 1000;
                                break;
                              case "weeks":
                                fourDaysLater = new Date();
                                fourDaysLater.setDate(
                                  fourDaysLater.getDate() + nextAction.duration.time * 7
                                );
                                fourDaysLater.setHours(nextAction.customTime.time);
                                fourDaysLater.setMinutes(0);
                                fourDaysLater.setSeconds(0);
                                timestamp = fourDaysLater.getTime();

                                // Calculate the number of milliseconds until the scheduled time
                                now = new Date().getTime();
                                nextActionDelay =
                                  timestamp / 1000 + startAutomationTime - now / 1000;
                                break;
                              case "months":
                                fourDaysLater = new Date();
                                fourDaysLater.setMonth(
                                  fourDaysLater.getMonth() + nextAction.duration.time
                                );
                                fourDaysLater.setHours(nextAction.customTime.time);
                                fourDaysLater.setMinutes(0);
                                fourDaysLater.setSeconds(0);
                                timestamp = fourDaysLater.getTime();

                                // Calculate the number of milliseconds until the scheduled time
                                now = new Date().getTime();
                                nextActionDelay =
                                  timestamp / 1000 + startAutomationTime - now / 1000;
                                break;
                              default:
                                break;
                            }
                          } else {
                            switch (nextAction.duration.unit) {
                              case "days":
                                nextActionDelay =
                                  nextActionDelay + 60 * 60 * 24 * nextAction.duration.time;
                                break;
                              case "weeks":
                                nextActionDelay =
                                  nextActionDelay + 60 * 60 * 24 * 7 * nextAction.duration.time;
                                break;
                              case "months":
                                nextActionDelay =
                                  nextActionDelay + 60 * 60 * 24 * 30 * nextAction.duration.time;
                                break;
                              default:
                                break;
                            }
                          }
                        }

                        let _currentDate = new Date();
                        let _currentSecond = _currentDate.getTime() / 1000;
                        success.automation.push({
                          automationId: automation._id,
                          currentActionId: firstAction.id,
                          fireTime: _currentSecond + nextActionDelay,
                        });
                        success.save().then(console.log("success"));
                      };
                      const startEvent = () => {
                        let currentDate = new Date();
                        let currentSecond = currentDate.getTime() / 1000;
                        switch (firstAction.actionType) {
                          case "email":
                            SendMail({
                              recipient: success.email,
                              from: `admin@mymanager.com`,
                              replyTo: `admin@mymanager.com`,
                              subject: firstAction.subject,
                              body: firstAction.content,
                            });
                            actionProcess();
                            break;
                          case "text":
                            let accountSid = process.env.TWILIO_ACCOUNT_SID;
                            let authToken = process.env.TWILIO_AUTH_TOKEN;
                            const smsClient = require("twilio")(accountSid, authToken);
                            smsClient.messages
                              .create({
                                body: firstAction.content,
                                from: process.env.FROM_NUMBER,
                                to: success.phone,
                              })
                              .then((message) => console.log(message.sid));

                            actionProcess();
                            break;
                          case "notification":
                            if (firstAction.to.type == "ME") {
                              let manager = Contact.find({
                                _id: mongoose.Types.ObjectId(req.user._id),
                              });
                              switch (firstAction.method) {
                                case "EMAIL":
                                  SendMail({
                                    recipient: req.user.email,
                                    from: `admin@mymanager.com`,
                                    replyTo: `admin@mymanager.com`,
                                    subject: firstAction.subject,
                                    body: firstAction.content,
                                  });
                                  break;
                                case "TEXT":
                                  let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                  let authToken = process.env.TWILIO_AUTH_TOKEN;
                                  const smsClient = require("twilio")(accountSid, authToken);
                                  smsClient.messages
                                    .create({
                                      body: firstAction.content,
                                      from: process.env.FROM_NUMBER,
                                      to: req.user.phone,
                                    })
                                    .then((message) => console.log(message.sid));
                                  break;
                                case "TOOLBAR":
                                  const managerSocket = socket_connections.find(
                                    (item) => item.adminId == req.user._id
                                  );
                                  if (!managerSocket) {
                                    managerSocket.socket.emit("newNotification", {
                                      notification: firstAction.content,
                                    });
                                  }
                                  break;
                                default:
                                  break;
                              }
                            } else if (firstAction.to.type == "CONTACT") {
                              let contactsForNotification = [];
                              firstAction.to.contacts.map((contact) => {
                                ContactType.findOne({
                                  name: contact,
                                  userId: mongoose.Types.ObjectId(userId),
                                  organizationId: mongoose.Types.ObjectId(organization),
                                }).then((contact_type) => {
                                  Contact.find({
                                    contactType: mongoose.Types.ObjectId(contact_type._id),
                                  }).then((noteContacts) =>
                                    contactsForNotification.push(noteContacts)
                                  );
                                });
                              });
                              switch (firstAction.method) {
                                case "EMAIL":
                                  contactsForNotification.map(async (item) => {
                                    try {
                                      const sendmail = await SendMail({
                                        recipient: item.email,
                                        from: `admin@mymanager.com`,
                                        replyTo: `admin@mymanager.com`,
                                        subject: firstAction.subject,
                                        body: firstAction.content,
                                      });
                                    } catch (error) {}
                                  });
                                  break;
                                case "TEXT":
                                  let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                  let authToken = process.env.TWILIO_AUTH_TOKEN;
                                  const smsClient = require("twilio")(accountSid, authToken);
                                  contactsForNotification.map(async (item) => {
                                    try {
                                      const sendsms = await smsClient.messages
                                        .create({
                                          body: firstAction.content,
                                          from: process.env.FROM_NUMBER,
                                          to: item.phone,
                                        })
                                        .then((message) => console.log(message.sid));
                                    } catch (error) {}
                                  });
                                case "TOOLBAR":
                                  contactsForNotification.map((item) => {
                                    const managerSocket = socket_connections.find(
                                      (i) => i.adminId == item._id
                                    );
                                    if (!managerSocket) {
                                      managerSocket.socket.emit("newNotification", {
                                        notification: firstAction.content,
                                      });
                                    }
                                  });
                                  break;
                                default:
                                  break;
                              }
                            }
                            actionProcess();
                            break;
                        }
                      };
                      console.log(firstAction);
                      const fireTime = calculateTime(
                        startTime,
                        firstAction.duration,
                        firstAction.setCustomTime,
                        firstAction.customTime.time
                      );
                      setTimeout(startEvent, fireTime * 1000);
                    });
                  }

                  return res.status(201).json({
                    success: "Contact created successfully",
                    contact: success,
                  });
                } catch (error) {
                  console.log(error);
                }
            });
          }
        }
      } else {
        const existedContact = await Contact.findOne({
          userId: mongoose.Types.ObjectId(user._id),
          email,
          isDelete: false,
        });
        if (existedContact) {
          existedContact.fullName = fullName;
          existedContact.phone = phone;
          existedContact.contactType = contactType.map((x) => {
            if (typeof x == "string") {
              return mongoose.Types.ObjectId(x);
            } else return x;
          });
          existedContact.save(async (err, success) => {
            if (err) {
              console.log("err", err);

              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            } else {
              return res.status(201).json({
                success: "Contact created successfully",
                contact: success,
              });
            }
          });
        } else {
          const contact = new Contact({
            ...req.body,
            userId: user._id,
            organizationId: organization ? organization : null,
            orgLocation: org_location && org_location.trim() !== "null" ? org_location : null,
            contactType: contactType.map((x) => {
              if (typeof x == "string") {
                return mongoose.Types.ObjectId(x);
              } else return x;
            }),
          });
          contact.save(async (err, success) => {
            if (err) {
              console.log("err", err);

              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            } else {
              try {
                console.log(success);
                const findUponAutomationWithContact = await Automation.find({
                  $and: [
                    { "contactInfo.contactType": "Contacts" },
                    // { 'contactInfo.contacts': { $in: contactTypeResult } },
                    // { 'contactInfo.tags': { $in: tags } },
                    // { "contactInfo.leadSources": { $in: [leadSource] } },
                    { "activationUpon.uponType": "Upon Entry" },
                    { isActive: true },
                    { isDelete: false },
                  ],
                });

                const calculateTime = (startTime, actionDelay, setCustomtime, time) => {
                  let startAutomationTime = 0;
                  let startActionTime = 0;
                  if (!startTime.isImmediately) {
                    switch (startTime.unit) {
                      case "minutes":
                        startAutomationTime = startAutomationTime + startTime.time * 60;
                        break;
                      case "hours":
                        startAutomationTime = startAutomationTime + startTime.time * 60 * 60;
                        break;
                      case "days":
                        startAutomationTime = startAutomationTime + startTime.time * 60 * 60 * 24;
                        break;
                      default:
                        break;
                    }
                  }
                  if (setCustomtime) {
                    let fourDaysLater = new Date();
                    let timestamp = 0;
                    let now = 0;
                    switch (actionDelay.unit) {
                      case "days":
                        fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      case "weeks":
                        fourDaysLater = new Date();
                        fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time * 7);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      case "months":
                        fourDaysLater = new Date();
                        fourDaysLater.setMonth(fourDaysLater.getMonth() + actionDelay.time);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      default:
                        break;
                    }
                  } else {
                    switch (actionDelay.unit) {
                      case "days":
                        startActionTime = startActionTime + 60 * 60 * 24 * actionDelay.time;
                        break;
                      case "weeks":
                        startActionTime = startActionTime + 60 * 60 * 24 * 7 * actionDelay.time;
                        break;
                      case "months":
                        startActionTime = startActionTime + 60 * 60 * 24 * 30 * actionDelay.time;
                        break;
                      default:
                        break;
                    }
                  }

                  return startAutomationTime + startActionTime;
                };

                if (findUponAutomationWithContact.length > 0) {
                  findUponAutomationWithContact.map((automation) => {
                    const startTime = automation.activateTime;
                    const firstAction = automation.actions.find((action) => action.parentId == "0");

                    const actionProcess = () => {
                      const nextAction = automation.actions.find(
                        (action) => action.parentId == firstAction.id
                      );
                      let nextActionDelay = 0;

                      if (nextAction.duration.unit) {
                        if (nextAction.setCustomTime) {
                          let fourDaysLater = new Date();
                          let timestamp = 0;
                          let now = 0;
                          switch (nextAction.duration.unit) {
                            case "days":
                              fourDaysLater.setDate(
                                fourDaysLater.getDate() + nextAction.duration.time
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            case "weeks":
                              fourDaysLater = new Date();
                              fourDaysLater.setDate(
                                fourDaysLater.getDate() + nextAction.duration.time * 7
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            case "months":
                              fourDaysLater = new Date();
                              fourDaysLater.setMonth(
                                fourDaysLater.getMonth() + nextAction.duration.time
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            default:
                              break;
                          }
                        } else {
                          switch (nextAction.duration.unit) {
                            case "days":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * nextAction.duration.time;
                              break;
                            case "weeks":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * 7 * nextAction.duration.time;
                              break;
                            case "months":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * 30 * nextAction.duration.time;
                              break;
                            default:
                              break;
                          }
                        }
                      }

                      let _currentDate = new Date();
                      let _currentSecond = _currentDate.getTime() / 1000;
                      success.automation.push({
                        automationId: automation._id,
                        currentActionId: firstAction.id,
                        fireTime: _currentSecond + nextActionDelay,
                      });
                      success.save().then(console.log("success"));
                    };
                    const startEvent = () => {
                      let currentDate = new Date();
                      let currentSecond = currentDate.getTime() / 1000;
                      switch (firstAction.actionType) {
                        case "email":
                          SendMail({
                            recipient: success.email,
                            from: `admin@mymanager.com`,
                            replyTo: `admin@mymanager.com`,
                            subject: firstAction.subject,
                            body: firstAction.content,
                          });
                          actionProcess();
                          break;
                        case "text":
                          let accountSid = process.env.TWILIO_ACCOUNT_SID;
                          let authToken = process.env.TWILIO_AUTH_TOKEN;
                          const smsClient = require("twilio")(accountSid, authToken);
                          smsClient.messages
                            .create({
                              body: firstAction.content,
                              from: process.env.FROM_NUMBER,
                              to: success.phone,
                            })
                            .then((message) => console.log(message.sid));

                          actionProcess();
                          break;
                        case "notification":
                          if (firstAction.to.type == "ME") {
                            let manager = Contact.find({
                              _id: mongoose.Types.ObjectId(req.user._id),
                            });
                            switch (firstAction.method) {
                              case "EMAIL":
                                SendMail({
                                  recipient: req.user.email,
                                  from: `admin@mymanager.com`,
                                  replyTo: `admin@mymanager.com`,
                                  subject: firstAction.subject,
                                  body: firstAction.content,
                                });
                                break;
                              case "TEXT":
                                let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                let authToken = process.env.TWILIO_AUTH_TOKEN;
                                const smsClient = require("twilio")(accountSid, authToken);
                                smsClient.messages
                                  .create({
                                    body: firstAction.content,
                                    from: process.env.FROM_NUMBER,
                                    to: req.user.phone,
                                  })
                                  .then((message) => console.log(message.sid));
                                break;
                              case "TOOLBAR":
                                const managerSocket = socket_connections.find(
                                  (item) => item.adminId == req.user._id
                                );
                                if (!managerSocket) {
                                  managerSocket.socket.emit("newNotification", {
                                    notification: firstAction.content,
                                  });
                                }
                                break;
                              default:
                                break;
                            }
                          } else if (firstAction.to.type == "CONTACT") {
                            let contactsForNotification = [];
                            firstAction.to.contacts.map((contact) => {
                              ContactType.findOne({ name: contact }).then((contact_type) => {
                                Contact.find({
                                  contactType: mongoose.Types.ObjectId(contact_type._id),
                                }).then((noteContacts) =>
                                  contactsForNotification.push(noteContacts)
                                );
                              });
                            });
                            switch (firstAction.method) {
                              case "EMAIL":
                                contactsForNotification.map(async (item) => {
                                  try {
                                    const sendmail = await SendMail({
                                      recipient: item.email,
                                      from: `admin@mymanager.com`,
                                      replyTo: `admin@mymanager.com`,
                                      subject: firstAction.subject,
                                      body: firstAction.content,
                                    });
                                  } catch (error) {}
                                });
                                break;
                              case "TEXT":
                                let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                let authToken = process.env.TWILIO_AUTH_TOKEN;
                                const smsClient = require("twilio")(accountSid, authToken);
                                contactsForNotification.map(async (item) => {
                                  try {
                                    const sendsms = await smsClient.messages
                                      .create({
                                        body: firstAction.content,
                                        from: process.env.FROM_NUMBER,
                                        to: item.phone,
                                      })
                                      .then((message) => console.log(message.sid));
                                  } catch (error) {}
                                });
                              case "TOOLBAR":
                                contactsForNotification.map((item) => {
                                  const managerSocket = socket_connections.find(
                                    (i) => i.adminId == item._id
                                  );
                                  if (!managerSocket) {
                                    managerSocket.socket.emit("newNotification", {
                                      notification: firstAction.content,
                                    });
                                  }
                                });
                                break;
                              default:
                                break;
                            }
                          }
                          actionProcess();
                          break;
                      }
                    };
                    console.log(firstAction);
                    const fireTime = calculateTime(
                      startTime,
                      firstAction.duration,
                      firstAction.setCustomTime,
                      firstAction.customTime.time
                    );
                    setTimeout(startEvent, fireTime * 1000);
                  });
                }
                return res.status(201).json({
                  success: "Contact created successfully",
                  contact: success,
                });
              } catch (error) {
                console.log(error);
              }
            }
          });
        }
      }
    }
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});
exports.saveContactFromEvent = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, phone, orgPath, dob, userId } = req.body;
    const user = await User.findOne({ userId });
    const organization = await Organization.findOne({ path: orgPath });
    let clientContactType = null;
    if (organization) {
      clientContactType = await ContactType.findOne({
        organizationId: organization._id,
        type: "client",
      });
    } else {
      clientContactType = await ContactType.findOne({ userId: userId, name: "Client" });
    }
    // Check Email exist or not
    if (email !== "") {
      if (organization) {
        const existedContact = await Contact.findOne({
          userId: mongoose.Types.ObjectId(userId),
          organizationId: organization._id,
          email,
          isDelete: false,
        });
        if (existedContact) {
          existedContact.fullName = fullName;
          existedContact.phone = phone;
          existedContact.contactType = [clientContactType._id];
          existedContact.dob = dob;
          existedContact.save();
        } else {
          const contact = new Contact({
            ...req.body,
            userId: mongoose.Types.ObjectId(userId),
            organizationId: organization ? organization._id : null,
            contactType: [clientContactType._id],
          });
          contact.save(async (err, success) => {
            if (err) {
              if (err) {
                console.log("err", err);

                return res.status(500).json({
                  errors: { common: { msg: err.message } },
                });
              }
            } else
              try {
                console.log(success);
                const findUponAutomationWithContact = await Automation.find({
                  $and: [
                    { "contactInfo.contactType": "Contacts" },
                    // { 'contactInfo.contacts': { $in: contactTypeResult } },
                    // { 'contactInfo.tags': { $in: tags } },
                    // { "contactInfo.leadSources": { $in: [leadSource] } },
                    { "activationUpon.uponType": "Upon Entry" },
                    { isActive: true },
                    { isDelete: false },
                  ],
                });

                const calculateTime = (startTime, actionDelay, setCustomtime, time) => {
                  let startAutomationTime = 0;
                  let startActionTime = 0;
                  if (!startTime.isImmediately) {
                    switch (startTime.unit) {
                      case "minutes":
                        startAutomationTime = startAutomationTime + startTime.time * 60;
                        break;
                      case "hours":
                        startAutomationTime = startAutomationTime + startTime.time * 60 * 60;
                        break;
                      case "days":
                        startAutomationTime = startAutomationTime + startTime.time * 60 * 60 * 24;
                        break;
                      default:
                        break;
                    }
                  }
                  if (setCustomtime) {
                    let fourDaysLater = new Date();
                    let timestamp = 0;
                    let now = 0;
                    switch (actionDelay.unit) {
                      case "days":
                        fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      case "weeks":
                        fourDaysLater = new Date();
                        fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time * 7);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      case "months":
                        fourDaysLater = new Date();
                        fourDaysLater.setMonth(fourDaysLater.getMonth() + actionDelay.time);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      default:
                        break;
                    }
                  } else {
                    switch (actionDelay.unit) {
                      case "days":
                        startActionTime = startActionTime + 60 * 60 * 24 * actionDelay.time;
                        break;
                      case "weeks":
                        startActionTime = startActionTime + 60 * 60 * 24 * 7 * actionDelay.time;
                        break;
                      case "months":
                        startActionTime = startActionTime + 60 * 60 * 24 * 30 * actionDelay.time;
                        break;
                      default:
                        break;
                    }
                  }

                  return startAutomationTime + startActionTime;
                };

                if (findUponAutomationWithContact.length > 0) {
                  findUponAutomationWithContact.map((automation) => {
                    const startTime = automation.activateTime;
                    const firstAction = automation.actions.find((action) => action.parentId == "0");

                    const actionProcess = () => {
                      const nextAction = automation.actions.find(
                        (action) => action.parentId == firstAction.id
                      );
                      let nextActionDelay = 0;

                      if (nextAction.duration.unit) {
                        if (nextAction.setCustomTime) {
                          let fourDaysLater = new Date();
                          let timestamp = 0;
                          let now = 0;
                          switch (nextAction.duration.unit) {
                            case "days":
                              fourDaysLater.setDate(
                                fourDaysLater.getDate() + nextAction.duration.time
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            case "weeks":
                              fourDaysLater = new Date();
                              fourDaysLater.setDate(
                                fourDaysLater.getDate() + nextAction.duration.time * 7
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            case "months":
                              fourDaysLater = new Date();
                              fourDaysLater.setMonth(
                                fourDaysLater.getMonth() + nextAction.duration.time
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            default:
                              break;
                          }
                        } else {
                          switch (nextAction.duration.unit) {
                            case "days":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * nextAction.duration.time;
                              break;
                            case "weeks":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * 7 * nextAction.duration.time;
                              break;
                            case "months":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * 30 * nextAction.duration.time;
                              break;
                            default:
                              break;
                          }
                        }
                      }

                      let _currentDate = new Date();
                      let _currentSecond = _currentDate.getTime() / 1000;
                      success.automation.push({
                        automationId: automation._id,
                        currentActionId: firstAction.id,
                        fireTime: _currentSecond + nextActionDelay,
                      });
                      success.save().then(console.log("success"));
                    };
                    const startEvent = () => {
                      let currentDate = new Date();
                      let currentSecond = currentDate.getTime() / 1000;
                      switch (firstAction.actionType) {
                        case "email":
                          SendMail({
                            recipient: success.email,
                            from: `admin@mymanager.com`,
                            replyTo: `admin@mymanager.com`,
                            subject: firstAction.subject,
                            body: firstAction.content,
                          });
                          actionProcess();
                          break;
                        case "text":
                          let accountSid = process.env.TWILIO_ACCOUNT_SID;
                          let authToken = process.env.TWILIO_AUTH_TOKEN;
                          const smsClient = require("twilio")(accountSid, authToken);
                          smsClient.messages
                            .create({
                              body: firstAction.content,
                              from: process.env.FROM_NUMBER,
                              to: success.phone,
                            })
                            .then((message) => console.log(message.sid));

                          actionProcess();
                          break;
                        case "notification":
                          if (firstAction.to.type == "ME") {
                            let manager = Contact.find({
                              _id: mongoose.Types.ObjectId(userId),
                            });
                            switch (firstAction.method) {
                              case "EMAIL":
                                SendMail({
                                  recipient: req.user.email,
                                  from: `admin@mymanager.com`,
                                  replyTo: `admin@mymanager.com`,
                                  subject: firstAction.subject,
                                  body: firstAction.content,
                                });
                                break;
                              case "TEXT":
                                let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                let authToken = process.env.TWILIO_AUTH_TOKEN;
                                const smsClient = require("twilio")(accountSid, authToken);
                                smsClient.messages
                                  .create({
                                    body: firstAction.content,
                                    from: process.env.FROM_NUMBER,
                                    to: req.user.phone,
                                  })
                                  .then((message) => console.log(message.sid));
                                break;
                              case "TOOLBAR":
                                const managerSocket = socket_connections.find(
                                  (item) => item.adminId == req.user._id
                                );
                                if (!managerSocket) {
                                  managerSocket.socket.emit("newNotification", {
                                    notification: firstAction.content,
                                  });
                                }
                                break;
                              default:
                                break;
                            }
                          } else if (firstAction.to.type == "CONTACT") {
                            let contactsForNotification = [];
                            firstAction.to.contacts.map((contact) => {
                              ContactType.findOne({
                                name: contact,
                                userId: mongoose.Types.ObjectId(userId),
                                organizationId: mongoose.Types.ObjectId(organization._id),
                              }).then((contact_type) => {
                                Contact.find({
                                  contactType: mongoose.Types.ObjectId(contact_type._id),
                                }).then((noteContacts) =>
                                  contactsForNotification.push(noteContacts)
                                );
                              });
                            });
                            switch (firstAction.method) {
                              case "EMAIL":
                                contactsForNotification.map(async (item) => {
                                  try {
                                    const sendmail = await SendMail({
                                      recipient: item.email,
                                      from: `admin@mymanager.com`,
                                      replyTo: `admin@mymanager.com`,
                                      subject: firstAction.subject,
                                      body: firstAction.content,
                                    });
                                  } catch (error) {}
                                });
                                break;
                              case "TEXT":
                                let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                let authToken = process.env.TWILIO_AUTH_TOKEN;
                                const smsClient = require("twilio")(accountSid, authToken);
                                contactsForNotification.map(async (item) => {
                                  try {
                                    const sendsms = await smsClient.messages
                                      .create({
                                        body: firstAction.content,
                                        from: process.env.FROM_NUMBER,
                                        to: item.phone,
                                      })
                                      .then((message) => console.log(message.sid));
                                  } catch (error) {}
                                });
                              case "TOOLBAR":
                                contactsForNotification.map((item) => {
                                  const managerSocket = socket_connections.find(
                                    (i) => i.adminId == item._id
                                  );
                                  if (!managerSocket) {
                                    managerSocket.socket.emit("newNotification", {
                                      notification: firstAction.content,
                                    });
                                  }
                                });
                                break;
                              default:
                                break;
                            }
                          }
                          actionProcess();
                          break;
                      }
                    };
                    console.log(firstAction);
                    const fireTime = calculateTime(
                      startTime,
                      firstAction.duration,
                      firstAction.setCustomTime,
                      firstAction.customTime.time
                    );
                    setTimeout(startEvent, fireTime * 1000);
                  });
                }

                return res.status(201).json({
                  success: "Contact created successfully",
                  contact: success,
                });
              } catch (error) {
                console.log(error);
              }
          });
        }
      } else {
        const existedContact = await Contact.findOne({
          userId: mongoose.Types.ObjectId(userId),
          email,
          isDelete: false,
        });
        if (existedContact) {
          existedContact.fullName = fullName;
          existedContact.phone = phone;
          existedContact.contactType = [clientContactType._id];
          existedContact.dob = dob;
          existedContact.save(async (err, success) => {
            if (err) {
              console.log("err", err);

              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            } else {
              return res.status(201).json({
                success: "Contact created successfully",
                contact: success,
              });
            }
          });
        } else {
          const contact = new Contact({
            ...req.body,
            userId: mongoose.Types.ObjectId(userId),
            organizationId: organization ? organization._id : null,
            contactType: [clientContactType._id],
          });
          contact.save(async (err, success) => {
            if (err) {
              console.log("err", err);

              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            } else {
              try {
                console.log(success);
                const findUponAutomationWithContact = await Automation.find({
                  $and: [
                    { "contactInfo.contactType": "Contacts" },
                    // { 'contactInfo.contacts': { $in: contactTypeResult } },
                    // { 'contactInfo.tags': { $in: tags } },
                    // { "contactInfo.leadSources": { $in: [leadSource] } },
                    { "activationUpon.uponType": "Upon Entry" },
                    { isActive: true },
                    { isDelete: false },
                  ],
                });

                const calculateTime = (startTime, actionDelay, setCustomtime, time) => {
                  let startAutomationTime = 0;
                  let startActionTime = 0;
                  if (!startTime.isImmediately) {
                    switch (startTime.unit) {
                      case "minutes":
                        startAutomationTime = startAutomationTime + startTime.time * 60;
                        break;
                      case "hours":
                        startAutomationTime = startAutomationTime + startTime.time * 60 * 60;
                        break;
                      case "days":
                        startAutomationTime = startAutomationTime + startTime.time * 60 * 60 * 24;
                        break;
                      default:
                        break;
                    }
                  }
                  if (setCustomtime) {
                    let fourDaysLater = new Date();
                    let timestamp = 0;
                    let now = 0;
                    switch (actionDelay.unit) {
                      case "days":
                        fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      case "weeks":
                        fourDaysLater = new Date();
                        fourDaysLater.setDate(fourDaysLater.getDate() + actionDelay.time * 7);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      case "months":
                        fourDaysLater = new Date();
                        fourDaysLater.setMonth(fourDaysLater.getMonth() + actionDelay.time);
                        fourDaysLater.setHours(time);
                        fourDaysLater.setMinutes(0);
                        fourDaysLater.setSeconds(0);
                        timestamp = fourDaysLater.getTime();

                        // Calculate the number of milliseconds until the scheduled time
                        now = new Date().getTime();
                        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
                        break;
                      default:
                        break;
                    }
                  } else {
                    switch (actionDelay.unit) {
                      case "days":
                        startActionTime = startActionTime + 60 * 60 * 24 * actionDelay.time;
                        break;
                      case "weeks":
                        startActionTime = startActionTime + 60 * 60 * 24 * 7 * actionDelay.time;
                        break;
                      case "months":
                        startActionTime = startActionTime + 60 * 60 * 24 * 30 * actionDelay.time;
                        break;
                      default:
                        break;
                    }
                  }

                  return startAutomationTime + startActionTime;
                };

                if (findUponAutomationWithContact.length > 0) {
                  findUponAutomationWithContact.map((automation) => {
                    const startTime = automation.activateTime;
                    const firstAction = automation.actions.find((action) => action.parentId == "0");

                    const actionProcess = () => {
                      const nextAction = automation.actions.find(
                        (action) => action.parentId == firstAction.id
                      );
                      let nextActionDelay = 0;

                      if (nextAction.duration.unit) {
                        if (nextAction.setCustomTime) {
                          let fourDaysLater = new Date();
                          let timestamp = 0;
                          let now = 0;
                          switch (nextAction.duration.unit) {
                            case "days":
                              fourDaysLater.setDate(
                                fourDaysLater.getDate() + nextAction.duration.time
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            case "weeks":
                              fourDaysLater = new Date();
                              fourDaysLater.setDate(
                                fourDaysLater.getDate() + nextAction.duration.time * 7
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            case "months":
                              fourDaysLater = new Date();
                              fourDaysLater.setMonth(
                                fourDaysLater.getMonth() + nextAction.duration.time
                              );
                              fourDaysLater.setHours(nextAction.customTime.time);
                              fourDaysLater.setMinutes(0);
                              fourDaysLater.setSeconds(0);
                              timestamp = fourDaysLater.getTime();

                              // Calculate the number of milliseconds until the scheduled time
                              now = new Date().getTime();
                              nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
                              break;
                            default:
                              break;
                          }
                        } else {
                          switch (nextAction.duration.unit) {
                            case "days":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * nextAction.duration.time;
                              break;
                            case "weeks":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * 7 * nextAction.duration.time;
                              break;
                            case "months":
                              nextActionDelay =
                                nextActionDelay + 60 * 60 * 24 * 30 * nextAction.duration.time;
                              break;
                            default:
                              break;
                          }
                        }
                      }

                      let _currentDate = new Date();
                      let _currentSecond = _currentDate.getTime() / 1000;
                      success.automation.push({
                        automationId: automation._id,
                        currentActionId: firstAction.id,
                        fireTime: _currentSecond + nextActionDelay,
                      });
                      success.save().then(console.log("success"));
                    };
                    const startEvent = () => {
                      let currentDate = new Date();
                      let currentSecond = currentDate.getTime() / 1000;
                      switch (firstAction.actionType) {
                        case "email":
                          SendMail({
                            recipient: success.email,
                            from: `admin@mymanager.com`,
                            replyTo: `admin@mymanager.com`,
                            subject: firstAction.subject,
                            body: firstAction.content,
                          });
                          actionProcess();
                          break;
                        case "text":
                          let accountSid = process.env.TWILIO_ACCOUNT_SID;
                          let authToken = process.env.TWILIO_AUTH_TOKEN;
                          const smsClient = require("twilio")(accountSid, authToken);
                          smsClient.messages
                            .create({
                              body: firstAction.content,
                              from: process.env.FROM_NUMBER,
                              to: success.phone,
                            })
                            .then((message) => console.log(message.sid));

                          actionProcess();
                          break;
                        case "notification":
                          if (firstAction.to.type == "ME") {
                            let manager = Contact.find({
                              _id: mongoose.Types.ObjectId(req.user._id),
                            });
                            switch (firstAction.method) {
                              case "EMAIL":
                                SendMail({
                                  recipient: req.user.email,
                                  from: `admin@mymanager.com`,
                                  replyTo: `admin@mymanager.com`,
                                  subject: firstAction.subject,
                                  body: firstAction.content,
                                });
                                break;
                              case "TEXT":
                                let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                let authToken = process.env.TWILIO_AUTH_TOKEN;
                                const smsClient = require("twilio")(accountSid, authToken);
                                smsClient.messages
                                  .create({
                                    body: firstAction.content,
                                    from: process.env.FROM_NUMBER,
                                    to: req.user.phone,
                                  })
                                  .then((message) => console.log(message.sid));
                                break;
                              case "TOOLBAR":
                                const managerSocket = socket_connections.find(
                                  (item) => item.adminId == req.user._id
                                );
                                if (!managerSocket) {
                                  managerSocket.socket.emit("newNotification", {
                                    notification: firstAction.content,
                                  });
                                }
                                break;
                              default:
                                break;
                            }
                          } else if (firstAction.to.type == "CONTACT") {
                            let contactsForNotification = [];
                            firstAction.to.contacts.map((contact) => {
                              ContactType.findOne({ name: contact }).then((contact_type) => {
                                Contact.find({
                                  contactType: mongoose.Types.ObjectId(contact_type._id),
                                }).then((noteContacts) =>
                                  contactsForNotification.push(noteContacts)
                                );
                              });
                            });
                            switch (firstAction.method) {
                              case "EMAIL":
                                contactsForNotification.map(async (item) => {
                                  try {
                                    const sendmail = await SendMail({
                                      recipient: item.email,
                                      from: `admin@mymanager.com`,
                                      replyTo: `admin@mymanager.com`,
                                      subject: firstAction.subject,
                                      body: firstAction.content,
                                    });
                                  } catch (error) {}
                                });
                                break;
                              case "TEXT":
                                let accountSid = process.env.TWILIO_ACCOUNT_SID;
                                let authToken = process.env.TWILIO_AUTH_TOKEN;
                                const smsClient = require("twilio")(accountSid, authToken);
                                contactsForNotification.map(async (item) => {
                                  try {
                                    const sendsms = await smsClient.messages
                                      .create({
                                        body: firstAction.content,
                                        from: process.env.FROM_NUMBER,
                                        to: item.phone,
                                      })
                                      .then((message) => console.log(message.sid));
                                  } catch (error) {}
                                });
                              case "TOOLBAR":
                                contactsForNotification.map((item) => {
                                  const managerSocket = socket_connections.find(
                                    (i) => i.adminId == item._id
                                  );
                                  if (!managerSocket) {
                                    managerSocket.socket.emit("newNotification", {
                                      notification: firstAction.content,
                                    });
                                  }
                                });
                                break;
                              default:
                                break;
                            }
                          }
                          actionProcess();
                          break;
                      }
                    };
                    console.log(firstAction);
                    const fireTime = calculateTime(
                      startTime,
                      firstAction.duration,
                      firstAction.setCustomTime,
                      firstAction.customTime.time
                    );
                    setTimeout(startEvent, fireTime * 1000);
                  });
                }
                return res.status(201).json({
                  success: "Contact created successfully",
                  contact: success,
                });
              } catch (error) {
                console.log(error);
              }
            }
          });
        }
      }
    }
  } catch (err) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.addAndUpdateContactBulk = asyncHandler(async (req, res) => {
  try {
    const inviteeArr = req.body;
    for (let i = 0; i < inviteeArr.length; i++) {
      const existedContact = await Contact.findById(inviteeArr[i].id);
      if (existedContact) {
        const contactTypeArr = await ContactType.find({
          userId: req.user._id,
          name: inviteeArr[i].type,
        });
        let typeIdArr = contactTypeArr.map((item) => item._id);
        existedContact.contactType = typeIdArr;
        await existedContact.save();
      } else {
        return;
      }
    }
    return res.status(200).json({ data: inviteeArr, msg: "Successfully saved" });
  } catch (err) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Method to get all contacts
 * @method  GET
 * @param   {Object}  query receive data via req.query
 * @return  {JSON}  status message and data
 * @version 1.0.1
 */
exports.getAllContacts = asyncHandler(async (req, res) => {
  try {
    //const { userType } = req.user;
    const { organization, org_location } = req.headers;
    let {
      contactType,
      pageSize,
      page,
      position,
      type,
      status,
      sortKey,
      sortType,
      text,
      tags,
      leadSource,
      isFormer,
    } = req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const { user } = req;
    let sort = 1;
    if (sortType == "desc") {
      sort = -1;
    }
    let query = {};
    if (isFormer) {
      if (isFormer === "true") {
        query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: null,
          isDelete: false,
          isFormer: true,
        };
      } else {
        query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: null,
          isDelete: false,
          isFormer: false,
        };
      }
    } else {
      query = {
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: null,
        isDelete: false,
      };
    }

    if (organization) {
      query = {
        ...query,
        organizationId: mongoose.Types.ObjectId(organization),
      };
      if (org_location && org_location.trim() !== "null") {
        query = {
          ...query,
          orgLocation: mongoose.Types.ObjectId(org_location),
        };
      }
    }

    query =
      position && position !== null && position !== undefined
        ? {
            ...query,
            position,
          }
        : query;
    query =
      type && type !== null && type !== undefined
        ? {
            ...query,
            type,
          }
        : query;
    query =
      status && status !== null && status !== undefined
        ? {
            ...query,
            status,
          }
        : query;
    if (text !== "") {
      let regex = new RegExp(text, "i");
      query = {
        ...query,
        $or: [{ fullName: regex }],
      };
    }
    query = tags
      ? {
          ...query,
          tags: { $in: [tags] },
        }
      : query;
    query =
      leadSource && leadSource !== null && leadSource !== undefined
        ? {
            ...query,
            leadSource,
          }
        : query;

    const contacts = await Contact.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "contacts",
          localField: "family.id",
          foreignField: "_id",
          as: "familyMembers",
        },
      },
      {
        $lookup: {
          from: "attendences",
          localField: "_id",
          foreignField: "contactId",
          as: "lastAttended",
          pipeline: [
            {
              $sort: {
                attendedDateTime: -1,
              },
            },
            {
              $project: {
                attendedDateTime: 1,
              },
            },
            { $limit: 1 },
          ],
        },
      },
      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "contactId",
          as: "lastContacted",
          pipeline: [
            {
              $sort: {
                date: -1,
              },
            },
            {
              $project: {
                date: 1,
              },
            },
            { $limit: 1 },
          ],
        },
      },
      {
        $sort: {
          [sortKey]: sort,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }],
        },
      },
    ]);

    const retentionAttendanceList = await Retention.find({
      userId: req.user._id,
      type: "Attendance",
    });

    const retentionLastContactedList = await Retention.find({
      userId: req.user._id,
      type: "LastContacted",
    });

    const tmpData = contacts[0].data?.map((x) => {
      let rtnData = {};
      if (x?.lastAttended.length) {
        const attendancePassedDays = calculatePassedDays(x?.lastAttended[0]?.attendedDateTime);

        const attendanceRatingColorList = retentionAttendanceList.filter(
          (x) => x.lowerLimit < attendancePassedDays && x.upperLimit >= attendancePassedDays
        );

        const attendanceRatingColor = attendanceRatingColorList?.length
          ? attendanceRatingColorList[0]?.colorCode || "#2e2e2e"
          : "#00e30f";
        rtnData = {
          ...x,
          attendanceRating: attendancePassedDays,
          attendanceRatingColor,
        };
      } else {
        rtnData = {
          ...x,
          attendanceRating: 999999,
        };
      }

      if (x?.lastContacted.length) {
        const lastContactedPassedDays = calculatePassedDays(x?.lastContacted[0]?.date);

        const lastContactedRatingColorList = retentionAttendanceList.filter(
          (x) => x.lowerLimit < lastContactedPassedDays && x.upperLimit >= lastContactedPassedDays
        );

        const lastContactedRatingColor = lastContactedRatingColorList?.length
          ? lastContactedRatingColorList[0]?.colorCode || "#2e2e2e"
          : "#00e30f";
        rtnData = {
          ...rtnData,
          lastContactedRating: lastContactedPassedDays,
          lastContactedRatingColor,
        };
      } else {
        rtnData = {
          ...rtnData,
          lastContactedRating: 999999,
        };
      }
      return rtnData;
    });

    const newContacts = [
      {
        ...contacts[0],
        data: tmpData,
      },
    ];

    const chatMessagePromises = newContacts[0].data.map((element) => {
      return TextMessages.find({ uid: element._id }).sort({ createdAt: -1 }).limit(1);
    });
    const lastMessages = await Promise.all(chatMessagePromises);
    newContacts[0].data.forEach((element, index) => {
      newContacts[0].data[index].lastMessage = lastMessages[index][0];
    });
    for (let i = 0; i < newContacts[0].data.length; i++) {
      let unReadMeassges = await TextMessages.find({
        uid: newContacts[0].data[i]._id,
        isRead: false,
      });
      newContacts[0].data[i].unReadMessages = unReadMeassges.length;
    }
    newContacts[0].data.sort(
      (first, second) => second?.lastMessage?.createdAt - first?.lastMessage?.createdAt
    );
    const data = buildPagination(newContacts);
    res.status(200).json(data);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
    // return err;
  }
});

/**
 * Method to get contact by Id
 * @method  GET
 * @param   {Object}  query receive data via req.query
 * @return  {JSON}  status message and data
 * @version 1.0.1
 */
exports.getContactById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params();
    const contact = await Contact.findById();

    const retentionAttendanceList = await Retention.find({
      userId: req.user._id,
      type: "Attendance",
    });

    const retentionLastContactedList = await Retention.find({
      userId: req.user._id,
      type: "LastContacted",
    });

    const tmpData = contacts[0].data?.map((x) => {
      let rtnData = {};
      if (x?.lastAttended.length) {
        const attendancePassedDays = calculatePassedDays(x?.lastAttended[0]?.attendedDateTime);

        const attendanceRatingColorList = retentionAttendanceList.filter(
          (x) => x.lowerLimit < attendancePassedDays && x.upperLimit >= attendancePassedDays
        );

        const attendanceRatingColor = attendanceRatingColorList?.length
          ? attendanceRatingColorList[0]?.colorCode || "#2e2e2e"
          : "#00e30f";
        rtnData = {
          ...x,
          attendanceRating: attendancePassedDays,
          attendanceRatingColor,
        };
      } else {
        rtnData = {
          ...x,
          attendanceRating: 999999,
        };
      }

      if (x?.lastContacted.length) {
        const lastContactedPassedDays = calculatePassedDays(x?.lastContacted[0]?.date);

        const lastContactedRatingColorList = retentionAttendanceList.filter(
          (x) => x.lowerLimit < lastContactedPassedDays && x.upperLimit >= lastContactedPassedDays
        );

        const lastContactedRatingColor = lastContactedRatingColorList?.length
          ? lastContactedRatingColorList[0]?.colorCode || "#2e2e2e"
          : "#00e30f";
        rtnData = {
          ...rtnData,
          lastContactedRating: lastContactedPassedDays,
          lastContactedRatingColor,
        };
      } else {
        rtnData = {
          ...rtnData,
          lastContactedRating: 999999,
        };
      }
      return rtnData;
    });

    const newContacts = [
      {
        ...contacts[0],
        data: tmpData,
      },
    ];

    const chatMessagePromises = newContacts[0].data.map((element) => {
      return TextMessages.find({ uid: element._id }).sort({ createdAt: -1 }).limit(1);
    });
    const lastMessages = await Promise.all(chatMessagePromises);
    newContacts[0].data.forEach((element, index) => {
      newContacts[0].data[index].lastMessage = lastMessages[index][0];
    });
    for (let i = 0; i < newContacts[0].data.length; i++) {
      let unReadMeassges = await TextMessages.find({
        uid: newContacts[0].data[i]._id,
        isRead: false,
      });
      newContacts[0].data[i].unReadMessages = unReadMeassges.length;
    }
    newContacts[0].data.sort(
      (first, second) => second?.lastMessage?.createdAt - first?.lastMessage?.createdAt
    );
    const data = buildPagination(newContacts);
    res.status(200).json(data);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
    // return err;
  }
});

/**
 * Method to add family members
 * @method  POST
 * @param   {String}  id  family contact id
 * @param   {String}  relation  relation for contact
 * @return  {String}  contactId contact that should be updated
 * @version 1.0.0
 */
exports.addNewFamilyMember = asyncHandler(async (req, res) => {
  try {
    const { id, relation, contactId } = req.body;
    await Contact.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(contactId) },
      { $push: { family: { id: mongoose.Types.ObjectId(id), relation: relation } } }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({
      errors: { common: { msg: error.message } },
    });
  }
});

/**
 * Method to update contact
 * @method  POST
 * @param   {ObjectID}  id receive data via req.params : the contact _id
 * @param   {Object}  body receive data via req.body
 * @return  {JSON}  status message and data
 * @version 1.0.1
 */
exports.updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const update = { ...req.body };
  const opts = { new: true };

  Contact.findOneAndUpdate(filter, update, opts, (err, newContact) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    } else {
      return res.status(200).json(newContact);
    }
  });
});

/**
 * Method to update values of new fields of contact
 * @method  POST
 * @param   {ObjectID}  id receive data via req.params : the contact _id
 * @param   {Object}  body receive data via req.body
 * @return  {JSON}  status message and data
 * @version 1.0.1
 */
exports.updateFieldsContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { contactId, fieldId, value } = req.body;
  const contact = await Contact.findById(mongoose.Types.ObjectId(id));
  let tmp = [];
  const exitedField = contact.fields.find((field) => field.fieldId.toString() == fieldId);
  console.log("exited", exitedField);
  if (exitedField) {
    console.log("asdf");
    contact.fields.map((field) => {
      if (field.fieldId.toString() == fieldId) {
        tmp.push({ fieldId: fieldId, value: value });
      } else {
        tmp.push({ fieldId: mongoose.Types.ObjectId(fieldId), value: value });
      }
    });
  } else {
    console.log("he");
    tmp.push({
      fieldId: mongoose.Types.ObjectId(fieldId),
      value: value,
    });
  }
  console.log("tmp", tmp);
  contact.fields = tmp;
  await contact.save((err, data) => {
    if (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
    return res.status(200).json({ success: true, data: data });
  });
});

/**
 * Method to delete contact
 * @method  DELETE
 * @param   {ObjectID}  id receive data via req.params : the contact _id
 * @return  {JSON}  status message and data
 * @version 1.0.1
 */
exports.deleteContact = asyncHandler(async (req, res) => {
  const { source } = req.body;
  const filter = { _id: { $in: source } };
  const update = { isDelete: true };
  const opts = { new: true };

  console.log("delete contact:", filter, update, opts, req.params, req.body);
  Contact.updateMany(filter, update, opts, (err, deleted) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    } else {
      return res.status(200).json(deleted);
    }
  });
});

/**
 * Method to represent uploaded file content
 * @method  POST
 * @param   {ObjectID}  id    receive data via req.params : the contact _id
 * @param   {String}    fieldName name of contact's field for uploaded file
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.filesUpload = asyncHandler(async (req, res) => {
  try {
    const { title, _id, fieldName } = req.body;

    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    client[fieldName].push({
      title,
      file: req.file.location,
      createdAt: Date.now(),
    });

    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Method to delete uploaded file content in contact
 * @method  POST
 * @param   {ObjectID}  id    receive data via req.params : the contact _id
 * @param   {String}    field name of contact's field for uploaded file
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.deleteUploadedFile = asyncHandler(async (req, res) => {
  try {
    const { id, clientId, fieldName } = req.body;
    const client = await Contact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    if (client[fieldName] == undefined) {
      return res.status(404).send("Field Nane is not incorrect");
    }
    client[fieldName] = client[fieldName].filter((x) => String(x._id) !== String(id));
    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Clients
 */

/**
 * Method to add rank in contact
 * @method  POST
 * @param   {ObjectID}  clientId  the contact _id
 * @param   {String}  name        rank name
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.addNewRank = asyncHandler(async (req, res) => {
  try {
    const { name, clientId } = req.body;

    const client = await Contact.findOne({
      _id: clientId,
      isDelete: false,
    });
    if (!client) {
      return res.status(500).json({
        errors: { common: { msg: "No client data found" } },
      });
    }
    client.ranks.push({
      name,
      photo: req.file.location,
      createdAt: Date.now(),
    });
    await client.save();
    return res.status(200).send({ success: "New rank added successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Method to update rank in contact
 * @method  POST
 * @param   {ObjectID}  clientId  the contact _id
 * @param   {String}    name      the contact rank name
 * @param   {ObjectID}  id        _id of rank document
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.editRank = asyncHandler(async (req, res) => {
  try {
    const { name, clientId, _id, createdAt } = req.body;

    const client = await Contact.findOne({
      _id: clientId,
      isDelete: false,
    });

    if (!client) {
      return res.status(500).json({
        errors: { common: { msg: "No contact data found" } },
      });
    }

    let ranks = [];
    for (let rank of client.ranks) {
      if (String(rank._id) === String(_id)) {
        rank.name = name;
        rank.createdAt = createdAt;
        if (req.file) {
          if (req.file.location) {
            rank.photo = req.file.location;
          }
        }
      }
      ranks.push(rank);
    }
    client.ranks = ranks;
    await client.save();
    return res.status(200).send({ success: "Rank updated successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Method to update rank in contact
 * @method  PATCH
 * @param   {ObjectID}  clientId  the contact _id
 * @param   {ObjectID}  rankId    _id of rank document
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.removeRank = asyncHandler(async (req, res) => {
  try {
    const { clientId, rankId } = req.body;

    let client = await Contact.findOne({
      _id: clientId,
      isDelete: false,
    });

    const newRank = client.ranks.filter((r) => r._id != String(rankId));
    client.ranks = newRank;
    client.save();

    return res.status(200).send({ success: "New rank removed successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Method to import contact files
 * @method  POST
 * @param   {String}  type  contact file type
 * @param   {Object}  files  uploaded files that received in req argument
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.importContacts = asyncHandler(async (req, res) => {
  try {
    const { type } = req.body;
    if (!type || type === "") {
      return res.status(500).json({
        errors: { common: { msg: "File Type ? is it CSV or xls" } },
      });
    }
    if (!req.files.file) {
      return res.status(500).json({
        errors: { common: { msg: "File not Selected" } },
      });
    }
    let __dirname = path.resolve(path.dirname(""));
    const filename = Date.now() + "." + String(req.files.file.name).split(".")[1];
    uploadPath = __dirname + "/files/" + filename;
    let contacts = [];
    req.files.file.mv(uploadPath, (err) => {
      fs.createReadStream(uploadPath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
          contacts.push(row);
        })
        .on("end", function () {
          fs.unlink(uploadPath, (err) => {
            if (err) {
              console.log(err);
            }
            // Upload Data to Database
            contacts = contacts.filter((x, i) => {
              let isEmpty = true;
              for (let each of Object.values(x)) {
                if (each !== "") {
                  isEmpty = false;
                }
              }
              return !isEmpty;
            });
            contacts = contacts.map((x, i) => {
              let data = Object.values(x).filter((x) => x !== "");
              return {
                ...data,
              };
            });

            return res.json(contacts);
          });
        })
        .on("error", function (error) {
          console.log(error.message);
        });
    });

    // return res.status(200).send({ success: 'success' });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Method to import contact array
 * @method  POST
 * @param   {String}  contacts  contacts array
 * @return  {JSON}  status message and data
 * @version 1.0.0
 */
exports.importContactsFromArray = asyncHandler(async (req, res) => {
  try {
    const { contacts } = req.body;

    if (contacts.length === 0) {
      return res.status(500).json({
        errors: { common: { msg: "Contact Length is 0" } },
      });
    }

    const formatedData = contacts.map((x) => ({
      ...x,
      userId: req.user._id,
      fullName: x[0],
      email: x[1],
      phone: x[2],
      type: x[3],
      company: x[4],
      position: x[5],
    }));

    await Contact.insertMany(formatedData);

    return res.status(200).send("Imported");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * Employee
 */

// Hash Password
const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// exports.deleteContact = asyncHandler(async (req, res) => {
//   const { _id } = req.body;

//   const contact = await Contact.findById(_id);
//   if (!contact) {
//     throw Error("Contact not found !");
//   }
//   contact.isDelete = true;
//   await contact.save();
//   res.send({});
// });

exports.contactList = asyncHandler(async (req, res) => {
  try {
    // eslint-disable-next-line prefer-const
    let {
      pageSize,
      page,
      position,
      type,
      status,
      sortKey,
      sortType,
      text,
      tags,
      leadSource,
      isFormer,
    } = req.query;
    const { user } = req;

    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    const skip = (page - 1) * pageSize;
    // const { user } = req;

    let sort = 1;
    if (sortType === "desc") {
      sort = -1;
    }

    let query = {};
    // let query = {
    //   userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id),
    //   isDelete: false,
    // };

    if (position && position !== null && position !== undefined) {
      query = {
        ...query,
        position,
      };
    }

    if (type && type !== null && type !== undefined) {
      query = {
        ...query,
        type,
      };
    }

    if (status && status !== null && status !== undefined) {
      query = {
        ...query,
        status,
      };
    }

    if (text !== "" && text !== undefined) {
      const regex = new RegExp(text, "i");
      query = {
        ...query,
        $or: [{ fullName: regex }],
      };
    }

    if (tags) {
      query = {
        ...query,
        tags: {
          $elemMatch: {
            $in: [tags, "$tags"],
          },
        },
      };
    }
    if (leadSource) {
      query = {
        ...query,
        leadSource,
      };
    }

    const employeeContact = await Contact.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "employee-shifts",
          localField: "shift",
          foreignField: "_id",
          as: "shift",
        },
      },
      {
        $sort: {
          [sortKey]: sort,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);
    const data = buildPagination(employeeContact);
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.contactAdd = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    address,
    city,
    workType,
    role,
    email,
    phone,
    employee_position: position,
    password,
    state,
    willSendEmail,
    zip,
    outletId,
    tags,
    leadSource,
  } = req.body;

  let hashedPassword = "",
    permissionInfo;

  if (!req.user) {
    throw Error("user not Found !");
  }

  if (password) {
    hashedPassword = (await hashPass(password)).toString();
  }

  let outlet = null;
  if (outletId !== "") {
    outlet = outletId;
  }

  // Check phone exist or not
  if (phone !== "") {
    const checkExist = await Contact.findOne({
      contactType: "employee",
      phone,
      isDelete: false,
    });
    if (checkExist) {
      throw Error("Phone number already Exist");
    }
  }
  // validation
  if (!fullName || fullName === "") {
    throw Error("Full name must not empty !");
  }

  if (role) {
    permissionInfo = await Roles.findById(mongoose.Types.ObjectId(role));
  }

  Contact.findOne({ contactType: "employee", email }).exec((err, employee) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    if (employee && employee.isDelete == false) {
      return res.status(409).json({
        msg: "Email or Phone Number Already Taken",
      });
    }
    const newContact = new Contact({
      contactType: "employee",
      fullName,
      email,
      phone,
      outletId: outlet,
      position,
      userId: req.user.id ? req.user.id : req.user._id,
      username,
      hashed_password: hashedPassword,
      address,
      workType,
      city,
      role,
      email,
      phone,
      state,
      zip,
      isDelete: false,
      tags,
      leadSource,
    });

    newContact.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      if (success) {
        const asynGenerateToken = async () => {
          const { accessToken, refreshToken } = await generateTokens({
            _id: newContact._id,
          });
        };
        asynGenerateToken();

        if (willSendEmail) {
          SendMail({
            recipient: email,
            from: `admin@mymanager.com`,
            replyTo: `admin@mymanager.com`,
            body: newContactMailTemplate(fullName, req.user, newContact._id),
          });
        } else {
          console.log("just add, not sending email");
        }

        return res.status(201).json({
          success: "Client contact created successfully",
        });
      }
    });
  });
});

const contactAddBulk = asyncHandler(async (req, res) => {
  const { newContacts, eventId } = req.body;

  if (!req.user) {
    throw Error("user not Found !");
  }
  newContacts.map((newContact, index) => {});

  const { name: fullName, email, phone } = newContact;
  newContact.role = "63e84cda4c25a4fa0661d956";
  newContact.ranks.name = "start";
  newContact.files.title = "start";
  newContact.others.address = "start";
  newContact.others.phone = "123456789";

  // Check phone exist or not
  if (phone !== "") {
    const checkExist = await EmployeeContact.findOne({
      phone,
      isDelete: false,
    });
    if (checkExist) {
      throw Error("Phone number already Exist");
    }
  }
  // validation
  if (!name || name === "") {
    throw Error("Full name must not empty !");
  }

  EmployeeContact.findOne({ email }).exec((err, employee) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    if (employee && employee.isDelete == false) {
      return res.status(409).json({
        msg: "Email or Phone Number Already Taken",
      });
    }
    const newEmployeeContact = new EmployeeContact({
      contactType: "employee",
      fullName,
      email,
      phone,
      outletId: outlet,
      position,
      userId: req.user.id ? req.user.id : req.user._id,
      username,
      hashed_password: hashedPassword,
      address,
      workType,
      city,
      role,
      email,
      phone,
      state,
      zip,
      isDelete: false,
      tags,
      leadSource,
    });

    newEmployeeContact.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      if (success) {
        return res.status(201).json({
          success: "Client contact created successfully",
        });
      }
    });
  });
});

exports.contactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  Contact.findById(mongoose.Types.ObjectId(id))
    .populate("role")
    .exec((err, data) => {
      if (err) {
        res.status(400).json("contact not found");
      } else {
        res.status(200).json(data);
      }
    });
});

exports.updateEmployeeContact = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const { user } = req;
  const {
    _id,
    fullName,
    email,
    phone,
    role,
    gender,
    address,
    position,
    status,
    note,
    tags,
    dob,
    type,
    salary,
    isFormer,
    isinternship,
    shiftId,
    isShiftRemove,
    leadSource,
  } = req.body;

  const contact = await Contact.findById(_id);
  if (!contact) throw Error("Contact not Found");
  contact.fullName = fullName ? fullName : contact.fullName;
  contact.email = email ? email : contact.email;
  contact.phone = phone ? phone : contact.phone;
  contact.position = position ? position : contact.position;
  contact.gender = gender ? gender : contact.gender;
  contact.address = address ? address : contact.address;
  contact.status = status ? status : contact.status;
  contact.note = note ? note : contact.note;
  contact.role = role ? role : contact.role;
  contact.tags = tags ? tags : contact.tags;
  contact.dob = dob ? dob : contact.dob;
  contact.workType = type ? type : contact.workType;
  contact.salary = salary ? salary : contact.salary;
  contact.isFormer = isFormer || contact.isFormer;
  contact.leadSource = leadSource || contact.leadSource;
  //contact.isinternship = isinternship || contact.isinternship;
  if (isShiftRemove) {
    let tmp = [];
    contact.shift.forEach((item, index) => {
      if (item.toString() == shiftId) {
        return;
      } else {
        tmp.push(item);
      }
    });
    contact.shift = tmp;
  } else {
    contact.shift = shiftId ? [...contact.shift, mongoose.Types.ObjectId(shiftId)] : contact.shift;
  }
  await contact.save();
  return res.json({});
});

// Send Email
exports.sendRegisterEmail = asyncHandler(async (req, res) => {
  const { id, sendType } = req.body;
  const contact = await Contact.findById(id);

  if (sendType == "email") {
    SendMail({
      recipient: req.body.email,
      from: `admin@mymanager.com`,
      replyTo: `admin@mymanager.com`,
      body: inviteWorkspaceMailTemplate(contact.fullName, req.user, id),
    });
  }
});
exports.saveContactToMap = asyncHandler(async (req, res) => {
  const empIdArr = req.body;
  for (let i = 0; i < empIdArr.length; i++) {
    const contact = await Contact.findById(empIdArr[i]);
    if (!contact) throw Error("Contact not Found");
    contact.isAddCalendar = true;
    await contact.save();
  }
  return res.json({});
});
// ** Register Contact
exports.updateContactRegister = asyncHandler(async (req, res) => {
  const { id, email, password, roleId, assignedProject, sendType } = req.body;
  let hashedPassword = "";

  if (password) {
    hashedPassword = (await hashPass(password)).toString();
  }

  const contact = await Contact.findById(id);

  if (!contact) throw Error("Contact not Found");

  contact.email = email;
  contact.hashed_password = hashedPassword;
  contact.role = roleId;
  const permissionInfo = await Roles.findById(mongoose.Types.ObjectId(roleId));

  await contact.save((err, success) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (success) {
      const asynGenerateToken = async () => {
        const userInfo = {
          type: "employee",
          employeeId: id,
        };

        const { accessToken, refreshToken } = await generateTokens({
          _id: contact.userId,
          user: userInfo,
        });
        return res.json({
          employeeData: {
            id: id,
            userId: contact.userId,
            permission: permissionInfo.permissions[0],
          },
          accessToken,
          refreshToken,
        });
      };
      asynGenerateToken();

      if (sendType == "email") {
        SendMail({
          recipient: req.body.email,
          from: `admin@mymanager.com`,
          replyTo: `admin@mymanager.com`,
          body: `<html>
      
          <head>
      
          </head>
      
          <body style='background-color: #f5f6fb; font-size: 11px;'>
      
              <div
                  style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
                  <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
                      <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
                  </div>
                  <div style='padding: 10px; font-size: 12px;'>
                      <p style='color: #1b1a1a;'>
                          Hello ${contact.fullName}
                          <br>
                          <br>
                          <u>${
                            req.user.fullName
                              ? req.user.fullName
                              : req.user.firstName + " " + req.user.lastName
                          }</u> has invited you to their team, in a workspace called
                          Mymanager.
                          <br>
                          <br>
                          <span>Just Click: </span> https://mymanager.com/employee/activate/${id}
                      </p>
                  </div>
                  <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
                      <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
                      <div style='color: black;'>Delivered by Mymember</div>
                  </div>
              </div>
          </body>
      
          </html>`,
        });
      }
    }
  });
});

// eslint-disable-next-line consistent-return
exports.uploadAvatar = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const employee = await Contact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.photo = req.file.location;
    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateSocialLink = asyncHandler(async (req, res) => {
  try {
    const { id, links } = req.body;

    const employee = await Contact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    const { socialLinks } = employee;
    const newLinks = [];
    // eslint-disable-next-line prefer-const
    for (let link of links) {
      // eslint-disable-next-line prefer-const
      let findExisting = Array.from(socialLinks).find((x) => String(x.name) === String(link.name));
      if (findExisting) {
        findExisting.link = link.link;
        newLinks.push(findExisting);
      } else {
        newLinks.push(link);
      }
    }

    employee.socialLinks = newLinks;
    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Rnak add Or Update
exports.rankAddOrUpdate = asyncHandler(async (req, res) => {
  try {
    const {
      createdAt,
      name,
      // photo,
      _id,
      id,
    } = req.body;
    const employee = await Contact.findById(id);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    if (_id === "") {
      // Add
      employee.ranks.push({
        createdAt,
        name,
        photo: req.file.location,
      });
    } else {
      // update
      employee.ranks = employee.ranks.map((x) => {
        if (String(x._id) === String(_id)) {
          x.name = name || x.name;
          x.createdAt = createdAt || x.createdAt;

          if (req.file) {
            x.photo = req.file.location;
          }
          return x;
        }
        return x;
      });
    }

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
// Rnak Delete
exports.deleteRank = asyncHandler(async (req, res) => {
  try {
    const { _id, employeeId } = req.body;

    const employee = await Contact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.ranks = employee.ranks.filter((x) => String(x._id) !== String(_id));

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// File Add
// eslint-disable-next-line consistent-return
exports.fileAddAndUpdate = asyncHandler(async (req, res) => {
  try {
    const {
      _id,
      employeeId,
      // createdAt,
      name,
    } = req.body;
    const employee = await Contact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    if (_id === "") {
      // Add
      employee.files.push({
        title: name,
        file: req.file.location,
        createdAt: Date.now(),
      });
    }
    // eslint-disable-next-line no-lone-blocks
    {
      employee.files = employee.files.map((x) => {
        if (String(x._id) === String(_id)) {
          x.title = name || x.title;
          if (req.file) {
            x.file = req.file.location;
          }
          return x;
        }
        return x;
      });
    }

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// File Add
// eslint-disable-next-line consistent-return
exports.deleteFile = asyncHandler(async (req, res) => {
  try {
    const { _id, employeeId } = req.body;
    const employee = await Contact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.files = employee.files.filter((x) => String(x._id) !== String(_id));

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Update ===== >  Billing
exports.updateBillingAddress = asyncHandler(async (req, res) => {
  try {
    const {
      zipCode,
      state,
      street,
      city,
      country,
      email,
      phone,
      taxId,
      vatNo,
      addressLineOne,
      addressLineTwo,
      employeeId,
    } = req.body;

    const employee = await Contact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.billingAddress = {
      // email,
      // phone,
      // taxId,
      // vatNo,
      // addressLineOne,
      // addressLineTwo,
      zipCode,
      state,
      street,
      town: city,
      country,
    };

    await employee.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// eslint-disable-next-line consistent-return
exports.totalEmployee = asyncHandler(async (req, res) => {
  try {
    const employees = await Contact.countDocuments({
      contactType: "employee",
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
});
// eslint-disable-next-line consistent-return
exports.activeEmployee = asyncHandler(async (req, res) => {
  try {
    const employees = await Contact.countDocuments({
      contactType: "employee",
      status: "active",
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
});
// eslint-disable-next-line consistent-return
exports.internshipEmployee = asyncHandler(async (req, res) => {
  try {
    const employees = await Contact.countDocuments({
      contactType: "employee",
      isInternship: true,
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
});
// eslint-disable-next-line consistent-return
exports.formerEmployee = asyncHandler(async (req, res) => {
  try {
    const employees = await Contact.countDocuments({
      contactType: "employee",
      isFormer: true,
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
});

// Desc Create New Position
// Route POST /employee-contact/position
// Access Public
exports.employeePosition = asyncHandler(async (req, res) => {
  const { position, color, category } = req.body;
  // eslint-disable-next-line no-shadow
  const employeePosition = new EmployeePosition({
    userId: req.user.id ? req.user.id : req.user._id,
    position,
    color,
    category,
  });

  // eslint-disable-next-line no-unused-vars
  employeePosition.save((error, success) => {
    if (error) {
      throw Error(error);
    } else {
      return res.status(201).json({
        success: "employee position created",
      });
    }
  });
});

// Get All Positions

exports.getEmployeePositions = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const employeePositions = await EmployeePosition.find({
      userId: user._id,
    }).populate("category");

    return res.status(200).send(employeePositions);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Get All employees

exports.getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const allEmployees = await Contact.find({ contactType: "employee" });
    return res.status(200).send(allEmployees);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Delete one Position

exports.deleteEmployeePosition = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeePosition.deleteOne({ _id: id });

    return res.status(200).json({
      success: "Position deleted successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Put Lead Position Data
exports.putEmployeePosition = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { position, category, color } = req.body;
    const filter = { _id: id };
    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        position,
        category,
        color,
      },
    };
    await EmployeePosition.updateOne(filter, updatedDoc, options);

    return res.status(200).json({
      success: "Position edited successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getForAddEvent = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const employeeTypeArr = await ContactType.find({ name: "Employee", userId: user._id });
    const employeeTypeIdArr = employeeTypeArr.map((item) => {
      return item._id;
    });
    const totalClients = await Contact.find({
      contactType: employeeTypeIdArr,
      isDelete: false,
      userId: user._id,
    }).select({ fullName: 1, email: 1, phone: 1 });
    return res.status(200).send(totalClients);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// **WorkHistory

exports.getWorkHistoryTimeLine = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  const histories = await WorkHistory.find({
    userId: employeeId,
    startTime: { $gte: currentDate },
  })
    .then((result) => {
      const historyResult = result.map((history) => {
        const { screenshots, ...newHistory } = history._doc;
        return newHistory;
      });
      res.json(historyResult);
    })
    .catch((e) => res.json(e));
});

exports.startWork = asyncHandler(async (req, res) => {
  const { userId, description } = req.body;
  const d = new Date();
  const newWorkHistory = new WorkHistory({
    userId: userId,
    startTime: d.toUTCString(),
    description,
  });
  newWorkHistory
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

exports.endWork = asyncHandler(async (req, res) => {
  const { historyId, userId, description } = req.body;
  const d = new Date();
  WorkHistory.findByIdAndUpdate(historyId, {
    endTime: d.toUTCString(),
  })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

exports.updateWork = asyncHandler(async (req, res) => {
  const { historyId, screenshot, screenshot_sm } = req.body;
  const oldHistory = await WorkHistory.findById(historyId);
  const d = new Date();
  if (oldHistory)
    WorkHistory.findByIdAndUpdate(historyId, {
      endTime: d.toUTCString(),
      screenshots: [
        ...oldHistory.screenshots,
        {
          trackTime: d.toUTCString(),
          screenshot: screenshot,
          screenshot_sm: screenshot_sm,
        },
      ],
    })
      .then((result) => res.json(result))
      .catch((err) => res.send(err));
});
exports.getScreenshotsByUserId = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const date = req.body.startPicker;
  const currentDate = new Date(date);
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  const endDate = new Date(date);
  endDate.setHours(24);

  WorkHistory.find(
    {
      userId: mongoose.Types.ObjectId(userId),
      startTime: { $gte: currentDate, $lt: endDate },
    },
    { screenshots: { screenshot: 0 } }
  ).then((result) => res.json({ data: result }));
});

exports.getScreenDetailImg = asyncHandler(async (req, res) => {
  const workId = req.body.workId;
  const screenId = req.body.screenId;

  WorkHistory.find({
    _id: mongoose.Types.ObjectId(workId),
  }).then((result) => {
    const Image = result[0].screenshots.find((item) => item._id == screenId);
    res.json({ data: Image.screenshot });
  });
});
exports.getOverview = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    const currentDate = new Date();
    const weekStartDate = new Date();
    weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    const dailyhistories = await WorkHistory.find({
      userId: mongoose.Types.ObjectId(employeeId),
      startTime: { $gte: currentDate },
    });

    const weeklyhistories = await WorkHistory.find({
      userId: mongoose.Types.ObjectId(employeeId),
      startTime: { $gte: weekStartDate },
    });
    const monthStartDate = new Date();
    monthStartDate.setDate(1);
    const monthlyhistories = await WorkHistory.find({
      userId: mongoose.Types.ObjectId(employeeId),
      startTime: { $gte: monthStartDate },
    });

    const totalhistories = await WorkHistory.find({
      userId: mongoose.Types.ObjectId(employeeId),
    }).sort({
      startTime: "asc",
    });
    let workDays = 0;
    if (totalhistories && totalhistories.length > 0) {
      workDays = Math.ceil(
        (new Date(totalhistories[totalhistories.length - 1].endTime) -
          new Date(totalhistories[0].startTime)) /
          (1000 * 60 * 60 * 24)
      );
    }

    let dailytotaltime = 0;
    let dailyStartTime = "";
    let dailyEndTime = "";
    if (dailyhistories) {
      dailyhistories.forEach((history) => {
        dailytotaltime += history.endTime - history.startTime;
      });
      dailyStartTime = dailyhistories[0].startTime;
      dailyEndTime = dailyhistories[dailyhistories.length - 1].endTime;
    } else {
      res.status(404);
    }

    let weeklytotaltime = 0;
    if (weeklyhistories) {
      weeklyhistories.forEach((history) => {
        weeklytotaltime += history.endTime - history.startTime;
      });
    } else {
      res.status(404);
    }

    let weeklyReport = Array(7).fill(0);

    weeklyhistories.forEach((history) => {
      const day = new Date(history.startTime).getDay();
      weeklyReport[day] += Math.ceil((history.endTime - history.startTime) / (1000 * 60));
    });

    let monthlytotaltime = 0;
    if (monthlyhistories) {
      monthlyhistories.forEach((history) => {
        monthlytotaltime += history.endTime - history.startTime;
      });
    } else {
      res.status(404);
    }

    res.json({
      dailyTime: Math.ceil(dailytotaltime / (1000 * 60)),
      weeklyTime: Math.ceil(weeklytotaltime / (1000 * 60)),
      monthlyTime: Math.ceil(monthlytotaltime / (1000 * 60)),
      workDays: workDays,
      weeklyReport,
      dailyStartTime,
      dailyEndTime,
    });
  } catch (e) {
    res.status(500);
  }
});

exports.getScreenshots = asyncHandler(async (req, res) => {
  try {
    const { historyId } = req.params;

    const oldHistory = await WorkHistory.findById(historyId);
    if (oldHistory) {
      res.json(oldHistory.screenshots);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.getAllWorkHistory = asyncHandler(async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id);

    let allClientWorkHistory = await Contact.aggregate([
      {
        $match: { contactType: "employee", userId: userId, isDelete: false },
      },
      {
        $lookup: {
          from: "workhistories",
          localField: "_id",
          foreignField: "userId",
          as: "history",
        },
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          // workType: 1,
          history: {
            _id: 1,
            startTime: 1,
            endTime: 1,
            description: 1,
          },
        },
      },
    ]);

    res.status(200).json({ allhistory: allClientWorkHistory });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.getContactsByTags = asyncHandler(async (req, res) => {
  try {
    const { tag } = req.body;

    const data = await Contact.find({ contactType: "employee", tags: { $in: tag } });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
