const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
  addCampaign,
  getCampaign,
  viewoneCampaign,
  delCampign,
  updateCampaign,
  delMultipleCampign
} = require("../controllers/campaign");

router.post("/add_Campaign", isAuthenticated, addCampaign);
router.get("/get_Campaign", isAuthenticated, getCampaign);
router.get("/viewone_Campaign/:id", isAuthenticated, viewoneCampaign);
router.get("/del_campign/:id", isAuthenticated, delCampign);
router.put("/update_campaign/:id", isAuthenticated, updateCampaign);
router.delete("/del_multiple_campign/:idsToDelete", isAuthenticated, delMultipleCampign);


module.exports = router;
