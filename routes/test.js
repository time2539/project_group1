var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');
const database = require('../config/database');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/test', function(req, res, next) {
    res.send('test test');
  });

  module.exports = router;