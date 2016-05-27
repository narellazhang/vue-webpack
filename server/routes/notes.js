var express = require('express');
var router = express.Router();
var noteDao =  require('../dao/noteDao');
/* GET Notes listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/addNote', function(req, res, next) {
  noteDao.add(req, res, next);
});
router.get('/queryAll', function(req, res, next) {
	noteDao.queryAll(req, res, next);
});
 
router.get('/queryById', function(req, res, next) {
	noteDao.queryById(req, res, next);
});
router.get('/query', function(req, res, next) {
	noteDao.queryByUser(req, res, next);
});
router.get('/deleteNote', function(req, res, next) {
	noteDao.delete(req, res, next);
});
 
router.post('/updateNote', function(req, res, next) {
	noteDao.update(req, res, next);
});
module.exports = router;
