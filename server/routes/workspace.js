const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const {
  newWorkspace,
  getAllWorkspace,
  getNewWorkspace,
  getWorkspace,
  getSharedWorkspace,

  updateWorkspace,
  shareWorkspace,
  shareRevertWorkspace,
  deleteWorkspace,
} = require("../controllers/workspace");

router.get("/get-all/", isAuthenticated, results, getAllWorkspace);
router.get("/get-new/", isAuthenticated, getNewWorkspace); // not working correct
router.get("/get-shared/", isAuthenticated, getSharedWorkspace); // not working correct
router.get("/get/:workspaceId", isAuthenticated, results, getWorkspace);


router.post("/add", isAuthenticated, results, newWorkspace);
router.post("/share", isAuthenticated, shareWorkspace);
router.post("/share-revert", isAuthenticated, results, shareRevertWorkspace);
router.post("/update", isAuthenticated, results, updateWorkspace);

router.delete("/delete/:_id", isAuthenticated, results, deleteWorkspace);

module.exports = router;
