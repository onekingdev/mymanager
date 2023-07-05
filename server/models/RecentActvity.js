const mongoose = require("mongoose");

const RecentActvity = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            //     //  required: true,
        },
        // campaignId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "/campaign",
        //     //   required: true,
        // },
        msg: {
            type: String,
            required: true,
        },

        image: { type: String },
        display_last_convo: {
            type: Number,
            default: 3
        },
        convo_from_last: {
            type: Number
        },
        at_least_one: {
            type: Number
        },
        most_recent: {
            type: Boolean,
            default: "off"
        },
        loop_notification: {
            type: Boolean,
            default: "off",
        },


    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("recentactivity", RecentActvity);
