const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const {
  addCompose,
  getCompose,
  viewoneCompose,
  delCompose,
  updateCompose,
  fbSchdulePost,
   
  // get_compose_schdule
} = require("../controllers/compose");



router.post("/add_compose", isAuthenticated, singleUploadControl, addCompose);
router.get("/get_compose/:id", isAuthenticated, getCompose);
router.get("/viewone_compose/:id", isAuthenticated, viewoneCompose);
router.get("/del_compose/:id", isAuthenticated, delCompose);
router.put("/update_compose/:id", isAuthenticated, updateCompose);
router.post("/facebook_schdule_post", isAuthenticated, fbSchdulePost);

 

module.exports = router;
