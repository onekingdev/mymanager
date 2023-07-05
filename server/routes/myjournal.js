const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");

const {
  addMyJournal,
  updateMyJournal,
  myJournalList,
  dltMyJournal,
} = require("../controllers/myjournal");

router.post("/", isAuthenticated, singleUploadControl, addMyJournal);
router.put("/:journalId", isAuthenticated, singleUploadControl, updateMyJournal);
router.get("/", isAuthenticated, myJournalList);
router.delete("/:id", isAuthenticated, dltMyJournal);

module.exports = router;
