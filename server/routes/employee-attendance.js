const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const {
  saveAttendance,
  getAttendance,
  deleteAttendance,
} = require("../controllers/employeeAttendance");

// create task by user route
router.post("/", isAuthenticated, saveAttendance);
router.delete("/:employeeId", isAuthenticated, deleteAttendance);
router.get("/", isAuthenticated, getAttendance);

module.exports = router;
