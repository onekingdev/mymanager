const { ContactField, Contact } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const mongooseDynamic = require("mongoose-dynamic-schemas");

const { defaultContactFields } = require("../constants/defaultContactField");

/**
 * Method to add contact-field
 * @method  POST
 * @param   {Object} data  Object of the contact-field
 * @return  {JSON}         status message
 */
exports.addContactField = asyncHandler(async (req, res) => {
  const { contactType, title, type, order, isShown, organizationId } = req.body;
  const userId = req.user._id;
  let orgId = null,
    columns = [];
  if (organizationId) {
    orgId = mongoose.Types.ObjectId(organizationId);
  }
  const existedContactField = await ContactField.findOne({
    userId: userId,
    contactTypeId: contactType,
  });
  if (existedContactField) {
    existedContactField.columns = [
      ...existedContactField.columns,
      { title: title, type: type, order: order, isShown: isShown },
    ];
    await existedContactField.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: err.message,
        });
      }
      //mongooseDynamic.addSchemaField(Contact, title, { type: eval(type), default: null });

      res.send({ status: true, message: "success", data: data });
    });
  } else {
    columns = [
      ...defaultContactFields,
      { title: title, type: type, order: order, isShown: isShown },
    ];
    const payload = {
      userId: userId,
      organizationId: orgId,
      contactTypeId: mongoose.Types.ObjectId(contactType),
      columns: columns,
    };
    let newContactField = new ContactField(payload);
    await newContactField.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: err.message,
        });
      }
      // mongooseDynamic.addSchemaField(Contact, title, { type: eval(type), default: null });
      res.send({ status: true, message: "success", data: data });
    });
  }
});

/**
 * Method to get contact-Field by contactTypeId
 * @method  GET
 * @return  status message
 */
exports.getContactField = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { contactType } = req.params;
  try {
    const contactField = await ContactField.findOne({
      userId: userId,
      contactTypeId: contactType,
    });
    return res.status(200).json({ data: contactField.columns, success: true });
  } catch (error) {
    return res.send({
      success: false,
      data: [],
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to get contact-Field by contactTypeId
 * @method  GET
 * @return  status message
 */
exports.getAllContactField = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const contactFields = await ContactField.find({
      userId: userId,
    });
    return res.status(200).json({ data: contactFields, success: true });
  } catch (error) {
    return res.send({
      success: false,
      data: [],
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to delete contact-Field by contactTypeId and fieldId
 * @method  DELETE
 * @return  status message
 */
exports.deleteContactField = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { contactType, fieldId } = req.params;
  try {
    const contactField = await ContactField.findOne({
      userId: userId,
      contactTypeId: contactType,
    });
    let tmp = [],
      fieldName = "";
    contactField.columns.map((item) => {
      if (item._id != fieldId) {
        tmp.push(item);
      } else {
        fieldName = item.title;
      }
    });
    contactField.columns = tmp;
    await contactField.save();
    ///await mongooseDynamic.removeSchemaField(Contact, fieldName, (removeSubdocumentIfEmpty = false));

    return res.status(200).send({
      success: true,
      data: contactField,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * Method to delete contact-Field by contactTypeId and fieldId
 * @method  PUT
 * @return  status message
 */
exports.updateContactField = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { contactType, title, order, type, fieldId, isShown } = req.body;

  try {
    const contactField = await ContactField.findOne({
      userId: userId,
      contactTypeId: contactType,
    });
    let tmp = [],
      oldFieldName = "";
    contactField.columns.map((item) => {
      if (item._id.toString() == fieldId) {
        oldFieldName = item.title;
        item.title = title;
        item.type = type;
        item.order = order;
        item.isShown = isShown;
      }
      tmp.push(item);
    });
    contactField.columns = tmp;
    // await mongooseDynamic.removeSchemaField(
    //   Contact,
    //   oldFieldName,
    //   (removeSubdocumentIfEmpty = false)
    // );
    // await mongooseDynamic.addSchemaField(Contact, title, { type: eval(type), default: null });
    await contactField.save();
    return res.send({
      status: true,
      data: contactField,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to update contact-field order by contactTypeId and fieldId
 * @method  POST
 * @return  status message
 */
exports.updateContactFieldOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { contactTypeId, orderArr } = req.body;

  try {
    const contactField = await ContactField.findOne({
      userId: userId,
      contactTypeId: contactTypeId,
    });
    let tmp = [];
    contactField.columns.map((existedItem) => {
      let matchedItem = orderArr.find((newItem) => newItem.name == existedItem.title);
      if (matchedItem) {
        existedItem.order = matchedItem.order;
      }
      tmp.push(existedItem);
    });
    contactField.columns = tmp;
    await contactField.save();
    return res.send({
      status: true,
      data: contactField,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});
