//Eventually this will include the code which pertains to the core.

var database = require('mysql');

var dbConnection = database.createConnection({
    host : '',
    user : '',
    password : '',
    database : ''
});


function connect()
{
    dbConnection.connect( function( err ) {
        if(err) {
            console.error("Error connecting: " + err.stack);
            return;
        }
        
        console.log("Connected as id: " + dbConnection.threadId);
    });
}

function addUser(firstName, lastName, email, dateJoined, affiliation, role, rfid)
{
    connect();
    
    console.log("Post Attributes: \n\tName: " + firstName + " " + lastName + "\n\tEmail: " + email + "\n\tJoined: " + dateJoined
               + "\n\tAffiliation: " + affiliation + "\n\tRole: " + role + "\n\tRfid: " + rfid);
    
    dbConnection.query("select * from members where lastName = '" + lastName + "'", function(err,rows) {
			console.log(rows);
			console.log("above row object");
			if (err)
                console.log("Bad Query..." + err);
			 if (rows.length) {
                console.log("User already exists");
            } else {

				// if there is no user with that email
                // create the user
                var newUserMysql = new Object();
				
				newUserMysql.firstName    = firstName;
                newUserMysql.lastName     = lastName;
                newUserMysql.email = email; // use the generateHash function in our user model
			
				var insertQuery = "INSERT INTO members ( firstName, lastName, email ) values ('" + firstName + "','" + lastName + "','" + email + "')";
					console.log(insertQuery);
                
				dbConnection.query(insertQuery,function(err,rows){
				    //newUserMysql.id = rows.insertId;
				});	
            }	
		});
}

function killConnection()
{
    dbConnection.end();
}

function getConnection()
{
    return dbConnection;
}

exports.connect = connect;
exports.killConnection = killConnection;
exports.getConnection = getConnection;
exports.addUser = addUser;