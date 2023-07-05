const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const {
  eventCreate,
  eventUpdate,
  deleteEvent,
  getEvents,
  getEventInfo,
  addNewGuests,
  deleteGuests,
  deleteGuestsBulk,
  addAndUpdateGuests,
  registerToEvent,
  replyToEvent,
  addPayment,
  addBulkPayment,
  sendBulkInvoice,
} = require("../controllers/event");
// Create event
router.post("/create/", isAuthenticated, singleUploadControl, eventCreate);
router.put("/update/:id", isAuthenticated, singleUploadControl, eventUpdate);
router.delete("/:eventId", isAuthenticated, deleteEvent);

router.get("/all/", isAuthenticated, getEvents);

//Add new Guests
router.post("/add-guests", isAuthenticated, addNewGuests);
router.put("/add-update-guest/:id", addAndUpdateGuests);
router.delete("/delete-guests/:eventId/:guestId/:isInAttendance", isAuthenticated, deleteGuests);
router.post("/delete-guests-bulk", isAuthenticated, deleteGuestsBulk);
//router.get("/info/:eventId", isAuthenticated, getEventInfo);
router.get("/info/:eventId", getEventInfo);

// router.post("/registerToEvent", registerToEvent);
router.post("/replyToEvent", replyToEvent);
router.put("/payment/:id", addPayment);
router.put("/bulk/payment/:id", addBulkPayment);
router.put("/invoice/:id", sendBulkInvoice);
// Register to cf

module.exports = router;
