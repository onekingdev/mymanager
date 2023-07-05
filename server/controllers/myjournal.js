const { Myjournal } = require("../models/index/index");

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.addMyJournal = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let payload = req.body;
    if (req.file) {
      const url = await GoogleCloudStorage.upload(req.file);
      JournalDetail.img = url;
    }
    JournalDetail = {
      ...payload,
      journalCategory: mongoose.Types.ObjectId(payload.jourvalCategory),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      userId: mongoose.Types.ObjectId(user._id),
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    await Myjournal.create(JournalDetail);

    res.send({
      success: true,
      msg: "Journal created successfully",
    });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.updateMyJournal = asyncHandler(async (req, res) => {
  try {
    let { journalId } = req.params;
    let JournalDetail = req.body;
    if (req.file) {
      const url = await GoogleCloudStorage.upload(req.file);
      JournalDetail = { ...JournalDetail, img: url };
    } else if (req.body.img) {
      JournalDetail = { ...JournalDetail, img: req.body.img };
    }

    const newJournal = await Myjournal.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(journalId) },
      {...JournalDetail,isDeleted:false}
    );
    res.send({
      success: true,
      msg: "Journal created successfully",
      data: newJournal,
    });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.myJournalList = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { organization } = req.headers;

    const data = await Myjournal.find({
      userId: mongoose.Types.ObjectId(user._id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDeleted:false
    }).populate("journalCategory");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.getoneMyJournal = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const getone = await Myjournal.findOne({
      _id: mongoose.Types.ObjectId(id),
      isDeleted: false,
    });

    return res.status(200).json(getone);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.dltMyJournal = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Myjournal.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { isDeleted: true });
    res.send({ msg: "Myjournal deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});
