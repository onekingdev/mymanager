const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoSchema = new Schema(
    {
        displayUrl: {
            type: String,
        },
        userId: {
            type: String,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("autolead", AutoSchema);
