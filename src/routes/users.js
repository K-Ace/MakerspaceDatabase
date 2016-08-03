var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  	
  	req.app.database.getUsers( function( usrPrms ) {
        res.render('users', { 
            userParams: usrPrms
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
           console.log(alertDescription);
           res.redirect('/users');
        },
       function( fieldArray ) {
            res.render('edit-user', { 
                userId: fieldArray[0].id,
                nameField: fieldArray[0].firstName,
                surnameField: fieldArray[0].lastName,
                emailField: fieldArray[0].email,
                joinedField: fieldArray[0].joinDate
            }); 
       }
    );
});

router.post('/edit-user/:id', function(req, res, next ) {
   req.app.database.editUser(   
        req.params.id,
        req,
        function( alertType, alertDescription ) {
            //res.('/users/edit-user/' + req.params.id);
           //Do something here 
        });
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
                genderField: fieldArray[0].gender,
                emailField: fieldArray[0].email,
                statusField: fieldArray[0].status,
                affiliationField: fieldArray[0].affiliation,
                rfidField: fieldArray[0].rfidNumber,
                joinedField: fieldArray[0].joinDate,
                notesField: fieldArray[0].notes
            }); 
       }
    );
});

module.exports = router;
