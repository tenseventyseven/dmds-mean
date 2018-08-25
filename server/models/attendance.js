var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Attendance schema
var AttendanceSchema = new Schema({
  memberId: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  activity: {
    type: String,
    required: true,
    trim: true
  },
  session: {
    type: String,
    required: true,
    trim: true
  }
});

// Compound unique key (memberId, time)
AttendanceSchema.index({
  memberId: 1,
  time: 1
}, {
  unique: true
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
