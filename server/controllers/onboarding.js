const Contact = require("../models/Contact");
const Document = require("../models/Document");
const Automation = require("../models/Automation");
const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");

exports.getOnboardingStatus = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const contact = await Contact.find({ userId: _id });
  const document = await Document.find({ userId: _id });
  const automation = await Automation.find({ userId: _id });
  const goal = await Goal.find({ userId: _id });
  return {
    contactCreated: contact.length > 0,
    documentCreated: document.length > 0,
    automationCreate: automation.length > 0,
    goalCreate: goal.length > 0,
  };
});
