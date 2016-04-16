"use strict";
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.load();
//Insert Credentials to Connect to our database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'testFYP',
    port: process.env.DB_PORT,
    multipleStatements: true
});
//Connect to our database
function connect(){
  connection.connect(function(err) {
      if (err) {
          console.error('Error Connecting to Database becuase: ' + err.stack);
          return;
      }
      console.log('Connected to Database using the following ID:  ' + connection.threadId);
  });
}

function insetIntoTeacherTable() {
    connection.query({
        sql: "INSERT INTO Teacher (Teacher_Title, Teacher_Fname, Teacher_Lname, Teacher_Email, Teacher_Mobile_Number, Teacher_Username, Teacher_Password, Role) VALUES ('Mr', 'Robert','Sonny','Robert.Sonny@hotmail.com','07981691495','RobertSonny', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Teacher'); INSERT INTO Teacher (Teacher_Title, Teacher_Fname, Teacher_Lname, Teacher_Email, Teacher_Mobile_Number, Teacher_Username, Teacher_Password, Role) VALUES ('Mrs', 'Rachel','Green','Rachel.Green@hotmail.com','07981691795','RachelGreen', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Teacher'); INSERT INTO Teacher (Teacher_Title, Teacher_Fname, Teacher_Lname, Teacher_Email, Teacher_Mobile_Number, Teacher_Username, Teacher_Password, Role) VALUES ('Mrs', 'Erik','Nagy','Erik.Nagy@hotmail.com','07981391795','ErikNagy', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Teacher'); ",
        timeout: 1000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Teacher Table Successfully!");
    });
}

function insetIntoParentTable() {
    connection.query({
        sql: " INSERT INTO Parent (Parent_Title, Parent_Fname, Parent_Lname, Parent_Email, Parent_Mobile_Number, Parent_Home_Number, Parent_Address, Parent_Username, Parent_Password, Role) VALUES ('Mr', 'Richard', 'Love', 'Richad.Love@gmail.com', '0782637463', '01634237485', 'ME89E4', 'RichardLove', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Parent'); INSERT INTO Parent (Parent_Title, Parent_Fname, Parent_Lname, Parent_Email, Parent_Mobile_Number, Parent_Home_Number, Parent_Address, Parent_Username, Parent_Password, Role) VALUES ('Mrs', 'Belinda', 'Love', 'Belinda.Love@gmail.com', '0782237463', '01634237485', 'ME89E4', 'BelindaLove', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Parent'); INSERT INTO Parent (Parent_Title, Parent_Fname, Parent_Lname, Parent_Email, Parent_Mobile_Number, Parent_Home_Number, Parent_Address, Parent_Username, Parent_Password, Role) VALUES ('Mr', 'Jason', 'King', 'Jason.King@gmail.com', '0782637463', '01634297485', 'ME59E4', 'JasonKing', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Parent'); ",
        timeout: 2000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Parent Table Successfully!");
    });
}

function insetIntoStudentTable() {
    connection.query({
        sql: " INSERT INTO Student (Student_Title, Student_Fname, Student_Lname, Student_Email, Student_Year, Student_Username, Student_Password, Role) VALUES ('Mr', 'Nick', 'Liffen', 'Nick.liffen@hotmail.com', '8', 'NickLiffen', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Student'); INSERT INTO Student (Student_Title, Student_Fname, Student_Lname, Student_Email, Student_Year, Student_Username, Student_Password, Role) VALUES ('Mrs', 'Caris', 'Love', 'Caris.Love@hotmail.com', '9', 'CarisLove', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Student'); INSERT INTO Student (Student_Title, Student_Fname, Student_Lname, Student_Email, Student_Year, Student_Username, Student_Password, Role) VALUES ('Mrs', 'Katie', 'King', 'Katie.King@hotmail.com', '10', 'KatieKing', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Student'); ",
        timeout: 3000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Student Table Successfully!");
    });
}

function insetIntoSubjectTable() {
    connection.query({
        sql: " INSERT INTO Subject (Subject_Name, Subject_Description) VALUES ('English', 'English Language and Litriture'); INSERT INTO Subject (Subject_Name, Subject_Description) VALUES ('Maths', 'Normal Mathmatics'); INSERT INTO Subject (Subject_Name, Subject_Description) VALUES ('History', 'Histroy about the Normans'); ",
        timeout: 4000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Subject Table Successfully!");
    });
}

function insetIntoRoomTable() {
    connection.query({
        sql: " INSERT INTO Room (Room_Name, Rom_Description) VALUES ('3.0.1', 'Burnaby Building'); INSERT INTO Room (Room_Name, Rom_Description) VALUES ('1.0.4', 'Richmond Building'); INSERT INTO Room (Room_Name, Rom_Description) VALUES ('8.0.2', 'Portland Building'); ",
        timeout: 5000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Room Table Successfully!");
    });
}

function insetIntoAdminTable() {
    connection.query({
        sql: " INSERT INTO Admin (Admin_Title, Admin_Fname, Admin_Lname, Admin_Email, Admin_Privledge_Level, Admin_Username, Admin_Password, Role) VALUES ('Mr', 'Andrew', 'Stockdale', 'Andrew.Stockdale@hotmail.com', '1', 'AndrewStockdale', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Admin'); INSERT INTO Admin (Admin_Title, Admin_Fname, Admin_Lname, Admin_Email, Admin_Privledge_Level, Admin_Username, Admin_Password, Role) VALUES ('Mrs', 'Rachel', 'Bodkin', 'Rachel.Bodkin@hotmail.com', '2', 'RachelBodkin', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Admin'); INSERT INTO Admin (Admin_Title, Admin_Fname, Admin_Lname, Admin_Email, Admin_Privledge_Level, Admin_Username, Admin_Password, Role) VALUES ('Mrs', 'Sophie', 'Clarke', 'Sophie.Clarke@hotmail.com', '1', 'SophieClarke', '$2a$08$gnA71gTP.S2.DW51s0dpG.G1uBlN6sKM4anblcvFAZoWUrNLnaaWe', 'Admin'); ",
        timeout: 7000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Admin Table Successfully!");
    });
}

function insetIntoStudentHasParentTable() {
    connection.query({
        sql: " INSERT INTO Student_has_Parent (Student_Student_ID, Parent_Parent_ID) VALUES ('1', '1'); INSERT INTO Student_has_Parent (Student_Student_ID, Parent_Parent_ID) VALUES ('2', '2'); INSERT INTO Student_has_Parent (Student_Student_ID, Parent_Parent_ID) VALUES ('3', '3'); ",
        timeout: 9000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Student_has_Parent Table Successfully!");
    });
}

function insetIntoClassTable() {
    connection.query({
        sql: " INSERT INTO Class (Class_Level, Class_Start_Timestamp, Class_End_Timestamp, Subject_ID, Room_ID, Teacher_ID) VALUES ('7', '2016-01-27 08:00:00', '2016-01-27 09:00:00', '1', '2', '1'); INSERT INTO Class (Class_Level, Class_Start_Timestamp, Class_End_Timestamp, Subject_ID, Room_ID, Teacher_ID) VALUES ('11', '2016-01-27 09:00:00', '2016-01-27 10:00:00', '2', '1', '2'); INSERT INTO Class (Class_Level, Class_Start_Timestamp, Class_End_Timestamp, Subject_ID, Room_ID, Teacher_ID) VALUES ('9', '2016-01-27 10:00:00', '2016-01-27 11:00:00', '3', '3', '3'); ",
        timeout: 6000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Class Table Successfully!");
    });
}

function insetIntoStudentHasClassTable() {
    connection.query({
        sql: " INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('1', '1'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('2', '1'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('3', '1'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('1', '2'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('2', '2'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('3', '2'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('1', '3'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('2', '3'); INSERT INTO Student_has_Class (Student_ID, Class_ID) VALUES ('3', '3'); ",
        timeout: 8000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Student_Has_Class Table Successfully!");
    });
}

function insetIntoAttendanceTable() {
    connection.query({
        sql: " INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Present', 'N/A', '1', '1'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Present', 'N/A', '1', '2'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Late', 'N/A', '1', '3'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Absent', 'N/A', '2', '1'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Present', 'N/A', '2', '2'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Present', 'N/A', '2', '3'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Present', 'N/A', '3', '1'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Late', 'N/A', '3', '2'); INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ('Absent', 'N/A', '3', '3'); ",
        timeout: 10000,
    }, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Insert Data Into Attendance Table Successfully!");
    });
}

function endConnection(){
  connection.end();
}

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
    setTimeout(functions[i], timeout);
  }
}

executeAsynchronously(
  [connect, insetIntoTeacherTable, insetIntoParentTable, insetIntoStudentTable, insetIntoSubjectTable, insetIntoRoomTable, insetIntoAdminTable, insetIntoStudentHasParentTable, insetIntoClassTable, insetIntoStudentHasClassTable, insetIntoAttendanceTable, endConnection], 5000);
