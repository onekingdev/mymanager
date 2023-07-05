const { Appointment } = require("../models/index/index");
const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");
const { appointEmailTemplate } = require("../constants/emailTemplates");

var cron = require("node-cron");
const { SendMail } = require("../service/sendMail");

cron.schedule("5,10,15,20,25,30,35,40,45,50,55,0 * * * * *", async () => {
  // cron.schedule("* * * * *", async () => {
  // Get Today's Task
  // const { selectDate } = req.query;
  const currentDateTime = new Date();
  try {
    // Check Todays Data is Completed Or Not
    const appointList = await Appointment.find({ isDeleted: false });
    appointList.map((x) => {
      const startTime = new Date(x.start);
      const notificationTime = new Date();
      if (x.notification) {
        notificationTime.setTime(startTime.getTime() - parseInt(x.notification) * 60 * 1000);
        const currentVal = currentDateTime.getTime(),
          notificationVal = startTime.getTime() - parseInt(x.notification) * 60 * 1000;
        if (currentVal >= notificationVal && currentVal < notificationVal + 60 * 1000) {
          let taskTableFormatedData = `<table style="width:100%">
            <tr>
              <td
                align="center"
                style="
                  padding: 0;
                  margin: 0;
                  padding-top: 10px;
                  padding-bottom: 10px;
                "
              >
                <b>Title</b>
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
                ${x.title}
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="
                  padding: 0;
                  margin: 0;
                  padding-top: 10px;
                  padding-bottom: 10px;
                "
              >
                <b>Start Time</b>
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
                ${startTime.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="
                  padding: 0;
                  margin: 0;
                  padding-top: 10px;
                  padding-bottom: 10px;
                "
              >
                <b>Duration</b>
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
                ${x.notification} mins
              </td>
            </tr>
          </table>`;

          // Send notification email to clients for appointment
          const emailBody = appointEmailTemplate({
            tableData: taskTableFormatedData,
          });

          SendMail({
            from: `Nofitication from MyManager <hello@mymanager.com>`,
            recipient: x.remindTo,
            subject: "Mymanager Appointment Notification",
            body: emailBody,
            replyTo: "hello@mymanager.com",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.createAppointment = asyncHandler(async (req, res) => {
  try {
    const { organization, org_location } = req.headers;

    let appointmentData = req.body;
    appointmentData.userId = mongoose.Types.ObjectId(req.user._id);

    appointmentData.invitedUser = mongoose.Types.ObjectId(appointmentData.invitedUser);

    if (organization) {
      if (org_location && org_location.trim() !== "null") {
        appointmentData = {
          ...appointmentData,
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          orgLocation: org_location && org_location.trim() !== "null" ? org_location : null,
        };
      } else {
        appointmentData = {
          ...appointmentData,
          organizationId: mongoose.Types.ObjectId(organization),
        };
      }
    }

    const newAppointment = new Appointment(appointmentData);

    newAppointment.save((err, data) => {
      if (err) {
        console.log(err);
        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment created successfully", success: true, data });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getAppointment = asyncHandler((req, res) => {
  try {
    const userId = req.user._id;
    const { organization, org_location } = req.headers;

    let filter = {
      userId: mongoose.Types.ObjectId(userId),
      isDeleted: false,
    };

    if (organization) {
      filter = {
        ...filter,
        organizationId: organization,
      };
      if (org_location && org_location.trim() !== "null") {
        filter = {
          ...filter,
          orgLocation: org_location,
        };
      }
    }

    Appointment.aggregate([
      { $match: filter },

      // Lookup user
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "user",
      //     foreignField: "userId",
      //     as: "user",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "bookingtypes",
      //     localField: "bookingType",
      //     foreignField: "_id",
      //     as: "bookingType",
      //   },
      // },
    ])
      .then((data) => {
        res.send({ data, success: true });
      })
      .catch((err) => {
        res.send({ msg: err.message, success: false });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateAppointment = asyncHandler(async (req, res) => {
  try {
    const appointmentData = req.body;

    const userId = req.user._id;
    const apptList = await Appointment.find({
      _id: mongoose.Types.ObjectId(appointmentData._id),
      userId: mongoose.Types.ObjectId(userId),
      isDeleted: false,
    });
    oldData = apptList[0];

    const { title, start, end, allDay, interval, repeat, invitedUser, remindTo, notification } =
      appointmentData;

    oldData.title = title ? title : oldData.title;
    oldData.start = start ? start : oldData.start;
    oldData.end = end ? end : oldData.end;
    oldData.allDay = allDay ? allDay : oldData.allDay;
    oldData.interval = interval ? interval : oldData.interval;
    oldData.repeat = repeat ? repeat : oldData.repeat;
    oldData.invitedUser = invitedUser ? invitedUser : oldData.invitedUser;
    oldData.remindTo = remindTo ? remindTo : oldData.remindTo;
    oldData.notification = notification ? notification : oldData.notification;

    oldData.save((err, data) => {
      if (err) {
        console.log(err);

        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment updated successfully", success: true, data });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deleteAppointment = asyncHandler(async (req, res) => {
  try {
    const appointmentData = req.body;
    appointmentData.user = mongoose.Types.ObjectId(req.user._id);

    const newAppointment = new Appointment(appointmentData);
    newAppointment.save((err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment created successfully", success: true, data });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});
