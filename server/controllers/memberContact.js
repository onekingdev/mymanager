/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { buildPagination } = require("../Utilities/buildPagination");
const MemberContact = require("../models/Member");
const generateTokens = require("../Utilities/generateToken");

const sgMail = require("@sendgrid/mail");
const { SendMail } = require("../service/sendMail");
const MemberPosition = require("../models/MemberPosition");
const Tag = require("../models/Tag");
const EmployeeContact = require("../models/EmployeeContact");
const { memberInviteMailTemplate } = require("../constants/emailTemplates");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Hash Password
const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const deleteContact = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const contact = await MemberContact.findById(_id);
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

    if (!req.user) {
      throw Error("user not Found !");
    }

    let query = {
      userId: req.user.id ? req.user.id : req.user._id,
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
    if (leadSource && leadSource !== null && leadSource !== undefined) {
      query = {
        ...query,
        leadSource,
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
    const memberContact = await MemberContact.aggregate([
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
    const data = buildPagination(memberContact);
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
  // if (phone !== "") {
  //   const checkExist = await MemberContact.findOne({
  //     phone,
  //     isDelete: false,
  //   });
  //   if (checkExist) {
  //     throw Error("Phone number already Exist");
  //   }
  // }

  // Check Email exist or not
  if (email !== "") {
    const checkExist = await MemberContact.findOne({
      email,
    });
    if (checkExist) {
      throw Error("Email already Exist");
    }
  }
  // validation
  if (!fullName || fullName === "") {
    throw Error("Full name must not empty !");
  }

  MemberContact.findOne({ email }).exec((err, member) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (member) {
      return res.status(409).json({
        errors: {
          common: { msg: "Email or Phone Number Already Taken" },
        },
      });
    }
    const newMemberContact = new MemberContact({
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
      tags,
      leadSource,
    });

    newMemberContact.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      if (success) {
        const asynGenerateToken = async () => {
          const { accessToken, refreshToken } = await generateTokens({
            _id: newMemberContact._id,
          });
        };
        asynGenerateToken();

        if (willSendEmail) {
          SendMail({
            recipient: email,
            from: `admin@mymanager.com`,
            replyTo: `admin@mymanager.com`,
            body: memberInviteMailTemplate(fullName, req.user, newMemberContact._id),
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

const contactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  MemberContact.findOne(
    { _id: id },
    // eslint-disable-next-line consistent-return
    (err, contact) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }

      res.status(200).json(contact);
    }
  );
});

const updateContact = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const { user } = req;
  const {
    fullName,
    email,
    phone,
    // photo,
    gender,
    address,
    status,
    note,
    tags,
    dob,
    type,
    salary,
    isFormer,
    isinternship,
    leadSource,
  } = req.body;

  const { id } = req.params;

  const contact = await MemberContact.findById(id);
  if (!contact) throw Error("Contact not Found");

  contact.fullName = fullName || "";
  contact.email = email || "";
  contact.phone = phone || "";
  contact.gender = gender || "";
  contact.address = address || "";
  contact.status = status || "";
  contact.note = note || "";
  contact.tags = tags || "";
  contact.dob = dob || "";
  contact.type = type || "";
  contact.salary = salary || 0;
  contact.isFormer = isFormer || contact.isFormer;
  contact.isinternship = isinternship || contact.isinternship;
  contact.leadSource = leadSource || contact.leadSource;
  await contact.save();
  return res.json({});
});

// Contact Register & Give Permission
const updateContactRegister = asyncHandler(async (req, res) => {
  const { id, email, password, roleId, assignedProject, sendType } = req.body;
  let hashedPassword = "";

  if (password) {
    hashedPassword = (await hashPass(password)).toString();
  }

  const contact = await MemberContact.findById(id);

  if (!contact) throw Error("Contact not Found");

  contact.email = email;
  contact.hashed_password = hashedPassword;
  contact.role = roleId;

  await contact.save((err, success) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }

    if (success) {
      const asynGenerateToken = async () => {
        const userInfo = {
          type: "member",
          memberId: id,
        };

        const { accessToken, refreshToken } = await generateTokens({
          _id: contact.userId,
          user: userInfo,
        });
        return res.json({
          memberData: {
            id: id,
            userId: contact.userId,
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
          body: memberInviteMailTemplate(contact.fullName, req.user, id),
        });
      }
    }
  });
});

// eslint-disable-next-line consistent-return
const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.body;

    const member = await MemberContact.findById(id);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    member.photo = req.file.location;
    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const updateSocialLink = async (req, res) => {
  try {
    const { id, links } = req.body;

    const member = await MemberContact.findById(id);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    const { socialLinks } = member;
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

    member.socialLinks = newLinks;
    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Rnak add Or Update
const rankAddOrUpdate = async (req, res) => {
  try {
    const {
      createdAt,
      name,
      // photo,
      _id,
      id,
    } = req.body;
    const member = await MemberContact.findById(id);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    if (_id === "") {
      // Add
      member.ranks.push({
        createdAt,
        name,
        photo: req.file.location,
      });
    } else {
      // update
      member.ranks = member.ranks.map((x) => {
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

    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
// Rnak Delete
const deleteRank = async (req, res) => {
  try {
    const { _id, memberId } = req.body;

    const member = await MemberContact.findById(memberId);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    member.ranks = member.ranks.filter((x) => String(x._id) !== String(_id));

    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// File Add
// eslint-disable-next-line consistent-return
const fileAddAndUpdate = async (req, res) => {
  try {
    const {
      _id,
      memberId,
      // createdAt,
      name,
    } = req.body;
    const member = await MemberContact.findById(memberId);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    if (_id === "") {
      // Add
      member.files.push({
        title: name,
        file: req.file.location,
        createdAt: Date.now(),
      });
    }
    // eslint-disable-next-line no-lone-blocks
    {
      member.files = member.files.map((x) => {
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

    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// File Add
// eslint-disable-next-line consistent-return
const deleteFile = async (req, res) => {
  try {
    const { _id, memberId } = req.body;
    const member = await MemberContact.findById(memberId);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    member.files = member.files.filter((x) => String(x._id) !== String(_id));

    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Update ===== >  Billing
const updateBillingAddress = async (req, res) => {
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
      memberId,
    } = req.body;

    const member = await MemberContact.findById(memberId);
    if (!member) {
      return res.status(404).send("ID not found ");
    }

    member.billingAddress = {
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

    await member.save();
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// eslint-disable-next-line consistent-return
async function totalMember(req, res) {
  try {
    const members = await MemberContact.countDocuments({
      userId: req.user._id,
    });
    // eslint-disable-next-line prefer-template
    res.send(members + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}

// eslint-disable-next-line consistent-return
async function activeMember(req, res) {
  try {
    const members = await MemberContact.countDocuments({
      status: "active",
      userId: req.user._id,
    });
    // eslint-disable-next-line prefer-template
    res.send(members + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function internshipMember(req, res) {
  try {
    const members = await MemberContact.countDocuments({
      isInternship: true,
      userId: req.user._id,
    });
    // eslint-disable-next-line prefer-template
    res.send(members + "");
  } catch (error) {
    return res.status(404).send("data not found");
  }
}
// eslint-disable-next-line consistent-return
async function formerMember(req, res) {
  try {
    const members = await MemberContact.countDocuments({
      isFormer: true,
      userId: req.user._id,
    });
    // eslint-disable-next-line prefer-template
    res.send(members + "");
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

    await MemberContact.insertMany(formatedData);

    return res.status(200).send("Imported");
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Get All Positions

const getMemberPositions = async (req, res) => {
  try {
    const { user } = req;
    const memberPositions = await MemberPosition.find({
      userId: user._id,
    });

    return res.status(200).send(memberPositions);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Get All members

const getAllMembers = async (req, res) => {
  try {
    const allMembers = await MemberContact.find();
    return res.status(200).send(allMembers);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Delete one Position

const deleteMemberPosition = async (req, res) => {
  try {
    const { id } = req.params;
    await MemberPosition.deleteOne({ _id: id });

    return res.status(200).json({
      success: "Position deleted successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const getForAddEvent = async (req, res) => {
  try {
    const { user } = req;
    const totalClients = await MemberContact.find({
      userId: user._id,
    }).select({ fullName: 1, email: 1, phone: 1 });
    return res.status(200).send(totalClients);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const getContactsByTags = async (req, res) => {
  try {
    const { tag } = req.body;

    const data = await MemberContact.find({ tags: { $in: tag } });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const checkMember = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const existedEmployee = await Contact.findById(employeeId);
    existedEmployee.punchState = true;
    await existedEmployee.save();
    return res.status(201).json({ msg: "Checked successfully", success: true });
  } catch (err) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
};

module.exports = {
  contactList,
  contactAdd,
  contactById,
  updateContact,
  updateContactRegister,
  uploadAvatar,
  updateSocialLink,
  rankAddOrUpdate,
  deleteRank,
  fileAddAndUpdate,
  deleteFile,
  updateBillingAddress,
  totalMember,
  activeMember,
  internshipMember,
  formerMember,
  deleteContact,
  importContactsFromArray,
  getMemberPositions,
  getAllMembers,
  deleteMemberPosition,
  getForAddEvent,
  getContactsByTags,
  checkMember,
};
