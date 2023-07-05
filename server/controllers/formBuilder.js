// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { FormBuilder, LeadContact, FormEntry } = require("../models/index/index");
const { getAllContacts } = require("./contact");
const whois = require("whois");

/**
 *
 * @desc Create formBuilder Controller
 * @route POST /api/formBuilder/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createForm = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const payload = {
      ...req.body,
      userId: mongoose.Types.ObjectId(req.user._id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    const data = await FormBuilder.create(payload);

    return res.send({
      success: true,
      message: "Form created successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.findById(id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getForms = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;

    let query = {
      $or: [
        {
          userId: user._id,
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        },
        { isTemplate: true, creatorType: "super-admin" },
      ],
    };
    if(organization){
      q = {
        $or: [
          {
            userId: user._id,
            organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          },
          { isTemplate: true, creatorType: "super-admin" },
          {
            isTemplate: true,
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
          },
        ],
      }
    }
    const data = await FormBuilder.find(query);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getTemplates = asyncHandler(async (req, res) => {
  try {
    let id = req.user._id;
    let { organization } = req.headers;

    //get all templates that should show to user
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(id),
            organizationId: mongoose.Types.ObjectId(organization),
            isTemplate: true,
          },
          { isTemplate: true, creatorType: "super-admin" },
          {
            isTemplate: true,
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(id),
            organizationId: null,
            isTemplate: true,
          },
          { isTemplate: true, creatorType: "super-admin", organizationId:null },
        ],
      };
    }
    const userData = await FormBuilder.find(q);
    return res.status(200).json({ success: true, data: userData });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.deleteForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    await FormBuilder.findByIdAndUpdate(id, { status: "remove" });
    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.editForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.findByIdAndUpdate(id, req.body, { new: true });
    if (data) {
      return res.send({ success: true, data });
    }
    return res.status(404).json({ success: false, message: `Form with id: ${id} not found` });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.addLeads = asyncHandler(async (req, res) => {
  const { id } = req.params; // formId

  //get userId of form
  const form = await FormBuilder.findById(mongoose.Types.ObjectId(id));
  if (!form) {
    throw Error("No such form found !");
  }
  const userId = form.userId;

  const payload = { ...req.body, userId };
  //Check phone exist or not
  if (payload?.phone !== "") {
    const checkExist = await LeadContact.findOne({
      phone: payload.phone,
      userId,
    });

    if (checkExist) {
      throw Error("Phone number already Exist");
    }
  }
  // Check Email exist or not
  if (payload?.email !== "") {
    const checkExist = await LeadContact.findOne({
      email: payload.email,
      userId,
    });
    if (checkExist) {
      throw Error("Email already Exist");
    }
  }

  const leadContact = new LeadContact(payload);
  // validation
  if (!req.body.fullName || req.body.fullName === "") {
    throw Error("Full name must not empty !");
  }

  // eslint-disable-next-line no-unused-vars
  leadContact.save((err, success) => {
    if (err) {
      if (err) {
        throw Error(err);
      }
    } else {
      return res.status(201).json({
        success: "Client contact created successfull",
      });
    }
  });
});

//add form entry details
exports.addFormEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body, formId: id };

    const data = await FormEntry.create(payload);

    return res.send({
      success: true,
      message: "Form data saved successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
exports.updateFormEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const data = await FormEntry.findByIdAndUpdate(mongoose.Types.ObjectId(id), req.body, {
      new: true,
    });

    return res.send({
      success: true,
      message: "Form data updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.deleteFormEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await FormEntry.findByIdAndDelete(mongoose.Types.ObjectId(id));
    return res.send({
      success: true,
      message: "Form data deleted successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.getFormEntryByFormId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    let formData = await FormEntry.find({ formId: id });
    let contactData = await getAllContacts(req.user._id);

    // formData = formData.json();
    // contactData = contactData.json();

    let data = [];
    for (i = 0; i < formData.length; i++) {
      let d = { formData: formData[i] };
      for (j = 0; j < contactData.length; j++) {
        if (formData[i].email !== "" || formData[i].phone !== "") {
          if (
            contactData[j].email === formData[i].email ||
            contactData[j].phone === formData[i].phone
          ) {
            d = { formData: formData[i], contactData: contactData[j] };
          }
        }
      }
      data.push(d);
    }

    if (data) {
      return res.send({
        success: true,

        data: data,
      });
    } else {
      return res.send({
        success: false,

        message: "FORM NOT FOUND",
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.getFormEntryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    let data = await FormEntry.findById(mongoose.Types.ObjectId(id));

    if (data) {
      return res.send({
        success: true,

        data: data,
      });
    } else {
      return res.send({
        success: false,

        message: "FORM NOT FOUND",
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.searchDomain = asyncHandler(async (req, res) => {
  try {
    const { domain } = req.params;
    const data = whois.lookup(domain, function (req, res) {
      return res;
    });
    return res.send({
      success: true,

      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      errors: { common: { msg: error.message } },
    });
  }
});
