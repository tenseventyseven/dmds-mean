var memberController = require('../controllers/memberController');
var attendanceController = require('../controllers/attendanceController');
var trainingFeeController = require('../controllers/trainingfeeController');
var insuranceFeeController = require('../controllers/insurancefeeController');
var memberPhotoController = require('../controllers/memberPhotoController');

module.exports = function(app, express) {

  var router = express.Router();

  router.post('/member', memberController.create);
  router.get('/member', memberController.getAll);
  router.get('/member/active', memberController.getAllActive);
  router.get('/member/next', memberController.getNextId);
  router.get('/member/:_id', memberController.getById);
  router.put('/member/:_id', memberController.updateById);
  router.delete('/member/:_id', memberController.deleteById);

  router.post('/attendance', attendanceController.create);
  router.get('/attendance/member/:memberId', attendanceController.getByMemberId);
  router.get('/attendance/member/:memberId/latest', attendanceController.getLatestByMemberId);
  router.get('/attendance/member/:memberId/:time', attendanceController.getCountByMemberIdAndTime);
  router.get('/attendance/:_id', attendanceController.getById);
  router.put('/attendance/:_id', attendanceController.updateById);
  router.delete('/attendance/:_id', attendanceController.deleteById);
  router.get('/attendance/all/:yyyymmdd', attendanceController.getAllForYYYYMMDD);


  router.post('/trainingfee', trainingFeeController.create);
  router.get('/trainingfee/member/:memberId', trainingFeeController.getByMemberId);
  router.get('/trainingfee/:_id', trainingFeeController.getById);
  router.put('/trainingfee/:_id', trainingFeeController.updateById);
  router.delete('/trainingfee/:_id', trainingFeeController.deleteById);

  router.post('/insurancefee', insuranceFeeController.create);
  router.get('/insurancefee/member/:memberId', insuranceFeeController.getByMemberId);
  router.get('/insurancefee/:_id', insuranceFeeController.getById);
  router.put('/insurancefee/:_id', insuranceFeeController.updateById);
  router.delete('/insurancefee/:_id', insuranceFeeController.deleteById);

  router.get('/memberphoto/:memberId', memberPhotoController.getByMemberId);

  return router;
};
