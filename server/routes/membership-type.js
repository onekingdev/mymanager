const router = require("express").Router();

const {
  getMembershipTypes,
  addMembershipType,
  updateMembershipType,
} = require("../controllers/membershipType");

const isAuthenticated = require("../middleware/auth");

router.get("/:shopId", getMembershipTypes);
router.post('/', isAuthenticated, addMembershipType);
router.put('/:id', isAuthenticated, updateMembershipType);
module.exports = router;


