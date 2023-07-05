const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    contactType: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "contact-types",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      default: null,
    },
    orgLocation: {
      type: mongoose.Types.ObjectId,
      ref: "organization-locations",
      default: null,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    phoneSecondary: { type: String, default: "" },
    photo: { type: String, default: "" },

    gender: {
      type: String,
      enum: ["male", "female", "transgender", ""],
      default: "",
    },
    address: {
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
      default: "active",
    },
    note: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },

    tags: {
      type: Array,
      default: [],
    },

    company: { type: String, default: "" },
    companyPhone: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyAddress: {
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
    type: {
      type: String,
      default: "",
    },

    position: {
      type: String,
      default: "",
    },
    ranks: [
      {
        name: {
          type: String,
          // required: true,
        },
        photo: String,
        createdAt: Date,
      },
    ],
    //automation

    automation: [
      {
        automationId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        currentActionId: {
          type: String,
        },
        fireTime: {
          type: Number,
        },
        isView: {
          type: Boolean,
          default: false,
        },
        isCustomTime: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // ** files
    files: [
      {
        title: {
          type: String,
          // required: true,
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
          // required: true,
        },
        phone: {
          type: String,
          // required: true,
        },
        startDate: { type: Date, default: Date.now() },
        endDate: Date,
        file: String,
      },
    ],

    // Billing Address
    billingAddress: {
      // firstName: String,
      // lastName: String,
      country: {
        type: String,
        default: "",
      },

      street: {
        type: String,
        default: "",
      }, // ** New Field
      city: {
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
        // cvv: {
        //   type: String,
        // },
      },
    ],
    stripe: {
      customerId: String,
    },

    leadSource: {
      type: Array,
      default: [],
    },

    isFormer: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    //------------ Employee ----------------------------------------------------------------
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles", required: false }],
    shift: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee-shift" }],
    salary: {
      type: Number,
    },
    punchId: {
      type: Number,
    },
    outletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "outlets",
      default: null,
    },
    employee_position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee-positions",
      default: null,
    },
    hashed_password: {
      type: String,
      default: null,
    },
    punchState: {
      type: Boolean,
      default: false,
    },
    isAddCalendar: { type: Boolean, default: false },
    isInternship: { type: Boolean, default: false },
    //------------ Lead ----------------------------------------------------------------
    stage: {
      type: String,
      default: "COLD",
    },
    //------------New ------------------------------------------------------------------
    weight: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    family: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "contacts",
        },
        relation: {
          type: String,
        },
      },
    ],
    fields: [
      {
        fieldId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "contact-fields",
        },
        value: {
          type: mongoose.Schema.Types.Mixed,
          default: null,
        },
      },
    ],
  },

  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("contact", ContactSchema);
