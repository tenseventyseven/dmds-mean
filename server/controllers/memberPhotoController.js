var fs = require('fs');

module.exports = {

  // get photo by member by ID
  getByMemberId: function(req, res) {
    // image paths
    var thumbnail = __dirname + '/../../photos/thumbnails/' + req.params.memberId + '.jpg';
    var original = __dirname + '/../../photos/' + req.params.memberId + '.jpg';

    // get thumbnail if exists, else original
    if (fs.existsSync(thumbnail)) {
      res.sendFile(req.params.memberId + '.jpg', {
        root: __dirname + '/../../photos/thumbnails'
      });
    } else if (fs.existsSync(original)) {
      res.sendFile(req.params.memberId + '.jpg', {
        root: __dirname + '/../../photos'
      });
    } else {
      // No image
      console.log('ERROR: Missing ID photo for ' + req.params.memberId);
      res.status(400).send();
    }
  }
};
