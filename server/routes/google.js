const express = require("express");
const router = express.Router();


const {
    googleDeviceConnecter,
    googleDeviceCallback,




} = require("../controllers/google");



router.get("/googleDeviceConnecter", googleDeviceConnecter);
router.post("/googleDeviceCallback/:user_code", googleDeviceCallback);






module.exports = router;

