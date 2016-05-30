var express = require('express');
   
var router = express.Router();
var userDao =  require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});
 
router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});
 
router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});

router.post('/login', function(req, res,next) {
  userDao.login(req, res,next);
  });

 /* if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, userScheme.userSearch);
  
  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});*/

module.exports = router;
