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
    
    dbConnection.query("select * from members where lastName = '" + request.body.lastName + "'", function(err,rows) {
			console.log(rows);
			console.log("above row object");
			if (err)
                alertFunction('error', 'User already exists.');
			 if (rows.length) {
                //"Error! User already exists by the name: " + firstName + " " + lastName
                // Use a jade alert from bootstrap? http://www.w3schools.com/bootstrap/bootstrap_alerts.asp
                 alertFunction('error', 'User already exists.');
                console.log("User already exists");
            } else {

				// if there is no user with that name
                // create the user
                var newUserMysql = new Object();
				
				newUserMysql.firstName    = request.body.firstName;
                newUserMysql.lastName     = request.body.lastName;
                newUserMysql.email        = request.body.email; // use the generateHash function in our user model

                //Check that the email is valid, otherwise the database won't accept the data
			
				var insertQuery = "INSERT INTO members ( firstName, lastName, email, joinDate ) values ('"
                    + request.body.firstName + "','" + request.body.lastName + "','"
                    + request.body.email + "','" + request.body.joined + "')";
				console.log(insertQuery);
                
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

function getUsers( renderUsers )
{
    var queryString = 'SELECT firstName, lastName, email, joinDate FROM members';

    console.log(queryString);

    return dbConnection.query(queryString, function(err, rows, fields) {
        if (err) throw err;            
       
        //for (var i in rows) {
        //    console.log(rows[i])
        //}
        
        renderUsers(rows);
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