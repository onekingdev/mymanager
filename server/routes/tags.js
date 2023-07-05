const router = require("express").Router();
const { getTags, createTag, deleteTag, updateTag } = require("../controllers/contactTags");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, getTags);
router.post("/", isAuthenticated, createTag);
router.put("/delete/:id", isAuthenticated, deleteTag);
router.put("/update/:id", isAuthenticated, updateTag);
module.exports = router;
