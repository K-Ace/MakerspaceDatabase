//Eventually this will include the code which pertains to the core.

var database = require('mysql');

var dbConnection = database.createConnection({
    host : 'the website we want to use',
    user : 'bsmith',
    password : 'password',
    database : 'databasename'
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