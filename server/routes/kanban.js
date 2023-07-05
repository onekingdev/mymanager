const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const {
  newTaskKanban,
  getTaskKanban,
  updateTaskKanban,
  updateTaskBoardId,
  reorderTaskKanban,
  clearTasks,
  deleteTaskKanban,

  // ** Kanban Task Acitivity
  newTaskActivity,
  getTaskActivityByWorkspaceId,
  getLastActivity,
  updateTaskActivity,
  deleteTaskActivity,

  // ** Last Seen
  setLastViewed,
  getLastViewed,
} = require("../controllers/kanban");

// ** Kanban Tasks
router.post("/add", isAuthenticated, results, newTaskKanban);
router.get("/get", isAuthenticated, results, getTaskKanban);

router.post("/update", isAuthenticated, results, singleUploadControl, updateTaskKanban);
router.post("/update-taskboard", isAuthenticated, results, updateTaskBoardId);

router.post("/reorder", isAuthenticated, results, reorderTaskKanban);
router.delete("/deleteByBoardId/:boardId", isAuthenticated, results, clearTasks);
router.delete("/delete/", isAuthenticated, results, deleteTaskKanban);

// ** Kanban Task Activity
router.post("/addActivity", isAuthenticated, results, newTaskActivity);
router.get("/getActivity", isAuthenticated, results, getTaskActivityByWorkspaceId);
router.get("/getLastActivity", isAuthenticated, results, getLastActivity);
router.post("/updateActivity", isAuthenticated, results, updateTaskActivity);
router.delete("/deleteActivity/", isAuthenticated, results, deleteTaskActivity);

// ** Last Seen
router.post("/setLastViewed", isAuthenticated, results, setLastViewed);
router.get("/getLastViewed", isAuthenticated, results, getLastViewed);

module.exports = router;
