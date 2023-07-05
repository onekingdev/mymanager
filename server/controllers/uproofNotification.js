const { UprrofNotification } = require("../models/index/index");
 const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

exports.addUproofNoti =asyncHandler( async (req, res) => {
  const {
    hide_noti_mobile,
    show_on_top,
    position_noti,
    noti_theme,
    delay_first_noti,
    display_each_noti,
    space_each_noti,
  } = req.body;

  const payload = {
    hide_noti_mobile: hide_noti_mobile,
    show_on_top: show_on_top,
    position_noti: position_noti,
    noti_theme: noti_theme,
    delay_first_noti: delay_first_noti,
    display_each_noti: display_each_noti,
    space_each_noti: space_each_noti,
  };
  let NotiObj = new UprrofNotification(payload);
  NotiObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
});

exports.updateUproofNoti = asyncHandler(async (req, res) => {

  try {
      const Obj = req.body;
      const data = await UprrofNotification.findOneAndUpdate({ _id: req.params.id }, Obj);
      if (data) {
          return res.status(200).json({ success: true, message: `Success` });
      }
      return res.status(404).json({ success: false, message: `not found` });
  } catch (error) {
      return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
});


exports.listUproofNoti = asyncHandler(async (req, res) => {
  try {
    const getdata = await UprrofNotification.find();
    return res.status(200).json(getdata);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.dltUproofNoti = asyncHandler(async (req, res) => {
  try {
    let result = await UprrofNotification.deleteOne({ _id: req.params.id });
    res.send({ msg: "Notification deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});
exports.getoneUproofNoti = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getone = await UprrofNotification.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (getone === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json(getone);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
