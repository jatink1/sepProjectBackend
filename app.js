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


//route for adding a new user
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

//User authentication
app.post('/userAuth',(req,res)=>{
  var email = req.body.email;
  var password = req.bpdy.password;

  con.query('SELECT * FROM userinfo WHERE email=("' + email + '") AND password=("' + password + '")', (err, results) => {

   if(results.length == 0){
     console.log("Wrong credentials");
   res.send({
     success: false,
     message: "Invalid credentials"
   });
   }
   else{
   //myuserid = results[0].userid; //is used in useridPost & exchange to show posts&exchange of this user
   console.log("Current user info:", results);
   console.log("User id:", results[0].id, "\nEmail:", results[0].email, "\nPassword:", results[0].password);

  var id = results[0].id;
  var name = results[0].name;
 var email = results[0].email;

   if (results.length > 0) {
     console.log("user logged");
     res.send({
       success: true,
       status: 200,
       id: id,
       name: name,
       email: email,
       message: "correct credentials, login succesful"
     });
   }
   else {
     res.send({
       success: false,
       status: 204,
       message: "Incorrect credentials"
     });
   }
 };
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
app.post('/addTime',(req,res)=>{
  var userId = req.body.userId;
  var subjectName = req.bode.subjectName;
  var unitName = req.body.unitName;
  var time = req.body.time;

  query = 'INSERT INTO timespent (userId,subjectName,unitName,timeSpentUnit) VALUES ("'+userId+'", "'+subjectName+'", "'+unitName+'", "'+time+'")';

  con.query(query,(err,results)=>{
    if(err) res.send(err);
    else{
      console.log("Time added");
      res.send("Time added");
    };
  });
});

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

//route for viewing all subjectlist
app.post('/viewSubjects',(req,res)=>{
  var userId = req.body.userId;

  query = 'SELECT * FROM subjectlist WHERE userId = ("'+userId+'")';

  con.query(query,(err,results)=>{
    if(err) res.send(err);
    else{
      console.log("Subjects");
      res.send("Subjects");
    };
  });
});

//route for viewing Units of a particular subject

port = 6969;
app.listen(port,()=>{
    console.log("Listening on 6969");
});
