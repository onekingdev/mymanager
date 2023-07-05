const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const membershipBuyController = require("../controllers/membershipBuy");

router.post('/',membershipBuyController.create)
router.post('/activate',membershipBuyController.activateMembership)
router.get('/:id',membershipBuyController.getMembership)
router.get('/orders/:id',isAuthenticated,membershipBuyController.getOrders)
router.put('/:id',isAuthenticated,membershipBuyController.updateBuyMembership)
router.get('/contact/:id',isAuthenticated,membershipBuyController.getClientContracts)


module.exports = router;