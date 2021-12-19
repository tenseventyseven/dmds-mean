var TrainingFee = require("../models/trainingfee");

module.exports = {
  // create a training fee
  create: function (req, res) {
    var data = new TrainingFee(); // create a new instance of the training fee model

    console.log(req.body);

    // set the new training fee information if it exists in the request
    if (req.body.memberId) data.memberId = req.body.memberId;
    if (req.body.startDate) data.startDate = req.body.startDate;
    if (req.body.price) data.price = req.body.price;
    if (req.body.days) data.days = req.body.days;
    if (req.body.months) data.months = req.body.months;
    if (req.body.description) data.description = req.body.description;

    data.save(function (err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000)
          return res.status(500).send({
            message: "A training fee with that start date already exists.",
          });
        else return res.send(err);
      }

      // return a message
      res.json({
        message: "Training fee created!",
      });
    });
  },

  // get all training fees by member
  // sorted by date descending
  getByMemberId: function (req, res) {
    TrainingFee.find({
      memberId: req.params.memberId,
    })
      .sort({
        startDate: -1,
      })
      .exec(function (err, data) {
        if (err) res.send(err);

        // return the training fees
        res.json(data);
      });
  },

  // get training fee by ID
  getById: function (req, res) {
    TrainingFee.findById(req.params._id, function (err, data) {
      if (err) res.send(err);

      // return that training fee
      res.json(data);
    });
  },

  // update training fee by ID
  updateById: function (req, res) {
    TrainingFee.findById(req.params._id, function (err, data) {
      if (err) res.send(err);

      // set the new training fee information if it exists in the request
      // memberId is immutable
      if (req.body.startDate) data.startDate = req.body.startDate;
      if (req.body.price) data.price = req.body.price;
      if (req.body.days) data.days = req.body.days;
      if (req.body.months) data.months = req.body.months;
      if (req.body.description) data.description = req.body.description;

      // save the training fee
      data.save(function (err) {
        if (err) res.send(err);

        // return a message
        res.json({
          message: "Training fee updated!",
        });
      });
    });
  },

  // delete training fee by ID
  deleteById: function (req, res) {
    TrainingFee.remove(
      {
        _id: req.params._id,
      },
      function (err, data) {
        if (err) res.send(err);

        res.json({
          message: "Training fee deleted",
        });
      }
    );
  },
};
