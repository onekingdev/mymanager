const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    addDisplayUrl,
    displayUrlList,
    updateDisplayUrl,
    delDisplayUrl

} = require("../controllers/DisplayUrl");



router.post("/add_display_url", isAuthenticated, addDisplayUrl);
router.get("/display_url_list", isAuthenticated, displayUrlList);
router.put("/update_display_url/:id", isAuthenticated, updateDisplayUrl);
router.delete("/del_display_url/:id", isAuthenticated, delDisplayUrl);








module.exports = router;

