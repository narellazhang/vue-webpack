var express = require('express');
var router = express.Router();
var tagDao =  require('../dao/tagDao');
/* GET tags listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/addTag', function(req, res, next) {
  tagDao.add(req, res, next);
});
router.get('/queryAll', function(req, res, next) {
	tagDao.queryAll(req, res, next);
});
 
router.get('/queryByType', function(req, res, next) {
	tagDao.queryByType(req, res, next);
});
router.get('/deleteTag', function(req, res, next) {
	tagDao.delete(req, res, next);
});
 
router.post('/updateTag', function(req, res, next) {
	tagDao.update(req, res, next);
});
module.exports = router;
