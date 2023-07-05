const { default: mongoose } = require("mongoose");

const FormEntrySchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    dob: {
      type: Date,
    },
    address: {
      zipCode: String,
      state: String,
      street: String,
      city: String,
      country: String,
    },
    note: {
      type: String,
      default: "",
    },
    inputData:{
        type:Object
    },
    contactAddress: {
        zip: String,
        state: String,
        address: String,
        city: String,
        country: String,
      },
      shippingAddress: {
        zip: String,
        state: String,
        address: String,
        city: String,
        country: String,
      },
      billingAddress: {
        zip: String,
        state: String,
        address: String,
        city: String,
        country: String,
      },
      sms: {
        type: String,
      },
      survey: {
        type: Object,
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
      signature: {
        type: Object,
      },
      membership: {
        type: Object,
      },
      products:{
        type:Object
      },
      booking:{
        type:Object
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("form-entry", FormEntrySchema);
