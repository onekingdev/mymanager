const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");

const { Contact, ContactType, Organization, User } = require("../models/index/index");

const { buildPagination } = require("../Utilities/buildPagination");

exports.updateContactShift = asyncHandler(async (req, res) => {
  try {
    const { _id, shiftId, isShiftRemove, position } = req.body;

    const contact = await Contact.findById(_id);
    if (position) {
      if (position == "unassigned") {
        contact.employee_position = {};
      } else {
        contact.employee_position = position;
      }
    }
    let tmp = [];
    if (isShiftRemove) {
      if (contact.shift.length > 0) {
        contact.shift.map((item) => {
          if (item != shiftId) {
            tmp.push(item);
          } else return;
        });
      } else return;
    } else {
      if (contact.shift.length > 0 && contact.shift.find((item) => item.toString() == shiftId)) {
        return;
      } else {
        tmp = [...contact.shift];
        tmp.push(mongoose.Types.ObjectId(shiftId));
      }
    }
    contact.shift = tmp;
    await contact.save((err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment created successfully", success: true, data });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.contactList = asyncHandler(async (req, res) => {
  try {
    // eslint-disable-next-line prefer-const
    let { pageSize, page, position, type, status, sortKey, sortType, text, tags, leadSource } =
      req.query;
    const { user } = req;

    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    const skip = (page - 1) * pageSize;

    const employeeTypeArr = await ContactType.find({ name: "Employee", userId: user._id });
    const employeeTypeIdArr = employeeTypeArr.map((item) => {
      return item._id;
    });

    let sort = 1;
    if (sortType === "desc") {
      sort = -1;
    }

    let query = {
      userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id),
      isDelete: false,
    };

    query = {
      ...query,
      contactType: {
        $elemMatch: {
          $in: employeeTypeIdArr,
        },
      },
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
        $lookup: {
          from: "employee-positions",
          localField: "employee_position",
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
