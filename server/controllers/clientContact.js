const { default: mongoose } = require("mongoose");
const {
  ClientContact,
  Authenticate,
  Automation,
  ClientPosition,
} = require("../models/index/index");
// const ClientPositionSchema = require("./../models/LeadPosition");
const { parse } = require("csv-parse");
const assert = require("assert");
const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
// const  = require('./../lib/upload');
const { anyUploader, imageUpload } = require("./../lib/upload");
const { buildPagination } = require("../Utilities/buildPagination");
const asyncHandler = require("express-async-handler");
const TextMessages = require("../models/TextMessages");

exports.newClientContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, type, company, position, tags, leadSource } = req.body;
  // Check Email exist or not
  if (email !== "") {
    const checkExist = await ClientContact.findOne({ email });
    if (checkExist) {
      throw Error("Email already Exists");
    }
  }

  const clientContact = new ClientContact({
    fullName,
    email,
    phone,
    type,
    company,
    position,
    userId: req.user._id,
    tags,
    leadSource,
  });

  clientContact.save(async (err, success) => {
    if (err) {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
    } else {
      const findUponAutomation = await Automation.find({
        $and: [
          { "contactInfo.contactType": "Contacts" },
          { "contactInfo.contacts": { $in: ["Clients"] } },
          { "contactInfo.tags": { $in: tags } },
          { "contactInfo.leadSources": { $in: [leadSource] } },
          { "activationUpon.uponType": "Upon Entry" },
        ],
      });

      const calculateTime = (startTime, actionDelay) => {
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
        switch (actionDelay.unit) {
          case "minutes":
            startActionTime = startActionTime + 60 * actionDelay.time;
            break;
          case "hours":
            startActionTime = startActionTime + 60 * 60 * actionDelay.time;
            break;
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
        return startAutomationTime + startActionTime;
      };
      if (findUponAutomation.length > 0) {
        findUponAutomation.map((automation) => {
          const startTime = automation.activateTime;
          const firstAction = automation.actions.find((action) => action.parentId == "0");

          const actionProcess = () => {
            const nextAction = automation.actions.find(
              (action) => action.parentId == firstAction.id
            );
            let nextActionDelay = 0;
            switch (nextAction.duration.unit) {
              case "minutes":
                nextActionDelay = nextActionDelay + 60 * nextAction.duration.time;
                break;
              case "hours":
                nextActionDelay = nextActionDelay + 60 * 60 * nextAction.duration.time;
                break;
              case "days":
                nextActionDelay = nextActionDelay + 60 * 60 * 24 * nextAction.duration.time;
                break;
              case "weeks":
                nextActionDelay = nextActionDelay + 60 * 60 * 24 * 7 * nextAction.duration.time;
                break;
              case "months":
                nextActionDelay = nextActionDelay + 60 * 60 * 24 * 30 * nextAction.duration.time;
                break;
              default:
                break;
            }
            let _currentDate = new Date();
            let _currentSecond = _currentDate.getTime() / 1000;
            console.log(_currentSecond + nextActionDelay);
            success.automation.push({
              automationId: automation._id,
              currentActionId: nextAction.id,
              fireTime: _currentSecond + nextActionDelay,
            });
            success.save().then(console.log("success"));
          };
          const startEvent = () => {
            let currentDate = new Date();
            let currentSecond = currentDate.getTime() / 1000;
            switch (firstAction.actionType) {
              case "email":
                console.log("email to", success);
                actionProcess();
                break;
            }
            console.log("this is first action", firstAction);
          };
          const fireTime = calculateTime(startTime, firstAction.duration);
          console.log("this is fire time", fireTime);
          setTimeout(startEvent, fireTime * 1000);
        });
      }

      // console.log(findUponAutomation)

      return res.status(201).json({
        success: "Client contact created successfull",
      });
    }
  });

  /* const { fullName, email, phone, type, company, position } = req.body;

  const clientContact = new ClientContact({
    fullName,
    email,
    phone,
    type,
    company,
    position,
    userId: req.user._id,
  });

  ClientContact.findOne({ email: email }, (err, email) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (email) {
      return res.status(404).json({
        errors: { common: { msg: "Please provide a valid email" } },
      });
    }

    // return

    else {
      clientContact.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          return res.status(201).json({
            success: "Client contact created successfull",
          });
        }
      });
    }

  }); */
});

exports.updateClientContact = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    type,
    company,
    position,
    userId,
    note,
    address,
    companyAddress,
    status,
    gender,
    dob,
    tags,
    socialLinks,
    companyEmail,
    companyPhone,
    leadSource,
    isFormer,
  } = req.body;

  const { id } = req.params;

  ClientContact.findOne({ _id: id, isDelete: false }, (err, client) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
    if (!client) {
      return res.status(404).json({
        errors: { common: { msg: "No client data found" } },
      });
    } else {
      if (userId) {
        Authenticate.findById(userId, (err, user) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
          if (!user) {
            return res.status(404).json({
              errors: { common: { msg: "No user data found" } },
            });
          }
        });
      }

      client.fullName = fullName ? fullName : client.fullName;
      client.email = email ? email : client.email;
      client.phone = phone ? phone : client.phone;
      client.type = type ? type : client.type;
      client.company = company ? company : client.company;
      client.position = position ? position : client.position;
      client.userId = userId ? userId : client.userId;
      client.note = note ? note : client.note;
      client.address = address ? address : client.address;
      client.status = status ? status : client.status;
      client.gender = gender ? gender : client.gender;
      client.leadSource = leadSource ? leadSource : client.leadSource;
      client.isFormer = isFormer ? isFormer : client.isFormer;
      client.dob = dob ? dob : client.dob;
      client.tags = tags ? tags : client.tags;
      client.companyEmail = companyEmail ? companyEmail : client.companyEmail;
      client.companyPhone = companyPhone ? companyPhone : client.companyPhone;
      client.socialLinks = socialLinks ? socialLinks : client.socialLinks;
      client.companyAddress = companyAddress ? companyAddress : client.companyAddress;

      client.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          return res.status(200).json(client);
        }
      });
    }
  });
});

// ---------------------- remove or delete -------------------------

exports.deleteClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ClientContact.findOne({ _id: id, isDelete: false }, (err, client) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
    if (client) {
      client.isDelete = true;
      client.save((err, success) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        } else {
          return res.status(200).json({
            success: "Client deleted successfull",
          });
        }
      });
    }
  });
});

exports.getClientContacts = asyncHandler(async (req, res) => {
  try {
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
          isDelete: false,
          isFormer: true,
        };
      } else {
        query = {
          userId: mongoose.Types.ObjectId(user._id),
          isDelete: false,
          isFormer: false,
        };
      }
    } else {
      query = {
        userId: mongoose.Types.ObjectId(user._id),
        isDelete: false,
      };
    }

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

    if (text !== "") {
      let regex = new RegExp(text, "i");
      query = {
        ...query,
        $or: [{ fullName: regex }],
      };
    }

    if (tags) {
      query = {
        ...query,
        tags: { $in: [tags] },
      };
    }
    if (leadSource && leadSource !== null && leadSource !== undefined) {
      query = {
        ...query,
        leadSource,
      };
    }

    const clientContacts = await ClientContact.aggregate([
      {
        $match: query,
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

    const chatMessagePromises = clientContacts[0].data.map((element) => {
      return TextMessages.find({ uid: element._id }).sort({ createdAt: -1 }).limit(1);
    });

    const lastMessages = await Promise.all(chatMessagePromises);

    clientContacts[0].data.forEach((element, index) => {
      clientContacts[0].data[index].lastMessage = lastMessages[index][0];
    });

    for (let i = 0; i < clientContacts[0].data.length; i++) {
      let unReadMeassges = await TextMessages.find({
        uid: clientContacts[0].data[i]._id,
        isRead: false,
      });
      clientContacts[0].data[i].unReadMessages = unReadMeassges.length;
    }

    clientContacts[0].data.sort(
      (first, second) => second?.lastMessage?.createdAt - first?.lastMessage?.createdAt
    );

    const data = buildPagination(clientContacts);
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  ClientContact.findOne({ _id: id, isDelete: false, userId: user._id }, (err, clientContact) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    res.status(200).json(clientContact);
  });
});

// Get All Clients

exports.getTotalClients = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const totalClients = await ClientContact.find({
      isDelete: false,
      userId: user._id,
    });

    return res.status(200).send(totalClients);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getTotalClientsCount = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const totalClientsCount = await ClientContact.find({
      isDelete: false,
      userId: user._id,
    }).countDocuments();

    return res.status(200).send(totalClientsCount + "");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getPastDueClient = asyncHandler(async (req, res) => {
  try {
    let pastDueClients = 0;
    return res.status(200).send(pastDueClients + "");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getActiveClients = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const totalActiveClients = await ClientContact.find({
      status: "active",
      userId: user._id,
      isDelete: false,
    }).countDocuments();

    return res.status(200).send(totalActiveClients + "");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getFormerClients = asyncHandler(async (req, res) => {
  try {
    const { user } = req;

    const formerClients = await ClientContact.find({
      isFormer: true,
      userId: user._id,
      isDelete: false,
    }).countDocuments();

    return res.status(200).send(formerClients + "");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.addNewRank = asyncHandler(async (req, res) => {
  try {
    const { name, clientId } = req.body;

    const client = await ClientContact.findOne({
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

exports.editNewRank = asyncHandler(async (req, res) => {
  try {
    const { name, clientId, _id, createdAt } = req.body;

    const client = await ClientContact.findOne({
      _id: clientId,
      isDelete: false,
    });

    if (!client) {
      return res.status(500).json({
        errors: { common: { msg: "No client data found" } },
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

exports.removeRank = asyncHandler(async (req, res) => {
  try {
    const { clientId, rankId } = req.body;

    let client = await ClientContact.findOne({
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

    await ClientContact.insertMany(formatedData);

    return res.status(200).send("Imported");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getTags = asyncHandler(async (req, res) => {
  try {
    const tags = await ClientContact.aggregate([
      {
        $match: {
          isDelete: false,
          userId: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project: {
          tags: "$tags",
        },
      },
    ]);

    let result = [];
    if (tags.length > 0) {
      tags.map((tag) => {
        if (tag.tags.length > 0) {
          tag.tags.map((t) => {
            if (!result.includes(t)) {
              result.push(t);
            }
          });
        }
      });
    }

    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.uploadAvatar = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.file.location) {
      return res.status(404).send("file not found ");
    }

    const client = await ClientContact.findById(id);
    if (!client) {
      return res.status(404).send("ID not found ");
    }

    // const data = await imageUpload(req, res);
    client.photo = req.file.location;
    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.filesUpload = asyncHandler(async (req, res) => {
  try {
    const { title, clientId } = req.body;

    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    client.files.push({
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

exports.addNewOther = asyncHandler(async (req, res) => {
  try {
    const { address, phone, startDate, endDate, clientId } = req.body;

    const client = await ClientContact.findOne({
      _id: clientId,
      isDelete: false,
    });

    if (!client) {
      return res.status(500).json({
        errors: { common: { msg: "No client data found" } },
      });
    }

    client.others.push({
      address,
      phone,
      startDate,
      endDate,
      file: req.file.location,
    });

    await client.save();

    return res.status(200).send({ success: "Other added successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.editOther = asyncHandler(async (req, res) => {
  try {
    const { clientId, _id, address, phone, startDate, endDate } = req.body;

    const client = await ClientContact.findOne({
      _id: clientId,
      isDelete: false,
    });

    if (!client) {
      return res.status(500).json({
        errors: { common: { msg: "No client data found" } },
      });
    }

    const updatedOther =
      client.others.length > 0 &&
      client.others.map((other) => {
        if (String(other._id) == _id) {
          other.address = address ? address : other.address;
          other.phone = phone ? phone : other.phone;
          other.startDate = startDate ? startDate : other.startDate;
          other.endDate = endDate ? endDate : other.endDate;
        }
        return other;
      });

    client.others = updatedOther ? updatedOther : [];
    await client.save();

    return res.status(200).send({ success: "Other updated successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.removeOther = asyncHandler(async (req, res) => {
  try {
    const { clientId, _id } = req.body;

    let client = await ClientContact.findOne({
      _id: clientId,
      isDelete: false,
    });

    const newOther = client.others.filter((r) => String(r._id) != _id);
    client.others = newOther;
    client.save();

    return res.status(200).send({ success: "Other removed successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.DeleteUploadedFile = asyncHandler(async (req, res) => {
  try {
    const { id, clientId } = req.body;
    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    client.files = client.files.filter((x) => String(x._id) !== String(id));
    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.addPaymentMethod = asyncHandler(async (req, res) => {
  try {
    const { cardType, isPrimary, cardHolder, cardNumber, expiryDate, cvv, clientId } = req.body;
    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    client.paymentMethods.push({
      cardType,
      isPrimary,
      cardHolder,
      cardNumber,
      expiryDate,
      cvv,
    });
    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deletePaymentMethod = asyncHandler(async (req, res) => {
  try {
    const { id, clientId } = req.body;
    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    let filteredMethods = client.paymentMethods.filter((x) => String(x._id) !== String(id));
    client.paymentMethods = filteredMethods;
    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

function GetCardType(number) {
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null) return "Visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return "Mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) return "AMEX";

  // Discover
  re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if (number.match(re) != null) return "Discover";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null) return "Diners";

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null) return "Diners - Carte Blanche";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null) return "JCB";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null) return "Visa Electron";

  return "";
}

exports.updatePaymentMethod = asyncHandler(async (req, res) => {
  try {
    const { _id, cardType, isPrimary, cardHolder, cardNumber, expiryDate, cvv, clientId } =
      req.body;

    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }
    let updatedMethods = client.paymentMethods.map((x) => {
      if (String(x._id) === String(_id)) {
        x.cardType = cardType;
        x.isPrimary = isPrimary;
        x.cardHolder = cardHolder;
        x.cardNumber = cardNumber;
        x.expiryDate = expiryDate;
        x.cvv = cvv;
      }

      return x;
    });
    client.paymentMethods = updatedMethods;
    await client.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateBillingInfo = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      addressLineOne,
      addressLineTwo,
      town,
      zipCode,
      state,
      clientId,
    } = req.body;

    const client = await ClientContact.findById(clientId);
    if (!client) {
      return res.status(404).send("Client not found ");
    }

    if (isNaN(zipCode)) {
      return res.status(400).json({ common: { message: "Zip code must be a numeric value" } });
    }

    client.billingAddress = {
      firstName: firstName ? firstName : client.billingAddress.firstName,
      lastName: lastName ? lastName : client.billingAddress.lastName,
      country: country ? country : client.billingAddress.country,
      addressLineOne: addressLineOne ? addressLineOne : client.billingAddress.addressLineOne,
      addressLineTwo: addressLineTwo ? addressLineTwo : client.billingAddress.addressLineTwo,
      town: town ? town : client.billingAddress.town,
      zipCode: zipCode ? zipCode : client.billingAddress.zipCode,
      state: state ? state : client.billingAddress.state,
    };

    await client.save();

    res.status(200).json({ message: "Billing address updated successfull" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Create New Position

exports.clientPosition = asyncHandler(async (req, res) => {
  const { position } = req.body;

  const newClientPosition = new ClientPosition({
    userId: req.user.id ? req.user.id : req.user._id,
    position,
  });

  newClientPosition.save((err, success) => {
    if (err) {
      if (err) {
        throw Error(err);
      }
    } else {
      return res.status(201).json({
        success: "Client contact created successfull",
      });
    }
  });
});

// Get All Client Positions

exports.getClientPositions = asyncHandler(async (req, res) => {
  try {
    const { user } = req;

    /* const clientPositions = await ClientPosition.find({
      userId: user._id,
      isDelete: false
    }); */
    const clientPositions = await ClientPosition.find({
      userId: user._id,
    });

    return res.status(200).send(clientPositions);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Delete one Client Position

exports.deleteClientPosition = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await ClientPosition.deleteOne({ _id: id });

    return res.status(200).json({
      success: "Position deleted successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Put Client Position Data
exports.putClientPosition = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { position } = req.body;
    const filter = { _id: id };
    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        position: position,
      },
    };
    await ClientPosition.updateOne(filter, updatedDoc, options);

    return res.status(200).json({
      success: "Position edited successfull",
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
    const totalClients = await ClientContact.find({
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

exports.getContactsByTags = asyncHandler(async (req, res) => {
  try {
    const { tag } = req.body;

    const data = await ClientContact.find({ tags: { $in: tag } });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
