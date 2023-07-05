const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");
const { CourseAssignment, CourseAssignmentSolution } = require("../models/index/index");

exports.createAssignment = asyncHandler(async (req, res) => {
  const payload = req.body;
  payload.userId = req.user._id;
  payload.courseId = req.params.id;
  payload.lessonId = req.params.lessonId;
  payload.solutionFile = "";
  try {
    const assignment = await CourseAssignment.create(payload);
    if (assignment) {
      return res.status(200).json(assignment);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateAssignment = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    const { id: courseId, assignmentId } = req.params;
    const updated = await CourseAssignment.findOneAndUpdate(
      {
        courseId: ObjectId(courseId),
        _id: ObjectId(assignmentId),
      },
      payload,
      {
        new: true,
      }
    );
    if (updated) {
      return res.status(200).json(updated);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getAssignmentByCourseLesson = asyncHandler(async (req, res) => {
  try {
    const { id: courseId, lessonId } = req.params;
    const data = await CourseAssignment.find({
      courseId: ObjectId(courseId),
      lessonId: ObjectId(lessonId),
    });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getAssignmentById = asyncHandler(async (req, res) => {
  try {
    const { id: courseId, assignmentId } = req.params;
    const data = await CourseAssignment.findOne({
      courseId: ObjectId(courseId),
      _id: ObjectId(assignmentId),
    });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.uploadAssignmentSolution = asyncHandler(async (req, res) => {
  try {
    const { solutionFile, description, comments } = req.body;
    const { id: courseId, assignmentId } = req.params;
    const { _id } = req.user;
    const payload = {
      courseId: ObjectId(courseId),
      assignmentId: ObjectId(assignmentId),
      learnerId: ObjectId(_id),
      solutionFile,
      description: description || "",
      comments: comments || "",
    };
    const submitted = await CourseAssignmentSolution.create(payload);
    if (submitted) {
      return res.status(201).json({ success: true });
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.assignmentGrading = asyncHandler(async (req, res) => {
  try {
    const { score, remarks } = req.body;
    const { id: courseId, assignmentId, solutionId } = req.params;
    const payload = {
      score,
      remarks,
    };
    const updated = await CourseAssignmentSolution.findOneAndUpdate(
      {
        _id: ObjectId(solutionId),
        courseId: ObjectId(courseId),
        assignmentId: ObjectId(assignmentId),
      },
      payload,
      { new: true }
    );
    if (updated) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});
