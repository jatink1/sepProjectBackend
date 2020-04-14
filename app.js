// this is the api for sepm app which will connect app to mysql database
//importing necessary modules
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

//creating server connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sepproject"
});

//route for adding a new user
app.post('/signUp', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  query = 'INSERT INTO userinfo (name,email,password) VALUES ("' + name + '", "' + email + '", "' + password + '")';
  con.query(query, (err, results) => {
    if (err) res.send(err)
    else {
      console.log("User account created");
      res.send("Account Created");
    }
  });
});

//User authentication
app.post('/userAuth', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  con.query('SELECT * FROM userinfo WHERE email=("' + email + '") AND password=("' + password + '")', (err, results) => {
    if (results.length == 0) {
      console.log("Wrong credentials");
      res.send({
        success: false,
        message: "Invalid credentials"
      });
    } else {
      console.log("Current user info:");
      console.log(`User name: ${results[0].name}; Email ${results[0].email}`);
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
      } else {
        res.send({
          success: false,
          status: 204,
          message: "Incorrect credentials"
        });
      };
    };
  });
});


//route for adding new subject
app.post('/addSubject', (req, res) => {
  var subName = req.body.subjectName;
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
  var subjectName = req.body.subjectName;
  query = 'INSERT INTO unitlist (subjectName,userId, unitName) VALUES ("' + subjectName + '", "' + userId + '", "' + unitName + '") ';
  con.query(query, (err, results) => {
    if (err) res.send(err);
    else {
      console.log("Unit added");
      res.send("Unit added");
    };
  });
});

//route for adding time of a unit for a session
app.post('/addTime', (req, res) => {
  var userId = req.body.userId;
  var subjectName = req.body.subjectName;
  var unitName = req.body.unitName;
  var hours = req.body.hours;
  var minutes = req.body.minutes;
  var seconds = req.body.seconds;
  query = 'INSERT INTO timespent (userId,subjectName,unitName,hours,minutes,seconds) VALUES ("' + userId + '", "' + subjectName + '", "' + unitName + '", "' + hours + '","' + minutes + '","' + seconds + '")';
  con.query(query, (err, results) => {
    if (err) res.send(err);
    else {
      console.log("Time added");
      res.send("Time added");
    };
  });
});

//route for adding total time of unit and storing it with that unit in database
app.post('/totalUnitTime', (req, res) => {
  var unitName = req.body.unitName;
  var subjectName = req.body.subjectName;
  var userId = req.body.userId;
  var secondsSum = 0;
  var hoursSum = 0;
  var minutesSum = 0;
  query = 'SELECT * FROM timespent WHERE unitName = ("' + unitName + '") AND subjectName = ("' + subjectName + '") AND userId = ("' + userId + '")';
  con.query(query, (err, results) => {
    if (err) res.send(err)
    else {
      console.log(`Time of unit ${unitName} sent`);
      for (let i = 0; i < results.length; i++) {
        secondsSum = secondsSum + results[i].seconds;
      }
      //loop to sum total minutes
      for (let k = 0; k < results.length; k++) {
        minutesSum = minutesSum + results[k].minutes;
      }
      //loop to sum total hours
      for (let j = 0; j < results.length; j++) {
        hoursSum = hoursSum + results[j].hours;
      }
      if (secondsSum > 59) {
        let b = secondsSum / 60;
        minutesSum = minutesSum + b;
        secondsSum = secondsSum % 60;
      }
      if (minutesSum > 59) {
        let b = minutesSum / 60;
        hoursSum = hoursSum + b;
        minutesSum = minutesSum % 60;
      }
      var totalTime = hoursSum + "Hr " + parseInt(minutesSum) + "Min " + secondsSum + "Sec";
      query2 = 'UPDATE unitlist SET time = ("' + totalTime + '") WHERE unitName = ("' + unitName + '")';
      con.query(query2, (err, results) => {
        if (err) res.send(err)
        else {
          console.log("Unit time added");
          //res.send("Unit Time Added");
        }
      })
      res.send({
        success: true,
        message: "Time stored"
      });
    };
  });
});

//route for viewing current user details
app.post('/getUserDetails', (req, res) => {
  var userId = req.body.userId;
  query = 'SELECT * FROM userinfo WHERE id = ("' + userId + '") ';
  con.query(query, (err, results) => {
    if (err) res.send("User doesn't exist");
    else {
      console.log("User details");
      res.send(results);
    };
  });
});

//route for viewing all subjectlist
app.post('/viewSubjects', (req, res) => {
  var userId = req.body.userId;
  query = 'SELECT * FROM subjectlist WHERE userId = ("' + userId + '")';
  con.query(query, (err, results) => {
    if (err) res.send(err);
    else {
      console.log("Subjects");
      res.send(results);
    };
  });
});

//route for viewing Units of a particular subject
app.post('/viewUnit', (req, res) => {
  var subjectName = req.body.unit;
  query = 'SELECT * FROM unitlist WHERE subjectName = ("' + subjectName + '")';
  con.query(query, (err, results) => {
    if (err) res.send(err);
    else {
      console.log("Units");
      res.send(results);
    };
  });
});

port = 6969;
app.listen(port, () => {
  console.log("Listening on 6969");
});