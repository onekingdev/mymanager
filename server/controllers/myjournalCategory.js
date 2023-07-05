const { myJournalCat } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.createJrnlCategory = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let payload = req.body;
    payload = {
      ...payload,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.filter((x) => x.organizationId.toString() === organization).userType
        : user.userType,
      userId: user._id,
    };
    await myJournalCat.create(payload);
    res.send({
      success: true,
      msg: "journal Category created successfully",
    });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.getJrnlCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const Jcategory = await myJournalCat
      .find({ _id: mongoose.Types.ObjectId(id) })
      .sort({ createdAt: 1 });
    return res.status(200).json(Jcategory);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
exports.getJrnlCategories = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            userId: user._id,
            isDeleted: false,
            organizationId: mongoose.Types.ObjectId(organization),
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
          {
            creatorType: "admin",
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: user._id,
            isDeleted: false,
            organizationId: null,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }
    let category = await myJournalCat.aggregate([
      {$match:q},
      {
        $lookup:{
          from: "myjournals",
            localField: "_id",
            foreignField: "journalCategory",
            as: "journals"
        }
      },
      {
        $addFields:{count: { $size: "$journals" }}
      },
      {
        $project: {
          journals: 0
        }
    }
    ]);
    if (category.length > 0) {
      return res.status(200).json(category);
    } else {
      const defaults = [
        {
          userId: user._id,
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          creatorType: organization
            ? user.organizations.filter((x) => x.organizationId.toString() === organization)
                .userType
            : user.userType,
          title: "Personal",
          desc: "Personal Journals",
          labelColor: "#174AE7",
        },
        {
          userId: user._id,
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          creatorType: organization
            ? user.organizations.filter((x) => x.organizationId.toString() === organization)
                .userType
            : user.userType,
          title: "Business",
          desc: "Business Journals",
          labelColor: "#6383e6",
        },
      ];
      await myJournalCat.insertMany(defaults)
      category = await myJournalCat.aggregate([
        {$match:q},
        {
          $lookup:{
            from: "myjournals",
              localField: "_id",
              foreignField: "journalCategory",
              as: "journals"
          }
        },
        {
          $addFields:{count: { $size: "$journals" }}
        },
        {
          $project: {
            journals: 0
          }
      }
      ]);
      return res.status(200).json(category);
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    const { title, labelColor } = req.body;
    const data = await myJournalCat.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { title: title, labelColor: labelColor }
    );
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `goal not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
});

exports.delCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await myJournalCat.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { isDeleted: true });
    res.send({ msg: "deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
