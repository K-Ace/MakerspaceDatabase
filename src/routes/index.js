var express = require('express');
var router = express.Router();
var database = require('../resources/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.app.database.getUserCount( function( count ) {
  		console.log(count.email);
        res.render('index', { 
        	userCount: count.userCount
        });    
    });
});

//router.post('/index', function(req, res, next) {
//    var text = req.body.text,
//        email = req.body.email,
//        date = req.body.date;
//    console.log("Name: " + text + " Email: " + email + " Date: " + date);
//    res.render('index');
//})

router.get('/purchase_request', function(req, res, next) {
  res.render('purchase-request');
});

router.get('/equipment', function(req, res, next) {
  res.render('equipment');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
