const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { Organization, OrganizationLocation, SubscriptionPlan, SubscriptionBought } = require("../models/index/index");
const { defaultElements } = require("../constants");
const { organizationEmailTemplate, organizationInvitationEmailTemplate } = require("../constants/emailTemplates");
const { SendMail } = require("../service/sendMail");

exports.createOrganization = asyncHandler(async (req, res) => {
  
  try {
    let payload = req.body;
    payload.createdBy = req.user._id;
    payload.path = payload.path.replaceAll(' ','-')
    payload.url = `https://${payload.path}.mymanager.com/`;
    const orgData = await Organization.create(payload);
    const buyPlan = {
      organizationId: orgData._id,
      planId:mongoose.Types.ObjectId(payload.planId),
      status:'waiting'
    }
    
    await SubscriptionBought.create(buyPlan);
  
    res.status(200).json({ success: true, data: orgData });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }

});

exports.editOrganization = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    payload.updatedBy = req.user._id;
    if (payload.path) {
      payload.path = payload.path.replaceAll(' ','-')
      payload.url = `https://${payload.path}.mymanager.com`;
    }
    await Organization.findByIdAndUpdate(mongoose.Types.ObjectId(id), { $set: payload });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.addOrganizationLocation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    payload.organizationId = mongoose.Types.ObjectId(id);
    await OrganizationLocation.create(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
   // console.log(error)
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteOrganizationLocation = asyncHandler(async (req, res) => {
  try {
    const { id, locationId } = req.params;
    const loc = await OrganizationLocation.findOne({
      organizationId: mongoose.Types.ObjectId(id),
      _id: mongoose.Types.ObjectId(locationId),
    });
    if (loc === null) {
      return res.status(404).send({ success: false, message: `Location not found` });
    }
    loc.delete();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateOrganizationLocation = asyncHandler(async (req, res) => {
  try {
    const { id, locationId } = req.params;
    const loc = await OrganizationLocation.findOneAndUpdate(
      {
        organizationId: mongoose.Types.ObjectId(id),
        _id: mongoose.Types.ObjectId(locationId),
      },
      { $set: { ...req.body } }
    );
    if (loc === null) {
      return res.status(404).send({ success: false, message: `Location not found` });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOrganizations = asyncHandler(async (req, res) => {
  const { isVerified, isDeleted } = req.query;
  let matchCond = { $match: {} };
  if (isVerified === "true") {
    matchCond = { $match: { isVerified: true, ...matchCond.$match } };
  } else if (isVerified === "false") {
    matchCond = { $match: { isVerified: false, ...matchCond.$match } };
  }

  if (isDeleted === "true") {
    matchCond = { $match: { isDeleted: true, ...matchCond.$match } };
  } else if (isDeleted === "false") {
    matchCond = { $match: { isDeleted: false, ...matchCond.$match } };
  }

  try {
    const orgs = await Organization.aggregate([
      matchCond,
      {
        $lookup: {
          from: "organization-locations",
          localField: "_id",
          foreignField: "organizationId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "subscriptions-bought",
          localField: "_id",
          foreignField: "organizationId",
          as: "plan",
        },
      },
      {
        $lookup: {
          from: "subscription-plan",
          localField: "plan.planId",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "organizations.organizationId",
          as: "users",
        },
      },
      { $addFields: {userCount: {$size: "$users"}}},
      {
        $project:{
          users:0
        }
      }
    ]);
    return res.status(200).json(orgs);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOrganizationById = asyncHandler(async (req, res) => {
  try {
    console.log("organization")
    const { id } = req.params;
    const orgs = await Organization.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "organization-locations",
          localField: "_id",
          foreignField: "organizationId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "subscriptions-bought",
          localField: "_id",
          foreignField: "organizationId",
          as: "plan",
        },
      },
      {
        $lookup: {
          from: "subscription-plan",
          localField: "plan.planId",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "organizations.organizationId",
          as: "users",
        },
      },
      { $unwind: {path:"$users",preserveNullAndEmptyArrays: true} },
      {
        $lookup: {
          from: "auths",
          localField: "users.userId",
          foreignField: "_id",
          as: "users.userDetails",
        },
      },
      { $unwind: {path:"$users.userDetails",preserveNullAndEmptyArrays: true} },
      { $addFields: { "users.email": "$users.userDetails.email" }},
      { $addFields: { "users.phone": "$users.userDetails.phone" }},
      
      {$project:{
        "users.userDetails":0
      }},
      { $group: {
        _id: "$_id",
        "name": { "$first": "$name" },
        "email": { "$first": "$email" },
        "contact": { "$first": "$contact" },
        "address": { "$first": "$address" },
        "url": { "$first": "$url" },
        "path": { "$first": "$path" },
        "themeColor": { "$first": "$themeColor" },
        "logoLink": { "$first": "$logoLink" },
        "isVerified": { "$first": "$isVerified" },
        "isDeleted": { "$first": "$isDeleted" },
        "createdBy": { "$first": "$createdBy" },
        "createdAt": { "$first": "$createdAt" },
        "updatedAt": { "$first": "$updatedAt" },
        "locations": { "$first": "$locations" },
        "plan": { "$first": "$plan" },
        "planDetails": { "$first": "$planDetails" },
        "users": { "$push": "$users" }
    }}
    ]);
    if (orgs.length < 1) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    else{
      return res.status(200).json(orgs);
    }
   
  } catch (error) {
    console.log(error)
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOrganizationByPath = asyncHandler(async (req, res) => {
  try {
    const { path } = req.params;
    const orgs = await Organization.aggregate([
      {
        $match: {
          path,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "organization-locations",
          localField: "_id",
          foreignField: "organizationId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "subscriptions-bought",
          localField: "_id",
          foreignField: "organizationId",
          as: "plan",
        },
      },
      {
        $lookup: {
          from: "subscription-plan",
          localField: "plan.planId",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      // {
      //   $project: {
      //     name: 1,
      //     logoLink: 1,
      //     themeColor: 1,
      //   },
      // },
    ]);
    if (orgs.length < 1) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json(orgs);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.checkOrganizationAvailability = asyncHandler(async (req, res) => {
  try {
    const { path, name, email, contact } = req.body;
    let response = {};
    if (path) {
      const checkPath = await Organization.findOne({ path, isDeleted: false });
      if (checkPath === null) {
        response["is_path_available"] = true;
      } else {
        response["is_path_available"] = false;
      }
    }

    if (name) {
      const checkName = await Organization.findOne({ name, isDeleted: false });
      if (checkName === null) {
        response["is_name_available"] = true;
      } else {
        response["is_name_available"] = false;
      }
    }

    if (email) {
      const checkEmail = await Organization.findOne({ email, isDeleted: false });
      if (checkEmail === null) {
        response["is_email_available"] = true;
      } else {
        response["is_email_available"] = false;
      }
    }

    if (contact) {
      const checkContact = await Organization.findOne({ contact, isDeleted: false });
      if (checkContact === null) {
        response["is_contact_available"] = true;
      } else {
        response["is_contact_available"] = false;
      }
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.sendOrgDetailsEmail = asyncHandler(async(req,res)=>{
  const { message, organizationId } = req.body;
  try {
    const organization = await Organization.findOne({_id:mongoose.Types.ObjectId(organizationId)});
    const emailBody = organizationEmailTemplate({
      orgName:organization.name,
      email:organization.email,
      contact:organization.contact,
      address:organization.address,
      url:`${organization.url}register`,
      message:message
    })
    SendMail({
      from: `From MyManager <admin@mymanager.com>`,
      recipient:organization.email,
      subject: `ACTIVATE YOUR ORGANIZATION ${organization.name}`,
      body: emailBody,
    })
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
})

exports.sendBulkInvitation = asyncHandler(async(req,res)=>{
  const { recipients, message,organizationId} = req.body;
  try {
    const organization = await Organization.findOne({_id:mongoose.Types.ObjectId(organizationId)});
    for (const rec of recipients) {
      const emailBody = organizationInvitationEmailTemplate({
        orgName:organization.name,
        email:rec.email,
        name:rec.name,
        
        url:`${organization.url}register`,
        message:message.message
      })
      SendMail({
        from: `From MyManager <admin@mymanager.com>`,
        recipient:rec.email,
        subject: message?.subject || `You are invited to ${organization.name}`,
        body: emailBody,
      })
    }
    
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
})
