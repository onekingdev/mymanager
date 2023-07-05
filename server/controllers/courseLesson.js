const { CourseLesson, Course } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.createLesson = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const lessonPayload = {
      userId: req.user._id,
      lessonName: req.body.lessonName,
      courseId: courseId,
    };
    const isExist = await Course.find({ _id: courseId })
    if (isExist.length) {
      const rank = new CourseLesson(lessonPayload);
      rank.save((err, data) => {
        if (err) {
          return res.send({ msg: err, success: false });
        }
        return res.send({ msg: "Course Lesson created successfully", success: true });
      });
    } else {
      return res.send({ msg: `Course Lesoon does not exist`, success: false });
    }
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

//     const CourseResponse = await Course.create(coursePayload);
//     if (CourseResponse) {
//         return res.status(200).json({
//             message: "Course Added!",
//             success: true,
//             CourseResponse,
//         });
//     }
//     return res.status(500).json({
//         message: "Course Not Added!",
//         success: false,
//     });
// } catch (error) {
//     res.send({ success: false, message: error.message.replace(/"/g, "") });
// }
// });
exports.updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.file) {
      const courseImage = await GoogleCloudStorage.upload(req.file);
      req.body.courseImage = courseImage;
    }
    const update = await Course.updateOne({ _id: mongoose.Types.ObjectId(id) }, req.body, {
      new: true,
    });
    if (update.acknowledged) {
      return res.status(200).json({ success: true });
    }
    return res.status(404).json({ success: false, message: "Course not updated!" });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const update = await CourseLesson.updateOne({ _id: mongoose.Types.ObjectId(id) }, req.body, {
      new: true,
    });
    if (update.acknowledged) {
      return res.status(200).json({ success: true });
    }
    return res.status(404).json({ success: false, message: "Lesson not updated!" });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.getLesson = async (req, res) => {
  // const userId = req.user._id;
  const courseId = req.params.courseId;
  try {
    const data = await CourseLesson.find({courseId: courseId }).populate({
      path: "videoId",
      model: "courseVideo",
      // select: '-videoUrl',
      // match: { isDeleted: false },
    }).populate({
      path: "quiz",
      model: "courses-quiz",
      // select: '-quiz',
      // match: { isDeleted: false },
    });
    if (data.length > 0) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not data for this user",
      success: false,
    });


  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};
exports.progressionDetails = async (req, res) => {
  const userId = req.user._id;
  try {
    const data = await Progression.find({
      userId: mongoose.Types.ObjectId(userId),
      isDeleted: false,
    }).populate({
      path: "categoryId",
      model: "category",
      match: { isDeleted: false },
    });
    if (data.length > 0) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not data for this Chapter",
      success: false,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};
exports.updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const update = await CourseLesson.updateOne({ _id: mongoose.Types.ObjectId(id) }, req.body, {
      new: true,
    });
    if (update.modifiedCount) {
      return res.status(200).json({ success: true });
    }
    return res.status(404).json({ success: false, message: "Lesson Video not updated!" });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});



exports.deleteLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  try {
    const data = await CourseLesson.findOne({ _id: lessonId });
    if (!data) {
      return res.status(404).json({ success: false, message: "No Such Lesson Found" });
    }
    await CourseLesson.deleteOne({ _id: lessonId });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
