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
///////////////////////////////GET////////////////////////////
app.get('/getT_IDandPass', (req, res) => {
  connection.query("SELECT T_ID,T_password,T_name,T_major,T_school FROM teacher", function (err, result, fields) {
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
app.get('/getAllStaffs', (req, res) => {
  connection.query("SELECT * FROM internshipstaff", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.get('/getAllStudents', (req, res) => {
  connection.query("SELECT * FROM student", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.get('/getStudentAndOrg', (req, res) => {
  connection.query("SELECT student.S_ID,student.S_name,student.S_major,workplace.W_name,workplace.W_province FROM student INNER JOIN workplace ON student.O_ID=workplace.W_ID", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})


app.get('/getAllTeachers', (req, res) => {
  connection.query("SELECT T_ID,T_name,T_major,T_school,T_email,T_tel FROM teacher", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.post('/getTeacherByID', (req, res) => {
  let TID = req.body.TID
  connection.query(`SELECT T_ID,T_name,T_major,T_school,T_email,T_tel FROM teacher where T_ID = '${TID}'`, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
app.post('/getSearchStudents', (req, res) => {
  let SID = req.body.SID 
  let Sname = req.body.Sname
  let Sschool = req.body.Sschool
  let Smajor = req.body.Smajor
  let SaccYear = req.body.SaccYear
  let Ssemester = req.body.Ssemester
  if(SID == undefined){SID = ''}
  if(Sname == undefined){Sname = ''}
  if(Sschool == undefined){Sschool = ''}
  if(Ssemester == undefined){Ssemester = ''}
  if(SaccYear == undefined){SaccYear = ''}
  if(Smajor == undefined){Smajor = ''}
  connection.query(`SELECT * FROM student where S_ID like '%${SID}%' AND S_name like '%${Sname}%' AND S_major like '%${Smajor}%' AND S_school like '%${Sschool}%' AND S_acyear like '%${SaccYear}%' AND S_acsemester like '%${Ssemester}%'`, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})
//////////////////////////////CREATE//////////////////////////////////
app.post('/createStudents', (req, res) => {
  //get student info
  let sID = req.body.sID 
  let Sname = req.body.Sname 
  let Stel = req.body.Stel
  let Smajor = req.body.Smajor 
  let Sschool = req.body.Sschool
  let semester = req.body.semester
  let accYear = req.body.accYear
  let sql1 = `INSERT INTO student(S_ID,S_name,S_tel,S_major,S_school,s_acyear,s_acsemester) VALUES ('${sID}','${Sname}','${Stel}','${Smajor}','${Sschool}','${accYear}','${semester}')`
 
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
app.post('/createWorkplace', (req, res) => {
  //get workplace info
  let Wname = req.body.W_name
  let Waddress = req.body.W_address 
  let Wcontract = req.body.W_contract
  let Wprovince = req.body.W_province
  let sql2 = `INSERT INTO workplace(W_name,W_address,W_contract,W_province) VALUES ('${Wname}','${Waddress}','${Wcontract}','${Wprovince}')`
  connection.query(sql2, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Create success')
})
app.post('/createTeacher', (req, res) => {
  let TID = req.body.TID
  let Tname = req.body.Tname 
  let Ttel = req.body.Ttel
  let Tmajor = req.body.Tmajor 
  let Tschool = req.body.Tschool
  let Temail = req.body.Temail
  let Tpass = req.body.Tpass
  let semester = req.body.semester
  let accYear = req.body.accYear
  let sql1 = `INSERT INTO teacher(T_ID,T_name,T_password,T_major,T_school,T_email,T_tel,T_AcYear,T_AcSemester) VALUES ('${TID}','${Tname}','${Tpass}','${Tmajor}','${Tschool}','${Temail}','${Ttel}','${accYear}','${semester}')`
  connection.query(sql1, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Create success')
})
//////////////////////////////////DELETE///////////////////////////////////////
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

//////////////////////////////////UPDATE///////////////////////////////////////
app.put('/updateTeacher', (req, res) => {
  let oldTID = req.body.oldTID
  let newTID = req.body.newTID
  let Tname = req.body.Tname 
  let Ttel = req.body.Ttel
  let Tmajor = req.body.Tmajor 
  let Tschool = req.body.Tschool
  let Temail = req.body.Temail
  let sql1 = `UPDATE teacher SET T_ID = '${newTID}',T_name = '${Tname}',T_major = '${Tmajor}',T_school = '${Tschool}',T_email = '${Temail}',T_tel = '${Ttel}'
   WHERE old.T_ID = '${oldTID}'`
  connection.query(sql1, function (err, result, fields) {
    console.log(err)
    if (err) throw err;
  });
  res.send('Update success')
})
app.listen(5010, () => {
  console.log('Start server at port 5010.')
})