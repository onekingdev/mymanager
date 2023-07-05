const router = require("express").Router();

const { getSources, createSource, deleteSource, updateSource } = require("../controllers/contactLeadSource");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, getSources);
router.post("/", isAuthenticated, createSource);
router.put("/delete/:id", isAuthenticated, deleteSource);
router.put("/update/:id", isAuthenticated, updateSource);
module.exports = router;