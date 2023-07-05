const mongoose = require("mongoose");

const imageLibrarySchema = new mongoose.Schema(
    {
        userId:{
            type:String
        },
        image:{
            type:String
        }
    },
    {timestamps:true,
        versionKey: false}
)
module.exports = mongoose.model("image-library", imageLibrarySchema);