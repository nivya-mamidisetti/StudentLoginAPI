const mysql = require('mysql');  
const express = require('express');  
var app = express();  
var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');  
var db = require('./database/connect')
//var registrationRouter = require('./routes/registration');
var registerController = require('./controllers/registrationController')
var detailsController = require('./controllers/detailsController')

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Login 

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/auth', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		db.mysqlConnection.query('SELECT * FROM students WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            // console.log(results)
            // var studentid = results[0].id
            // console.log(studentid)
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.redirect('/student-details/:id');
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
});

//Register

app.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/register.html'));
});

app.post("/register", registerController.createNewUser);

//Post Student details after registration

app.get('/details', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/details.html'));
});

app.post("/details", detailsController.previousStandardDetails);

//Get Stundent details after login

app.get('/student-details/:id', (req, res) => {

    if (req.session.loggedin) {
		var id = req.params.id
        db.mysqlConnection.query("SELECT * FROM details where id = ?;", [id], (err, results, fields) => {
            if (!err)
                res.send(results);
            else
                console.log(err);
        })
    } else {
        res.send('Please login to view this page!');
    }
});


//Get 20 random students details   

app.get('/students',(req,res)=>{  
    db.mysqlConnection.query('SELECT * FROM students ORDER BY RAND() LIMIT 20;',(err,results,fields)=>{  
    if(!err)   
    res.send(results);  
    else  
        console.log(err);  
      
})  
});  


// To Run the server with Port Number  

app.listen(3000,()=> console.log("Express server is running at port no : 3000")); 