const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");

const {
    addRecentActvty,
    getRecentActvity,
    delRecentActvity,
    viewoneRecentActvity,
    updateRecentActvity,
} = require("../controllers/recentActivity");




router.post("/add_recent_actvty", isAuthenticated, singleUploadControl, addRecentActvty);
 router.get("/get_RecentActvity", isAuthenticated, getRecentActvity);


router.delete("/del_RecentActvity/:id", isAuthenticated, delRecentActvity);
router.get("/viewone_RecentActvity/:id", isAuthenticated, viewoneRecentActvity);

router.put("/update_RecentActvity/:id", isAuthenticated, updateRecentActvity);



module.exports = router;
