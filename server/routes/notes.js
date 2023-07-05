const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotesByContactId,
  updateNote,
  removeNote,
  getAllNotes,
} = require("../controllers/notes");
const isAuthenticated = require("../middleware/auth");

router.post("/followup_note/add_note/:contactId", isAuthenticated, createNote);
router.get("/followup_note/get_client_notes/:contactId", isAuthenticated, getNotesByContactId);
router.get("/followup_note/get_client_notes", isAuthenticated, getAllNotes);
router.put("/followup_note/update_note/:noteId", isAuthenticated, updateNote);
router.delete("/followup_note/remove_note/:noteId", isAuthenticated, removeNote);

module.exports = router;
