var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  	
  	req.app.database.getUsers( function( userArray ) {
        res.render('users', { 
            userList: userArray
        });    
    });
});

router.get('/addUser', function(req, res, next) {
  res.render('addUser', {
                alert: { type: '', description: '' }
               });
});

router.post('/addUser', function(req, res, next) {
    req.app.database.addUser( req, function ( alertType, alertDescription ) {
        res.render('addUser', {
                alert: { type: alertType, description: alertDescription }
        });
    });
});

module.exports = router;
