const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  createIncome,
  getIncomes,
  getIncome,
  deleteIncomeById,
  updateIncomeById,
  plByCat,

} = require("../controllers/income");

router.post("/", isAuthenticated, createIncome);
router.get("/", isAuthenticated, getIncomes);

router.get("/:id", isAuthenticated, getIncome);
router.get("/get/pl", isAuthenticated, plByCat);
router.patch("/:id", isAuthenticated, updateIncomeById);
router.delete("/:id", isAuthenticated, deleteIncomeById);

module.exports = router;
