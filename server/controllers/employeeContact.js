/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { buildPagination } = require("../Utilities/buildPagination");
const generateTokens = require("../Utilities/generateToken");
const {
  WorkHistory,
  Roles,
  EmployeeShift,
  EmployeePosition,
  EmployeeContact,
} = require("../models/index/index");

const sgMail = require("@sendgrid/mail");
const { SendMail } = require("../service/sendMail");
const { socket_connections } = require("../service/socket-sender");
const {
  adminSockets,
  clientSockets,
  socket2adminId,
  socket2clientId,
} = require("../routes/socket");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { inviteWorkspaceMailTemplate } = require("../constants/emailTemplates");
// const { anyUploader, imageUpload } = require("../lib/upload");

// Hash Password
const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const deleteContact = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const contact = await EmployeeContact.findById(_id);
  if (!contact) {
    throw Error("Contact not found !");
  }
  contact.isDelete = true;
  await contact.save();
  res.send({});
});

const contactList = asyncHandler(async (req, res) => {
  try {
    // eslint-disable-next-line prefer-const
    let { pageSize, page, position, type, status, sortKey, sortType, text, tags, leadSource } =
      req.query;

    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    const skip = (page - 1) * pageSize;
    // const { user } = req;

    let sort = 1;
    if (sortType === "desc") {
      sort = -1;
    }

    let query = {
      userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id),
      isDelete: false,
    };

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

    const employeeContact = await EmployeeContact.aggregate([
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
        $lookup: {
          from: "employee-positions",
          localField: "position",
          foreignField: "_id",
          as: "position",
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

const contactAdd = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    address,
    city,
    workType,
    role,
    email,
    phone,
    position,
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
    const checkExist = await EmployeeContact.findOne({
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
        const asynGenerateToken = async () => {
          const { accessToken, refreshToken } = await generateTokens({
            _id: newEmployeeContact._id,
          });
        };
        asynGenerateToken();

        if (willSendEmail) {
          SendMail({
            recipient: email,
            from: `admin@mymanager.com`,
            replyTo: `admin@mymanager.com`,
            body: inviteWorkspaceMailTemplate(fullName, req.user, newEmployeeContact._id),
          });
        } else {
          // console.log("just add, not sending email");
        }

        return res.status(201).json({
          success: "Client contact created successfully",
        });
      }
    });
  });
});

const contactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  EmployeeContact.findOne({ _id: id, isDelete: false })
    .populate("role")
    .exec((err, data) => {
      if (err) {
        throw Error("Contact not Found");
      } else {
        res.status(200).json(data);
      }
    });
});

const updateContact = asyncHandler(async (req, res) => {
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

  const contact = await EmployeeContact.findById(_id);
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

const saveContactToMap = asyncHandler(async (req, res) => {
  const empIdArr = req.body;
  for (let i = 0; i < empIdArr.length; i++) {
    const contact = await EmployeeContact.findById(empIdArr[i]);
    if (!contact) throw Error("Contact not Found");
    contact.isAddCalendar = true;
    await contact.save();
  }
  return res.json({});
});
// Send Email
const sendRegisterEmail = asyncHandler(async (req, res) => {
  const { id, sendType } = req.body;
  const contact = await EmployeeContact.findById(id);

  if (sendType == "email") {
    SendMail({
      recipient: req.body.email,
      from: `admin@mymanager.com`,
      replyTo: `admin@mymanager.com`,
      body: inviteWorkspaceMailTemplate(contact.fullName, req.user, id),
    });
  }
});

// ** Register Contact
const updateContactRegister = asyncHandler(async (req, res) => {
  const { id, email, password, roleId, assignedProject, sendType, punchId } = req.body;

  let hashedPassword = "";

  if (password) {
    hashedPassword = (await hashPass(password)).toString();
  }

  const contact = await EmployeeContact.findById(id);

  if (!contact) throw Error("Contact not Found");

  contact.email = email;
  contact.hashed_password = hashedPassword;
  contact.punchId = punchId;
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
          body: inviteWorkspaceMailTemplate(contact.fullName, req.user, id),
        });
      }
    }
  });
});

// eslint-disable-next-line consistent-return
const uploadAvatar = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const employee = await EmployeeContact.findById(id);
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

const updateSocialLink = asyncHandler(async (req, res) => {
  try {
    const { id, links } = req.body;

    const employee = await EmployeeContact.findById(id);
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
const rankAddOrUpdate = asyncHandler(async (req, res) => {
  try {
    const {
      createdAt,
      name,
      // photo,
      _id,
      id,
    } = req.body;
    const employee = await EmployeeContact.findById(id);
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
const deleteRank = asyncHandler(async (req, res) => {
  try {
    const { _id, employeeId } = req.body;

    const employee = await EmployeeContact.findById(employeeId);
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
const fileAddAndUpdate = asyncHandler(async (req, res) => {
  try {
    const {
      _id,
      employeeId,
      // createdAt,
      name,
    } = req.body;
    const employee = await EmployeeContact.findById(employeeId);
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
const deleteFile = asyncHandler(async (req, res) => {
  try {
    const { _id, employeeId } = req.body;
    const employee = await EmployeeContact.findById(employeeId);
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
const updateBillingAddress = asyncHandler(async (req, res) => {
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

    const employee = await EmployeeContact.findById(employeeId);
    if (!employee) {
      return res.status(404).send("ID not found ");
    }

    employee.billingAddress = {
      email,
      phone,
      taxId,
      vatNo,
      addressLineOne,
      addressLineTwo,
      zipCode,
      state,
      street,
      city,
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
async function totalEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function activeEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      status: "active",
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function internshipEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      isInternship: true,
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function formerEmployee(req, res) {
  try {
    const employees = await EmployeeContact.countDocuments({
      isFormer: true,
      userId: req.user._id,
      isDelete: false,
    });
    // eslint-disable-next-line prefer-template
    res.send(employees + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}

// Import Contacts
const importContactsFromArray = async (req, res) => {
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
    }));

    await EmployeeContact.insertMany(formatedData);

    return res.status(200).send("Imported");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Desc Create New Position
// Route POST /employee-contact/position
// Access Public
const employeePosition = asyncHandler(async (req, res) => {
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

const getEmployeePositions = asyncHandler(async (req, res) => {
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

const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const allEmployees = await EmployeeContact.find();
    return res.status(200).send(allEmployees);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Delete one Position

const deleteEmployeePosition = asyncHandler(async (req, res) => {
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
const putEmployeePosition = asyncHandler(async (req, res) => {
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

const getForAddEvent = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const totalClients = await EmployeeContact.find({
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

const getWorkHistoryTimeLine = asyncHandler(async (req, res) => {
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

const startWork = asyncHandler(async (req, res) => {
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

const endWork = asyncHandler(async (req, res) => {
  const { historyId, userId, description } = req.body;
  const d = new Date();
  WorkHistory.findByIdAndUpdate(historyId, {
    endTime: d.toUTCString(),
  })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

const updateWork = asyncHandler(async (req, res) => {
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
const getScreenshotsByUserId = asyncHandler(async (req, res) => {
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

const getScreenDetailImg = asyncHandler(async (req, res) => {
  const workId = req.body.workId;
  const screenId = req.body.screenId;

  WorkHistory.find({
    _id: mongoose.Types.ObjectId(workId),
  }).then((result) => {
    const Image = result[0].screenshots.find((item) => item._id == screenId);
    res.json({ data: Image.screenshot });
  });
});
const getOverview = asyncHandler(async (req, res) => {
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

const getScreenshots = asyncHandler(async (req, res) => {
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

const getAllWorkHistory = asyncHandler(async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id);

    let allClientWorkHistory = await EmployeeContact.aggregate([
      {
        $match: { userId: userId, isDelete: false },
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

const getContactsByTags = asyncHandler(async (req, res) => {
  try {
    const { tag } = req.body;

    const data = await EmployeeContact.find({ tags: { $in: tag } });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

module.exports = {
  contactList,
  contactAdd,
  contactById,
  updateContact,
  sendRegisterEmail,
  saveContactToMap,
  updateContactRegister,
  uploadAvatar,
  updateSocialLink,
  rankAddOrUpdate,
  deleteRank,
  fileAddAndUpdate,
  deleteFile,
  updateBillingAddress,
  totalEmployee,
  activeEmployee,
  internshipEmployee,
  formerEmployee,
  deleteContact,
  importContactsFromArray,
  employeePosition,
  getEmployeePositions,
  getAllEmployees,
  deleteEmployeePosition,
  putEmployeePosition,
  getForAddEvent,
  //WorkHistory
  getWorkHistoryTimeLine,
  startWork,
  endWork,
  updateWork,
  getOverview,
  getScreenshots,
  getAllWorkHistory,
  getScreenshotsByUserId,
  getScreenDetailImg,
  getContactsByTags,
};
