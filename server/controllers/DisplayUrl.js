 const { DisplayUrl } = require("../models/index");


const asyncHandler = require("express-async-handler");

exports.addDisplayUrl = asyncHandler(async (req, res) => {
  const { displayUrl } = req.body;

  const payload = {
    displayUrl: displayUrl,
  };

  let DisplayObj = new DisplayUrl(payload);
  DisplayObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
})

exports.displayUrlList = asyncHandler(async (req, res) => {
  try {
    const camp = await DisplayUrl.find();
    return res.status(200).json(camp);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});


exports.updateDisplayUrl =asyncHandler( async (req, res) => {
  try {
    const Obj = req.body;
    const data = await DisplayUrl.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `display url not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
})

exports.delDisplayUrl =asyncHandler( async (req, res) => {
  try {
    let result = await DisplayUrl.deleteOne({ _id: req.params.id });
    res.send({ msg: "display url deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
})

