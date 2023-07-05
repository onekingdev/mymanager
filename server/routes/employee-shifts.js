const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const {
  createShift,
  getAllShift,
  updateShift,
  deleteShift,
} = require("../controllers/employeeShift");

// create task by user route
router.post("/", isAuthenticated, createShift);
router.get("/", isAuthenticated, getAllShift);
router.post("/:id", isAuthenticated, updateShift);
router.delete("/:id", isAuthenticated, deleteShift);
router.put("/:id", isAuthenticated, updateShift);

module.exports = router;
