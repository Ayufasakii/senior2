var mysql = require('mysql');
//////////////////////////////
var db_config = {
  host: "us-cdbr-east-06.cleardb.net",
  user: "be8afdb670f4c6",
  password:"b0cd0b99",
  database: "heroku_59117959c6d6ee7"
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
//////////////////////////////
const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get('/getT_IDandPass', (req, res) => {
  connection.query("SELECT T_ID,T_password FROM teacher", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.get('/getS_IDandPass', (req, res) => {
  connection.query("SELECT I_ID,I_password FROM internshipstaff", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.get('/getAllStudents', (req, res) => {
  connection.query("SELECT S_ID,S_name,S_major FROM student", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.get('/getAllTeachers', (req, res) => {
  connection.query("SELECT T_ID,T_name,T_major FROM teacher", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.post('/createStudents', (req, res) => {
  //get student info
  let sID = req.body.sID 
  let Sname = req.body.Sname 
  let Stel = req.body.Stel
  let Smajor = req.body.Smajor 
  let Sschool = req.body.Sschool
  //get workplace info
  let Wname = req.body.W_name
  let Waddress = req.body.W_address 
  let Wcontract = req.body.W_contract
  let Wprovince = req.body.W_province
  let sql1 = `INSERT INTO student(S_ID,S_name,S_tel,S_major,S_school) VALUES ('${sID}','${Sname}','${Stel}','${Smajor}','${Sschool}')`
  let sql2 = `INSERT INTO workplace(W_name,W_address,W_contract,W_province) VALUES ('${Wname}','${Waddress}','${Wcontract}','${Wprovince}')`
  connection.query(sql1, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  connection.query(sql2, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Create success')
})
app.post('/createTeacher', (req, res) => {
  //get student info
  let TID = req.body.TID
  let Tname = req.body.Tname 
  let Ttel = req.body.Ttel
  let Tmajor = req.body.Tmajor 
  let Tschool = req.body.Tschool
  let Temail = req.body.Temail
  let Tpass = req.body.Tpass
  let sql1 = `INSERT INTO teacher(T_ID,T_name,T_password,T_major,T_school,T_email,T_tel) VALUES ('${TID}','${Tname}','${Tpass}','${Tmajor}','${Tschool}','${Temail}','${Ttel}')`
  connection.query(sql1, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Create success')
})
app.delete('/deleteStudent', (req, res) => {
  //get student info
  let sID = req.body.sID 
  let sql1 = `DELETE FROM student WHERE S_ID = '${sID}'`
  connection.query(sql1, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Delete success')
})
app.delete('/deleteTeacher', (req, res) => {
  //get student info
  let TID = req.body.TID 
  let sql1 = `DELETE FROM teacher WHERE T_ID = '${TID}'`
  connection.query(sql1, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Delete success')
})
app.listen(5010, () => {
  console.log('Start server at port 5010.')
})