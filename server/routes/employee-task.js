const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const {
  createTask,
  markTaskStatus,
  updateTaskByEmployee,
  updateTaskByUser,
  getTasksByUserId,
  getTasksByEmployee,
} = require("../controllers/employeeTask");

// create task by user route
router.post("/", isAuthenticated, createTask);
// update task by user route
router.patch("/:id", isAuthenticated, updateTaskByUser);
// get all tasks created by a user
router.get("/user/:type", isAuthenticated, getTasksByUserId);
// mark tasks status
router.patch("/mark-status/:taskId", isAuthenticated, markTaskStatus);
// get tasks by emp id
router.get("/employee/task/", isAuthenticated, getTasksByEmployee);
// update a task status (empTaskStatus)
router.put("/employee/task/:taskId", isAuthenticated, updateTaskByEmployee);

// get task by employee after they do a task, not required anymore
// router.get("/employee", isAuthenticated, getTaskByEmpStatus);

module.exports = router;
