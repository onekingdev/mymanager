const { Booking, BookingType, Authenticate, User } = require("../models/index/index");
const mongoose = require("mongoose");
const { buildPagination } = require("../Utilities/buildPagination");
const asyncHandler = require("express-async-handler");
const { bookingMailTemplate } = require("../constants/emailTemplates");

var moment = require("moment");
const { SendMail } = require("../service/sendMail");
function generateLink(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function convertDateTimezone(date, timezone) {
  var diff = 0;
  if (timezone) {
    let originDate = new Date(
      date.toLocaleString("en-US", {
        timeZone: timezone,
      })
    );
    diff = originDate.getTime() - date.getTime();
  }
  let originDate = new Date(date.getTime() + diff);
  return originDate;
}

function convertDate(date, timezone) {
  return moment(convertDateTimezone(new Date(date), timezone)).format("LL");
}

function sendBookingMail(bookingInfo, bookingType, user) {
  SendMail({
    recipient: bookingInfo.email,
    from: `admin@mymanager.com`,
    replyTo: `admin@mymanager.com`,
    subject: `New Event: ${user.fullName} - ${convertDate(
      bookingInfo.startDate,
      bookingInfo.timezone
    )} - ${bookingType.title}`,
    body: bookingMailTemplate(bookingType, bookingInfo, user),
  });
}

exports.createBooking = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    let bookingData = req.body;
    const { user } = req;
    const bookingType = await BookingType.findById(
      mongoose.Types.ObjectId(bookingData.bookingType)
    );
    bookingData = {
      ...bookingData,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: user
        ? organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType
        : "customer",
      user: bookingType.userId,
    };
    const userDetails = await User.findOne({ userId: bookingType.userId }).populate({
      path: "userId",
      model: Authenticate,
    });
    sendBookingMail(bookingData, bookingType, {
      fullName: userDetails.fullName,
      email: userDetails.userId.email,
    });
    const newBooking = await Booking.create(bookingData);
    return res.send({ msg: "booking created successfully", success: true, data: newBooking });
  } catch (err) {
    return res.send({ msg: err.message, success: false });
  }
});

exports.updateBooking = asyncHandler(async (req, res) => {
  try {
    let bookingData = req.body;
    const bookingId = req.params.id;

    const bookingType = await BookingType.findById(
      mongoose.Types.ObjectId(bookingData.bookingType)
    );
    bookingData.user = bookingType.userId;
    const userDetails = await User.findOne({ userId: bookingType.userId }).populate({
      path: "userId",
      model: Authenticate,
    });
    sendBookingMail(bookingData, bookingType, {
      fullName: userDetails.fullName,
      email: userDetails.userId.email,
    });
    await Booking.findByIdAndUpdate(bookingId, { $set: req.body });
    res.send({ msg: "booking updated successfuly", success: true });
  } catch (error) {
    res.send({ msg: "booking not updated!", success: false });
  }
});

exports.getBookingCount = asyncHandler(async (req, res) => {
  try {
    //const userId = req.user._id;
    const { organization } = req.headers;
    const { startDate, endDate, id } = req.query;
    const bookingCount = await Booking.countDocuments({
      user: mongoose.Types.ObjectId(id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDeleted: false,
      startDate: { $lt: new Date(endDate), $gt: new Date(startDate) },
    });
    return res.status(200).send("" + bookingCount);
  } catch (error) {
    res.send({ msg: error, success: false });
  }
});

exports.getBooking = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const userId = req.user._id;
    let perPage = req.query.perPage;
    const sortBy = req.query.sortColumn;
    const sortType = req.query.sort;
    let page = req.query.page;
    page = parseInt(page, 10) || 1;
    perPage = parseInt(perPage, 10) || 10;
    const q = req.query.q;
    let sort = 1;
    const skip = (page - 1) * perPage;
    // eslint-disable-next-line eqeqeq
    if (sortType == "desc") {
      sort = -1;
    }
    let sort_q;
    if (sortBy === "name") {
      sort_q = {
        name: sort,
      };
    } else if (sortBy === "duration") {
      sort_q = {
        duration: sort,
      };
    } else {
      sort_q = {
        startDate: sort,
      };
    }
    let query = {
      user: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDeleted: false,
    };
    if (q !== "" && q !== undefined) {
      let regex = new RegExp(q, "i");
      query = {
        ...query,
        $or: [{ name: regex }],
      };
    }
    const data = await Booking.aggregate([
      {
        $match: query,
      },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "userId",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "bookingtypes",
          localField: "bookingType",
          foreignField: "_id",
          as: "bookingType",
          pipeline: [{ $match: { isDeleted: false } }],
        },
      },
      {
        $sort: sort_q,
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: perPage }],
        },
      },
    ]);

    const pageData = buildPagination(data);
    res.send({ data: pageData, success: true });
  } catch (error) {
    res.send({ msg: error.message, success: false });
  }
});

exports.getMonthlyBooking = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const userId = req.user._id;
    let date = new Date(req.query.date);
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let query = {
      user: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDeleted: false,
      startDate: { $lt: new Date(endDate), $gt: new Date(startDate) },
    };

    const data = await Booking.aggregate([
      {
        $match: query,
      },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "userId",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "bookingtypes",
          localField: "bookingType",
          foreignField: "_id",
          as: "bookingType",
          pipeline: [{ $match: { isDeleted: false } }],
        },
      },
    ]);

    res.send({ data, success: true });
  } catch (error) {
    res.send({ msg: error.message, success: false });
  }
});

exports.getBookingDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate("bookingType");
    if (!booking) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.send({ data: booking, success: true });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deleteBooking = asyncHandler(async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    await Booking.findByIdAndUpdate(bookingId, { $set: { isDeleted: true } });
    res.send({ msg: "booking deleted successfully", success: true });
  } catch (error) {
    res.send({ msg: error.message, success: false });
  }
});

exports.createBookingType = asyncHandler(async (req, res) => {
  try {
    let bookingTypeData = req.body;
    const { organization } = req.headers;
    const user = req.user;
    bookingTypeData.link = generateLink(6);
    bookingTypeData = {
      ...bookingTypeData,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      userId: mongoose.Types.ObjectId(user._id),
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    const newBookingType = await BookingType.create(bookingTypeData);
    return res.send({
      msg: "booking type created successfully",
      success: true,
      data: newBookingType,
    });
  } catch (error) {
    return res.send({ msg: error.message, success: false });
  }
});

exports.updateBookingType = asyncHandler(async (req, res) => {
  try {
    const bookingTypeData = req.body;
    const { id: bookingTypeId } = req.params;
    await BookingType.findByIdAndUpdate(mongoose.Types.ObjectId(bookingTypeId), {
      ...bookingTypeData,
    });
    res.send({ msg: "booking updated successfuly", success: true });
  } catch (error) {
    res.send({ msg: "booking not updated!", success: false });
  }
});

exports.getBookingType = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.params;
    const user = req.user;
    let q = {}
    if(organization){
      q = {
        $or: [
          {
            isDeleted: false,
            organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
            userId: mongoose.Types.ObjectId(user._id),
          },
          {
            isDeleted: false,
            organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
            creatorType: "admin",
          },
          {
            isDeleted: false,
            creatorType: "super-admin",
          },
        ],
      }
    }
    else{
      q = {
        $or: [
          {
            isDeleted: false,
            organizationId: null,
            userId: mongoose.Types.ObjectId(user._id),
          },
          {
            isDeleted: false,
            creatorType: "super-admin",
          },
        ],
      }
    }
    const data = await BookingType.find(q);
    res.send({ data, success: true });
  } catch (error) {
    res.send({ msg: err.message, success: false });
  }
});

exports.getBookingTypeDetail = asyncHandler(async (req, res) => {
  const { link } = req.params;
  try {
    const bookingType = await BookingType.findOne({ link, isDeleted: false });
    if (!bookingType) {
      return res.status(404).json({ msg: "Not Found" });
    }
    return res.send({ data: bookingType, success: true });
  } catch (err) {
    return res.send({ msg: err.message, success: false });
  }
});

exports.deleteBookingType = asyncHandler(async (req, res) => {
  const bookingTypeId = req.params.id;
  try {
    await BookingType.findByIdAndUpdate(bookingTypeId, { $set: { isDeleted: true } });
    await Booking.updateMany(
      { bookingType: mongoose.Types.ObjectId(bookingTypeId) },
      { $set: { isDeleted: true } }
    );
    res.send({ msg: "booking deleted successfully", success: true });
  } catch (error) {
    res.send({ msg: error.message, success: false });
  }
});

exports.cloneBookingType = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let bookingTypeData = req.body;
    const otp = generateLink(6);
    
    bookingTypeData.link = otp;
    bookingTypeData = {
      ...bookingTypeData,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      userId: mongoose.Types.ObjectId(user._id),
      creatorType:organization
      ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
      : user.userType,
    };
    const data = await BookingType.create(bookingTypeData);
    return res.send({ msg: "booking type cloned successfully", success: true, data });
  } catch (error) {
    return res.send({ msg: err.message, success: false });
  }
});
