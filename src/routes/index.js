var express = require('express');
var router = express.Router();
var database = require('../resources/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.app.database.getUserCount( function( count ) {
        res.render('index', { 
        	userCount: count.userCount
        });    
    });
});

router.get('/purchase_request', function(req, res, next) {
  res.render('purchase-request');
});

router.get('/equipment', function(req, res, next) {
  res.render('equipment');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/finances', function(req, res, next) {
  res.render('finances');
});

module.exports = router;
