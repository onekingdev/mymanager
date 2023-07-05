const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

const { Element } = require("../models/index/index");

exports.createElement = asyncHandler(async (req, res) => {
  const payload = req.body;
  const data = await Element.create(payload);
  return res.status(200).json(data);
});

exports.getElement = asyncHandler(async (req, res) => {
  const { organization_id } = req.headers;
  let data = await Element.find({
    // $or: [
    // {
    organizationId: mongoose.Types.ObjectId(organization_id),
    // },
    // {
    //   organizationId: null,
    // },
    // ],
  });
  // const removeOriginal = [];
  // data.forEach((d) => {
  //   if (d.defaultId) {
  //     removeOriginal.push(d.defaultId.toString());
  //   }
  // });
  // data = data.filter((d) => {
  //   if (removeOriginal.indexOf(d._id.toString()) < 0) {
  //     if (d.defaultId !== null) d._id = d.defaultId;
  //     return d;
  //   }
  // });
  return res.status(200).json(data);
});
exports.getElementsByOrgId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let data = await Element.find({
      organizationId: mongoose.Types.ObjectId(id),
    });

    return res.status(200).json(data);
  } catch {}
});

// exports.createCustomizedElement = asyncHandler(async (req, res) => {
//   const { defaultId } = req.params;
//   const { organization_id } = req.headers;
//   const { title } = req.body;
//   const updated = await Element.findOneAndUpdate(
//     { defaultId, organizationId: organization_id },
//     { title },
//     { new: true }
//   );
//   if (updated) {
//     return res.status(200).send(updated);
//   } else {
//     res.send({ success: false, message: "Element not updated" });
//   }
// });

exports.updateElement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //const { organization_id } = req.headers;
  const { title } = req.body;
  console.log("id",id)
  console.log("title",title)
  try{
    const updated = await Element.findOneAndUpdate(
      { _id:mongoose.Types.ObjectId(id) },
      { elementTitle:title },
      { new: true }
    );
    if (updated) {
      return res.status(200).send({success:true,data:updated});
    } else {
      res.send({ success: false, message: "Element not updated" });
    }
  }
  catch(error){
    console.log(error)
    return res.status(400).json({
            errors: { common: { msg: err.message } },
          });
  }
});

// exports.createCustomizedElement = asyncHandler(async (req, res) => {
//   if (!req.body.defaultId) {
//     return res.status(400).json({ success: false, message: "Default id is required" });
//   }
//   const { organization } = req.user;
//   const payload = req.body;
//   payload.organizationId = organization.id;
//   let data;
//   if (payload.isModified) {
//     data = await Element.findOneAndUpdate(
//       {
//         organizationId: organization.id,
//         defaultId: mongoose.Types.ObjectId(payload.defaultId),
//         isModified: true,
//       },
//       payload,
//       { new: true, runValidators: true }
//     );
//   } else {
//     payload.isModified = true;
//     data = await Element.create(payload);
//   }
//   return res.status(200).json(data);
// });
