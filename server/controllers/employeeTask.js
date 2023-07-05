const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { EmployeeTask, EmployeeTaskRecipient } = require("../models/index/index");

//create new task
exports.createTask = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    payload = { ...payload, userId: mongoose.Types.ObjectId(req.user._id) };
    const { empIds } = req.body;
    const employeeTaskData = await EmployeeTask.create(payload);
    
    const allEmp = empIds.map((e) => {
      return {
        taskId: employeeTaskData._id,
        employeeId: e,
        properties: [...employeeTaskData.properties],
        status: "pending",
        history: [
          {
            by: "employer",
            note: "",
            status: "pending",
          },
        ],
      };
    });
    const insertedEmpTasks = await EmployeeTaskRecipient.insertMany(allEmp);
    return res.status(201).send(employeeTaskData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

//get tasks by user
exports.getTasksByUserId = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { type } = req.params; // user, employee from user side
    let getTasks = await EmployeeTask.find({
      userId: mongoose.Types.ObjectId(_id),
    });
    const taskIds = getTasks.map((el) => el._id);

    if (type === "task") {
      // let userTasks = await EmployeeTaskRecipient.aggregate([
      //   {
      //     $match: { taskId: { $in: taskIds } },
          
      //   },
      //   {
      //     $group: {
      //       _id: {taskId:"$taskId"},
      //       //approvedTasks: { $match: { status: "approved" }, $count: {} },
      //       tasks:{$push:"$$ROOT"},
      //       //approved:{$count:{status:"approved"}}
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "employee-tasks",
      //       localField: "_id.taskId",
      //       foreignField: "_id",
      //       as: "originTask",
      //       pipeline: [
      //         {
      //           $project: {
                  
      //       createdAt: 0,
      //       updatedAt: 0,
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     $project: {
            
      // _id:0
      //     },
      //   },
        
        
      // ]);
      // let approvedUser = await EmployeeTaskRecipient.aggregate([
      //   {
      //     $match: { taskId: { $in: taskIds },status:"approved" },
          
      //   },
        
      //   {
      //     $group: {
      //       _id: "$taskId",
      //       //approvedTasks: { $match: { status: "approved" }, $count: {} },
      //       approved:{$count:{}},
      //       //approved:{$count:{status:"approved"}}
      //     },
      //   },
        
      // ]);
      let data = await EmployeeTask.find({"userId":mongoose.Types.ObjectId(_id)})
      
      return res.status(200).send(data);
    } else {
      let employeeTasks = await EmployeeTaskRecipient.aggregate([
        {
          $match: { taskId: { $in: taskIds } },
        },
        {
          $lookup: {
            from: "employee-tasks",
            localField: "taskId",
            foreignField: "_id",
            as: "originTask",
            pipeline: [
              {
                $project: {
                  
            createdAt: 0,
            updatedAt: 0,
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$employeeId",
           tasks:{$push:"$$ROOT"}
          },
        },
        
      //   {
      //     $project: {
            
      // _id:0
      //     },}
      ]);
      let approvedEmployee = await EmployeeTaskRecipient.aggregate([
        {
          $match: { taskId: { $in: taskIds },status:"approved" },
          
        },
        
        {
          $group: {
            _id: "$employeeId",
            //approvedTasks: { $match: { status: "approved" }, $count: {} },
            approved:{$count:{}},
            //approved:{$count:{status:"approved"}}
          },
        },
        
        
      ]);
      const result = {
        employeeTasks,approvedEmployee
      };
      return res.status(200).send({ data: result });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.markTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status, note } = req.body;
  //const { _id } = req.user;
  let markingDoneBy = "user";
  let markTaskStatus;
  // req.user.user.employeeId = "63b4644b4ea6b1a175ed0223";
  try {
    if (req.user.user.employeeId) {
      markingDoneBy = "employee";
    }

    if (markingDoneBy === "employee") {
      const update = {
        $set: {
          status: status,
        },
        $push: {
          history: {
            by: "employee",
            note: note,
            status: status,
          },
        },
      }
      markTaskStatus = await EmployeeTaskRecipient.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(mongoose.Types.ObjectId(taskId)),
        },
        update
        ,
        { new: true }
      );
    } else {
      const update = {
        $set: {
          status: status,
        },
        $push: {
          history: {
            by: "employer",
            note: note,
            status: status,
          },
        },
      }
      markTaskStatus = await EmployeeTaskRecipient.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(mongoose.Types.ObjectId(taskId)),
        },
        update,
        { new: true }
      );
    }

    if (markTaskStatus === null) {
      return res.status(404).json({
        success: false,
        message: "No such employee associated to the task was found",
      });
    } else {
      return res.status(200).send({ success: true });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getTasksByEmployee = asyncHandler(async (req, res) => {
  // req.user.user.employeeId = "63f6293686658c72d4cb2b41";
  //get task where role Id === task.roleId or empId in list
  const { employeeId } = req.user.user;

  try {
    let employeeTasks = await EmployeeTaskRecipient.aggregate([
      {
        $match: {
          employeeId: employeeId,
        },
      },
      {
        $lookup: {
          from: "employee-tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "originTask",
          pipeline: [
            {
              $project: {
                
          createdAt: 0,
          updatedAt: 0,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$employeeId",
         tasks:{$push:"$$ROOT"}
        },
      },
      
    ]);
    let approvedEmployee = await EmployeeTaskRecipient.aggregate([
      {
        $match: { status:"approved" },
        
      },
      
      {
        $group: {
          _id: "$employeeId",
          //approvedTasks: { $match: { status: "approved" }, $count: {} },
          approved:{$count:{}},
          //approved:{$count:{status:"approved"}}
        },
      },
      
      
    ]);
    const result = {
      employeeTasks,approvedEmployee
    };
    return res.status(200).send({ data: result });
    //return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateTaskByEmployee = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.user.user;
    const { taskId } = req.params;
    const payload = req.body;
    const data = await EmployeeTaskRecipient.findOneAndUpdate(
      { employeeId: mongoose.Types.ObjectId(employeeId), taskId: mongoose.Types.ObjectId(taskId) },
      payload,
      { new: true }
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateTaskByUser = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params;

    const data = await EmployeeTaskRecipient.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      payload,
      { new: true }
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
