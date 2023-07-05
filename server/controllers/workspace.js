const mongoose = require("mongoose");
const { Workspace } = require("../models/index/index");
const { Organization } = require("../models/index/index");
const { Board } = require("../models/index/index");
const { Kanban } = require("../models/index/index");
const { Contact } = require("../models/index/index");
const { User } = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const asyncHandler = require("express-async-handler");

const { shareEmailTemplate } = require("../constants/emailTemplates");
const { json } = require("body-parser");

const initTitles = ["Personal", "Business"];
const initBoards = [
  [
    { title: "TODO", color: "primary" },
    { title: "DO TODAY", color: "danger" },
    { title: "IN PROGRESS", color: "warning" },
    { title: "DONE", color: "success" },
  ],
  [
    { title: "OPEN", color: "primary" },
    { title: "IN PROGRESS", color: "info" },
    { title: "UNDER REVIEW", color: "warning" },
    { title: "COMPLETE", color: "success" },
    { title: "CANCELLED", color: "secondary" },
  ],
  [],
];

const defaultBoards = [
  { title: "TODO", color: "primary" },
  { title: "IN PROGRESS", color: "warning" },
  { title: "DONE", color: "success" },
];

const newTaskBoard = async (data) => {
  return new Promise((resolve, reject) => {
    const { id, title, color, userId } = data;
    const newBodyData = {
      id: id,
      title: title,
      color: color,
      userId: mongoose.Types.ObjectId(userId),
    };
    const newBoard = new Board(newBodyData);
    newBoard.save((err, boardRes) => {
      if (err) {
        console.log("Error: new board additon: ", title);
        reject({
          msg: err.message,
        });
      } else {
        resolve(boardRes._id);
      }
    });
  });
};

exports.newWorkspace = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { organization } = req.headers;

    let bodyData = req.body;
    bodyData = { ...bodyData, creatorType: user?.userType, organizationId: null };
    if (organization) {
      payload = {
        ...payload,
        organizationId: mongoose.Types.ObjectId(organization),
        creatorType: user.organizations.find((c) => c.organizationId.toString() === organization)
          .userType,
      };
    }
    await Workspace.create(bodyData);

    return res.status(201).json({
      success: "Workspace created successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getAllWorkspace = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { organization } = req.headers;

    let query = [
    {
      $match: {
        userId: mongoose.Types.ObjectId(user._id),
        isDelete: false,
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      },
    },
    {
      $lookup: {
        from: "boards",
        localField: "boards",
        foreignField: "_id",
        as: "boards",
      },
    },

    {
      $lookup: {
        from: "kanbans",
        let: { boardId: "$boards._id" },
        pipeline: [{ $match: { $expr: { $in: ["$boardId", "$$boardId"] } } }],
        as: "tasks",
      },
    },
    {
      $project: {
        _id:1,
        userId:1,
        title:1,
        background:1,
        isDelete:1,
        createdAt:1,
        creatorType:1,
        tasksCount:1,
        boards:1,
        tasks: {
          $filter: {
            input: "$tasks",
            cond: {
              $eq: ["$$this.isTemplate",false]
            }
          }
        }
      }
    },
    {
      $addFields: { tasksCount: { $size: "$tasks" } },
    },
    { $unwind: { path: "$boards", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "kanbans",
        localField: "boards._id",
        foreignField: "boardId",
        as: "boards.tasks",
      },
    },

    {
      $addFields: { "boards.count": { $size: "$boards.tasks" } },
    },
    {
      $project: {
        "boards.tasks": 0,
      },
    },
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        title: { $first: "$title" },
        background: { $first: "$background" },
        isDelete: { $first: "$isDelete" },
        createdAt: { $first: "$createdAt" },
        creatorType: { $first: "$creatorType" },
        tasksCount: { $first: "$tasksCount" },
        tasks: { $first: "$tasks" },
        boards: { $push: "$boards" },
      },
    },
    
  ]

    let workspaceData = await Workspace.aggregate(query);

    if (workspaceData.length > 0) {
      return res.status(200).send(workspaceData);
    } else {
      
      for (let i = 0; i < initTitles.length; i++) {
        new Promise((resolve, reject) => {
          const initialWorkspace = new Workspace({
            userId: user._id,
            title: initTitles[i],
            organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
            creatorType: organization
              ? user.organizations.find((x) => x.organizationId.toString() === organization)
                  .userType
              : user.userType,
            boards: [],
          });

          initialWorkspace.save((err, success) => {
            if (err) {
              reject({
                errors: { msg: err.message },
              });
            } else {
              let boardPromises = [];
              for (let j = 0; j < initBoards[i].length; j++) {
                const boardPromise = new Promise((resolve, reject) => {
                  const callNewBoardData = {
                    id: initBoards[i][j].title.toLowerCase().split(" ").join("-"),
                    title: initBoards[i][j].title,
                    color: initBoards[i][j].color,
                    userId: req.user._id,
                  };
                  newTaskBoard(callNewBoardData)
                    .then((res) => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                });
                boardPromises.push(boardPromise);
              }
              Promise.all(boardPromises)
                .then((res) => {
                  console.log("boardPromises--End", res);
                  success.boards = res;
                  success.save((err, updateRes) => {
                    if (err) {
                      console.log("Error: update workspace's board additon: ", boardRes._id);
                      reject({
                        msg: err.message,
                      });
                    } else {
                      console.log("Update workspace id: ", updateRes._id);
                      resolve(updateRes);
                    }
                  });
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
              resolve(success);
            }
          });
        });
      }
      
      workspaceData = await Workspace.aggregate(query)
      return res.status(200).send(workspaceData);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getNewWorkspace = asyncHandler(async (req, res) => {
  try {
    const {organization} = req.headers;
    const userId = req.user._id;
    //last 7 days
    let d = new Date();
    d.setDate(d.getDate()-7);
    let query = [
      {
        $match: {
          updatedAt:{$gt:d},
          isDelete: false,
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          //should get contact in here to match
        },
      },
      {
        $lookup: {
          from: "boards",
          localField: "boards",
          foreignField: "_id",
          as: "boards",
        },
      },
  
      {
        $lookup: {
          from: "kanbans",
          let: { boardId: "$boards._id" },
          pipeline: [{ $match: { $expr: { $in: ["$boardId", "$$boardId"] } } }],
          as: "tasks",
        },
      },
      {
        $project: {
          _id:1,
          userId:1,
          title:1,
          background:1,
          isDelete:1,
          createdAt:1,
          creatorType:1,
          tasksCount:1,
          boards:1,
          tasks: {
            $filter: {
              input: "$tasks",
              cond: {
                $eq: ["$$this.isTemplate",false]
              }
            }
          }
        }
      },
      {
        $addFields: { tasksCount: { $size: "$tasks" } },
      },
      { $unwind: { path: "$boards", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "kanbans",
          localField: "boards._id",
          foreignField: "boardId",
          as: "boards.tasks",
        },
      },
  
      {
        $addFields: { "boards.count": { $size: "$boards.tasks" } },
      },
      {
        $project: {
          "boards.tasks": 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          title: { $first: "$title" },
          background: { $first: "$background" },
          isDelete: { $first: "$isDelete" },
          createdAt: { $first: "$createdAt" },
          creatorType: { $first: "$creatorType" },
          tasksCount: { $first: "$tasksCount" },
          tasks: { $first: "$tasks" },
          boards: { $push: "$boards" },
        },
      },
      
    ]
    const workspaceData = await Workspace.aggregate(query);
    let newWorkspaceArr = [];
    let payload = [];
    const userData = await User.find({});
    for (const workspace of workspaceData) {
      if (
        workspace?.collaborators?.length &&
        workspace.collaborators.find((item) => item?.id == userId) &&
        new Date(workspace.updatedAt).getDate() + 4 > new Date().getDate()
      ) {
        newWorkspaceArr.push(workspace);
      }
    }
    if (newWorkspaceArr.length > 0) {
      newWorkspaceArr.map((workspaceItem) => {
        const user = userData.find(
          (userItem) => userItem.userId.toString() == workspaceItem.userId.toString()
        );
        payload.push({
          workspace: workspaceItem,
          assigner: user,
        });
      });
      return res.status(200).json(payload);
    } else {
      return res.status(404).json({ msg: "Workspace is not found" });
    }
    return res.status(200).json(workspaceData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getSharedWorkspace = async (req, res) => {
  try {
    const { userId } = req.params;
    const {organization} = req.headers;
    let query = [
      {
        $match: {
          //userId: mongoose.Types.ObjectId(user._id),
          //should get contactId and set in here 
          isDelete: false,
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        },
      },
      {
        $lookup: {
          from: "boards",
          localField: "boards",
          foreignField: "_id",
          as: "boards",
        },
      },
  
      {
        $lookup: {
          from: "kanbans",
          let: { boardId: "$boards._id" },
          pipeline: [{ $match: { $expr: { $in: ["$boardId", "$$boardId"] } } }],
          as: "tasks",
        },
      },
      {
        $project: {
          _id:1,
          userId:1,
          title:1,
          background:1,
          isDelete:1,
          createdAt:1,
          updatedAt:1,
          creatorType:1,
          tasksCount:1,
          boards:1,
          tasks: {
            $filter: {
              input: "$tasks",
              cond: {
                $eq: ["$$this.isTemplate",false]
              }
            }
          }
        }
      },
      {
        $addFields: { tasksCount: { $size: "$tasks" } },
      },
      { $unwind: { path: "$boards", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "kanbans",
          localField: "boards._id",
          foreignField: "boardId",
          as: "boards.tasks",
        },
      },
  
      {
        $addFields: { "boards.count": { $size: "$boards.tasks" } },
      },
      {
        $project: {
          "boards.tasks": 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          title: { $first: "$title" },
          background: { $first: "$background" },
          isDelete: { $first: "$isDelete" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          creatorType: { $first: "$creatorType" },
          tasksCount: { $first: "$tasksCount" },
          tasks: { $first: "$tasks" },
          boards: { $push: "$boards" },
        },
      },
      
    ]
    // const workspaceData = await Workspace.aggregate(query);
    // let newWorkspaceArr = [];

    // const userData = await User.find({});
    // for (const workspace of workspaceData) {
    //   if (
    //     workspace?.collaborators?.length &&
    //     workspace.collaborators.find((item) => item?.id == userId)
    //   ) {
    //     newWorkspaceArr.push(workspace);
    //   }
    // }
    // if (newWorkspaceArr.length > 0) {
    //   newWorkspaceArr.map((workspaceItem) => {
    //     const user = userData.find(
    //       (userItem) => userItem.userId.toString() == workspaceItem.userId.toString()
    //     );
    //     payload.push({
    //       workspace: workspaceItem,
    //       assigner: user,
    //     });
    //   });
      
    // } else {
    //   return res.status(500).json({ msg: "Workspace is not found" });
    // }
    const data = await Workspace.aggregate(query)
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getWorkspace = asyncHandler(async (req, res) => {
  try {
    const { workspaceId } = req.params;
    let query = [
      {
        $match: {
          _id:mongoose.Types.ObjectId(workspaceId)
         
        },
      },
      {
        $lookup: {
          from: "boards",
          localField: "boards",
          foreignField: "_id",
          as: "boards",
        },
      },
  
      {
        $lookup: {
          from: "kanbans",
          let: { boardId: "$boards._id" },
          pipeline: [{ $match: { $expr: { $in: ["$boardId", "$$boardId"] } } }],
          as: "tasks",
        },
      },
      {
        $project: {
          _id:1,
          userId:1,
          title:1,
          background:1,
          isDelete:1,
          createdAt:1,
          creatorType:1,
          tasksCount:1,
          boards:1,
          tasks: {
            $filter: {
              input: "$tasks",
              cond: {
                $eq: ["$$this.isTemplate",false]
              }
            }
          }
        }
      },
      {
        $addFields: { tasksCount: { $size: "$tasks" } },
      },
      { $unwind: { path: "$boards", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "kanbans",
          localField: "boards._id",
          foreignField: "boardId",
          as: "boards.tasks",
        },
      },
  
      {
        $addFields: { "boards.count": { $size: "$boards.tasks" } },
      },
      {
        $project: {
          "boards.tasks": 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          title: { $first: "$title" },
          background: { $first: "$background" },
          isDelete: { $first: "$isDelete" },
          createdAt: { $first: "$createdAt" },
          creatorType: { $first: "$creatorType" },
          tasksCount: { $first: "$tasksCount" },
          tasks: { $first: "$tasks" },
          boards: { $push: "$boards" },
        },
      },
      
    ]
   

   const workSpace =  Workspace.aggregate(query)
  if(workspace.length > 0 ){
    return res.status(201).json({data:workSpace[0]});
  }
  else{
    return res.status(201).json({data:{}});
  }
      
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err } },
    });
  }
});



exports.shareWorkspace = asyncHandler(async (req, res) => {
  try {
    const { id, assignedTo } = req.body;
    const { organization } = req.headers;

    const assignerName = req.user?.lastName
      ? req.user.firstName + req.user.lastName
      : req.user.firstName;
    let taskName = "",
      boardName = "";
    let workspaceData = await Workspace.findById(id).populate("boards");

    if (!workspaceData) {
      return res.status(404).json({
        errors: { common: { msg: `No workspace data found by id: ${id}` } },
      });
    }

    let tmpArr = [...workspaceData.collaborators];

    if (assignedTo?.length) {
      assignedTo.map((item) => {
        tmpArr.push({
          id: mongoose.Types.ObjectId(item.value),
          typeId: mongoose.Types.ObjectId(item.typeId),
        });
      });
    }
    workspaceData.collaborators = tmpArr;
    let tmpIdArr = tmpArr.map((item) => item.id);

    const selectedContacts = await Contact.find({ _id: { $in: tmpIdArr } });

    let org;
    if (organization) {
      org = await Organization.findById(mongoose.Types.ObjectId(organization));
    }

    for (let assignee of assignedTo) {
      let contact = selectedContacts.find(
        (item) => item._id.toString() == assignee.value.toString()
      );
      let link = organization
        ? `https://${org?.path}.mymanager.com/login/${assignee.typeId}/${req.user._id}/`
        : `https://me.mymanager.com/login/${assignee.typeId}/${req.user._id}/`;
      const emailBody = shareEmailTemplate(
        assignerName,
        taskName,
        boardName,
        workspaceData.title,
        link
      );

      SendMail({
        recipient: contact.email,
        from: "admin@mymanager.com",
        replyTo: "admin@mymanager.com",
        subject: workspaceData.title,
        body: emailBody,
      });
    }
    workspaceData.save((err, success) => {
      if (err) {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
      }
      return res.status(201).json({
        success: "Workspace updated successfull",
        data: success,
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.shareRevertWorkspace = asyncHandler(async (req, res) => {
  try {
    const { id, contactId } = req.body;
    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return res.status(404).json({
        errors: { common: { msg: `No workspace data found by id: ${id}` } },
      });
    }

    let tmpArr = workspace.collaborators.filter((x) => x.id.toString() !== contactId);
    workspace.collaborators = tmpArr;
    workspace.save((err, success) => {
      if (err) {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
      }
      return res.status(201).json({
        success: "Workspace updated successfull",
        data: success,
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
});

exports.updateWorkspace = asyncHandler(async (req, res) => {
  try {
    const { id, title } = req.body;
    await Workspace.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id), title:title });
    
    return res.status(201).json({
      success: "Workspace updated successfull",
    });
  } catch (error) {
    return res.status(400).json({
      errors: { common: { msg: error } },
    });
  }
});

exports.deleteWorkspace = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    await Workspace.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, { isDelete: true });
    return res.send({ msg: "The task workspace deleted successfully", success: true });
  } catch (err) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});
