const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const { addCategory, cmpgetallCategory ,getoneCategory} = require("../controllers/campCategory");

router.post("/addCategory", isAuthenticated, addCategory);
router.get("/cmp_getallCategory",isAuthenticated, cmpgetallCategory);
router.get("/getoneCategory",isAuthenticated, getoneCategory);

module.exports = router;
