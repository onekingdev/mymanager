const { ProductBrand } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  let payload = req.body;
  const { _id } = req.user._id;
  const { organization } = req.headers;

  try {
    await ProductBrand.create({
      ...payload,
      shopId: mongoose.Types.ObjectId(payload.shopId),
      userId: mongoose.Types.ObjectId(_id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? req.user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : req.user.userType,
    });
    return res.status(200).json({ success: true, message: "Brand added successfully" });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.getBrands = asyncHandler(async (req, res) => {
  let { shopId } = req.params;
  const { organization } = req.headers;
  try {
    let q = { shopId: mongoose.Types.ObjectId(shopId), isDeleted: false };
    if (organization) {
      q = {
        $or: [
          {
            shopId: mongoose.Types.ObjectId(shopId),
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    } else {
      q = {
        $or: [
          { shopId: mongoose.Types.ObjectId(shopId), isDeleted: false },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }
    const brands = await ProductBrand.find(q);
    return res.status(200).json({ success: true, data: brands });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.delete = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params
    await ProductBrand.findByIdAndUpdate(mongoose.Types.ObjectId(id),{isDeleted:true})
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
})

exports.update = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params
    const payload = req.body
    await ProductBrand.findByIdAndUpdate(mongoose.Types.ObjectId(id),{...payload})
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
})
