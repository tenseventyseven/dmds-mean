var fs = require('fs');

module.exports = {

  // get photo by member by ID
  getByMemberId: function(req, res) {
    // image base paths
    var thumbnail = __dirname + '/../../photos/thumbnails/' + req.params.memberId;
    var original = __dirname + '/../../photos/' + req.params.memberId;

    // get thumbnail if exists, else original
    // try both JPG and jpg
    if (fs.existsSync(thumbnail + '.JPG')) {
      res.sendFile(req.params.memberId + '.JPG', {
        root: __dirname + '/../../photos/thumbnails'
      });
    } else if (fs.existsSync(thumbnail + '.jpg')) {
      res.sendFile(req.params.memberId + '.jpg', {
        root: __dirname + '/../../photos/thumbnails'
      });
    } else if (fs.existsSync(original + '.JPG')) {
      res.sendFile(req.params.memberId + '.JPG', {
        root: __dirname + '/../../photos'
      });
    } else if (fs.existsSync(original + '.jpg')) {
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
