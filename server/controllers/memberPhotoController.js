module.exports = {

  // get photo by member by ID
  getByMemberId: function(req, res) {
    res.sendFile(req.params.memberId + '.jpg', {
      root: __dirname + '../../..//photos'
    });
  }
};
