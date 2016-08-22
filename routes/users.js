module.exports = function(app) {   
    app.get('/users/', function(req, res, next) {  	
        req.app.database.getUsers( function( usrPrms ) {
            res.render('admin/users', { 
                userParams: usrPrms
            });    
        });
    });

    app.get('/users/adduser', function(req, res, next) {
      res.render('admin/adduser', {
                    alert: { type: '', description: '' }
                   });
    });

    app.post('/users/addUser', function(req, res, next) {
        req.app.database.addUser( req, function ( alertType, alertDescription ) {
            res.render('admin/adduser', {
                    alert: { type: alertType, description: alertDescription }
            });
        });
    });

    app.get('/users/edit-user/:id', function(req, res, next) {
       req.app.database.getUser( 
           req.params.id,
           function ( alertType, alertDescription ) { //Alert should be added eventually
               res.render('admin/edit-user', {
                               alert: {
                                   type: alertType,
                                   description: alertDescription
                               }
                           });
            },
           function( fieldArray ) {
                res.render('admin/edit-user', { 
                    nameField: fieldArray[0].firstName,
                    surnameField: fieldArray[0].lastName,
                    genderField: fieldArray[0].gender,
                    emailField: fieldArray[0].email,
                    statusField: fieldArray[0].status,
                    affiliationField: fieldArray[0].affiliation,
                    rfidField: fieldArray[0].rfidNumber,
                    joinedField: fieldArray[0].joinDate,
                    notesField: fieldArray[0].notes,
                    alert: { type: '', description: '' }
                   });
            }); 
    });

    app.post('/users/edit-user/:id', function(req, res, next ) {
       req.app.database.editUser(   
            req.params.id,
            req,
            function( alertType, alertDescription ) {
                    req.app.database.getUser( 
                       req.params.id,
                       function ( alrTyp, alrtDescrp ) { //Alert should be added eventually
                           res.render('admin/edit-user', {
                               alert: {
                                   type: alrTyp,
                                   description: alrtDescrp
                               }
                           });
                        },
                       function( fieldArray ) {
                            res.render('admin/edit-user', { 
                                alert: {
                                   type: alertType,
                                   description: alertDescription
                                },
                                nameField: fieldArray[0].firstName,
                                surnameField: fieldArray[0].lastName,
                                genderField: fieldArray[0].gender,
                                emailField: fieldArray[0].email,
                                statusField: fieldArray[0].status,
                                affiliationField: fieldArray[0].affiliation,
                                rfidField: fieldArray[0].rfidNumber,
                                joinedField: fieldArray[0].joinDate,
                                notesField: fieldArray[0].notes,
                           }); 
                       }
                    );
            });
    });

    app.get('/users/view-user/:id', function(req, res, next) {
       req.app.database.getUser( 
            req.params.id,
            function ( alertType, alertDescription ) { //Alert should be added eventually
                res.redirect('/users');
            },
           function( fieldArray ) {
                res.render('admin/view-user', { 
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

}
