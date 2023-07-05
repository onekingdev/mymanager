const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const {
  createCategory,
  getOneCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/formCategory");

// create task by user route
router.post("/", isAuthenticated, createCategory);
router.get("/", isAuthenticated, getAllCategories);
router.put("/", isAuthenticated, updateCategory);
router.delete("/:id", isAuthenticated, deleteCategory);

module.exports = router;
