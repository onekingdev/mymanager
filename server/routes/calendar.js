const router = require("express").Router();
const {
  getBooking,
  getMonthlyBooking,
  getBookingCount,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingType,
  getBookingDetail,

  getBookingTypeDetail,
  createBookingType,
  updateBookingType,
  deleteBookingType,
  cloneBookingType,
} = require("../controllers/calendar");

const {
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment");

const isAuthenticated = require("../middleware/auth");

router.post("/booking/create", createBooking);
router.put("/booking/update/:id", updateBooking);
router.get("/booking/get", isAuthenticated, getBooking);
router.get("/booking/get-monthly", isAuthenticated, getMonthlyBooking);
router.get("/booking/get-booking-count", getBookingCount);
router.get("/booking/info/:id", getBookingDetail);
router.delete("/booking/delete/:id", isAuthenticated, deleteBooking);
router.post("/booking-type/create", isAuthenticated, createBookingType);
router.post("/booking-type/clone/:id", isAuthenticated, cloneBookingType);
router.put("/booking-type/update/:id", isAuthenticated, updateBookingType);
router.get("/booking-type/get", isAuthenticated, getBookingType);
router.get("/booking-type/info/:link", getBookingTypeDetail);
router.delete("/booking-type/delete/:id", isAuthenticated, deleteBookingType);

// ** Appointment
router.post("/appointment/create", isAuthenticated, createAppointment);
router.post("/appointment/update/", isAuthenticated, updateAppointment);
router.get("/appointment/get", isAuthenticated, getAppointment);
router.delete("/appointment/delete/:id", isAuthenticated, deleteAppointment);

module.exports = router;
