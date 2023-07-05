const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  deleteFromCart,
} = require("../controllers/cart");

router.post("/add-to-cart", addToCart);
router.post("/delete-from-cart/:id", deleteFromCart);
router.get("/:id", getCart);


module.exports = router;
