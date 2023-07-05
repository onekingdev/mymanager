const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createClass,
  getClasses,
  deleteClass,
  updateClass,
  markAttendance,
  bookClass,
  updateBookClass,
  getAttendance,
  deleteAttendance,
  deleteBooking,
  updateWholeSeries,
  getClassBooking,
  getClassBookingBySeriesId,
  oneTimeSchedule,
  ongoingTimeSchedule,
  getAllAttendance,
  bookStudentIntoClass,
  updateBookedStudent,
  getBookedStudentsBySeriesId,
  removeBookedStudent,
} = require("../controllers/classAttendance");
// ** Class
router.post("/create/", isAuthenticated, createClass);
router.post("/update/", isAuthenticated, updateClass);
router.post("/updateWholeSeries/", isAuthenticated, updateWholeSeries);
router.get("/all/:userId", isAuthenticated, getClasses);
router.delete("/:type/:classId", isAuthenticated, deleteClass);

// ** Booked Student
router.post("/bookStudentIntoClass/", isAuthenticated, bookStudentIntoClass);
router.post("/updateBookedStudent/", isAuthenticated, updateBookedStudent);
router.get("/getBookedStudentsBySeriesId/:seriesId", isAuthenticated, getBookedStudentsBySeriesId);
router.post("/removeBookedStudent/:bookingId", isAuthenticated, removeBookedStudent);

// ** Original Booking
router.post("/bookClass/", isAuthenticated, bookClass);
router.post("/updateBookClass/", isAuthenticated, updateBookClass);
router.get("/get-classBooking/:classId", isAuthenticated, getClassBooking);
router.get("/get-classBooking-by-seriesId/:seriesId", isAuthenticated, getClassBookingBySeriesId);
router.post("/deleteBooking/:bookingId", isAuthenticated, deleteBooking);

// ** Attendance
router.get("/get-attendance/", isAuthenticated, getAttendance);
router.get("/all-attendance", isAuthenticated, getAllAttendance);
router.post("/mark-attendance/", isAuthenticated, markAttendance);
router.post("/delete-attendance/:attendanceId", isAuthenticated, deleteAttendance);

/*router.post("/add-guests", isAuthenticated, addNewGuests)
router.get("/info/:eventId", isAuthenticated, getEventInfo); */
// Reschedule
router.post("/oneTimeSchedule/", isAuthenticated, oneTimeSchedule);
router.post("/ongoingTimeSchedule/", isAuthenticated, ongoingTimeSchedule);

module.exports = router;
