var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  	
  	
});

router.get('/addequipment', function(req, res, next) {
  res.render('addequipment', {
                alert: { type: '', description: '' }
               });
});

module.exports = router;
