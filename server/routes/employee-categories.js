const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/employeeCategory");

// create task by user route
router.post("/", isAuthenticated, createCategory);
router.get("/", isAuthenticated, getAllCategories);
router.put("/:id", isAuthenticated, updateCategory);
router.delete("/:id", isAuthenticated, deleteCategory);

module.exports = router;
