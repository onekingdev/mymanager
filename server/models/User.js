const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  organizations: [
    {
      organizationId: {
        type: mongoose.Types.ObjectId,
        ref: "organization",
      },
      userType: {
        type: String,
      },
      locationId: {
        type: mongoose.Types.ObjectId,
        ref: "location",
      },
    },
  ],
  roles: [
    {
      organizationId: {
        type: mongoose.Types.ObjectId,
        ref: "organization",
      },
      contactTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "contact-type",
      },
      assignerId: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
      },
    },
  ],
  gender: {
    type: String,
    enum: ["male", "female", "others", ""],
    default: "",
  },
  dob: { type: Date },
  businessType: { type: String, trim: true, default: "" },

  address: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
  },
  company: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    default: "",
  },
  position: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  location: {
    type: Array,
    value: [locationSchema],
  },
  stripe: {
    accountId: String,
    customerId: String,
  },
  language: {
    type: String,
  },
  currency: {
    type: String,
  },
  timeZone: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
