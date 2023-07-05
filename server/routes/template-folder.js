const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  createfolder,
  readfolder,
  editFolder,
  removeFolder,
} = require("../controllers/templateFolder");

router.post("/create-folder", isAuthenticated, createfolder);
router.get("/read-folder", isAuthenticated, readfolder);
router.put("/update-folder/:folderId", isAuthenticated, editFolder);
router.delete("/delete-folder/:folderId", isAuthenticated, removeFolder);

module.exports = router;
