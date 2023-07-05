const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    createWorkSpace,
    workSpaceList,
    dltWorkspace,
    viewoneWorkspace,
    updatemyWorkSpace,
    updatePlanableMyWorkSpace

} = require("../controllers/planable_workspace");
const { response } = require("express");



router.post("/createWorkSpace", isAuthenticated, createWorkSpace);
router.get("/workSpace_list", isAuthenticated, workSpaceList);
router.get("/dlt_workspace/:id", isAuthenticated, dltWorkspace);
router.get("/viewone_workspace/:id", isAuthenticated, viewoneWorkspace);
router.put("/update_planable_myWorkSpace/:id", isAuthenticated, updatemyWorkSpace);
router.post("/update_planable_myWorkSpace/:id", isAuthenticated, updatePlanableMyWorkSpace);




 

module.exports = router;

