var Attendance = require('../models/attendance');

function parseYYYYMMDD(str) {
  var y = str.substr(0, 4),
    m = str.substr(4, 2) - 1,
    d = str.substr(6, 2);
  var D = new Date(y, m, d);
  return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
}

module.exports = {

  // create an attendance
  create: function(req, res) {

    var data = new Attendance(); // create a new instance of the attendance model

    // set the new attendance information if it exists in the request
    if (req.body.memberId) data.memberId = req.body.memberId;
    if (req.body.time) data.time = req.body.time;
    if (req.body.activity) data.activity = req.body.activity;
    if (req.body.session) data.session = req.body.session;

    data.save(function(err) {

      if (err) {
        // duplicate entry
        if (err.code == 11000)
          return res.status(500).send({
            message: 'An attendance with that start date already exists.'
          });
        else
          return res.send(err);
      }

      // return a message
      res.json({
        message: 'Attendance created!'
      });
    });

  },

  // get all attendances by member
  // sorted by date descending
  getByMemberId: function(req, res) {
    Attendance
      .find({
        'memberId': req.params.memberId
      })
      .sort({
        time: -1
      })
      .exec(function(err, data) {

        if (err) res.send(err);

        // return the attendances
        res.json(data);
      });
  },

  // get all attendances by member
  // sorted by date descending
  getLatestByMemberId: function(req, res) {
    Attendance
      .findOne({
        'memberId': req.params.memberId
      })
      .sort({
        time: -1
      })
      .exec(function(err, data) {

        if (err) res.send(err);

        // return the attendances
        res.json(data);
      });
  },

  // get all attendances for a give day
  getAllForYYYYMMDD: function(req, res) {
    // Start and end of day
    var startTime = parseYYYYMMDD(req.params.yyyymmdd);
    startTime.setHours(0, 0, 0, 0);

    var endTime = parseYYYYMMDD(req.params.yyyymmdd);
    endTime.setHours(23, 59, 59, 999);

    Attendance
      .find({
        'time': {
          $gte: startTime,
          $lt: endTime
        }
      })
      .sort({
        time: -1
      })
      .exec(function(err, data) {

        if (err) res.send(err);

        // return the attendances
        res.json(data);
      });
  },

  // get count of attendances by member
  // where time >= given start date
  getCountByMemberIdAndTime: function(req, res) {
    Attendance
      .count({
        'memberId': req.params.memberId,
        'time': {
          $gte: new Date(req.params.time)
        }
      })
      .exec(function(err, data) {
        if (err) res.send(err);

        // return the count
        res.json(data);
      });

  },

  // get attendance by ID
  getById: function(req, res) {
    Attendance.findById(req.params._id, function(err, data) {

      if (err) res.send(err);

      // return that attendance
      res.json(data);
    });
  },

  // update attendance by ID
  updateById: function(req, res) {
    Attendance.findById(req.params._id, function(err, data) {

      if (err) res.send(err);

      // set the new attendance information if it exists in the request
      // memberId is immutable
      if (req.body.time) data.time = req.body.time;
      if (req.body.activity) data.activity = req.body.activity;
      if (req.body.session) data.session = req.body.session;

      // save the attendance
      data.save(function(err) {
        if (err) res.send(err);

        // return a message
        res.json({
          message: 'Attendance updated!'
        });
      });

    });
  },

  // delete attendance by ID
  deleteById: function(req, res) {
    Attendance.remove({
      _id: req.params._id
    }, function(err, data) {

      if (err) res.send(err);

      res.json({
        message: 'Attendance deleted'
      });
    });
  }
};
