const { Product, Shop } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  const { organization } = req.headers;
  let {
    brandId,
    categoryId,
    name,
    path,
    description,
    imgUrl,
    price,
    permission,
    isSignatured,
    freeShipping,
    inStock,
    emi,
    features,
  } = req.body;
  const userId = req.user._id;
  const { shopId } = req.params;
  try {
    payload = {
      brandId: mongoose.Types.ObjectId(brandId),
      userId: mongoose.Types.ObjectId(userId),
      shopId: mongoose.Types.ObjectId(shopId),
      categoryId: mongoose.Types.ObjectId(categoryId),
      name,
      description,
      imgUrl,
      price,
      permission,
      isSignatured,
      path: path || name.replaceAll(" ", "-"),
      freeShipping: freeShipping || false,
      inStock: inStock || 1,
      emi: emi || false,
      features: features || [],
      creatorType:organization? req.user.organizations.find(x=>x.organizationId.toString()===organization).userType: req.user.userType,
      organizationId:organization? mongoose.Types.ObjectId(organization):null
    };
    
    await Product.create(payload);
    return res.status(200).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.productInfo = asyncHandler(async (req, res) => {
  const { shopPath, productPath } = req.query;
  try {
    const product = await Product.aggregate([
      { $match: { path: `${shopPath}/${productPath}`, isDeleted: false } },
      {
        $lookup: {
          from: "product-brands",
          localField: "brandId",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "product-categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$brand",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
    if (product.length > 0) {
      return res.status(200).json({ success: true, data: product[0] });
    } else {
      return res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.productList = asyncHandler(async (req, res) => {
  try {
    let { shopId, permission } = req.query;
    let permissions = [];
    const { organization } = req.headers;
    if (permission === "all") {
      permissions = ["private", "public"];
    } else {
      permissions = [permission];
    }
    let q;
    if (permission === "public") {
      q = {
        shopId: mongoose.Types.ObjectId(shopId),
        permission: { $in: permissions },
        isDeleted: false,
      };
    } else {
      if(organization){
        q = {
          $or: [
            {
              shopId: mongoose.Types.ObjectId(shopId),
              permission: { $in: permissions },
              isDeleted: false,
            },
            {
              organizationId: mongoose.Types.ObjectId(organization),
              permission: "public",
              isDeleted: false,
            },
            {
              creatorType: "super-admin",
              permission: "public",
              isDeleted: false,
            },
          ],
        };
      }
      else{
        q = {
          $or: [
            {
              shopId: mongoose.Types.ObjectId(shopId),
              permission: { $in: permissions },
              isDeleted: false,
            },
            {
              creatorType: "super-admin",
              permission: "public",
              isDeleted: false,
            },
          ],
        };
      }
     
      
    }
    const products = await Product.aggregate([
      {
        $match: q,
      },
      {
        $lookup: {
          from: "product-brands",
          localField: "brandId",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "product-categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$brand",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);

    return res.status(200).json({ success: true, data: products });
  } catch (err) {

    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    await Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload);
    return res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});
