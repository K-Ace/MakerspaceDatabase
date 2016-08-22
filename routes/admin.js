module.exports = function( app ) {
    
    // Define a middleware function to be used for every secured routes
    var auth = function(req, res, next){
      if (!req.isAuthenticated()) 
        res.render('public/login');
      else
        next();
    };
    
    app.use('/admin*', auth, function( req, res, next ) {
        console.log("hi");
        next();
    });
    
    /* GET admin page. */
    app.get('/admin', function(req, res, next) {
      req.app.database.getUserCount( function( count ) {
            res.render('admin/index', { 
                userCount: count.userCount
            });    
        });
    });
    
    app.get('login', function( req, res, next ) {
        res.redirect('/admin');
    });
};