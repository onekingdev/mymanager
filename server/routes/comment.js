const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addComment,
  getComment,
  viewoneComment,
  delComment,
  commentByPost,
} = require("../controllers/comment");

router.post("/addComment", isAuthenticated, addComment);
router.get("/get_comment", isAuthenticated, getComment);
router.get("/viewone_comment/:id", isAuthenticated, viewoneComment);
router.get("/del_comment/:id", isAuthenticated, delComment);
router.get("/commentByPost/:id", isAuthenticated, commentByPost);

module.exports = router;
