const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  clientRanksHistory,
  updateRankHistory,
  deleteRankHistory,
  clientRanksHistoryAll,
  addClientHistory,
} = require("../controllers/rankHistory");

router.post("/add_rank_client_history/:clientId", isAuthenticated, addClientHistory);
router.post("/promoted_client_history/:clientId", isAuthenticated, clientRanksHistory);
router.post("/promoted_client_history_all", isAuthenticated, clientRanksHistoryAll);
router.put("/promoted_client_history_update/:rankHistoryId", isAuthenticated, updateRankHistory);
router.delete("/delete_rank_history/:rankHistoryId", isAuthenticated, deleteRankHistory);

module.exports = router;
