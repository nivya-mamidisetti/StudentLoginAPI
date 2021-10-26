const mysql = require('mysql');
const express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
var db = require('./database/connect')
var registerController = require('./controllers/registrationController')
var detailsController = require('./controllers/detailsController');
var studentDetails = require('./routes/students');

const { body } = require('express-validator');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var studentId = '';

//Login 

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/login.html'));
});

//Login Authentication

app.post('/auth', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		db.mysqlConnection.query('SELECT * FROM students WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
			studentId = results[0].id
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.redirect('/student-details');
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

//Get student details after login

app.get('/student-details', (req, res) => {	
    if (req.session.loggedin) {
		studentDetails.findUserById(studentId)
		.then((response) => {
			res.send(response)
		})
    } else {
        res.send('Please login to view this page!');
    }
});


//Register a new student

app.get('/register', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/register.html'));
});

app.post("/register", registerController.createNewUser);


//Post Student details after registration (This is still in progress)

app.get('/details', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/details.html'));
});

app.post("/details", detailsController.previousStandardDetails);



//Get 20 random students details in JSON format

app.get('/students', (req, res) => {
	db.mysqlConnection.query('SELECT * FROM students ORDER BY RAND() LIMIT 20;', (err, results, fields) => {
		if (!err)
			res.send(results);
		else
			console.log(err);

	})
});


// To Run the server with Port Number  

app.listen(3000, () => console.log("Express server is running at port no : 3000"));