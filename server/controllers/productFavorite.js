const { ProductFavorite, Product, Membership } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.addToFavorite = asyncHandler(async(req,res)=>{
    const {userId,product,membership,userType} = req.body
    try {
        const prev = await ProductFavorite.find({userId:userId})
        
        if(prev.length===0){
            if(product){
                await ProductFavorite.create({userId,products:[product],userType})
            }
            else{
                await ProductFavorite.create({userId,membership:[membership],userType})
            }
            
        }
        else{
            if(product){
                await ProductFavorite.findOneAndUpdate({userId:userId},{$push:{products:product}})
            }
            else{
                await ProductFavorite.findOneAndUpdate({userId:userId},{$push:{memberships:membership}})
            }
            
        }
        
        return res.status(200).json({ success: true, message: "Product added to favorite successfully" });
    } catch (error) {
        return res.send({ error: error.message.replace(/\"/g, ""), success: false });
    }
})

exports.deleteFromFavorite = asyncHandler(async(req,res)=>{
    const {id,userId,type} = req.body
    try {
        if(type==='product'){
            await ProductFavorite.findOneAndUpdate({userId:userId},{$pullAll:{products:[id]}})
        }
        else{
            await ProductFavorite.findOneAndUpdate({userId:userId},{$pullAll:{memberships:[id]}})
        }
        
        return res.status(200).json({ success: true, message: "Product deleted from favorite successfully" });
    } catch (error) {
        return res.send({ error: error.message.replace(/\"/g, ""), success: false });
    }
})

exports.getMyFavorites = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        let data;
        data = await ProductFavorite.find({userId:id})
        .populate({path:"products",model:Product})
        .populate({path:"memberships",model:Membership})
        return res.status(200).json({ success: true, data:data });
    } catch (error) {
        return res.send({ error: error.message.replace(/\"/g, ""), success: false });
    }
})

