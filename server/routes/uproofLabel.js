const express = require("express");
const router = express.Router();
 
const isAuthenticated = require("../middleware/auth");
const {
    addLabel,
    getLabel,
    viewoneLabel,
    editLabel,
    delLabel
    
} = require("../controllers/uproofLabel");

 
 
 router.post("/add_label",isAuthenticated, addLabel);
 router.get("/get_label",isAuthenticated, getLabel);
 router.get("/viewone_label/:id",isAuthenticated, viewoneLabel);
 router.put("/edit_label/:id",isAuthenticated, editLabel);
 router.delete("/del_label/:id",isAuthenticated, delLabel);



 

module.exports = router;

