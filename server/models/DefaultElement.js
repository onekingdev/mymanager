const mongoose = require("mongoose");

const { Schema } = mongoose;
const defaultElementsSchema = new Schema(
    {
        id:{
            type:String
        },
        elementTitle:{
            type:String
        },
        elementParent:{
            type:String,
            default:null
        },
        navLink:{
            type:String
        }
    },
    { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("default-element", defaultElementsSchema);