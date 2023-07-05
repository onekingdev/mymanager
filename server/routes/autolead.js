const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    addAutoLead,
    autoleadUrlList,
    updateAutoLead,
    delAutoLead,
    viewoneAutoLead

} = require("../controllers/autolead");



router.post("/add_auto_lead", isAuthenticated, addAutoLead);
router.get("/autolead_url_list", isAuthenticated, autoleadUrlList);
router.put("/update_auto_lead/:id", isAuthenticated, updateAutoLead);
router.delete("/del_auto_lead/:id", isAuthenticated, delAutoLead);
router.get("/viewone_auto_lead/:id", isAuthenticated, viewoneAutoLead);








module.exports = router;

