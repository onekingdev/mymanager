const { Campaign } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');


exports.addCampaign = asyncHandler(async (req, res) => {
  const { campaign_name, goal, status, position } = req.body;
  const payload = {
    campaign_name: campaign_name,
    goal: goal,
    status: status,
    position: position,
  };
  let CampObj = new Campaign(payload);
  CampObj.save((err, data) => {
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

exports.getCampaign = asyncHandler(async (req, res) => {
  try {
    const camp = await Campaign.find();
    return res.status(200).json(camp);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.viewoneCampaign = asyncHandler(async (req, res) => {
  try {
    const getdata = await Campaign.find({ _id: req.params.id });
    return res.status(200).json(getdata);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.delCampign = asyncHandler(async (req, res) => {
  try {
    let result = await Campaign.deleteOne({ _id: req.params.id })
    res.send({ msg: "Campign deleted succesfully", success: true });

  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.delMultipleCampign = asyncHandler(async (req, res) => {
  try {


    //const idsToDelete = req.params.id
    const idsToDelete = req.params.idsToDelete.split(',').map(id => ObjectId(id));
    // Add error handling as needed

    let result = await Campaign.deleteMany({ _id: { $in: idsToDelete } })
    res.send({ msg: "Campign deleted succesfully", success: true });

  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.updateCampaign = asyncHandler(async (req, res) => {
  try {
    const Obj = req.body;
    const data = await Campaign.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `Campaign not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
});
