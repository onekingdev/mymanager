const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { EmployeeShift,EmployeeBudget } = require("../models/index/index");

//create new task
const createShift = asyncHandler(async (req, res) => {
  try {
    const { start, end, weekDay, note, name, number } = req.body;
    const { user } = req;
    if (number) {
      for (let i = 0; i < weekDay.length; i++) {
        for (let j = 0; j < number; j++) {
          await EmployeeShift.create({
            userId: user._id,
            name,
            start,
            end,
            weekDay: weekDay[i],
            note,
            isOpen: true,
          });
        }
      }
    } else {
      for (let i = 0; i < weekDay.length; i++) {
        await EmployeeShift.create({
          userId: user._id,
          name,
          start,
          end,
          weekDay: weekDay[i],
          note,
          isOpen: true,
        });
      }
    }
    return res.status(201).json({ msg: "Created successfully", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
const updateShift = asyncHandler(async (req, res) => {
  try {
    const { start, end, weekDay, note, isOpen, name } = req.body;
    const { id } = req.params;
    const { user } = req;
    const existedShift = await EmployeeShift.findById(id);

    if (!existedShift) throw Error("Shift not Found");
    for (let i = 0; i < weekDay.length; i++) {
      if (i == 0) {
        existedShift.name = name ? name : existedShift.name;
        existedShift.start = start ? start : existedShift.start;
        existedShift.end = end ? end : existedShift.end;
        existedShift.weekDay = weekDay ? weekDay[i] : existedShift.weekDay;
        existedShift.note = note ? note : existedShift.note;
        existedShift.isOpen = isOpen == true ? true : false;
        await existedShift.save();
      } else {
        await EmployeeShift.create({
          userId: user._id,
          start: start,
          end: end,
          weekDay: weekDay[i],
          note: note,
          isOpen: true,
        });
      }
    }
    return res.status(200).json({ msg: "Successfully Updated", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
const deleteShift = async (req, res) => {
  try {
    let { id } = req.params;
    const existedShift = await EmployeeShift.findById(id);
    await EmployeeShift.deleteMany({
      name: existedShift.name,
      start: existedShift.start,
      end: existedShift.end,
    });

    return res.status(200).json({
      success: "Position deleted successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
// ** Get All Shift
const getAllShift = asyncHandler(async (req, res) => {
  try {
    let allShift = await EmployeeShift.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id) },
      },
    ]);
    res.status(200).json(allShift);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
// ** Get Projected Sales
const getProjectedSales = asyncHandler(async (req, res) => {
  try {
    let projectedSales = await EmployeeBudget.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id) },
      },
    ]);
    res.status(200).json(projectedSales);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
// ** Save Budget
const saveBudgets = asyncHandler(async (req, res) => {
  try {
    const {
      salesProjected,
      laborProjected,
      totalSale,
      totalPercentage,
      totalLabor,
      faceRecog,
      needPunch,
      limitMins,
    } = req.body;
    const { user } = req;
    const existedBudget = await EmployeeBudget.findOne({ userId: user._id });

    if (existedBudget.length == 0) {
      await EmployeeBudget.create({
        userId: user._id,
        projectedSales: salesProjected,
        projectedLabors: laborProjected,
        totalSaleProjected: totalSale,
        totalLaborProjected: totalLabor,
        totalPercentageProjected: totalPercentage,
        faceRecog: faceRecog,
        needPunch: needPunch,
        limitMins: limitMins,
      });
    } else {
      existedBudget.projectedSales = salesProjected ? salesProjected : existedBudget.projectedSales;
      existedBudget.projectedLabors = laborProjected
        ? laborProjected
        : existedBudget.projectedLabors;
      existedBudget.totalSaleProjected = totalSale ? totalSale : existedBudget.totalSaleProjected;
      existedBudget.totalLaborProjected = totalLabor
        ? totalLabor
        : existedBudget.totalLaborProjected;
      existedBudget.totalPercentageProjected = totalPercentage
        ? totalPercentage
        : existedBudget.totalPercentageProjected;
      existedBudget.faceRecog = faceRecog !== undefined ? faceRecog : existedBudget.faceRecog;
      existedBudget.needPunch = needPunch !== undefined ? needPunch : existedBudget.needPunch;
      existedBudget.limitMins = limitMins !== undefined ? limitMins : existedBudget.limitMins;
      await existedBudget.save();
    }

    return res.status(201).json({ msg: "Created successfully", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
module.exports = {
  createShift,
  getAllShift,
  updateShift,
  deleteShift,
  getProjectedSales,
  saveBudgets,
};
