const mongoose = require("mongoose");

const AutomationSchema = new mongoose.Schema({
  automationName: {
    type: String,
  },
  contactInfo: {
    contactType: {
      type: String,
      enum: ["SmartList", "Contacts", ""],
      default: "",
    },
    contacts: [
      { type: String }
    ],
    tags: [
      { type: String }
    ],
    leadSources: [
      { type: String }
    ],
    smartList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "smartList",
      }
    ],
  },
  activationUpon: {
    uponType: {
      type: String,
      enum: ["Upon Entry", "Criteria Met", ""],
    },
    criteria: {
      criteriaType: {
        type: String
      },
      rentingRate: {
        type: Number
      }
    }
  },

  activateTime: {
    isImmediately: {
      type: Boolean
    },
    time: {
      type: Number
    },
    type: {
      type: String,
      enum: ["Before", "After", "On", ''],
    },
    unit: {
      type: String,
      enum: ["minutes", "hours", "days", "weeks", "months", '']
    }
  },
  userEmail: {
    type: String
  },
  userPhone: {
    type: String
  },

  userName: {
    type: String
  },
  actions: [{
    id: String,  //this will be make in frontend with UUID
    actionType: String,
    duration: {
      time: {
        type: Number
      },
      unit: {
        type: String,
        enum: ["minutes", "hours", "days", "weeks", "months", '']
      }
    },
    parentId: String,  // this is after action's Id
    setCustomTime: Boolean,
    useSubscriberTimeZone: Boolean,
    customTime: {
      days: [{
        type: String // this day of week
      }],
      time: Number
    },
    subject: String,
    content: String,
    attachments: [
      //   {
      //   urls: String,
      //   fileType: {
      //     type: String
      //   }
      // }
    ],
    // if else

    condition: {
      type: String,
      enum: ['yes', 'no', ''],
      default: ""
    },

    //video condition
    confirmProgress: {
      isPercentConfirm: {
        type: Boolean,
        default: false
      },

      percentage: {
        type: Number   //this is percentage of video
      }
    },

    //notification
    to: {
      type: {
        type: String,
        enum: ["ME", "CONTACT", ""],
        default: ""
      },
      contact: [
        { type: String }
      ]
    },
    method: {
      type: String,
      enum: ["TEXT", "EMAIL", "TOOLBAR", ""],
      default: ""
    },
    isStart: Boolean,
    isLast: Boolean,
    isCondition: Boolean,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("automation", AutomationSchema);
