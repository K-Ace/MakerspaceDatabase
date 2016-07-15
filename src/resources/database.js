//Eventually this will include the code which pertains to the core.

var database = require('mysql');

var dbConnection = database.createConnection({
    host : 'the website we want to use',
    user : 'web',
    password : 'Tll8PmlDd7EzupTBzJbD',
    database : 'database'
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

function addUser(name, email, dateJoined, affiliation, role, rfid)
{
    connect();
    
    console.log("Post Attributes: \n\tName: " + name + "\n\tEmail: " + email + "\n\tJoined: " + dateJoined
               + "\n\tAffiliation: " + affiliation + "\n\tRole: " + role + "\n\tRfid: " + rfid);
    
    dbConnection.query("select * from users where name = '" + name + "'", function(err,rows) {
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
				
				newUserMysql.name    = name;
                newUserMysql.email = email; // use the generateHash function in our user model
			
				var insertQuery = "INSERT INTO users ( name, email ) values ('" + name +"','"+ email +"')";
					console.log(insertQuery);
                
				connection.query(insertQuery,function(err,rows){
				    newUserMysql.id = rows.insertId;
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