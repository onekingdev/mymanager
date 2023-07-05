const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const { PlnableWrkspace } = require("../models/index/index");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
 
exports.createWorkSpace = asyncHandler(async (req, res) => {
     try {
    const workspaceName = req.body.workspacename;

    const existingWorkspace = await PlnableWrkspace.findOne({ workspacename: workspaceName });
    if (existingWorkspace) {
        return res.status(400).json({ msg: "Workspace name already exists" });
    }

    const WorkspceData = req.body;
    WorkspceData.user = mongoose.Types.ObjectId(req.user._id);

    const newData = new PlnableWrkspace(WorkspceData);
    newData.save((err, data) => {
        if (err) {
            return res.send({ msg: err.message, success: false });
        }
        return res.send({ msg: "Workspace created successfully", success: true, data });
    });
}catch(error){
    return res.status(500).json({ msg: "Internal server error", success: false})
}
})


exports.Connect_with_myWorkSpace = async (req, res) => {
    await PlnableWrkspace.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.workSpaceList = asyncHandler(async (req, res) => {
    try {
        //  const { id: courseId, assignmentId } = req.params;
        const data = await PlnableWrkspace.find();
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(500).json({ success: false, message: "Something went wrong!" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
    }
});

exports.dltWorkspace = async (req, res) => {
    await PlnableWrkspace.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};
exports.viewoneWorkspace = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const getone = await PlnableWrkspace.findOne({
            _id: mongoose.Types.ObjectId(id),
        });

        if (getone === null) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        return res.status(200).json(getone);
    } catch (error) {
        return res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
});
exports.updatemyWorkSpace =asyncHandler( async (req, res) => {
    await PlnableWrkspace.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
});


exports.updatePlanableMyWorkSpace = asyncHandler(async (req, res) => {
    try {
        const Obj = req.body;
        const data = await PlnableWrkspace.findOneAndUpdate({ _id: req.params.id }, Obj);
        if (data) {
            return res.status(200).json({ success: true, message: `Success` });
        }
        return res.status(404).json({ success: false, message: `workspace not found` });
    } catch (error) {
        return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
    }
});