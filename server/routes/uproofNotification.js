const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    addUproofNoti,
    listUproofNoti,
    updateUproofNoti,
    getoneUproofNoti,
    dltUproofNoti
    
} = require("../controllers/uproofNotification");

 
 
 router.post("/add_uproof_noti",isAuthenticated, addUproofNoti);
 router.get("/list_uproof_noti", isAuthenticated,listUproofNoti);
 router.get("/getone_uproof_noti/:id", isAuthenticated,getoneUproofNoti);
 router.put("/update_uproof_noti/:id", isAuthenticated,updateUproofNoti);
 router.delete("/dlt_uproof_noti/:id", isAuthenticated,dltUproofNoti);



 

module.exports = router;

