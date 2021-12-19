var Member = require("../models/member");

module.exports = {
  // create a member
  create: function (req, res) {
    var data = new Member(); // create a new instance of the member model

    // set the new member information if it exists in the request
    if (req.body.memberId) data.memberId = req.body.memberId;
    if (req.body.person) data.person = req.body.person;
    if (req.body.notes) data.notes = req.body.notes;
    if (req.body.membership) data.membership = req.body.membership;

    data.save(function (err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000) {
          return res.status(500).send({
            message: "A member with that name already exists.",
          });
        } else return res.send(err);
      }

      // return a message
      res.json({
        message: "Member created!",
      });
    });
  },

  // get all members
  // but only return (_id, name, memberId) for speed
  getAll: function (req, res) {
    Member.find({})
      .sort("person.name")
      .select("_id person.name memberId")
      .exec(function (err, data) {
        if (err) res.send(err);

        // return the members
        res.json(data);
      });
  },

  // get all ACTIVE members
  // but only return (_id, name) for speed
  getAllActive: function (req, res) {
    Member.find({
      "membership.active": true,
    })
      .sort("person.name")
      .select("_id person.name")
      .exec(function (err, data) {
        if (err) res.send(err);

        // return the members
        res.json(data);
      });
  },

  // get member by ID
  getById: function (req, res) {
    Member.findById(req.params._id, function (err, data) {
      if (err) res.send(err);

      // return that member
      res.json(data);
    });
  },

  // get next memberId
  getNextId: function (req, res) {
    Member.findOne({})
      .sort("-memberId")
      .exec(function (err, data) {
        if (err) res.send(err);

        // return that member + 1
        res.json(data.memberId + 1);
      });
  },

  // update member by ID
  updateById: function (req, res) {
    Member.findById(req.params._id, function (err, data) {
      if (err) res.send(err);

      // set the new member information if it exists in the request
      // memberId is immutable
      if (req.body.person) data.person = req.body.person;
      if (req.body.notes) data.notes = req.body.notes;
      if (req.body.membership) data.membership = req.body.membership;

      // save the member
      data.save(function (err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000) {
            return res.status(500).send({
              message: "A member with that name already exists.",
            });
          } else return res.send(err);
        }

        // return a message
        res.json({
          message: "Member updated!",
        });
      });
    });
  },

  // delete member by ID
  deleteById: function (req, res) {
    Member.remove(
      {
        _id: req.params._id,
      },
      function (err, member) {
        if (err) res.send(err);

        res.json({
          message: "Member deleted",
        });
      }
    );
  },
};
