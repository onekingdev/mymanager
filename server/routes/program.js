const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const { newProgram, getProgram, updateProgram, deleteProgram } = require("../controllers/program");

router.post("/add", isAuthenticated, results, newProgram);
router.get("/get", isAuthenticated, results, getProgram);
router.post("/update", isAuthenticated, results, updateProgram);
router.delete("/delete/:_id", isAuthenticated, results, deleteProgram);

module.exports = router;
