const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");
const { Income, Contact, FinanceCategory, Invoice, Document } = require("../models/index/index");
exports.createIncome = asyncHandler(async (req, res) => {
  const { organization } = req.headers;
  const user = req.user
  try {
    let payload = req.body;
    payload = {
      ...payload,
      userId: req.user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      documentId: payload.documentId? mongoose.Types.ObjectId(payload.documentId):null,
      creatorType:organization? user.organizations.find((x) => x.organizationId.toString() === organization)
      .userType:user.userType,
    };
    const incomeData = await Income.create(payload);
    return res.status(201).send(incomeData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateIncomeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    if (payload.documentId) {
      payload = { ...payload, documentId: mongoose.Types.ObjectId(payload.documentId) };
    }
    const income = await Income.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
    if (income === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, income });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteIncomeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      { isDeleted: true }
    );
    if (income === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Delete income successfully.",
    });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getIncomes = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { organization } = req.headers;
  try {
    let q = {
      userId: mongoose.Types.ObjectId(_id),
      isDeleted: false,
      organizationId:organization?mongoose.Types.ObjectId(organization):null
    };
   
    const incomes = await Income.find(q)
      .populate({ path: "clientId", model: Contact })
      .populate({ path: "categoryId", model: FinanceCategory })
      .populate({ path: "invoiceId", model: Invoice })
      .populate({ path: "documentId", model: Document });
    return res.status(200).json(incomes);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getIncome = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findById(mongoose.Types.ObjectId(id))
      .populate({ path: "clientId", model: Contact })
      .populate({ path: "categoryId", model: FinanceCategory })
      .populate({ path: "invoiceId", model: Invoice })
      .populate({ path: "documentId", model: Document });
    if (income.length > 0) {
      return res.status(200).send(income);
    }
    return res.status(404).send({ success: false, message: "Not found" });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});


exports.plByCat = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { organization } = req.headers;
  try {
    let q = {
      userId: mongoose.Types.ObjectId(_id),
      isDeleted: false,
      organizationId:organization?mongoose.Types.ObjectId(organization):null
    };
   
    const incomes = await Income.find(q)
      .populate({ path: "categoryId", model: FinanceCategory })
      .populate({ path: "invoiceId", model: Invoice })
      .populate({ path: "documentId", model: Document });
    
      let data = [{categoryId:'', item}]
    return res.status(200).json(incomes);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
