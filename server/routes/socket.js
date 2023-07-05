const { socket_connections } = require("../service/socket-sender");

const adminSockets = {};
const clientSockets = {};
const socket2adminId = {};
const socket2clientId = {};
const mongoose = require("mongoose");
// const adminSocketArray = [];
const Channel = require("../models/channel");
const LivechatContact = require("../models/LivechatContact");
const Ticket = require("../models/Ticket");
const Workspace = require("../models/Workspace");
const User = require("../models/User");
// const { replyMessage } = require("../controllers/ticket");

// eslint-disable-next-line func-names
const socketRoute = function (io) {
  // eslint-disable-next-line global-require
  const app = require("express");
  const router = app.Router();
  let emitSocket = [];

  router.post("/api/ticket/reply", async (req, res) => {
    const {
      // from,
      to,
      // subject,
      body,
      // date
    } = req.body;
    // Parse toEmail to get UserId
    const ticketId = to.split("@")[0].substring(6);

    const sentences = body.split("\n");
    let resMessage = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sentences.length; i++) {
      if (
        sentences[i].includes("On") &&
        sentences[i].includes("wrote:") &&
        sentences[i].includes("@")
      ) {
        break;
      }
      if (
        sentences[i].includes("On") &&
        sentences[i + 1].includes("wrote:") &&
        sentences[i + 1].includes("@")
      ) {
        break;
      }
      resMessage = resMessage.concat(sentences[i]);
    }

    const result = await Ticket.findByIdAndUpdate(ticketId, {
      $push: {
        messages: {
          sender: "requester_msg",
          msg: resMessage,
        },
      },
    });

    emitSocket.forEach((connection) =>
      connection.emit("newEmail", {
        reqName: result.reqName,
        message: resMessage,
      })
    );

    res.json(result);
  });

  function notifyEmail({ adminId, reqName, message }) {
    if (socket_connections.filter((connection) => connection.adminId === adminId).length > 0) {
      socket_connections.forEach((connection) => {
        connection.socket.emit("newEmail", { reqName, message });
      });
    }
  }

  function notifyStartChat(machineId, adminId, contactInfo) {
    if (adminSockets[adminId]) {
      // eslint-disable-next-line guard-for-in
      for (const key in adminSockets[adminId]) {
        socket.to(key).emit("startChat", { machineId, contactInfo });
      }
    }
    // Broadcast to all clients for starting chat
    if (clientSockets[adminId][machineId]) {
      for (let key in clientSockets[adminId][machineId]) {
        socket.emit("endChat", {});
      }
    }
  }

  io.of(`/${process.env.APPNAME}`).on("connection", function (socket) {
    emitSocket.push(socket);
    socket.on("client-connect", ({ adminId }) => {
      console.log("socket client connect");
      socket_connections.push({ adminId, socket });
    });

    console.log("User connection established with namespace", process.env.APPNAME);

    socket.emit("ready-client", {
      message: "Wellcome from server",
    });

    // ** Chat Socket event
    socket.on("adminRegister", (adminId) => {
      if (!adminId) return;
      socket_connections.push({ adminId, socket });
      //console.log("[SOCKET] ADMIN REGISTER: ", adminId, socket.id);
      if (!adminId) return;
      if (!adminSockets[adminId]) adminSockets[adminId] = {};
      adminSockets[adminId][socket.id] = adminId;
      socket2adminId[socket.id] = adminId;
      //console.log("admin socket status", adminSockets, socket2adminId);
    });

    socket.on("disconnect", () => {
      //console.log("[SOCKET] DISCONNECTED");
      //console.log("close event");
      emitSocket = emitSocket.filter((connection) => connection.id !== socket.id);
      if (socket2adminId[socket.id]) {
        const adminId = socket2adminId[socket.id];
        delete socket2adminId[socket.id];
        if (adminSockets[adminId] && adminSockets[adminId][socket.id]) {
          delete adminSockets[adminId][socket.id];
        }
      }

      if (socket2clientId[socket.id]) {
        const { adminId, machineId } = socket2clientId[socket.id];
        delete socket2clientId[socket.id];
        if (
          clientSockets[adminId] &&
          clientSockets[adminId][machineId] &&
          clientSockets[adminId][machineId][socket.id]
        ) {
          delete clientSockets[adminId][machineId][socket.id];
        }
      }
    });

    socket.on("clientRegister", ({ adminId, machineId }) => {
      //console.log("[SOCKET] Client Register", { adminId, machineId });
      if (!adminId || !machineId) return;
      if (!clientSockets[adminId]) clientSockets[adminId] = {};
      if (!clientSockets[adminId][machineId]) clientSockets[adminId][machineId] = {};
      clientSockets[adminId][machineId][socket.id] = socket.id;
      socket2clientId[socket.id] = { adminId, machineId };
      //console.log("clientSocket status", clientSockets, socket2clientId);

      // socket.to(clientSockets[adminId][machineId]).emit('adminMsgRev', 'aaaaaa');
    });

    socket.on("startChat", async ({ adminId, machineId, userInfo, locationInfo, browserInfo }) => {
      // Save the channel to DB.
      // If there exists a old channel which has same machinId and adminId, updates its username and email then add a prechat messsage
      // If no old channel exists, make new channel!!
      console.log("[SOCKET] Start chat: ", {
        adminId,
        machineId,
        userInfo,
        locationInfo,
        browserInfo,
      });
      const oldContact = await LivechatContact.findOne({
        email: userInfo.email,
      });
      if (oldContact) {
        await LivechatContact.findOneAndUpdate(
          { email: userInfo.email },
          {
            adminId: adminId,
            fullName: userInfo.username,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber,
            address: userInfo.address,
          }
        );
      } else {
        const newContact = new LivechatContact({
          adminId: adminId,
          fullName: userInfo.username,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          address: userInfo.address,
        });
        await newContact.save();
      }

      const contact = await LivechatContact.findOne({
        email: userInfo.email,
      });

      const oldChannel = await Channel.findOne({ machineId, adminId });
      if (oldChannel) {
        await Channel.updateOne(
          { machineId, adminId },
          {
            username: userInfo.username,
            email: userInfo.email,
            locationInfo: locationInfo,
            browserInfo: browserInfo,
            contactId: contact.id,
            activated: true,
            $push: {
              messages: {
                type: "PreChatForm",
                msg: JSON.stringify(userInfo),
              },
            },
          }
        );
      } else {
        const newChannel = new Channel({
          machineId,
          adminId,
          username: userInfo.username,
          locationInfo: locationInfo,
          browserInfo: browserInfo,
          email: userInfo.email,
          contactId: contact.id,
          activated: true,
          messages: [
            {
              type: "PreChatForm",
              msg: JSON.stringify(userInfo),
            },
          ],
        });
        await newChannel.save();
      }

      const channel = await Channel.findOne({ machineId, adminId });

      // Broadcast to all admins for starting chat
      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("startChat", { channelId: channel._id, userInfo });
        }
      }
      console.log("client socket", clientSockets[adminId][machineId]);
      // Broadcast to all clients for starting chat
      if (clientSockets[adminId][machineId]) {
        for (let key in clientSockets[adminId][machineId]) {
          // socket.to(key).emit("startChat", userInfo);
          socket.emit("startChat", { userInfo, channelId: channel._id });
        }
      }
    });

    socket.on("endChat", async ({ machineId, adminId }) => {
      console.log("[SOCKET] End Chat: ", { machineId, adminId });
      const channel = await Channel.findOne({ machineId, adminId });
      if (channel) {
        console.log("old channel found");
        await Channel.updateOne(
          { machineId, adminId },
          {
            activated: false,
            $push: {
              messages: {
                type: "PostChatForm",
                msg: JSON.stringify({
                  rate: 4, // TODO: This is temp rate.
                }),
              },
            },
          }
        );
      }

      // Broadcast to all admins for starting chat
      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("endChat", { machineId });
        }
      }

      // Broadcast to all clients for starting chat
      if (clientSockets[adminId][machineId]) {
        for (let key in clientSockets[adminId][machineId]) {
          socket.emit("endChat", {});
        }
      }
    });

    socket.on("adminMsgSend", async ({ channelId, message }) => {
      const oldChannle = await Channel.findById(channelId);
      const adminId = oldChannle.adminId;
      const machineId = oldChannle.machineId;

      if (clientSockets[adminId][machineId]) {
        console.log("adminMsg", message, clientSockets[adminId][machineId]);
        for (let key in clientSockets[adminId][machineId]) {
          socket.to(key).emit("adminMsgRev", message);
        }
      }

      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("adminMsgRev", { channelId, message }); // sent to admin
        }
      }
      socket.emit("adminMsgRev", { channelId, message });

      // Save message to DB.
      await Channel.findByIdAndUpdate(channelId, {
        $push: {
          messages: {
            type: "adminMessage",
            msg: message,
          },
        },
      });
    });

    socket.on("clientMsgSend", async ({ machineId, adminId, msg, userInfo }) => {
      console.log("[SOCKET] Client message: ", machineId, adminId, msg, userInfo);

      // Save client message to DB.

      const channel = await Channel.findOneAndUpdate(
        { machineId, adminId },
        {
          $push: {
            messages: {
              type: "customerMessage",
              msg: msg,
            },
          },
        }
      );

      if (adminSockets[adminId]) {
        for (let key in adminSockets[adminId]) {
          socket.to(key).emit("clientMsgRev", { channelId: channel._id, machineId, msg, userInfo }); // sent to admin
        }
      }

      if (clientSockets[adminId][machineId]) {
        for (let key in clientSockets[adminId][machineId]) {
          socket.emit("clientMsgRev", msg);
        }
      }
    });

    /*************** Task Proof ****************/
    socket.on("uploadProof", async (data) => {
      const { selectedTask, todo, url, employeeInfo } = data;
      if (!selectedTask) return;
      const { userId } = selectedTask;
      let toSendData = {
        taskName: selectedTask.taskName,
        subTaskName: todo.title,
        proofType: todo.proofType,
        startDate: selectedTask.startDate,
        endDate: todo.dateTime,
        employeeInfo: employeeInfo,
        photo: url,
      };
      for (let key in adminSockets[userId]) {
        socket.to(key).emit("receiveWorkProof", { ...toSendData }); // sent to admin
      }
    });

    socket.on("taskUpdated", async (data) => {
      const { userId } = data;
      console.log("task updated", data);
      for (let key in adminSockets[userId]) {
        socket.to(key).emit("refreshTask", data.tmpCheckList); // sent to admin
        if (data.checkList.length === data.tmpCheckList.length) {
          socket.to(key).emit("completeTask", data); // sent to admin
        }
      }
    });

    socket.on("newTaskForYou", async (data) => {
      const { taskName, startDate, endDate, employerInfo } = data;
      for (let key in adminSockets[data.assignee.value]) {
        console.log("key", key);
        socket.to(key).emit("newTask", { taskName, startDate, endDate, employerInfo }); // sent to employee
      }
    });

    socket.on("shareWorkspace", async (data) => {
      const { assignedTo, workspaceId, assignerId } = data;

      let workspaceData = await Workspace.findById(workspaceId).populate("boards");
      let user = await User.findOne({ userId: assignerId });
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
      socket.broadcast.emit("newWorkspace", {
        assigner: user.firstName + user.lastName,
        workspace: workspaceData.title,
        assigneeArr: tmpIdArr,
      });
    });

    socket.on("newChecklistForYou", async (data) => {
      const { taskName, startDate, endDate, employerInfo } = data;
      console.log("newCheckListForYou", data);
      console.log("adminSockets", adminSockets);
      for (let key in adminSockets[data.assignee.value]) {
        console.log("key", key);
        socket.to(key).emit("newTask", { taskName, startDate, endDate, employerInfo }); // sent to employee
      }
    });
    /************* End Task Proof **************/
    socket.on("getNotifications", async (userId) => {
      const lastMonth = moment().subtract(1, "months");
      const nextSixtyDays = moment().add(2, "months");
      const thisMonth = moment().subtract(0, "months");
      const nextNintyDays = moment().add(3, "months");
      const notifications = {};
      try {
        const thisMonthNotifications = await Notification.find({
          userId: userId,
          $expr: {
            $eq: [{ $month: "$createdAt" }, { $month: new Date(thisMonth) }],
          },
          isRead: false,
        });
        const lastMonthNotifications = await Notification.find({
          userId: userId,
          $expr: {
            $eq: [{ $month: "$createdAt" }, { $month: new Date(lastMonth) }],
          },
          isRead: false,
        });
        const nextSixtyNotifications = await Notification.find({
          userId: userId,
          $expr: {
            $eq: [{ $month: "$createdAt" }, { $month: new Date(nextSixtyDays) }],
          },
          isRead: false,
        });
        const nextNintyNotifications = await Notification.find({
          userId: userId,
          $expr: {
            $eq: [{ $month: "$createdAt" }, { $month: new Date(nextNintyDays) }],
          },
          isRead: false,
        });
        const todaysNotifications = await Notification.find({
          userId: userId,
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: new Date() } },
              { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            ],
          },
          isRead: false,
        });
        notificatons.thisMonthNotifications = thisMonthNotifications;
        notificatons.thisMonthNotificationsCount = thisMonthNotifications.length;
        notificatons.lastMonthNotifications = lastMonthNotifications;
        notificatons.lastMonthNotificationsCount = lastMonthNotifications.length;
        notificatons.nextSixtyNotifications = nextSixtyNotifications;
        notificatons.nextSixtyNotificationsCount = nextSixtyNotifications.length;
        notifications.nextNintyNotifications = nextNintyNotifications;
        notificatons.nextNintyNotificationsCount = nextNintyNotifications.length;
        notifications.todaysNotifications = todaysNotifications;
        notificatons.todaysNotificationsCount = todaysNotifications.length;
        socket.emit("notifications", notifications);
      } catch (err) {
        console.log(err);
      }
    });
  });

  return router;
};

module.exports = { socketRoute, adminSockets, clientSockets, socket2adminId, socket2clientId };
