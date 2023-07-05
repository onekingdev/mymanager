const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addClientsInProgression,
  getClientsRanks,
  promoteClientRanks,
  promoteClientRanksFromEvent,
  removePromoted,
  notPromotedList,
  promotedList,
  contactRankList,
  removeClientFromProgression,
} = require("../controllers/clientRanks");

router.post("/add_client_into_progression", isAuthenticated, addClientsInProgression);
router.post("/remove_client_from_progression", isAuthenticated, removeClientFromProgression);

router.put("/promote_clients_rank", isAuthenticated, promoteClientRanks);
router.put("/promote_clients_rank_from_event", isAuthenticated, promoteClientRanksFromEvent);
router.put("/add_clients_intoProgression", isAuthenticated, removePromoted);
router.get("/listof_not_Promoted_clients", isAuthenticated, notPromotedList);
router.get("/listof_Promoted_clients", isAuthenticated, promotedList);
router.post("/get_clients_rank", isAuthenticated, getClientsRanks);
router.get("/listof_contact_rank", isAuthenticated, contactRankList);

module.exports = router;
