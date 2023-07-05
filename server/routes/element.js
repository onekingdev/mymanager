const router = require("express").Router();
const {
  createElement,
  getElement,
  getElementsByOrgId,
  updateElement,
} = require("../controllers/element");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, createElement);
router.get("/", isAuthenticated, getElement);
router.get("/:id", isAuthenticated, getElementsByOrgId);
router.put("/:id", isAuthenticated, updateElement);

module.exports = router;
