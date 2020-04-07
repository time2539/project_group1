var express = require('express');
var router = express.Router();
const database = require('../config/database');
var queryize = require('queryize');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userProfile', function(req, res, next) {
  var query = select()
  .from('users','u')
  .where({'u.user_id': 1})
  .compile()
  await connection.end();
  res.send(query);
});

router.post('/updateProfile', function(req, res, next) {
  var query = select();
  res.send('respond with a resource');
});


module.exports = router;
