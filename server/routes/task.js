const router = require("express").Router();

const {
  newTask,
  updateTask,
  deleteTask,
  getTasks,
  getTask,
  saveCheckList,
  getTodaysTask,
  saveTaskCheckListTodos,
  getPastDueScheduleCheckList,
  sendProofEmail,
  getAllTasks,
} = require("../controllers/task");

const {
  createNewFreezeTask,
  updateFreezeTask,
  deleteFreezeTask,
  getFreezeTask,
} = require("../controllers/freezeTask");

const {
  // newTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  getTaskValidator,
} = require("../validators/task");

const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

// Task Management front
// ** fetch todays task [from weekly] // Active Task
router.get("/get-todays-task", isAuthenticated, getTodaysTask);
router.get("/past-due-task", isAuthenticated, getPastDueScheduleCheckList);

router.get("/get-all-tasks", isAuthenticated, getAllTasks);

// ** save task checklist Todos
router.post("/save-task-checklist", isAuthenticated, saveTaskCheckListTodos);

router.post(
  "/",
  isAuthenticated,
  // newTaskValidator, results,
  newTask
);

router.patch("/:id", isAuthenticated, updateTaskValidator, results, updateTask);

router.patch("/delete/:id", isAuthenticated, deleteTaskValidator, results, deleteTask);

router.get("/", isAuthenticated, getTasks);

// save checklist
router.post("/save-checklist", isAuthenticated, saveCheckList);

router.get("/:id", isAuthenticated, getTaskValidator, results, getTask);

// send mail
router.post("/send-mail", isAuthenticated, sendProofEmail);

// freeze task schedule manage
router.post("/new-freeze-task", isAuthenticated, createNewFreezeTask);
router.get("/get-freeze-task", isAuthenticated, getFreezeTask);
router.post("/accept-freeze-task", isAuthenticated, updateFreezeTask);
router.delete("/delete-freeze-task", isAuthenticated, deleteFreezeTask);

module.exports = router;
