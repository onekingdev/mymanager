const { default: mongoose } = require("mongoose");
const moment = require("moment");
const {
  ClassAttendance,
  Attendance,
  BookedStudent,
  EmployeeContact,
} = require("../models/index/index");
const dateRange = require("../helper/dateRange");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

/**
 *
 * @desc Create attendance Controller
 * @route POST /api/class/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createClass = asyncHandler(async (req, res) => {
  const { organization, org_location } = req.headers;

  const classData = req.body;
  const classDays = classData.classDays;
  const startDate = classData.startDate;
  const endDate = classData.endDate;
  const bookingRequired = classData.bookingRequired;
  // const classStartTime = classData.classStartTime;
  // const classEndTime = classData.classEndTime;
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    seriesId = mongoose.Types.ObjectId();
    // if (dates.length > 1) {
    for (let index in dates) {
      let date = dates[index];
      let dayName = moment(new Date(dates[index])).format("dddd");
      classData.schedule.map((schedule) => {
        if (schedule.classDays.includes(dayName)) {
          //let classStartDate = moment(startDate).date(moment(date).date());
          // let classEndDate = moment(endDate).date(moment(date).date());
          let newClass = {
            ...classData,
            seriesId,
            startDate: date,
            endDate: date,
            classStartTime: schedule.classStartTime,
            classEndTime: schedule.classEndTime,
            schedule: classData.schedule,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
            bookingRequired,
          };

          if (organization) {
            if (org_location && org_location.trim() !== "null") {
              newClass = {
                ...newClass,
                organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
                orgLocation: org_location && org_location.trim() !== "null" ? org_location : null,
              };
            } else {
              newClass = {
                ...newClass,
                organizationId: mongoose.Types.ObjectId(organization),
              };
            }
          }

          allAttendance.push(newClass);
        }
      });
    }
    // }
    //  else if (dates.length === 1) {
    //   let dayName = moment(new Date(dates[0])).format("dddd");
    //   classData.schedule.map((schedule) => {
    //     if (schedule.classDays.includes(dayName)) {
    //       let NewClass = {
    //         ...classData,
    //         startDate: new Date(startDate).toLocaleDateString(),
    //         endDate: new Date(endDate).toLocaleDateString(),
    //         classStartTime: schedule.classStartTime,
    //         classEndTime: schedule.classEndTime,
    //         schedule: classData.schedule,
    //         wholeSeriesEndDate: endDate,
    //         wholeSeriesStartDate: startDate,
    //         bookingRequired,
    //       };
    //       allAttendance.push(NewClass);
    //     }
    //   });
    // }

    await ClassAttendance.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 *
 * @desc Update attendance Controller
 * @route POST /api/class/update
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateClass = asyncHandler(async (req, res) => {
  const id = req.body?._id;
  ClassAttendance.findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Class successfully updated",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        errors: { common: { msg: error.message } },
      });
    });
});

/**
 *
 * @desc Update updateWholeSeries attendance Controller
 * @route POST /api/class/updateWholeSeries
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateWholeSeries = asyncHandler(async (req, res) => {
  try {
    const seriesId = req.body?.seriesId;
    const isDateTimeChange = req.body?.isDateTimeChange;
    const classId = req.body?.classId;
    const type = req.body?.type;
    const bookingRequired = req.body?.bookingRequired;
    // if (isDateTimeChange) {
    // if whole series start or end date is changed then need to delete and reinsert classes
    if (type === "single") {
      await ClassAttendance.findByIdAndDelete(classId)
        .then((resp) => {
          if (resp.deletedCount < 1) {
            res.status(403).json({
              msg: "Class Id not found!",
              success: false,
            });
          } else {
            reInsertWholeClassSeries(req.body, seriesId, res);
          }
        })
        .catch((err) => {
          console.log(err);

          return res.status(500).json({
            success: false,
            errors: { common: { msg: err.message } },
          });
        });
    } else {
      await ClassAttendance.deleteMany({
        $and: [{ seriesId: seriesId }],
      })
        .then((resp) => {
          if (resp.deletedCount < 1) {
            res.status(403).json({
              msg: "series Id not found!",
              success: false,
            });
          } else {
            reInsertWholeClassSeries(req.body, seriesId, res);
          }
        })
        .catch((err) => {
          console.log(err);

          return res.status(500).json({
            success: false,
            errors: { common: { msg: err.message } },
          });
        });
    }
    // } else {
    //   if (type === "single") {
    //     await ClassAttendance.findByIdAndUpdate(classId, {
    //       programName: req.body.programName,
    //       classTitle: req.body.classTitle,
    //       classStartTime: req.body.classStartTime,
    //       classEndTime: req.body.classEndTime,
    //       bookingRequired,
    //     }).exec((err, updateResp) => {
    //       if (err) {
    //         res.send({ msg: "Classes not updated!", success: false });
    //       } else {
    //         res.send({
    //           msg: "This class schedule has been updated Successfully",
    //           success: true,
    //         });
    //       }
    //     });
    //   } else if (type === "all") {
    //     ClassAttendance.updateMany(
    //       { seriesId: seriesId },
    //       {
    //         programName: req.body.programName,
    //         classTitle: req.body.classTitle,
    //         classStartTime: req.body.classStartTime,
    //         classEndTime: req.body.classEndTime,
    //         bookingRequired,
    //       }
    //     ).exec((err, updateResp) => {
    //       if (err) {
    //         res.send({ msg: "Classes not updated!", success: false });
    //       } else {
    //         res.send({
    //           msg: "All class schedule has been updated Successfully",
    //           success: true,
    //         });
    //       }
    //     });
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

reInsertWholeClassSeries = async (classData, seriesId, res) => {
  const classDays = classData.classDays;
  const startDate = classData.wholeSeriesStartDate;
  const endDate = classData.wholeSeriesEndDate;
  const classStartTime = classData.classStartTime;
  const classEndTime = classData.classEndTime;
  const bookingRequired = classData.bookingRequired;
  seriesId = seriesId ? seriesId : mongoose.Types.ObjectId();
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    // if (dates.length > 1) {
    for (let index in dates) {
      let date = dates[index];
      let dayName = moment(new Date(dates[index])).format("dddd");

      classData.schedule.map((schedule) => {
        if (schedule.classDays.includes(dayName)) {
          //let classStartDate = moment(startDate).date(moment(date).date());
          // let classEndDate = moment(endDate).date(moment(date).date());

          let NewClass = {
            ...classData,
            seriesId,
            startDate: date,
            endDate: date,
            classStartTime: schedule.classStartTime,
            classEndTime: schedule.classEndTime,
            schedule: classData.schedule,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
            bookingRequired,
          };
          allAttendance.push(NewClass);
        }
      });
    }
    // } else if (dates.length === 1) {
    //   let dayName = moment(new Date(dates[0])).format("dddd");
    //   classData.schedule.map((schedule) => {
    //     if (schedule.classDays.includes(dayName)) {
    //       let NewClass = {
    //         ...classData,
    //         startDate: new Date(startDate).toLocaleDateString(),
    //         endDate: new Date(endDate).toLocaleDateString(),
    //         classStartTime: schedule.classStartTime,
    //         classEndTime: schedule.classEndTime,
    //         schedule: classData.schedule,
    //         wholeSeriesEndDate: endDate,
    //         wholeSeriesStartDate: startDate,
    //         bookingRequired,
    //       };
    //       allAttendance.push(NewClass);
    //     }
    //   });
    // }

    await ClassAttendance.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get all classes of user
 * @route GET api/class/all/:userId
 * @returns
 */
exports.getClasses = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { organization, org_location } = req.headers;

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const startMonth = moment(new Date()).startOf("month");
  const endMonth = moment(new Date()).endOf("month");
  const startYear = moment(new Date()).startOf("year");
  const endYear = moment(new Date()).endOf("year");
  try {
    let filter = {
      userId: mongoose.Types.ObjectId(userId),
    };

    if (organization) {
      filter = {
        ...filter,
        organizationId: mongoose.Types.ObjectId(organization),
      };
      if (org_location && org_location.trim() !== "null") {
        filter = {
          ...filter,
          orgLocation: org_location,
        };
      }
    }

    const classList = await ClassAttendance.find(filter);
    const attendedStudentList = await Attendance.find({ userId: mongoose.Types.ObjectId(userId) });
    const classListWithCount = classList.map((eachClass) => {
      const filteredBySeriesId = attendedStudentList.filter(
        (student) => eachClass.seriesId == student.seriesId
      );
      const filteredByContactId = [
        ...new Map(filteredBySeriesId.map((m) => [m.contactId.toString(), m])).values(),
      ];
      return {
        ...eachClass._doc,
        attendedStudentCountBySeries: filteredByContactId?.length || 0,
      };
    });

    const dayClasses = await ClassAttendance.find({
      userId,
      startDate: { $eq: currentDate },
    });
    const monthClasses = await ClassAttendance.find({
      userId,
      wholeSeriesStartDate: { $gte: startMonth, $lte: endMonth },
    });
    const yearClasses = await ClassAttendance.find({
      userId,
      wholeSeriesStartDate: { $gte: startYear, $lte: endYear },
    });
    // console.log(classList);
    // const classes = await Promise.all(
    //   classList.map(async (x) => {
    //     let total = await Attendance.countDocuments({ classId: x._id });
    //     let attended = await Attendance.countDocuments({ classId: x._id, status: "yes" });
    //     const tmpData = {
    //       ...x._doc,
    //       count: {
    //         total,
    //         attended,
    //       },
    //     };
    //     return tmpData;
    //   })
    // );
    return res.status(200).json({
      success: true,
      data: {
        classes: classListWithCount,
        dayClasses,
        monthClasses,
        yearClasses,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Get information of a class
 * @route GET api/class/info/:classId
 * @return
 */
exports.getClassInfo = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  try {
    const classEvent = await ClassAttendance.findById(classId);
    if (!classEvent) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(classEvent);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Delete a Class by class Id
 * @route GET api/class/info/:classId
 * @return
 */
exports.deleteClass = asyncHandler(async (req, res) => {
  const { classId, type } = req.params;
  try {
    if (type === "single") {
      await ClassAttendance.findByIdAndDelete(classId);
      return res.status(200).json({ success: true, msg: "Successfully deleted" });
    }

    if (type === "all") {
      ClassAttendance.deleteMany({
        $and: [{ seriesId: classId }],
      })
        .then((resp) => {
          if (resp.deletedCount < 1) {
            res.status(403).json({
              msg: "series Id not found!",
              success: false,
            });
          } else {
            return res.status(200).json({ success: true, msg: "Successfully deleted" });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            errors: { common: { msg: err.message } },
          });
        });
    }
  } catch (err) {
    return res.status(404).json({ success: false, errors: { common: { msg: err.message } } });
  }
});

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.markAttendance = asyncHandler(async (req, res) => {
  const {
    image,
    rankImg,
    userId,
    fullName,
    email,
    rankName,
    contactId,
    className,
    classId,
    seriesId,
    status,
    attendedDateTime,
  } = req.body;

  const compStartDate = new Date(new Date(attendedDateTime).toLocaleDateString());
  const compEndDate = new Date(compStartDate);
  compEndDate.setDate(compEndDate.getDate() + 1);

  try {
    const existedAttendance = await Attendance.aggregate([
      {
        $match: {
          $and: [
            {
              classId: mongoose.Types.ObjectId(classId),
              userId: mongoose.Types.ObjectId(userId),
              contactId: mongoose.Types.ObjectId(contactId),
              attendedDateTime: {
                $gte: new Date(compStartDate),
                $lte: new Date(compEndDate),
              },
            },
          ],
        },
      },
    ]);

    if (existedAttendance?.length) {
      if (status == false) {
        await Attendance.remove({ _id: existedAttendance[0]?._id });
        res.status(200).json({
          msg: "Student unmarked successfully",
          success: true,
        });
      } else {
        return res.status(500).json({
          errors: { common: { msg: "Student already marked for this class" } },
        });
      }
    } else {
      //     const student = await EmployeeContact.findById(userId);
      //     const classInfo = await ClassAttendance.findById(classId);
      const newAttendance = req.body;
      delete newAttendance["_id"];
      await Attendance.create({
        ...newAttendance,
      })
        .then((response) => {
          if (response) {
            const filter = { _id: contactId };
            const update = { lastAttended: attendedDateTime };
            const opts = { new: true };
            Contact.findOneAndUpdate(filter, update, opts, (err, newContact) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  errors: { common: { msg: err.message } },
                });
              } else {
                res.status(200).json({
                  msg: "Student marked successfully",
                  success: true,
                });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc add class booking
 * @route GET api/attendance/bookStudentIntoClass
 * @return
 */
exports.bookStudentIntoClass = asyncHandler(async (req, res) => {
  try {
    const { organization, org_location } = req.headers;
    const { seriesId, contactId } = req.body;

    if (seriesId) {
      let filter = {
        seriesId: seriesId,
        contactId: mongoose.Types.ObjectId(contactId),
      };
      if (organization) {
        if (org_location && org_location.trim() !== "null") {
          filter = {
            ...filter,
            organizationId: mongoose.Types.ObjectId(organization),
            orgLocation: mongoose.Types.ObjectId(org_location),
          };
        } else {
          filter = {
            ...filter,
            organizationId: mongoose.Types.ObjectId(organization),
          };
        }
      }
      const attendanceData = await BookedStudent.findOne(filter);

      if (attendanceData) {
        return res.status(500).json({
          errors: { common: { msg: "Class booked already for student" } },
        });
      } else {
        let newBookedStudentData = req.body;

        if (organization) {
          if (org_location && org_location.trim() !== "null") {
            newBookedStudentData = {
              ...newBookedStudentData,
              organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
              orgLocation: org_location && org_location.trim() !== "null" ? org_location : null,
            };
          } else {
            newBookedStudentData = {
              ...newBookedStudentData,
              organizationId: mongoose.Types.ObjectId(organization),
            };
          }
        }

        const newBookedStudent = new BookedStudent(newBookedStudentData);
        newBookedStudent
          .save(newBookedStudent)
          .then((data) => {
            return res.status(200).json({ success: true, msg: "Student successfully booked" });
          })
          .catch((error) => {
            return res.status(500).json({
              errors: { common: { msg: error.message } },
            });
          });
      }
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc update class booking
 * @route POST api/attendance/updateBookedStudent
 * @return
 */
exports.updateBookedStudent = asyncHandler(async (req, res) => {
  try {
    const id = req.body?._id;
    const { contactId, seriesId } = req.body;
    BookedStudent.find({ contactId, seriesId }).then((data) => {
      if (data.length > 0) {
        return res.status(500).json({
          errors: { common: { msg: "Class booked already for student" } },
        });
      } else {
        BookedStudent.findByIdAndUpdate(id, { $set: req.body })
          .then((data) => {
            res.status(200).json({
              success: true,
              msg: "Class successfully updated",
            });
          })
          .catch((error) => {
            return res.status(500).json({
              success: false,
              errors: { common: { msg: error.message } },
            });
          });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc get Booking by series id
 * @route GET api/attendance/getBookedStudentsBySeriesId
 * @return
 */
exports.getBookedStudentsBySeriesId = asyncHandler(async (req, res) => {
  // const { data } = req.query;
  const { seriesId } = req.params;
  try {
    const classBookings = await BookedStudent.find({ seriesId });
    return res.status(200).json({
      success: true,
      data: classBookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Delete a BookedStudent by attendance Id
 * @route GET api/attendance/removeBookedStudent/:bookingId
 * @return
 */
exports.removeBookedStudent = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  try {
    await BookedStudent.findByIdAndDelete(bookingId)
      .then(() => {
        return res.status(200).json({ success: true, msg: "Successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
      });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
});

/**
 * @desc add class booking
 * @route GET api/attendance/bookClass
 * @return
 */
exports.bookClass = asyncHandler(async (req, res) => {
  try {
    const { classId, seriesId, contactId } = req.body;
    if (seriesId) {
      const attendanceData = await Attendance.findOne({
        classId: classId,
        seriesId: seriesId,
        contactId: contactId,
      });

      if (attendanceData) {
        return res.status(500).json({
          errors: { common: { msg: "Class booked already for student" } },
        });
      } else {
        const allClass = await ClassAttendance.find({ seriesId });
        const newBookingList = allClass.map((x) => {
          return new Attendance({
            ...req.body,
            classId: x._id,
          });
        });
        Attendance.insertMany(newBookingList)
          .then((data) => {
            return res.status(200).json({ success: true, msg: "Class successfully booked" });
          })
          .catch((error) => {
            return res.status(500).json({
              errors: { common: { msg: error.message } },
            });
          });
      }
    } else {
      const newBooking = new Attendance({ ...req.body });

      const attendanceData = await Attendance.findOne({
        classId: classId,
        contactId: contactId,
      });

      if (attendanceData) {
        return res.status(500).json({
          errors: { common: { msg: "Class booked already for student" } },
        });
      } else {
        newBooking
          .save()
          .then((data) => {
            return res.status(200).json({ success: true, msg: "Class successfully booked" });
          })
          .catch((error) => {
            return res.status(500).json({
              errors: { common: { msg: error.message } },
            });
          });
      }
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc update class booking
 * @route POST api/attendance/updateBookClass
 * @return
 */
exports.updateBookClass = asyncHandler(async (req, res) => {
  try {
    const id = req.body?._id;
    Attendance.findByIdAndUpdate(id, { $set: req.body })
      .then((data) => {
        res.status(200).json({
          success: true,
          msg: "Class successfully updated",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.getAttendance = asyncHandler(async (req, res) => {
  const { classId, seriesId, startDate, endDate } = req.query;
  try {
    const selectDate = new Date(startDate);
    const tomorrow = new Date(selectDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendees = seriesId
      ? await Attendance.aggregate([
          {
            $match: {
              $and: [
                {
                  seriesId: mongoose.Types.ObjectId(seriesId),
                  attendedDateTime: {
                    $gte: new Date(selectDate),
                    $lt: endDate ? new Date(endDate) : new Date(tomorrow),
                  },
                },
              ],
            },
          },
        ])
      : await Attendance.aggregate([
          {
            $match: {
              $and: [
                {
                  classId: mongoose.Types.ObjectId(classId),
                  attendedDateTime: {
                    $gte: new Date(selectDate),
                    $lt: endDate ? new Date(endDate) : new Date(tomorrow),
                  },
                },
              ],
            },
          },
        ]);
    return res.status(200).json({
      success: true,
      data: attendees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getAllAttendance = asyncHandler(async (req, res) => {
  // const
  try {
    const userId = req.user._id;
    const attendees = await Attendance.find({ userId: userId });
    return res.status(200).json({
      success: true,
      data: attendees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc get Booking by class id
 * @route GET api/attendance/get-ClassBooking
 * @return
 */
exports.getClassBooking = asyncHandler(async (req, res) => {
  // const { data } = req.query;
  const { classId } = req.params;
  try {
    const classBookings = await Attendance.find({ classId });
    return res.status(200).json({
      success: true,
      data: classBookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc get Booking by seriesId
 * @route GET api/attendance/get-classBooking-by-seriesId
 * @return
 */
exports.getClassBookingBySeriesId = asyncHandler(async (req, res) => {
  const { seriesId } = req.params;
  try {
    const classBookings = await Attendance.find({ seriesId });
    return res.status(200).json({
      success: true,
      data: classBookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Delete a Attendance by attendance Id
 * @route GET api/attendance/delete-attendance/:attendanceId
 * @return
 */
exports.deleteAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  try {
    await Attendance.findByIdAndDelete(attendanceId)
      .then(() => {
        return res.status(200).json({ success: true, msg: "Successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
      });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
});

/**
 * @desc Delete a Attendance by attendance Id
 * @route GET api/attendance/delete-booking/:bookingId
 * @return
 */
exports.deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  try {
    await Attendance.findByIdAndDelete(bookingId)
      .then(() => {
        return res.status(200).json({ success: true, msg: "Successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
      });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
});

exports.oneTimeSchedule = asyncHandler(async (req, res) => {
  const payload = req.body;
  const classId = payload?._id;
  const bookingId = payload?.bookingId;
  if (payload.type === "existingSchedule") {
    //update class Id attendance table with bookingId
    await Attendance.findByIdAndUpdate(
      bookingId,
      { $set: { classId: classId } },
      { $inc: { rescheduleAttempt: 1 } }
    );
    return res.status(200).json({ success: true, msg: "Class Reschedule successfully" });
  } else {
    // create new class and update to booking
    //update class Id attendance table with bookingId
    await ClassAttendance.create(payload)
      .then(async (classData) => {
        const classId = classData?._id;
        await Attendance.findByIdAndUpdate(
          bookingId,
          { $set: { classId: classId } },
          { $inc: { rescheduleAttempt: 1 } }
        );
        return res.status(200).json({ success: true, msg: "Class Reschedule successfully" });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  }
});

exports.ongoingTimeSchedule = asyncHandler(async (req, res) => {
  const payload = req.body;
  const seriesId = payload?.seriesId;
  let bookingRow = payload?.bookingRow;
  delete bookingRow._id;
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  try {
    // fetch all ongoing classes with series Id
    const classes = await ClassAttendance.find({
      seriesId: seriesId,
      startDate: { $gte: currentDate }, // get ongoing classes
    });

    let allBooking = [];
    if (classes.length > 0) {
      classes.map((classRow) => {
        // assign class Id for all bookings
        let NewBooking = { ...bookingRow, classId: classRow?._id };
        allBooking.push(NewBooking);
        // create booking for all classes
        return true;
      });
    }

    if (allBooking.length > 0) {
      // insert  booking for all classes
      await Attendance.insertMany(allBooking)
        .then((result) => {
          res.send({
            msg: "Class Reschedule successfully!",
            data: result,
            success: true,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            success: false,
            errors: { common: { msg: error.message } },
          });
        });
    } else {
      return res.status(500).json({
        errors: { common: { msg: "Ongoing classes not found!" } },
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
});
