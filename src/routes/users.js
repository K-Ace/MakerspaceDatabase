var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/addUser', function(req, res, next) {
  res.render('adduser');
});

module.exports = router;
