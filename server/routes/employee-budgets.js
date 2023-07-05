const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const { getProjectedSales, saveBudgets } = require("../controllers/employeeShift");

// Budget
router.get("/", isAuthenticated, getProjectedSales);
router.post("/", isAuthenticated, saveBudgets);

module.exports = router;
