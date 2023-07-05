const router = require("express").Router();

const {
  createProject,
  getProjects,
  deleteProject,
  updateProjectTitle,
  updateColumnName,
  addProjectManagement,
  updateProjectManagement,
  addRowProjectManagement,
  addColumnProjectManagement,
  deleteTableProjectManagement,
  deleteRowProjectManagement,
  deleteColumnProjectManagement,
  ActivityAndLastSeen,
  updateDynamicColumnFields,
  updateColumnOrder
} = require("../controllers/projectManager");
let results = require("../validators");
let isAuthenticated = require("../middleware/auth");
let ProjectLastSeen = require("../middleware/lastseen/lastseen");


router.get("/getActivity", results,isAuthenticated, ProjectLastSeen, ActivityAndLastSeen);
router.get("/getprojects", results, isAuthenticated, ProjectLastSeen, getProjects);

router.post("/createproject", results, isAuthenticated, ProjectLastSeen, createProject);
router.post("/createTable", results, isAuthenticated, ProjectLastSeen, addProjectManagement);
router.post("/addRow", results, isAuthenticated, ProjectLastSeen, addRowProjectManagement);
router.post("/addColumn", results, isAuthenticated, ProjectLastSeen, addColumnProjectManagement);


router.put("/updateProject", results, isAuthenticated, ProjectLastSeen, updateProjectTitle);
router.put("/update", results, isAuthenticated, ProjectLastSeen, updateProjectManagement);
router.put("/updateColumn", results, isAuthenticated, ProjectLastSeen, updateColumnName);
router.put("/updateDynamicColumnFields", results, isAuthenticated, ProjectLastSeen, updateDynamicColumnFields);
router.put("/updateColumnOrder", results, isAuthenticated, ProjectLastSeen, updateColumnOrder);

router.delete(
  "/deleteTable",
  results,
  isAuthenticated,
  ProjectLastSeen,
  deleteTableProjectManagement
);
router.delete("/deleteProject", results, isAuthenticated, ProjectLastSeen, deleteProject);

router.delete(
  "/deleteRow", 
  results, 
  isAuthenticated, 
  ProjectLastSeen, 
  deleteRowProjectManagement
);

router.delete(
  "/deleteColumn",
  results,
  isAuthenticated,
  ProjectLastSeen,
  deleteColumnProjectManagement
);

module.exports = router;
