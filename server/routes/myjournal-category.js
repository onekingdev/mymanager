const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const { createJrnlCategory, getJrnlCategory, update, delCategory, getJrnlCategories

} = require("../controllers/myjournalCategory");

router.post("/", isAuthenticated, createJrnlCategory);
router.get("/", isAuthenticated, getJrnlCategories);
router.get("/id", isAuthenticated, getJrnlCategory);

router.put("/:id", isAuthenticated, singleUploadControl, update);
router.delete("/:id", isAuthenticated, singleUploadControl, delCategory);


module.exports = router;
