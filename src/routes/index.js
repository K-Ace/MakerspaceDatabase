var express = require('express');
var router = express.Router();
var database = require('../resources/database');

/* GET home page. */
router.get('/', function(req, res, next) {
   // database.connect();
  res.render('index');
});

router.post('/index', function(req, res, next) {
    var text = req.body.text,
        email = req.body.email,
        date = req.body.date;
    console.log("Name: " + text + " Email: " + email + " Date: " + date);
    res.render('index');
})

module.exports = router;
