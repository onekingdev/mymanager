const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createFinanceCategory,
  getFinanceCategory,
  deleteFinanceCategoryById,
  updateFinanceCategoryById
} = require("../controllers/financeCategory");

router.post("/", isAuthenticated, createFinanceCategory);
router.get("/", isAuthenticated, getFinanceCategory);
router.delete("/:id", isAuthenticated, deleteFinanceCategoryById);
router.put("/:id", isAuthenticated, updateFinanceCategoryById)

module.exports = router;
