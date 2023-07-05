const { Course } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.createCourse = asyncHandler(async (req, res) => {

  try {
    const courseImage = await GoogleCloudStorage.upload(req.file);
    let progression = []
    if (req.body.progression) {
      progression = JSON.parse(req.body.progression);
    }
    const coursePayload = {
      userId: req.user._id,
      permission: req.body.permission,
      shopId: req.body.shopId,
      courseName: req.body.courseName,
      coursePrice: req.body.coursePrice,
      startDate: req.body.startDate,
      courseAccess: progression,
      endDate: req.body.endDate,
      description: req.body.description,
      courseType: req.body.courseType,
      courseImage: courseImage,
      courseCategory: req.body.courseCategory,
    };
    const CourseResponse = await Course.create(coursePayload);
    if (CourseResponse) {
      return res.status(200).json({
        message: "Course Added!",
        success: true,
        CourseResponse,
      });
    }
    return res.status(500).json({
      message: "Course Not Added!",
      success: false,
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getCourses = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const data = await Course.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Course.findOne(mongoose.Types.ObjectId(id));
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "No Course Found!" });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.file) {
      const courseImage = await GoogleCloudStorage.upload(req.file);
      req.body.courseImage = courseImage;
    }
    if (req.body.progression) {
      progression = JSON.parse(req.body.progression);
      req.body.courseAccess = progression
    }
    Course.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, req.body, {
      new: true,
    }).then((updatedDocument) => {
      if (!updatedDocument) {
        return res.status(404).json({ success: false, message: "Course not updated!" })
      }
      return res.status(200).json({ success: true, data: updatedDocument })
    }).catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.coursesList = asyncHandler(async (req, res) => {
  try {
    let { shopId, permission } = req.query;
    let permissions = [];
    if (permission === "all") {
      permissions = ["private", "public"];
    } else {
      permissions = [permission];
    }
    let q;
    q = {
      shopId: mongoose.Types.ObjectId(shopId),
      permission: { $in: permissions },
    };
    const courses = await Course.aggregate([
      {
        $match: q,
      },
    ]);
    return res.status(200).json({ success: true, data: courses });
  }
  catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Course.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ success: false, message: "No Role Found" });
    }
    await Course.deleteOne({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
