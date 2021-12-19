var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Member schema
var MemberSchema = new Schema({
  memberId: {
    type: Number,
    unique: true,
    required: true,
    min: 1,
  },
  person: {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      postcode: {
        type: Number,
      },
    },
    contact: {
      home: {
        type: String,
      },
      mobile: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
      },
    },
    occupation: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
    },
  },
  notes: {
    privateComments: {
      type: String,
      trim: true,
    },
    messageForMember: {
      type: String,
      trim: true,
    },
  },
  membership: {
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    casual: {
      type: Boolean,
      default: false,
    },
    advertising: {
      type: String,
      trim: true,
      enum: [
        "",
        "Other",
        "Member Referred",
        "Internet",
        "Leaflet",
        "Walked Past",
        "Friend",
      ],
    },
    commencementDate: {
      type: Date,
      default: null,
    },
    lockerNumber: {
      type: Number,
    },
    lockerExpiryDate: {
      type: Date,
      default: null,
    },
  },
});

module.exports = mongoose.model("Member", MemberSchema);
