const router = require("express").Router();
const {
  createInvoice,
  getInvoices,
  updateInvoiceById,
  getInvoiceById,
  deleteInvoiceById,
  sendInvoiceEmail,
  addPayment,
} = require("../controllers/invoice");
const isAuthenticated = require("../middleware/auth");


router.post("/", isAuthenticated, createInvoice);
router.get("/", isAuthenticated, getInvoices);
router.get("/:id", getInvoiceById);
router.post("/send-email", isAuthenticated, sendInvoiceEmail);
router.patch("/:id", isAuthenticated, updateInvoiceById);
router.put("/:id", addPayment);
router.delete("/:id", isAuthenticated, deleteInvoiceById);

module.exports = router;
