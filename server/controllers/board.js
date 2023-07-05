const mongoose = require("mongoose");
const { Board } = require("../models/index/index");
const { Workspace } = require("../models/index/index");
const asyncHandler = require("express-async-handler");

exports.newTaskBoard = asyncHandler(async (req, res) => {
  try {
    const { color, title, id, workspaceId } = req.body;
    const newBodyData = {
      userId: req.user._id,
      color: color,
      id: id,
      title: title,
    };
    const newBoard = new Board(newBodyData);
    const workspace = await Workspace.findOne({ _id: mongoose.Types.ObjectId(workspaceId) });
    newBoard.save((err, boardRes) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        let boardList = workspace.boards;
        boardList[boardList.length] = boardRes._id;
        workspace.boards = boardList;
        workspace.save((err, updateRes) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          } else {
            return res.status(201).json({
              success: "Status created successfull",
              data: boardRes,
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getTaskBoard = asyncHandler(async (req, res) => {
  try {
    const boardData = await Board.find({
      userId: mongoose.Types.ObjectId(req.user._id),
      isDelete: false,
    });
    return res.status(200).send(boardData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateTaskBoard = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { _id, title, color } = req.body;
    const board = await Board.find({ _id: mongoose.Types.ObjectId(_id) });
    if (!board) {
      return res.status(404).json({
        errors: { common: { msg: "No board data found by id: ", id } },
      });
    }
    boardData = board[0];
    const prevBoardName = boardData.title,
      prevBoardColor = boardData.color;
    boardData.title = title ? title : boardData.title;
    boardData.color = color ? color : boardData.color;
    boardData.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err } },
        });
      }
      return res.status(201).json({
        success: "Status updated successfull",
        data: success,
        prevBoardName,
        prevBoardColor,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
});

exports.updateTaskBoardTitle = asyncHandler(async (req, res) => {
  try {
    const { id, title } = req.body;
    const board = await Board.find({ _id: id });
    if (!board) {
      return res.status(404).json({
        errors: { common: { msg: "No board data found by id: ", id } },
      });
    }
    boardData = board[0];
    boardData.title = title ? title : boardData.title;
    boardData.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err } },
        });
      }
      return res.status(201).json({
        success: "Status updated successfull",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
});

exports.deleteTaskBoard = asyncHandler(async (req, res) => {
  try {
    const { _id, workspaceId } = req.params;
    console.log(_id, workspaceId);
    const deleteBoard = await Board.updateOne({ _id: _id }, { isDelete: true });
    const deletedBoard = await Board.findOne({ _id });
    if (deleteBoard.modifiedCount < 1) {
      return res.send({ msg: "not deleted", success: false });
    }
    const workspace = await Workspace.findOne({ _id: workspaceId });
    let boardList = workspace.boards.filter((x) => x.toString() !== _id);
    workspace.boards = boardList;
    workspace.save((err, updateRes) => {
      if (err) {
        console.log("Error: update workspace's board deletion: ", _id);
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        console.log("Update workspace id: ", updateRes._id);
        return res.status(201).json({
          success: "Status deleted successfully",
          data: deletedBoard,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
