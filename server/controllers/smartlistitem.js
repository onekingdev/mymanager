const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {
  SmartListItem,
  ClientContact,
  EmployeeContact,
  LeadContact,
  RelationContact,
  VendorContact,
  Category,
  RankCategory,
  // MemberContact,
} = require("../models/index/index");

exports.createSmartListItem = (req, res) => {
  const smartListItem = req.body;
  smartListItem.userId = req.user._id;
  const newSmartListItem = new SmartListItem(smartListItem);
  newSmartListItem.save((err, data) => {
    if (err) {
      return res.send({ msg: err.message, success: false });
    }
    return res.send({ msg: "SmartListItem created successfully", success: true, data });
  });
};

exports.getSmartListItem = (req, res) => {
  const userId = req.user._id;
  const { listId } = req.params;
  SmartListItem.find({ userId, listId: listId, isDeleted: false })
    .then((data) => {
      res.send({ data, success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.deleteSmartListItem = (req, res) => {
  const itemId = req.params.itemId;
  SmartListItem.findByIdAndUpdate(itemId, { $set: { isDeleted: true } })
    .then(() => {
      res.send({ msg: "Item deleted successfully", success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.updateSmartListItem = (req, res) => {
  const itemData = req.body;
  const itemId = req.params.itemId;
  SmartListItem.findByIdAndUpdate(itemId, {
    ...itemData,
  })
    .then((result) => {
      res.send({ msg: "item updated successfuly", data: result, success: true });
    })
    .catch(() => {
      res.send({ msg: "booking not updated!", success: false });
    });
};

exports.getCustomersWithSmartList = async (req, res) => {
  let result = [];
  try {
    const { contactType, status, tag, leadSource, progression } = req.body;
    await contactType.map((item) => {
      if (item == "Clients") {
        const resultClients = ClientContact.find({
          $and: [{ status: { $in: status } }, { isDelete: false }],
        });
        result = result.concat(resultClients);
      }
      if (item == "Employee") {
        EmployeeContact.findOne({
          $and: [
            // {tags: {$in: tag}},
            // {leadSource: {$in: leadSource}},
            { status: { $in: status } },
            { isDelete: false },
          ],
        }).then((resultEmployees) => {
          result = result.concat(resultEmployees);
          //console.log(result);
        });
      }
      if (item == "Leads") {
        const resultLeads = LeadContact.find({
          $and: [{ status: { $in: status } }, { isDelete: false }],
        });
        result.concat(resultLeads);
      }
      if (item == "Relationships") {
        const resultRelationships = RelationshipContact.find({
          $and: [{ status: { $in: status } }, { isDelete: false }],
        });
        result.concat(resultRelationships);
      }
      if (item == "Vendor") {
        const resultVenders = VenderContact.find({
          $and: [{ status: { $in: status } }, { isDelete: false }],
        });
        result.concat(resultVenders);
      }
    });
  } catch (error) {}
};
