//Eventually this will include the code which pertains to the core.

var database = require('mysql');

var dbConnection = database.createConnection({
    host : 'placeholder',
    user : 'placeholder',
    password : 'placeholder',
    database : 'placeholder',
    dateStrings: 'placeholder'
});


function connect()
{
    dbConnection.connect( function( err ) {
        if(err) {
            console.error("Error connecting: " + err.stack);
            dbConnection.end();
            return;
        }
        
        console.log("Connected as id: " + dbConnection.threadId);
    });
}

function addUser( request, alertFunction )
{

//    console.log("Post Attributes: \n\tName: " + firstName + " " + lastName + "\n\tEmail: " + email + "\n\tJoined: " + dateJoined
//               + "\n\tAffiliation: " + affiliation + "\n\tRole: " + role + "\n\tRfid: " + rfid);
    
    dbConnection.query("select * from members where id = '" + request.params.tagNum + "'", function(err,rows) {
			console.log(rows);
			console.log("above row object");
			if (err)
                alertFunction('error', 'Your request could not be processed right now.');
			 if (rows.length) {
                //"Error! User already exists by the name: " + firstName + " " + lastName
                // Use a jade alert from bootstrap? http://www.w3schools.com/bootstrap/bootstrap_alerts.asp
                 alertFunction('error', 'User already exists.');
                console.log("User already exists");
            } else {
				var insertQuery = "INSERT INTO members ( firstName, lastName, email, joinDate ) values ('"
                    + request.body.firstName + "','" + request.body.lastName + "','"
                    + request.body.email + "','" + request.body.joined + "')";
                
				dbConnection.query(insertQuery,function(err,rows){
				    //newUserMysql.id = rows.insertId;
                    if(err){
                        console.error(err)
                    }
                    //Show success alert at the top of the page if successful
				});	
                
                alertFunction('success', 'Successfully added ' + request.body.firstName 
                              + " " + request.body.lastName + " to the database." );
            }	
		});
}

exports.editUser = function( userId, request, alertFunction ) {
    var queryString = 'select * ' +
    'from members ' +
    'join roles on members.role = roles.roleID ' +
    'join memberStatus on members.status = memberStatus.statusID';

    dbConnection.query(queryString, function(err, rows, fields) {
        if(err) {
            console.log(err);
            alertFunction('error', 'Your request could not be processed right now.');
        }
        if( rows.length ) {
            
            var updateQuery =   "UPDATE members SET " +
                                "firstName = '" + request.body.firstName + "', " +
                                "lastName = '" + request.body.lastName + "', " +
                                "email = '" + request.body.email + "', " +
                                "joinDate = '" + request.body.joined + "', " +
                                "notes = '" + request.body.notes + "' " +
                                "where id = " + userId;
            console.log(updateQuery);
            
            dbConnection.query( updateQuery, function(err, newRows){
				    //newUserMysql.id = rows.insertId;
                    if(err){
                        console.log(err);
                        alertFunction('error', 'Could not edit ' + request.body.firstName 
                              + " " + request.body.lastName + "." );
                    }
                    else {
                        alertFunction('success', 'Successfully edited ' + request.body.firstName 
                              + " " + request.body.lastName + "." );
                    }
			});	
                
                
        } else {
            alertFunction('error', 'User does not currently exist.');
        }
    });
}

exports.getUser = function( userId, alertFunction, fillFields ) {
    var queryString = "SELECT * from members where id = '" + userId + "'";
    dbConnection.query(queryString, function(err, rows) {
        if (err)
                alertFunction('error', 'No user ' + userId + ' exists.');
        if (!rows.length) {
             alertFunction('error', 'User already exists.');
        } else {
            fillFields(rows);
        }
        
    });
}

function getUsers( renderUsers )
{
    var queryString = 'select * ' +
    'from members ' +
    'join roles on members.role = roles.roleID ' +
    'join memberStatus on members.status = memberStatus.statusID';

    return dbConnection.query(queryString, function(err, rows, fields) {
        if (err)
        {
            console.log(err);
            renderUsers([[]]);
        }
        var userArray = [[]];
        
        for( i = 0; i < rows.length; i++ )
            userArray[i] = {
                userId: rows[i].id,
                attributes: [ rows[i].firstName, rows[i].lastName, rows[i].email, rows[i].joinDate, rows[i].roleName, rows[i].status ]
            }
        
        renderUsers( userArray );
    });
}

function getUserCount( count )
{
    var queryString = 'SELECT COUNT(*) AS userCount FROM members';

    console.log(queryString);

    return dbConnection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        // for (var i in rows) {
        //     console.log(rows[i])
        // }

        count(rows[0]);
    });
}

function killConnection()
{
    dbConnection.end();
    console.log("Disconnected.");
}

function getConnection()
{
    return dbConnection;
}

exports.connect = connect;
exports.killConnection = killConnection;
exports.getConnection = getConnection;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.getUserCount = getUserCount;