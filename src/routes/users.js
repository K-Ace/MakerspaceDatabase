var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  	
  	req.app.database.getUsers( function( userArray ) {
        res.render('users', { 
            userList: userArray
        });    
    });
});

router.get('/adduser', function(req, res, next) {
  res.render('adduser', {
                alert: { type: '', description: '' }
               });
});

router.post('/addUser', function(req, res, next) {
    req.app.database.addUser( req, function ( alertType, alertDescription ) {
        res.render('adduser', {
                alert: { type: alertType, description: alertDescription }
        });
    });
});

router.get('/edit-user', function(req, res, next) {
  res.render('edit-user');
});

module.exports = router;
