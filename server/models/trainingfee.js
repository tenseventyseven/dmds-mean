var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TrainingFee schema
var TrainingFeeSchema = new Schema({
  memberId: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
  },
  days: {
    type: Number,
  },
  months: {
    type: Number,
  },
  description: {
    type: String,
    trim: true,
  },
});

// Compound unique key (memberId, startDate)
TrainingFeeSchema.index(
  {
    memberId: 1,
    startDate: 1,
    description: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("TrainingFee", TrainingFeeSchema);
