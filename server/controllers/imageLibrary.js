const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ImageLibrary } = require("../models/index");

exports.getUserImages = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    try {
        const data = await ImageLibrary.find({userId});
        if(data){
            res.status(200).json({ success: true, data });
        }
        res.status(200).json({ success: false, message:"NOT FOUND" });
    } catch (error) {
        res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
})

exports.addImageLibrary = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {image} = req.body;
    const payload = {
        userId,
        image
    }
    console.log(payload)
    try {
        const data = await ImageLibrary.create(payload)
        if(data){
            res.status(200).json({ success: true });
        }
        else{
            res.status(200).json({ success: false, message:"Image didn't save" });
        }
    } catch (error) {
        res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
})