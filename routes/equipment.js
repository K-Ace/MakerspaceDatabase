module.exports = function( app ) {
    
    app.get('/', function(req, res, next) {  	
  	
    });

    app.get('/addequipment', function(req, res, next) {
        res.render('admin/addequipment', {
                alert: { type: '', description: '' }
        });
    });
    
}
