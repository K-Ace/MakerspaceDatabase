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

router.get('/edit-user/:id', function(req, res, next) {
   req.app.database.getUser( 
        req.params.id,
        function ( alertType, alertDescription ) { //Alert should be added eventually
            res.redirect('/users');
        },
       function( fieldArray ) {
            res.render('edit-user', { 
                nameField: fieldArray[0].firstName,
                surnameField: fieldArray[0].lastName,
                emailField: fieldArray[0].email,
                joinedField: fieldArray[0].joinDate
            }); 
       }
    );
});

router.get('/view-user/:id', function(req, res, next) {
   req.app.database.getUser( 
        req.params.id,
        function ( alertType, alertDescription ) { //Alert should be added eventually
            res.redirect('/users');
        },
       function( fieldArray ) {
            res.render('view-user', { 
                nameField: fieldArray[0].firstName,
                surnameField: fieldArray[0].lastName,
                emailField: fieldArray[0].email,
                joinedField: fieldArray[0].joinDate,
            }); 
       }
    );
});

module.exports = router;
