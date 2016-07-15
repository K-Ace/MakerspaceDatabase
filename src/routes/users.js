var express = require('express');
var router = express.Router();

var database = require('../resources/database');

router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/addUser', function(req, res, next) {
  res.render('adduser');
});

router.post('/addUser', function(req, res, next) {
    //database.connect();

    database.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.joined, req.body.affiliation, req.body.role, req.body.tagNum);
    res.render('addUser');
});

module.exports = router;
