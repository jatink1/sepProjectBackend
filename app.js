// this is the api for sepm app which will connect app to mysql database

//importing necessary modules
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

//creating server connection
const con = mysql.createConnection({
    host: localhost,
    user:"root",
    password:"",
    database:"sepproject"
});


//route for new user
app.post('/createUser',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var regno = req.body.regno;

    query = 'INSERT INTO userinfo (name,email,password,regno) VALUES ("' + name+ '", "'+email+'", "'+password+'","'+regno+'")';

    con.query(query,(err,results)=>{
        if(err) res.send(err)
        else{
            console.log("User account created");
            res.send("Account Created");
        }
    });
});

//route for adding new subject
app.post('/addSubject', (req, res) => {
    var subName = req.body.subName;
    var userId = req.body.userId;

    query = 'INSERT INTO subjectlist (subjectName, userId) VALUES ("' + subName + '", "' + userId + '") ';
    
    con.query(query, (err, results) => {
        if (err) res.send(err);
        else {
            console.log("Subject added");
            res.send("Subject added");
        }
    })
});

//route for adding new unit
app.post('/addUnit', (req, res) => {
    var unitName = req.body.unitName;
    var userId = req.body.userId;
    var subjectName = req.body.subName;

    query = 'INSERT INTO unitlist (subjectName,userId, unitName) VALUES ("' + subjectName + '", "' + userId + '", "' + unitName + '") ';
    
    con.query(query, (err, results) => {
        if (err) res.send(err);
        else {
            console.log("Unit added");
            res.send("Unit added");
        };
    });
});

//route for adding time


//route for viewing current user details
app.post('/getUser', (req, res) => {
    var userId = req.body.userId;

    query = 'SELECT * FROM userinfo WHERE userId = ("' + userId + '") ';

    con.query(query, (err, results) => {
        if (err) res.send("User doesn't exist");
        else {
            console.log("User details");
            res.send("User details");
        };
    });
});

port = 6969;
app.listen(port,()=>{
    console.log("Listening on 6969");
});