var fs = require('fs');

module.exports = {

  // get photo by member by ID
  getByMemberId: function(req, res) {
    // thumbnail path
    var thumbnail = __dirname + '/../../photos/thumbnails/' + req.params.memberId + '.jpg';

    // get thumbnail if exists, else original
    if (fs.existsSync(thumbnail)) {
      res.sendFile(req.params.memberId + '.jpg', {
        root: __dirname + '/../../photos/thumbnails'
      });
    } else {
      res.sendFile(req.params.memberId + '.jpg', {
        root: __dirname + '/../../photos'
      });
    }
  }
};
