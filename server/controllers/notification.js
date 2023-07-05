const {
  Notification,
  Task,
  Ticket,
  Document,
  Project,
  LivechatContact,
  UserGoal,
  TextContact,
  EmployeeTask,
  Invoice,
  FormBuilder
} = require("../models/index");

exports.createNotification = async (req, res) => {
  const { category, categoryId } = req.params;
  const userId = req.user._id;
  const bodyData = req.body;
  try {
    if (category == "Task") {
      const isExist = await Task.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "Task notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "Task not found",
        success: false,
      });
    } else if (category == "Ticket") {
      const isExist = await Ticket.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "Ticket notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "Task not found",
        success: false,
      });
    } else if (category == "Document") {
      const isExist = await Document.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "Document notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "Document not found",
        success: false,
      });
    } else if (category == "Project") {
      const isExist = await Project.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "Project notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "Project not found",
        success: false,
      });
    } else if (category == "LivechatContact") {
      const isExist = await LivechatContact.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "LivechatContact notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "LivechatContact not found",
        success: false,
      });
    } else if (category == "Goal") {
      const isExist = await UserGoal.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "Goal notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "Goal not found",
        success: false,
      });
    } else if (category == "TextContact") {
      const isExist = await TextContact.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "TextContact notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "TextContact not found",
        success: false,
      });
    } else if (category == "EmployeeTask") {
      const isExist = await EmployeeTask.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "EmployeeTask notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "EmployeeTask not found",
        success: false,
      });
    } else if (category == "Invoice") {
      const isExist = await Invoice.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "Invoice notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "Invoice not found",
        success: false,
      });
    }else if (category == "FormBuilder") {
      const isExist = await FormBuilder.find({ _id: categoryId });
      if (isExist.length == 1) {
        bodyData.category = category;
        bodyData.userId = userId;
        bodyData.categoryId = categoryId;
        const notificatonObj = new Notification(bodyData);
        await notificatonObj.save();
        return res.status(201).json({
          msg: "FormBuilder notification created successful",
          success: false,
        });
      }
      return res.send({
        msg: "FormBuilder not found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.readNotification = async (req, res) => {
  const { notificationIds } = req.body;
  try {
    const read = await Notification.updateMany({ _id: { $in: notificationIds } }, { isRead: true });
    if (read.modifiedCount > 0) {
      return res.send({
        msg: "notificaton read by user",
        success: true,
      });
    }
    return res.send({ msg: "unable to read by user", success: false });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.allNotifications = async (req, res) => {
  const userId = req.user._id;
  try {
    const notifications = await Notification.find({ userId: userId });
    if (notifications.length > 0) {
      return res.send({ success: true, data: notifications });
    }
    return res.send({ success: false, msg: "There is no notification for this user" });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.unreadNotifications = async (req, res) => {
  const userId = req.user._id;
  try {
    const notifications = await Notification.find({ userId: userId, isRead: false });
    if (notifications.length > 0) {
      return res.send({ success: true, data: notifications });
    }
    return res.send({ success: false, msg: "There is no unread notifications for this user" });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};
