const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { FinanceCategory } = require("../models/index/index");

const initialSources = [
  {
    title: "Product Sales",
    itemType: "product",
    type: "income",
    labelColor: "primary",
  },
  {
    title: "Events",
    itemType: "event",
    type: "income",
    labelColor: "secondary",
  },
  {
    title: "Recurring Sales",
    itemType: "membership",
    type: "income",
    labelColor: "warning",
  },
  {
    title: "Courses",
    itemType: "course",
    type: "income",
    labelColor: "light-primary",
  },
  {
    title: "Custom",
    itemType: "custom",
    type: "income",
    labelColor: "light-secondary",
  },
  {
    title: "Refunds",
    itemType: "refund",
    type: "expense",
    labelColor: "danger",
  },
];

exports.createFinanceCategory = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    const  user  = req.user;
    console.log(user)
    const { organization } = req.headers;
    payload = {
      ...payload,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      userId: mongoose.Types.ObjectId(user._id),
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };

    const expenseCategoryData = await FinanceCategory.create(payload);
    return res.status(201).send(expenseCategoryData);
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getFinanceCategory = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = req.user;
    const { organization } = req.headers;
    let expenseCategoryData;
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
            userId: mongoose.Types.ObjectId(_id),
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(_id),
            organizationId: null,
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }
    expenseCategoryData = await FinanceCategory.find(q);
    
    if (expenseCategoryData.length > 0) {
      return res.status(200).json(expenseCategoryData);
    } else {
      let data = [];
      for (const key of initialSources) {
        const initCat = new FinanceCategory({
          userId: mongoose.Types.ObjectId(_id),
          title: key.title,
          labelColor: key.labelColor,
          organizationId: organization?mongoose.Types.ObjectId(organization):null,
          type: key.type,
          itemType: key.itemType,
          creatorType: organization? user.organizations.find((x) => x.organizationId.toString() === organization)
            ?.userType:user.userType,
        });
        initCat.save((err, success) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        });
        data.push(initCat);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteFinanceCategoryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await FinanceCategory.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(id),
    },{isDeleted:true});
    if (category === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Delete category successfully.",
    });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateFinanceCategoryById = asyncHandler(async (req, res) => {
  try {
    const { data } = req.body;
    const { id } = req.params;
    const existedCategory = await FinanceCategory.findById(id);
    if (!existedCategory) throw Error("Category not Found");
    existedCategory.title = data.title;
    existedCategory.labelColor = data.labelColor;
    await existedCategory.save();
    // const { _id } = req.user;
    // const allFinanceCategoryData = await FinanceCategory.find({
    //   userId: mongoose.Types.ObjectId(_id),
    // });
    return res
      .status(200)
      .json({ message: "Successfully Updated", data: allFinanceCategoryData, success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
