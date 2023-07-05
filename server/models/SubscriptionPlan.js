const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    locationIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization-location",
      },
    ],

    read: {
      type: Boolean,
      required: true,
    },
    write: {
      type: Boolean,
      required: true,
    },
    update: {
      type: Boolean,
      required: true,
    },
    delete: {
      type: Boolean,
      required: true,
    },
    elementTitle: {
      type: String,
      required: true,
    },
    elementParent: {
      type: String,
      default: null,
    },
    defaultId: {
      type: String,
      default: null,
    },
    navLink: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },
    benefits: [
      {
        type: String,
      },
    ],
    pricePerMonth: {
      type: Number,
      required: true,
    },
    pricePerYear: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD"],
      default: "USD",
    },
    type: {
      type: String,
      enum: ["personal", "business"],
      default: "personal",
    },
    trialTime: {
      type: Number,
    },
    // organizationId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "organization",
    //   required: false,
    // },
    permissions: [permissionSchema],
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    stripe: {
      pricePerYear: String,
      pricePerMonth: String,
      productId: String,
    },
    isDefault: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    payByUser: { type: Boolean, default: false },
  },
  {
    collection: "subscription-plan",
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("subscription-plan", planSchema);

/**
 * name          |    price  |    validity  | org_id
 * enterprise    |     230   |       75     |  null
 * planfororg1   |     200   |       60     | org1
 *
 *
 *
 *
 * elements => permissions => plans => orgs (loc1, loc2, loc3)
 * plan1 => loc1, loc2 //// plan2 => loc3
 * ele1, ele2 => perm1     => planfororg1   => org1
 *
 */
