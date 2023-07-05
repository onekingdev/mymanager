/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const { Task, CheckList, ScheduleTask, ScheduleCheckList } = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const { getDayName } = require("../Utilities/useDate");
const {
  documentEmailTemplate,
  uploadPhotoEmailTemplate,
  incompletedTaskEmailTemplate,
} = require("../constants/emailTemplates");

var cron = require("node-cron");

// Backup a database at 11:59 PM every day.
// cron.schedule("5,10,15,20,25,30,35,40,45,50,55,0 * * * * *", async () => {
cron.schedule("59 23 * * *", async () => {
  // Get Today's Task
  // const { selectDate } = req.query;
  const selectDate = new Date();
  try {
    // today day name
    const d = new Date(selectDate);
    const day = moment(d).format("DD");
    const month = moment(d).format("MM");
    const year = d.getFullYear();
    const todayName = getDayName(d);
    const today = year + month.toString() + day.toString();
    const todayMD = "2000" + month.toString() + day.toString();
    const tomorrow = new Date(d);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Check Todays Data is Completed Or Not

    const tasks = await Task.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  repeatType: "Day",
                  // repeat:{ $in: [today] }
                },
                {
                  repeatType: "Week",
                  repeat: { $in: [todayName] },
                },
                {
                  repeatType: "Month",
                  repeat: { $in: [parseInt(day)] },
                },
                {
                  repeatType: "Year",
                  repeat: { $in: [todayMD] },
                },
                {
                  repeatType: "Never",
                  repeat: { $in: [today] },
                },
              ],
              isActive: true,
              isDelete: false,
              startDate: {
                $lte: new Date(tomorrow),
              },
              endDate: {
                $gte: new Date(selectDate),
              },
              emailNotification: true,
              // userId: mongoose.Types.ObjectId(req.user._id),
            },
          ],
        },
      },
      // find  All CheckList of current task  ************************
      {
        $lookup: {
          from: "checklists",
          localField: "_id",
          foreignField: "taskId",
          as: "checkList",
          pipeline: [
            {
              $project: {
                title: 1,
                dateTime: 1,
                proofType: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "schedule-tasks",
          localField: "_id",
          foreignField: "taskId",
          as: "schedule",
          // check today is Matched Or not ****************************************
          pipeline: [
            {
              $project: {
                taskId: 1,
                dayName: 1,
                _date: 1,
                employeeId: 1,
                year: { $year: "$_date" },
                month: { $month: "$_date" },
                day: { $dayOfMonth: "$_date" },
              },
            },
            {
              $match: {
                day: { $in: [parseInt(day)] },
                month: { $in: [parseInt(month)] },
                year,
              },
            },

            // Find Completed Checklist with Pipeline *************************************
            {
              $lookup: {
                from: "checklist-ans",
                localField: "_id",
                foreignField: "scheduleTaskId",
                as: "checkList",
                pipeline: [
                  {
                    $lookup: {
                      from: "employee-contacts",
                      localField: "employeeId",
                      foreignField: "_id",
                      as: "employee",
                    },
                  },
                  // { $unwind: "$employee" },
                ],
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "employee",
          pipeline: [
            {
              $project: {
                firstName: 1,
                lastName: 1,
              },
            },
          ],
        },
      },
    ]);

    if (tasks.length > 0) {
      // check if any task has not schedule
      const hasNotSchedule = tasks.find((x) => x.schedule.length === 0);
      if (hasNotSchedule) {
        // Add New Tasks to Schedule
        const taskScheduleList = tasks
          .filter((x) => x.schedule.length === 0)
          .map((x) => ({
            taskId: x._id,
            dayName: todayName,
            _date: new Date(selectDate),
          }));

        // insert many
        const newScheduleTasks = await ScheduleTask.insertMany(taskScheduleList);
        // Build Data And return to response
        const buildTasks = tasks.map((task) => {
          const scheduleTask = newScheduleTasks.filter(
            (x) => String(x.taskId) === String(task._id)
          );

          return {
            ...task,
            schedule: task.schedule.length === 0 ? scheduleTask : task.schedule,
          };
        });
        // return res.json(buildTasks);
      }
    }

    // Init incompleted Task List array
    let incompletedTaskList = [];

    tasks.map((task) => {
      if (task.checkList.length !== task.schedule[0].checkList.length) {
        isExistEmailInList = incompletedTaskList.filter((x) => x.email == task.email);
        if (isExistEmailInList.length) {
          isExistEmailInList[0].tasks.push(task);
        } else {
          incompletedTaskList.push({
            email: task.email,
            employerName: `${task.employee[0].firstName} ${task.employee[0].lastName}`,
            tasks: [task],
          });
        }
      }
    });

    // send email for each employee

    incompletedTaskList.map((each) => {
      let taskTableFormatedData = `<table style="width:100%">
      <tr>
        <th>Task Name</th>
        <th>Employee</th>
        <th>Incompleted/All</th>
      </tr>
      `;

      each.tasks.forEach((task) => {
        const { taskName } = task,
          employeeName = task.assignee.label,
          incompletedTaskCount = task.schedule[0].checkList.length,
          allTaskCount = task.checkList.length;
        taskTableFormatedData = taskTableFormatedData.concat(
          `<tr>
            <td
              align="center"
              style="
                padding: 0;
                margin: 0;
                padding-top: 10px;
                padding-bottom: 10px;
              "
            >
              ${taskName}
            </td>
            <td
              align="center"
              style="
                padding: 0;
                margin: 0;
                padding-top: 10px;
                padding-bottom: 10px;
              "
            >
              ${employeeName}
            </td>
            <td
              align="center"
              style="
                padding: 0;
                margin: 0;
                padding-top: 10px;
                padding-bottom: 10px;
              "
            >
              ${incompletedTaskCount} / ${allTaskCount}
            </td>
          </tr>`
        );
      });

      taskTableFormatedData = taskTableFormatedData.concat(`
      </table>`);

      // Send task not completed email to clients
      const emailBody = incompletedTaskEmailTemplate({
        type: "notCompleted",
        senderName: "mymanager.com",
        recipientName: each.employerName,
        tableData: taskTableFormatedData,
        nowDate: selectDate.toLocaleDateString(),
      });

      SendMail({
        from: `Nofitication from MyManager <hello@mymanager.com>`,
        recipient: each.email,
        subject: `Mymanager daily task check result `,
        body: emailBody,
        replyTo: "hello@mymanager.com",
      });
    });

    // return;
    // return res.json(tasks);
  } catch (error) {
    console.log(error);
    // return res.status(500).send(error);
  }
});

exports.newTask = asyncHandler(async (req, res) => {
  const {
    taskName,
    startDate,
    endDate,
    points,
    repeatType,
    repeat,
    allowAsNa,
    isActive,
    _id,
    emailNotification,
    email,
    assignee,
  } = req.body;
  const {organization} = req.headers;
  const user = req.user
  try {
    if (!taskName || taskName === "") {
      throw Error("Task Name ");
    }

    if (_id !== "") {
      // Lets Update Task
      const task = await Task.findById(_id);

      if (!task) throw Error("task not found");

      task.taskName = taskName;
      task.startDate = startDate;
      task.endDate = endDate;
      task.points = points;
      task.repeatType = repeatType;
      task.repeat = repeat;
      task.allowAsNa = allowAsNa;
      task.isActive = isActive;
      task.emailNotification = emailNotification;
      task.email = email;
      task.assignee = assignee
        ? {
            ...assignee,
            value: mongoose.Types.ObjectId(assignee.value),
          }
        : task.assignee;
      task.creatorType = user.userType
      if(organization){
        task.organizationId = mongoose.Types.ObjectId(organization)
        task.creatorType = user.organizations.find(x=>x.organizationId.toString() === organization).userType
      }

      await task.save();
      return res.status(200).send("Task Updated");
    }

    const task = new Task({
      userId: req.user._id,
      taskName,
      startDate,
      endDate,
      points,
      repeatType,
      repeat,
      allowAsNa,
      isActive,
      emailNotification,
      email,
      assignee,
    });

    await task.save();

    return res.status(201).json({
      success: "New task created successful",
    });
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
});

exports.updateTask = async (req, res) => {
  const { projectId, taskName, isCompleted } = req.body;
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        errors: { common: { msg: "No task data found" } },
      });
    }

    task.projectId = projectId || task.projectId;
    task.taskName = taskName || task.taskName;
    task.isCompleted = isCompleted || task.isCompleted;
    await task.save();

    return res.status(200).json({
      success: "Task updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        errors: { common: { msg: "No task data found" } },
      });
    }

    task.isDelete = true;
    await task.save();

    return res.status(200).json({
      success: "Task deleted successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let { pageSize, page } = req.query;
    const {organization} = req.headers;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const skip = (page - 1) * pageSize;

    let query = {
      userId: mongoose.Types.ObjectId(req.user._id),
      isDelete: false,
    };
    if(organization){
      query = {...query, organizationId:mongoose.Types.ObjectId(organization)}
    }

    const tasks = await Task.aggregate([
      {
        $match: query,
      },

      {
        $lookup: {
          from: "checklists",
          localField: "_id",
          foreignField: "taskId",
          as: "checkList",
        },
      },

      {
        $lookup: {
          from: "freeze-tasks",
          localField: "_id",
          foreignField: "taskId",
          as: "freeze",
          pipeline: [
            {
              $project: {
                startDate: 1,
                endDate: 1,
                status: 1,
              },
            },
          ],
        },
      },

      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);

    const data = {
      list: tasks.length > 0 ? tasks[0].data : [],
      total: tasks[0].metadata.length > 0 ? tasks[0].metadata[0].total : 0,
      noOfPage: tasks[0].metadata.length > 0 ? tasks[0].metadata[0].page : 0,
    };
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, isDelete: false });
    if (!task) {
      return res.status(500).json({
        message: "No task data found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.saveCheckList = async (req, res) => {
  const { checkList, taskId } = req.body;
  try {
    // Remove Previous Checklist
    await CheckList.deleteMany({ taskId });
    // Lets Add Again
    const list = checkList.map((x) => ({ ...x, taskId }));
    const NewCheckList = await CheckList.insertMany(list);
    res.status(200).json(NewCheckList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.sendProofEmail = async (req, res) => {
  try {
    const { from, fullName, to, taskName, subTaskName, content, isUpload, isComplete } = req.body;
    const emailBody = uploadPhotoEmailTemplate({
      type: isUpload ? `uploaded` : isComplete ? `completed` : `notCompleted`,
      senderName: fullName,
      docLink: content,
      imageURL: content,
      senderEmail: from,
      recipientName: "Sir",
      message: isUpload ? `${taskName} / ${subTaskName}` : `${taskName}`,
    });
    SendMail({
      from: `${fullName} via MyManager <hello@mymanager.com>`,
      recipient: to,
      subject: isComplete ? `Task complete message from ${from}` : `New proof message from ${from}`,
      body: emailBody,
      replyTo: from,
    });
    SendMail({
      from: `${fullName} via MyManager <hello@mymanager.com>`,
      recipient: "glassespiger@gmail.com",
      subject: isComplete ? `Task complete message from ${from}` : `New proof message from ${from}`,
      body: emailBody,
      replyTo: from,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.getTodaysTask = async (req, res) => {
  const { selectDate } = req.query;
  const {organization} = req.headers;
  try {
    // today day name
    const d = new Date(selectDate);
    const day = moment(d).format("DD");
    const month = moment(d).format("MM");
    const year = d.getFullYear();
    const todayName = getDayName(d);
    const today = year + month.toString() + day.toString();
    const todayMD = "2000" + month.toString() + day.toString();
    const tomorrow = new Date(d);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Check Todays Data is Completed Or Not

    const tasks =
      req.user.user?.type !== "employee"
        ? await Task.aggregate([
            {
              $match: {
                $and: [
                  {
                    $or: [
                      {
                        repeatType: "Day",
                        // repeat:{ $in: [today] }
                      },
                      {
                        repeatType: "Week",
                        repeat: { $in: [todayName] },
                      },
                      {
                        repeatType: "Month",
                        repeat: { $in: [parseInt(day)] },
                      },
                      {
                        repeatType: "Year",
                        repeat: { $in: [todayMD] },
                      },
                      {
                        repeatType: "Never",
                        repeat: { $in: [today] },
                      },
                    ],
                    isActive: true,
                    isDelete: false,
                    startDate: {
                      $lte: new Date(tomorrow),
                    },
                    endDate: {
                      $gte: new Date(selectDate),
                    },
                    userId: mongoose.Types.ObjectId(req.user._id),
                    organizationId:organization?mongoose.Types.ObjectId(organization):null
                  },
                ],
              },
            },
            // find  All CheckList of current task  ************************
            {
              $lookup: {
                from: "checklists",
                localField: "_id",
                foreignField: "taskId",
                as: "checkList",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      dateTime: 1,
                      proofType: 1,
                      codeURL: 1,
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "schedule-tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "schedule",
                // check today is Matched Or not ****************************************
                pipeline: [
                  {
                    $project: {
                      taskId: 1,
                      dayName: 1,
                      _date: 1,
                      employeeId: 1,
                      year: { $year: "$_date" },
                      month: { $month: "$_date" },
                      day: { $dayOfMonth: "$_date" },
                    },
                  },
                  {
                    $match: {
                      day: { $in: [parseInt(day)] },
                      month: { $in: [parseInt(month)] },
                      year,
                    },
                  },

                  // Find Completed Checklist with Pipeline *************************************
                  {
                    $lookup: {
                      from: "checklist-ans",
                      localField: "_id",
                      foreignField: "scheduleTaskId",
                      as: "checkList",
                      pipeline: [
                        {
                          $lookup: {
                            from: "employee-contacts",
                            localField: "employeeId",
                            foreignField: "_id",
                            as: "employee",
                          },
                        },
                        // { $unwind: "$employee" },
                      ],
                    },
                  },
                ],
              },
            },
            // find Freeze Task
            {
              $lookup: {
                from: "freeze-tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "freeze",
                pipeline: [
                  {
                    $project: {
                      startDate: 1,
                      endDate: 1,
                      status: 1,
                    },
                  },
                  {
                    $match: {
                      startDate: {
                        $lte: new Date(selectDate),
                      },
                      endDate: {
                        $gte: new Date(selectDate),
                      },
                    },
                  },
                ],
              },
            },
          ])
        : await Task.aggregate([
            {
              $match: {
                $and: [
                  {
                    $or: [
                      {
                        repeatType: "Day",
                        // repeat:{ $in: [today] }
                      },
                      {
                        repeatType: "Week",
                        repeat: { $in: [todayName] },
                      },
                      {
                        repeatType: "Month",
                        repeat: { $in: [parseInt(day)] },
                      },
                      {
                        repeatType: "Year",
                        repeat: { $in: [todayMD] },
                      },
                      {
                        repeatType: "Never",
                        repeat: { $in: [today] },
                      },
                    ],
                    isActive: true,
                    isDelete: false,
                    startDate: {
                      $lte: new Date(tomorrow),
                    },
                    endDate: {
                      $gte: new Date(selectDate),
                    },
                    "assignee.value": mongoose.Types.ObjectId(req.user.user.employeeId),
                  },
                ],
              },
            },
            // find  All CheckList of current task  ************************
            {
              $lookup: {
                from: "checklists",
                localField: "_id",
                foreignField: "taskId",
                as: "checkList",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      dateTime: 1,
                      proofType: 1,
                      codeURL: 1,
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "schedule-tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "schedule",
                // check today is Matched Or not ****************************************
                pipeline: [
                  {
                    $project: {
                      taskId: 1,
                      dayName: 1,
                      _date: 1,
                      employeeId: 1,
                      year: { $year: "$_date" },
                      month: { $month: "$_date" },
                      day: { $dayOfMonth: "$_date" },
                    },
                  },
                  {
                    $match: {
                      day: { $in: [parseInt(day)] },
                      month: { $in: [parseInt(month)] },
                      year,
                    },
                  },

                  // Find Completed Checklist with Pipeline *************************************
                  {
                    $lookup: {
                      from: "checklist-ans",
                      localField: "_id",
                      foreignField: "scheduleTaskId",
                      as: "checkList",
                      pipeline: [
                        {
                          $lookup: {
                            from: "employee-contacts",
                            localField: "employeeId",
                            foreignField: "_id",
                            as: "employee",
                          },
                        },
                        // { $unwind: "$employee" },
                      ],
                    },
                  },
                ],
              },
            },
            // freeze task
            {
              $lookup: {
                from: "freeze-tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "freeze",
                pipeline: [
                  {
                    $project: {
                      startDate: 1,
                      endDate: 1,
                      status: 1,
                    },
                  },
                  {
                    $match: {
                      startDate: {
                        $lte: new Date(selectDate),
                      },
                      endDate: {
                        $gte: new Date(selectDate),
                      },
                    },
                  },
                ],
              },
            },
          ]);

    //console.log("selectDate", selectDate);
    if (tasks.length > 0) {
      // check if any task has not schedule
      const hasNotSchedule = tasks.find((x) => x.schedule.length === 0);
      if (hasNotSchedule) {
        // Add New Tasks to Schedule
        const taskScheduleList = tasks
          .filter((x) => x.schedule.length === 0)
          .map((x) => ({
            taskId: x._id,
            dayName: todayName,
            _date: new Date(selectDate),
          }));

        // insert many
        const newScheduleTasks = await ScheduleTask.insertMany(taskScheduleList);
        // Build Data And return to response
        const buildTasks = tasks.map((task) => {
          const scheduleTask = newScheduleTasks.filter(
            (x) => String(x.taskId) === String(task._id)
          );

          return {
            ...task,
            schedule: task.schedule.length === 0 ? scheduleTask : task.schedule,
          };
        });

        return res.json(buildTasks);
      }
    }
    return res.json(tasks);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const {organization} = req.headers;
    const tasks =
      req.user.user?.type !== "employee"
        ? await Task.aggregate([
            {
              $match: {
                isActive: true,
                isDelete: false,
                userId: mongoose.Types.ObjectId(req.user._id),
                organizationId:organization?mongoose.Types.ObjectId(organization): null
              },
            },
            // find  All CheckList of current task  ************************
            {
              $lookup: {
                from: "checklists",
                localField: "_id",
                foreignField: "taskId",
                as: "checkList",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      dateTime: 1,
                      proofType: 1,
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "schedule-tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "schedule",
                // check today is Matched Or not ****************************************
                pipeline: [
                  {
                    $project: {
                      taskId: 1,
                      dayName: 1,
                      _date: 1,
                      employeeId: 1,
                      year: { $year: "$_date" },
                      month: { $month: "$_date" },
                      day: { $dayOfMonth: "$_date" },
                    },
                  },

                  // Find Completed Checklist with Pipeline *************************************
                  {
                    $lookup: {
                      from: "checklist-ans",
                      localField: "_id",
                      foreignField: "scheduleTaskId",
                      as: "checkList",
                      pipeline: [
                        {
                          $lookup: {
                            from: "employee-contacts",
                            localField: "employeeId",
                            foreignField: "_id",
                            as: "employee",
                          },
                        },
                        // { $unwind: "$employee" },
                      ],
                    },
                  },
                ],
              },
            },
          ])
        : await Task.aggregate([
            {
              $match: {
                isActive: true,
                isDelete: false,
                "assignee.value": mongoose.Types.ObjectId(req.user.user.employeeId),
              },
            },
            // find  All CheckList of current task  ************************
            {
              $lookup: {
                from: "checklists",
                localField: "_id",
                foreignField: "taskId",
                as: "checkList",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      dateTime: 1,
                      proofType: 1,
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "schedule-tasks",
                localField: "_id",
                foreignField: "taskId",
                as: "schedule",
                // check today is Matched Or not ****************************************
                pipeline: [
                  {
                    $project: {
                      taskId: 1,
                      dayName: 1,
                      _date: 1,
                      employeeId: 1,
                      year: { $year: "$_date" },
                      month: { $month: "$_date" },
                      day: { $dayOfMonth: "$_date" },
                    },
                  },

                  // Find Completed Checklist with Pipeline *************************************
                  {
                    $lookup: {
                      from: "checklist-ans",
                      localField: "_id",
                      foreignField: "scheduleTaskId",
                      as: "checkList",
                      pipeline: [
                        {
                          $lookup: {
                            from: "employee-contacts",
                            localField: "employeeId",
                            foreignField: "_id",
                            as: "employee",
                          },
                        },
                        // { $unwind: "$employee" },
                      ],
                    },
                  },
                ],
              },
            },
          ]);

    return res.json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.saveTaskCheckListTodos = async (req, res) => {
  const { schedule, _id, checkList: originalCheckList } = req.body;
  try {
    // today day name

    const { user } = req.user;

    // await ScheduleCheckList.deleteMany();

    const { checkList } = schedule[0];
    const newCheckListAns = checkList
      .filter((todo) => todo._id === undefined)
      .map((x) => ({ ...x, employeeId: user.employeeId }));

    const scheduleId = schedule[0]._id;

    if (newCheckListAns) {
      // Fetch All checklist by scheduleId

      const checkListByScheduleId = await ScheduleCheckList.find({
        scheduleTaskId: scheduleId,
      });

      const filteredNewCheckList = newCheckListAns.filter((x) => {
        const checkAlreadyExist = checkListByScheduleId.find(
          (item) => String(item.checkListId) === String(x.checkListId)
        );

        if (checkAlreadyExist) {
          return false;
        }

        return true;
      });

      await ScheduleCheckList.insertMany(filteredNewCheckList);
    }

    // Perform Update query
    // find changed
    const updateableCheckListAns = checkList.filter((todo) => todo._id !== "" && todo.touched);

    if (updateableCheckListAns) {
      for (const todo of updateableCheckListAns) {
        const checkList = await ScheduleCheckList.findById(todo?._id);
        if (checkList) {
          checkList.ans = todo.ans;
          await checkList.save();
        }
      }
    }

    // if finished then check checklist
    const taskCheckList = await ScheduleCheckList.find({
      scheduleTaskId: scheduleId,
    });

    if (originalCheckList.length === taskCheckList.length) {
      const findScheduleTask = await ScheduleTask.findById(scheduleId);
      if (findScheduleTask) {
        findScheduleTask.isComplete = true;
        const updated = await findScheduleTask.save();
      }
    }

    return res.json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Get Past Due Schedule CheckList

exports.getPastDueScheduleCheckList = async (req, res) => {
  const { selectDate } = req.query;
  // const {} = req.query;
  try {
    // today day name
    const d = new Date(selectDate);
    // const day = parseInt(moment(d).format("DD"));
    // const month = parseInt(moment(d).format("MM"));
    // const year = d.getFullYear();
    // const todayName = getDayName(d);

    // Check Todays Data is Completed Or Not
    let tasks = [];

    // build today
    const _d_start = selectDate.toLocaleDateString(`fr-CA`).split("/").join("-");
    const _d_end = selectDate.toLocaleDateString(`fr-CA`).split("/").join("-");
    const start = new Date(`${_d_start}T00:00:00.00Z`);
    const end = new Date(`${_d_end}T23:59:59.999Z`);

    let query = {};
    query = {
      ...query,
      _date: {
        // $gte: start,
        $lt: start,
      },
      isComplete: false,
    };

    // aggregation

    tasks = await ScheduleTask.aggregate([
      { $match: query },
      // root task
      {
        $lookup: {
          from: "tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "task",
          pipeline: [
            {
              $lookup: {
                from: "checklists",
                localField: "_id",
                foreignField: "taskId",
                as: "checkList",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      dateTime: 1,
                      proofType: 1,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      // { $addFields: { userId: "$task" } },

      // Find Completed Checklist with Pipeline *************************************
      {
        $lookup: {
          from: "checklist-ans",
          localField: "_id",
          foreignField: "scheduleTaskId",
          as: "checkList",
          pipeline: [
            {
              $lookup: {
                from: "employee-contacts",
                localField: "employeeId",
                foreignField: "_id",
                as: "employee",
              },
            },
            // { $unwind: "$employee" },
          ],
        },
      },
    ]);

    // format data
    const formatedTasks = [];
    for (const task of tasks) {
      if (String(task.task[0].userId) === String(req.user._id)) {
        formatedTasks.push({
          ...task.task[0],
          schedule: [{ ...task, task: null }],
        });
      }
    }

    return res.json(formatedTasks);
  } catch (error) {
    return res.status(500).send(error);
  }
};
