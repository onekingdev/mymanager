const mongoose = require("mongoose");

const employeeBudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  totalSaleProjected: {
    type: Number,
    default: 0,
  },
  totalPercentageProjected: {
    type: Number,
    default: 0,
  },
  totalLaborProjected: {
    type: Number,
    default: 0,
  },
  projectedLabors: [],
  projectedSales: [],
  faceRecog: {
    type: Boolean,
    default: true,
  },
  needPunch: {
    type: Boolean,
    default: true,
  },
  limitMins: {
    type: Number,
    default: 5,
  },
});

module.exports = mongoose.model("employeeBudget", employeeBudgetSchema);
