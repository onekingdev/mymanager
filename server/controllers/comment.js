const { Comment } = require("../models/index/index");

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.addComment = asyncHandler(async (req, res) => {
  const { userid, post, comment } = req.body;
  const payload = {
    post: post,
    userid: userid,
    comment: comment,
  };
  let CommentObj = new Comment(payload);
  CommentObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
})

exports.getComment = asyncHandler(async (req, res) => {
  //   await Comment.find().populate("userid").
  try {
    const comment = await Comment.find();
    return res.status(200).json(comment);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.viewoneComment = asyncHandler(async (req, res) => {
  // await Comment.findOne({ _id: req.params.id }).populate("userid").populate("post")

  try {
    const camp = await Comment.find({ _id: req.params.id });
    return res.status(200).json(camp);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.delComment = asyncHandler(async (req, res) => {
  try {
    let result = await Comment.deleteOne({ _id: req.params.id });
    res.send({ msg: "Comment deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});



exports.commentByPost = asyncHandler(async (req, res) => {
  try {
    const comm = await Comment.find({ post: req.params.id });
    return res.status(200).json(comm);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
