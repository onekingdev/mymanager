const { addToFavorite, getMyFavorites, deleteFromFavorite } = require("../controllers/productFavorite");

const router = require("express").Router();

router.post('/',addToFavorite)
router.get('/:id',getMyFavorites)
router.put('/',deleteFromFavorite)
module.exports = router;