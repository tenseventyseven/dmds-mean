var InsuranceFee = require("../models/insurancefee");

module.exports = {
  // create a insurance fee
  create: function (req, res) {
    var data = new InsuranceFee(); // create a new instance of the insurance fee model

    // set the new insurance fee information if it exists in the request
    if (req.body.memberId) data.memberId = req.body.memberId;
    if (req.body.startDate) data.startDate = req.body.startDate;
    if (req.body.price) data.price = req.body.price;
    if (req.body.months) data.months = req.body.months;

    data.save(function (err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000)
          return res.status(500).send({
            message: "An insurance fee with that start date already exists.",
          });
        else return res.send(err);
      }

      // return a message
      res.json({
        message: "Insurance fee created!",
      });
    });
  },

  // get all insurance fees by member
  // sorted by date descending
  getByMemberId: function (req, res) {
    InsuranceFee.find({
      memberId: req.params.memberId,
    })
      .sort({
        startDate: -1,
      })
      .exec(function (err, data) {
        if (err) res.send(err);

        // return the insurance fees
        res.json(data);
      });
  },

  // get insurance fee by ID
  getById: function (req, res) {
    InsuranceFee.findById(req.params._id, function (err, data) {
      if (err) res.send(err);

      // return that insurance fee
      res.json(data);
    });
  },

  // update insurance fee by ID
  updateById: function (req, res) {
    InsuranceFee.findById(req.params._id, function (err, data) {
      if (err) res.send(err);

      // set the new insurance fee information if it exists in the request
      // memberId is immutable
      if (req.body.startDate) data.startDate = req.body.startDate;
      if (req.body.price) data.price = req.body.price;
      if (req.body.months) data.months = req.body.months;

      // save the insurance fee
      data.save(function (err) {
        if (err) res.send(err);

        // return a message
        res.json({
          message: "Insurance fee updated!",
        });
      });
    });
  },

  // delete insurance fee by ID
  deleteById: function (req, res) {
    InsuranceFee.remove(
      {
        _id: req.params._id,
      },
      function (err, data) {
        if (err) res.send(err);

        res.json({
          message: "Insurance fee deleted",
        });
      }
    );
  },
};
