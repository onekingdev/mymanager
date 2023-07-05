const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const PlnableWrkspaceSchema = new Schema(
    {

        workspacename: {
            type: String,
        },

        timezone: {
            type: String,
        },
        socialplatform: {
            type: String,
            default: false
        },
        facebookData: [
            {
                profileName: { type: String },
                email: { type: String },
                profileImg: { type: String },
                accessToken: { type: String },
                category: { type: String },
                userId: { type: Number },
                pageId: { type: Number },
                pageName: { type: String }
            }
        ],
        // type:String
        //},
        googleData: [
            {
                profileName: { type: String },
                email: { type: String },
                profileImg: { type: String },
                accessToken: { type: String },
                category: { type: String },
                userId: { type: Number },
                pageId: { type: Number },
                pageName: { type: String }
            }
        ],

        twitterData: [
            {
                profileName: { type: String },
                email: { type: String },
                profileImg: { type: String },
                accessToken: { type: String },
                category: { type: String },
                userId: { type: Number },
                pageId: { type: Number },
                pageName: { type: String }
            }
        ],
        linkedlnData: [
            {
                profileName: { type: String },
                email: { type: String },
                profileImg: { type: String },
                accessToken: { type: String },
                category: { type: String },
                userId: { type: Number },
                pageId: { type: Number },
                pageName: { type: String }
            }
        ],
        instaData: [{
            profileName: { type: String },
            email: { type: String },
            profileImg: { type: String },
            accessToken: { type: String },
            category: { type: String },
            userId: { type: Number },
            pageId: { type: Number },
            pageName: { type: String }
        }],
        youtubeData: [{
            profileName: { type: String },
            email: { type: String },
            profileImg: { type: String },
            accessToken: { type: String },
            category: { type: String },
            userId: { type: Number },
            pageId: { type: Number },
            pageName: { type: String }
        }],
        tiktokData: [{
            profileName: { type: String },
            email: { type: String },
            profileImg: { type: String },
            accessToken: { type: String },
            category: { type: String },
            userId: { type: Number },
            pageId: { type: Number },
            pageName: { type: String }
        }],
        userId: {
            type: ObjectId,
            //   required: true,
            ref: "auth",
        },
        data_access_expiration_time: {
            type: String
        },
        expiresIn: {
            type: String

        }

    },



    { timestamps: true }
);

module.exports = mongoose.model("pworkspace", PlnableWrkspaceSchema);
