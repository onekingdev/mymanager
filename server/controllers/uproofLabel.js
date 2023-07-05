 const { uproofLabel } = require("../models/index/index");
  const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

 


exports.addLabel = asyncHandler(async (req, res) => {
    const { time, date, add_label, workspace, timezone, approvel } = req.body
    const payload = {
        time: time,
        date: date,
        add_label: add_label,
        workspace: workspace,
        timezone: timezone,
        approvel: approvel
    }
    let labelObj = new uproofLabel(payload);
    labelObj.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "error",
          error: err
        });
      }
      res.send({ status: true, message: "success", data: data });
    });
})

exports.getLabel = asyncHandler(async (req, res) => {
   
    try {
        const camp = await uproofLabel.find();
        return res.status(200).json(camp);
      } catch (error) {
        return res.send({ success: false, message: error.message.replace(/"/g, "") });
      }
    });


exports.viewoneLabel = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getone = await uproofLabel.findOne({
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

exports.delLabel = asyncHandler(async (req, res) => {
  try {
    let result = await uproofLabel.deleteOne({ _id: req.params.id });
    res.send({ msg: "Label deleted succesfully", success: true });
} catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
}
});

exports.editLabel =asyncHandler( async (req, res) => {
    
  try {
    const Obj = req.body;
    const data = await uproofLabel.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
        return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `Label not found` });
} catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
}
});



 