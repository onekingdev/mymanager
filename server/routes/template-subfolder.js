const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  createSubFolder,
  editSubFolder,
  removeSubFolder,
  templateList,
} = require("../controllers/templateSubfolder");

router.post("/create-subfolder/:folderId", isAuthenticated, createSubFolder);
router.get("/read-subfolder", isAuthenticated, templateList);
router.put("/update-subfolder/:subfolderId", isAuthenticated, editSubFolder);
router.delete("/delete-subfolder/:folderId/:subfolderId", isAuthenticated, removeSubFolder);

module.exports = router;
