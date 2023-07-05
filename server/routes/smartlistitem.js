const router = require("express").Router();
const {
  getSmartListItem,
  createSmartListItem,
  deleteSmartListItem,
  updateSmartListItem,
  getCustomersWithSmartList,
} = require("../controllers/smartlistitem");
const isAuthenticated = require("../middleware/auth");

router.post("/create", isAuthenticated, createSmartListItem);
router.get("/get/:listId", isAuthenticated, getSmartListItem);
router.delete("/delete/:itemId", isAuthenticated, deleteSmartListItem);
router.put("/update/:itemId", isAuthenticated, updateSmartListItem);

//get all customers data from smart list item data

router.post("/getCustomers", isAuthenticated, getCustomersWithSmartList);
module.exports = router;
