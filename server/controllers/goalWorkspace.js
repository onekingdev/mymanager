const { GoalWorkspace } = require("../models/index/index");
const mongoose = require("mongoose");
const defaultWorkspace = ["Personal", "Business"]

exports.createGoalWorkspace = async (req, res) => {
    const payload = req.body;
    const userId = req.user._id;
    try {
        payload.userId = mongoose.Types.ObjectId(userId);
        const goal = GoalWorkspace.create(payload)
        return res.send({ success: true, message: "Workspace Created Successfully" })
    } catch (err) {
        return res.send({ error: err.message.replace(/\"/g, ""), success: false });
    }
};

exports.fetchGoalWorkspace = async (req, res) => {
    const userId = req.user._id;
    try {
        let workspaceData = await GoalWorkspace.find({
            userId: userId,
            isDeleted: false,
        });
        if (workspaceData.length < 1) {
            let responseSent = false;
            defaultWorkspace.forEach((item, index) => {
                const initialUpdate = new GoalWorkspace({
                    userId: userId,
                    title: item,
                    isDeleted: false,
                });
                initialUpdate.save()
                    .then(() => {
                        // Document saved successfully
                        // Find the same data in the collection
                        return GoalWorkspace.find({
                            userId: userId,
                            isDeleted: false,
                        });
                    })
                    .then((result) => {
                        // Handle the query result
                        if (result.length >= defaultWorkspace.length && !responseSent) {
                            responseSent = true;
                            res.send({ success: true, data: result });
                        }
                    })
                    .catch((error) => {
                        // Handle any errors that occurred during saving or querying
                        res.status(500).json({ error: error.message });
                    });
            });
        } else {
            res.send({ success: true, data: workspaceData });
        }
    } catch (err) {
        res.send({ error: err.message.replace(/\"/g, ""), success: false });
    }
};

exports.removeGoalWorkspace = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        let deleteWorkspace = await GoalWorkspace.updateOne(
            { _id: mongoose.Types.ObjectId(id), userId: mongoose.Types.ObjectId(userId) },
            { isDeleted: true }
        );
        if (deleteWorkspace.modifiedCount < 1) {
            return res.send({
                msg: "unable to delete Workspace",
                success: false,
            });
        }
        return res.send({
            msg: "Workspace deleted successfully",
            success: true,
        });
    } catch (err) {
        return res.send({ error: err.message.replace(/\"/g, ""), success: false });
    }
};
