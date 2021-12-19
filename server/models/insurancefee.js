var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// InsuranceFee schema
var InsuranceFeeSchema = new Schema({
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
  months: {
    type: Number,
  },
});

// Compound unique key (memberId, startDate)
InsuranceFeeSchema.index(
  {
    memberId: 1,
    startDate: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("InsuranceFee", InsuranceFeeSchema);
