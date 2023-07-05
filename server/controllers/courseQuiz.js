const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { CourseQuiz, CourseQuizSolution,CourseLesson } = require("../models/index/index");

exports.createQuiz = asyncHandler(async (req, res) => {
  const payload = req.body;
  payload.userId = req.user._id;
  payload.lessonId = req.params.lessonId;

  try {
    const quiz = await CourseQuiz.create(payload);
    if (quiz) {
      let updateLesson = await CourseLesson.updateOne(
        {
          _id: mongoose.Types.ObjectId(req.params.lessonId),
          userId: mongoose.Types.ObjectId(req.user._id),
        },
        {
          $push: { quiz: quiz._id },
        }
      );
      if (updateLesson.modifiedCount < 1) {
        return res.send({
          msg: "Quiz Added but not updated in Lessons",
          success: false,
        });
      }
      else {
        return res.send({
          msg: "Quiz Added Successfully",
          success: true,
          quiz,
        });
      }
    }
    else {
      return res.status(500).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CourseQuiz.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ success: false, message: "No Such Quiz Found" });
    }
    await CourseQuiz.deleteOne({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.editQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CourseQuiz.updateOne({ _id: id },req.body,{new:true});
    if (data.modifiedCount>0) {
      return res.status(200).json({ success: true, message: "Quiz Updated Successfully" });
    }
    return res.status(400).json({ success: false,message:"no Quiz found"});
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getQuizByCourseLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  try {
    const quiz = await CourseQuiz.find(
      { lessonId: mongoose.Types.ObjectId(lessonId) },
      { solution: false, __v: false }
    );
    if (quiz) {
      return res.status(200).json(quiz);
    } else {
      return res.status(404).json({
        success: false,
        message: "No quiz found for this course lesson",
      });
    }
  } catch (error) {
    return res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.submitQuizSolution = asyncHandler(async (req, res) => {
  try {
    const { answer } = req.body;
    const { id: courseId, quizId } = req.params;
    const { _id: learnerId } = req.user;
    const payload = {
      courseId,
      quizId,
      learnerId,
      answer,
    };
    const submitted = await CourseQuizSolution.create(payload);
    if (submitted) {
      return res.status(201).json({ success: true });
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.checkQuizSolution = asyncHandler(async (req, res) => {
  const { id, quizId } = req.params;
  let { answer } = req.body;
  answer = answer.trim();
  try {
    const quiz = await CourseQuiz.findOne({
      courseId: mongoose.Types.ObjectId(id),
      quizId: mongoose.Types.ObjectId(quizId),
      solution: { $regex: answer, $options: "i" },
    });
    if (quiz) {
      return res.status(200).json({ isAnswerCorrect: true });
    } else {
      return res.status(200).json({ isAnswerCorrect: false });
    }
  } catch (error) {
    return res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.submitAndCheckQuizScore = asyncHandler(async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const { _id: learnerId } = req.user;

    const quizIds = req.body.map((q) => q.quizId);

    const solutions = await CourseQuiz.find(
      {
        _id: { $in: quizIds },
      },
      { _id: 1, solution: 1 }
    );

    const payload = req.body.map((data) => {
      const originalSolution = solutions.find((o) => o._id.toString() === data.quizId.toString());
      let isCorrect = false;
      if (originalSolution.solution.trim().toLowerCase() === data.answer.trim().toLowerCase()) {
        isCorrect = true;
      }
      return {
        courseId,
        quizId: data.quizId,
        learnerId,
        answer: data.answer,
        correctSolution: originalSolution.solution,
        isCorrect,
      };
    });
    await CourseQuizSolution.create(payload);
    const response = payload.map((p) => {
      return { userAnswer: p.answer, correctSolution: p.correctSolution, isCorrect: p.isCorrect };
    });
    return res.send(response);
  } catch (error) {
    return res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});



