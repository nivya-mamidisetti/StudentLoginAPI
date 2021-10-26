//Ideally .env file should be created to store the database details

const mysql = require('mysql');

// Connection String to Database  

var mysqlConnection = mysql.createConnection({  
    host: 'localhost',  
    user : 'root',  
    password : 'P@ssw0rd9',   
    database : 'mydatabase',  
    multipleStatements : true  
});  
  
// To check whether the connection is succeed for Failed while running the project in console.  

mysqlConnection.connect((err) => {  
    if(!err) {  
        console.log("Db Connection Succeed");  
    }  
    else{  
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  

module.exports = {mysqlConnection};