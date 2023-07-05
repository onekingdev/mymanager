const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { templateUpload, editTemplate, templateRemove } = require("../controllers/template");

router.post("/upload-template/:folderId", isAuthenticated, templateUpload);
router.put("/update-template/:templateId", isAuthenticated, editTemplate);
router.delete(
  "/delete-template/:templateId/:folderId/:subfolderId",
  isAuthenticated,
  templateRemove
);

module.exports = router;
