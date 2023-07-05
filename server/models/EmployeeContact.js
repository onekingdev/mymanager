const mongoose = require("mongoose");

const clientContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  workType: {
    type: String,
    default: "remote",
  },
  email: { type: String, default: "" },
  username: { type: String, default: "" },
  phone: { type: String, default: "" },
  photo: { type: String, default: "" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles", required: false },
  shift: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee-shift" }],
  gender: {
    type: String,
    enum: ["male", "female", "transgender", ""],
    default: "",
  },
  address: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
  },
  socialLinks: [
    {
      logo: String,
      name: String,
      link: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "inactive",
  },
  note: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
  },
  salary: {
    type: Number,
  },
  tags: {
    type: Array,
    default: [],
  },
  punchId: {
    type: Number,
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "outlets",
    default: null,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee-positions",
    default: null,
  },
  hashed_password: {
    type: String,
    default: null,
  },
  ranks: [
    {
      name: {
        type: String,
        required: true,
      },
      photo: String,
      createdAt: Date,
    },
  ],

  // ** files
  files: [
    {
      title: {
        type: String,
        required: true,
      },
      file: String,
      createdAt: Date,
    },
  ],

  //
  others: [
    {
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      startDate: { type: Date, default: Date.now() },
      endDate: Date,
      file: String,
    },
  ],

  // Billing Address
  billingAddress: {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    taxId: {
      type: String,
      default: "",
    },
    vatNo: {
      type: String,
      default: "",
    },
    addressLineOne: {
      type: String,
      default: "",
    },
    addressLineTwo: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  paymentMethods: [
    {
      cardType: String, // visa, mastercard,
      isPrimary: {
        type: Boolean,
        default: false,
      },
      cardHolder: String,
      cardNumber: {
        type: String,
        maxlength: 16,
      },
      expiryDate: {
        type: String,
      },
      cvv: {
        type: String,
      },
    },
  ],

  leadSource: {
    type: String,
  },
  punchState: {
    type: Boolean,
    default: false,
  },
  isAddCalendar: { type: Boolean, default: false },
  isInternship: { type: Boolean, default: false },
  isFormer: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("employee-contacts", clientContactSchema);
