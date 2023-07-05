const mongoose = require("mongoose");
const { Kanban, KanbanTaskActivity, KanbanLastSeen } = require("../models/index/index");
const { Board } = require("../models/index/index");
const { Workspace } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const asyncHandler = require("express-async-handler");

exports.newTaskKanban = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let bodyData = req.body;
    bodyData = {
      ...bodyData,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
      userId: user._id,
    };
    const query = await Kanban.find({ isDelete: false });

    query.countDocuments((err, count) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      bodyData.id = count + 1;
      const newKanban = new Kanban(bodyData);
      // eslint-disable-next-line no-unused-vars
      newKanban.save(async (err2, success) => {
        if (err2) {
          return res.status(500).json({
            errors: { common: { msg: err2.message } },
          });
        } else {
          let workspace = await Workspace.findById(req.body.workspaceId);
          workspace.count = workspace.count ? workspace.count++ : 1;
          await workspace.save();
        }
        return res.status(201).json({
          success: "New Task created successfully",
          data: success,
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getTaskKanban = asyncHandler(async (req, res) => {
  try {
    Kanban.find({
      isDelete: false,
    })
      .populate("boardId")
      .exec((err, kanbanData) => {
        let data = [];
        if (kanbanData?.length > 0) {
          data = kanbanData.map((task) => {
            const taskString = JSON.stringify(task);
            const newTask = JSON.parse(taskString);
            newTask.boardId = task.boardId.id;
            return newTask;
          });
          // kanbanData.sort((a, b) => {
          //   return parseInt(a.id) - parseInt(b.id);
          // });
        }
        return res.status(200).send(kanbanData);
      });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateTaskKanban = asyncHandler(async (req, res) => {
  try {
    let url;

    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }

    const selectedTask = JSON.parse(req.body.selectedTask);
    const data = JSON.parse(req.body.data);

    const { dueDate, labels, description, assignedTo } = req.body;
    const { _id, id, boardId, attachments, comments } = selectedTask;
    const { title } = data;

    const kanbanList = await Kanban.find({ _id });
    const boardList = await Board.find({ _id: boardId });

    const kanban = kanbanList[0];
    const newBoardId = boardList[0]._id;

    if (!kanban) {
      return res.status(404).json({
        errors: { common: { msg: "No kanban data found by id: ", _id } },
      });
    }

    let labelArray = [];
    labelArray = labels.split(",");

    kanban.id = id || kanban.id;
    kanban.title = title || kanban.title;
    kanban.labels = labels ? labelArray : kanban.labels;
    kanban.boardId = newBoardId || kanban.boardId;
    kanban.description =
      description !== "undefined" && description ? description : kanban.description;
    kanban.dueDate = dueDate !== "undefined" && dueDate ? dueDate : kanban.dueDate;
    kanban.attachments = attachments || kanban.attachments;
    kanban.comments = comments || kanban.comments;
    kanban.assignedTo = assignedTo.length ? JSON.parse(assignedTo) : kanban.assignedTo;
    kanban.coverImage = url || kanban.coverImage;

    kanban.save(async (err2, success) => {
      if (err2) {
        return res.status(500).json({
          errors: { common: { msg: err2.message } },
        });
      } else {
        return res.status(200).json({
          success: "kanbanTask updated successful",
          data: success,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
});

exports.updateTaskBoardId = asyncHandler(async (req, res) => {
  try {
    const { taskId, boardId, newBoardId } = req.body;

    const kanbanList = await Kanban.find({ _id: taskId });
    const boardList = await Board.find({});

    const prevBoardName = boardList.find((x) => x._id == boardId)?.title;
    const prevBoardColor = boardList.find((x) => x._id == boardId)?.color;
    const currentBoardName = boardList.find((x) => x._id == newBoardId)?.title;
    const currentBoardColor = boardList.find((x) => x._id == newBoardId)?.color;

    const kanban = kanbanList[0];

    if (!kanban) {
      return res.status(404).json({
        errors: { common: { msg: "No kanban data found by id: ", taskId } },
      });
    }

    kanban.boardId = mongoose.Types.ObjectId(newBoardId) || kanban.boardId;
    kanban.save(async (err2, success) => {
      if (err2) {
        return res.status(500).json({
          errors: { common: { msg: err2.message } },
        });
      } else {
        return res.status(200).json({
          success: "kanbanTask updated successful",
          data: success,
          prevBoardName,
          prevBoardColor,
          currentBoardName,
          currentBoardColor,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
});

exports.reorderTaskKanban = asyncHandler(async (req, res) => {
  try {
    const { taskId, targetTaskId } = req.body;
    const KanbanData = await Kanban.find({});
    const srcIndex = KanbanData.filter((x) => x._id.toString() === taskId);
    const targetIndex = KanbanData.filter((x) => x._id.toString() === targetTaskId);
    const srcIndexData = srcIndex[0];
    const targetIndexData = targetIndex[0];
    const srcIndexDataInt = srcIndexData.id;
    const targetIndexDataInt = targetIndexData.id;

    // Exchange the task id for the reorder option
    if (srcIndexDataInt > targetIndexDataInt) {
      for (let i = srcIndexDataInt - 1; i >= targetIndexDataInt; i--) {
        const momentKanban = KanbanData.filter((x) => x.id === i);
        const momentKanbanData = momentKanban[0];
        const CorrectId = i + 1;
        momentKanbanData.id = CorrectId;
        await momentKanbanData.save();
      }
    } else if (srcIndexDataInt < targetIndexDataInt) {
      for (let i = srcIndexDataInt + 1; i <= targetIndexDataInt; i++) {
        const momentKanban = KanbanData.filter((x) => x.id === i);
        const momentKanbanData = momentKanban[0];
        const CorrectId = i - 1;
        momentKanbanData.id = CorrectId;
        await momentKanbanData.save();
      }
    }
    srcIndexData.id = targetIndexDataInt;
    await srcIndexData.save();
    return res.status(201).json({
      success: "The task kanban recorded successful",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Clear the kanban tasks for the selected board by update the isDelete flag to true
exports.clearTasks = asyncHandler(async (req, res) => {
  try {
    const { boardId } = req.params;
    const deleteByBoardId = await Kanban.updateMany(
      {
        boardId,
      },
      {
        isDelete: true,
      }
    );
    if (deleteByBoardId.modifiedCount >= 1) {
      return res.status(201).json({
        msg: "The task kanban cleared successfully",
        success: true,
      });
    }
    return res.send({ msg: "not cleared", success: false });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deleteTaskKanban = asyncHandler(async (req, res) => {
  try {
    const { tasks } = req.body.source;
    const ids = tasks.map(x=>mongoose.Types.ObjectId(x))
    await Kanban.updateMany(
      {
        _id: {$in:[...ids]},
      },
      {
        isDelete: true,
      }
    );
    return res.status(200).json({
      msg: {
        comment: "succcessfully deleted",
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// ** Task Activity
exports.newTaskActivity = asyncHandler(async (req, res) => {
  try {
    const {organization} = req.headers;
    const bodyData = req.body;
    const newActivity = new KanbanTaskActivity({
      ...bodyData,
      userId: mongoose.Types.ObjectId(req.user._id),
    });
    newActivity.save(async (err2, success) => {
      if (err2) {
        console.log(err2);
        return res.status(500).json({
          errors: { common: { msg: err2.message } },
        });
      } else {
        return res.status(201).json({
          success: "New Task created successfully",
        });
      }
    });
  } catch (err) {
  
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getTaskActivityByWorkspaceId = asyncHandler(async (req, res) => {
  try {
    const queryData = req.query; // Filter by time, column and workspaceId
    const { time, column, workspaceId } = queryData;
    const startTime = new Date(time),
      endTime = new Date(time);
    const filtered = await KanbanTaskActivity.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(req.user._id),
              // createdAt: {
              //   $gte: new Date(startTime),
              // },
              // createdAt: {
              //   lt: new Date(endTime),
              // },
              // column: column,
              // workspaceId: mongoose.Types.ObjectId(workspaceId),
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "userId",
          localField: "userId",
          as: "userInfo",
        },
      },
      {
        $lookup: {
          from: "workspaces",
          localField: "workspaceId",
          foreignField: "_id",
          as: "workspaceInfo",
        },
      },
      {
        $lookup: {
          from: "kanbans",
          localField: "kanbanId",
          foreignField: "_id",
          as: "kanbanInfo",
        },
      },
    ]);
    return res.status(201).json({
      data: filtered,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getLastActivity = asyncHandler(async (req, res) => {
  try {
    const bodyData = req.body;
    const queryData = req.query;
    return res.status(201).json({
      success: "New Task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateTaskActivity = asyncHandler(async (req, res) => {
  try {
    const bodyData = req.body;
    return res.status(201).json({
      success: "New Task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deleteTaskActivity = asyncHandler(async (req, res) => {
  try {
    const bodyData = req.body;
    return res.status(201).json({
      success: "New Task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// ** Last Seen

exports.getLastViewed = asyncHandler(async (req, res) => {
  try {
    const queryData = req.query; // Filter by time, column and workspaceId
    const { workspaceId } = queryData;
    console.log("workspaceId", workspaceId);
    const filtered = await KanbanLastSeen.aggregate([
      {
        $match: {
          $and: [
            {
              workspaceId: mongoose.Types.ObjectId(workspaceId),
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "userInfo",
        },
      },
      {
        $lookup: {
          from: "workspaces",
          localField: "workspaceId",
          foreignField: "_id",
          as: "workspaceInfo",
        },
      },
    ]);
    console.log(filtered);
    return res.status(201).json({
      data: filtered,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.setLastViewed = asyncHandler(async (req, res) => {
  try {
    const bodyData = req.body;
    const userId = req.user._id;
    const { workspaceId } = bodyData;

    const lastViewData = await KanbanLastSeen.findOne({ userId, workspaceId });

    if (lastViewData) {
      // Update data
      lastViewData.time = new Date();
      lastViewData.save(async (err, success) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        } else {
          return res.status(201).json({
            success: "Last Seen data updated successfully",
          });
        }
      });
    } else {
      // Create new
      const newLastSeen = new KanbanLastSeen({ userId, workspaceId, time: new Date() });
      newLastSeen.save(async (err2, success) => {
        if (err2) {
          return res.status(500).json({
            errors: { common: { msg: err2.message } },
          });
        } else {
          return res.status(201).json({
            success: "Last Seen data updated successfully",
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
