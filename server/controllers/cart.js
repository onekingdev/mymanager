const { Cart, Product } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.addToCart = asyncHandler(async (req, res) => {
  try {
    let params = req.body;
    let cart;
    cart = await Cart.findOne({ userId: params.guestId});
    if (cart !== null) {
      const item = cart.items.find(x=>x.itemId.toString()===params._id)
      if (item) {
        await Cart.findOneAndUpdate(
          { _id: cart._id, "items.itemId": mongoose.Types.ObjectId(params._id) },
          {
            "items.$.count": params.count
          }
        );
      } else {
        await Cart.findOneAndUpdate(
          { _id: cart._id },
          {
            $push: {
              items: {
                itemId: params._id,
                count: params.count || 1,
                itemType: params.itemType,
              },
            },
          }
        );
      }
    } else {
      await Cart.create({
        userId: params.guestId,
        userType: params.userType,
        items: [
          {
            itemId: params._id,
            count: params.count || 1,
            itemType: params.itemType,
          },
        ],
      });
    }
    res.status(200).send({
      msg: "product added successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.deleteFromCart = asyncHandler(async (req, res) => {
  try {
    let {id} = req.params;
    let params = req.body;
    let cart;
    cart = await Cart.findOne({ _id: mongoose.Types.ObjectId(id)});
    if (cart !== null) {
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { "$pull": { "items": { "_id": mongoose.Types.ObjectId(params._id) } }}
      );
    } 
    res.status(200).send({
      msg: "product deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.getCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let cart = await Cart.findOne({ userId: id },{},{ sort: { 'createdAt' : -1 } }).populate({
      path: "items.itemId", model:Product
    });
    return res.status(200).json({
      data: cart,
      success: true,
    });
  } catch (error) {
    res.status(400).send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

