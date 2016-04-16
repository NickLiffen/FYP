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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Teacher` ( `Teacher_ID` INT NOT NULL AUTO_INCREMENT, `Teacher_Title` VARCHAR(45) NOT NULL, `Teacher_Fname` VARCHAR(45) NOT NULL, `Teacher_Lname` VARCHAR(45) NOT NULL, `Teacher_Email` VARCHAR(45) NOT NULL, `Teacher_Mobile_Number` VARCHAR(45) NULL, `Teacher_Username` VARCHAR(45) NOT NULL, `Teacher_Password` VARCHAR(300) NOT NULL, `Role` VARCHAR(45) NOT NULL, PRIMARY KEY (`Teacher_ID`)) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Parent` ( `Parent_ID` INT NOT NULL AUTO_INCREMENT, `Parent_Title` VARCHAR(45) NOT NULL, `Parent_Fname` VARCHAR(45) NOT NULL, `Parent_Lname` VARCHAR(45) NOT NULL, `Parent_Email` VARCHAR(45) NOT NULL, `Parent_Mobile_Number` VARCHAR(15) NULL, `Parent_Home_Number` VARCHAR(15) NULL, `Parent_Address` VARCHAR(100) NULL, `Parent_Username` VARCHAR(45) NOT NULL, `Parent_Password` VARCHAR(300) NOT NULL, `Role` VARCHAR(45) NOT NULL, PRIMARY KEY (`Parent_ID`), UNIQUE INDEX `Parent_ID_UNIQUE` (`Parent_ID` ASC)) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Student` ( `Student_ID` INT NOT NULL AUTO_INCREMENT, `Student_Title` VARCHAR(45) NOT NULL, `Student_Fname` VARCHAR(45) NOT NULL, `Student_Lname` VARCHAR(45) NOT NULL, `Student_Email` VARCHAR(45) NULL, `Student_Year` INT NULL, `Student_Username` VARCHAR(45) NULL, `Student_Password` VARCHAR(300) NULL, `Role` VARCHAR(45) NOT NULL, `Active` VARCHAR(10) NOT NULL DEFAULT 'True', PRIMARY KEY (`Student_ID`), UNIQUE INDEX `Student_ID_UNIQUE` (`Student_ID` ASC)) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Subject` ( `Subject_ID` INT NOT NULL AUTO_INCREMENT, `Subject_Name` VARCHAR(45) NOT NULL, `Subject_Description` VARCHAR(45) NULL, PRIMARY KEY (`Subject_ID`), UNIQUE INDEX `Subject_ID_UNIQUE` (`Subject_ID` ASC)) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Room` ( `Room_ID` INT NOT NULL AUTO_INCREMENT, `Room_Name` VARCHAR(45) NOT NULL, `Room_Description` VARCHAR(45) NOT NULL, PRIMARY KEY (`Room_ID`), UNIQUE INDEX `Room_ID_UNIQUE` (`Room_ID` ASC)) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Admin` ( `Admin_ID` INT NOT NULL AUTO_INCREMENT, `Admin_Title` VARCHAR(45) NOT NULL, `Admin_Fname` VARCHAR(45) NOT NULL, `Admin_Lname` VARCHAR(45) NOT NULL, `Admin_Email` VARCHAR(45) NOT NULL, `Admin_Privledge_Level` VARCHAR(45) NULL, `Admin_Username` VARCHAR(45) NOT NULL, `Admin_Password` VARCHAR(300) NULL, `Role` VARCHAR(45) NOT NULL, PRIMARY KEY (`Admin_ID`), UNIQUE INDEX `Admin_ID_UNIQUE` (`Admin_ID` ASC)) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Student_has_Parent` ( `Student_Student_ID` INT NOT NULL, `Parent_Parent_ID` INT NOT NULL, PRIMARY KEY (`Student_Student_ID`, `Parent_Parent_ID`), INDEX `fk_Student_has_Parent_Parent1_idx` (`Parent_Parent_ID` ASC), INDEX `fk_Student_has_Parent_Student1_idx` (`Student_Student_ID` ASC), CONSTRAINT `fk_Student_has_Parent_Student1` FOREIGN KEY (`Student_Student_ID`) REFERENCES `testFYP`.`Student` (`Student_ID`) ON DELETE NO ACTION, CONSTRAINT `fk_Student_has_Parent_Parent1` FOREIGN KEY (`Parent_Parent_ID`) REFERENCES `testFYP`.`Parent` (`Parent_ID`) ON DELETE NO ACTION) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Class` ( `Class_ID` INT NOT NULL AUTO_INCREMENT, `Class_Level` VARCHAR(45) NOT NULL, `Class_Start_Timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `Class_End_Timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `Subject_ID` INT NOT NULL, `Room_ID` INT NOT NULL, `Teacher_ID` INT NOT NULL, `Active` VARCHAR(10) NOT NULL DEFAULT 'True', PRIMARY KEY (`Class_ID`, `Subject_ID`, `Room_ID`, `Teacher_ID`), INDEX `fk_Class_Subject1_idx` (`Subject_ID` ASC), INDEX `fk_Class_Room1_idx` (`Room_ID` ASC), INDEX `fk_Class_Teacher1_idx` (`Teacher_ID` ASC), UNIQUE INDEX `Class_ID_UNIQUE` (`Class_ID` ASC), CONSTRAINT `fk_Class_Subject1` FOREIGN KEY (`Subject_ID`) REFERENCES `testFYP`.`Subject` (`Subject_ID`) ON DELETE NO ACTION, CONSTRAINT `fk_Class_Room1` FOREIGN KEY (`Room_ID`) REFERENCES `testFYP`.`Room` (`Room_ID`) ON DELETE NO ACTION, CONSTRAINT `fk_Class_Teacher1` FOREIGN KEY (`Teacher_ID`) REFERENCES `testFYP`.`Teacher` (`Teacher_ID`) ON DELETE NO ACTION) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Student_has_Class` ( `Student_ID` INT NOT NULL, `Class_ID` INT NOT NULL, PRIMARY KEY (`Student_ID`, `Class_ID`), INDEX `fk_Student_has_Class_Class1_idx` (`Class_ID` ASC), INDEX `fk_Student_has_Class_Student_idx` (`Student_ID` ASC), CONSTRAINT `fk_Student_has_Class_Student` FOREIGN KEY (`Student_ID`) REFERENCES `testFYP`.`Student` (`Student_ID`) ON DELETE NO ACTION, CONSTRAINT `fk_Student_has_Class_Class1` FOREIGN KEY (`Class_ID`) REFERENCES `testFYP`.`Class` (`Class_ID`) ON DELETE NO ACTION) ENGINE = InnoDB;",
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
        sql: "CREATE TABLE IF NOT EXISTS `testFYP`.`Attendance` ( `Attendance_ID` INT NOT NULL AUTO_INCREMENT, `Attendance_Status` VARCHAR(45) NOT NULL, `Attendance_Remarks` VARCHAR(45) NULL, `Class_ID` INT NOT NULL, `Student_ID` INT NOT NULL, PRIMARY KEY (`Attendance_ID`, `Class_ID`, `Student_ID`), INDEX `fk_Attendance_Class1_idx` (`Class_ID` ASC), INDEX `fk_Attendance_Student1_idx` (`Student_ID` ASC), UNIQUE INDEX `Attendance_ID_UNIQUE` (`Attendance_ID` ASC), CONSTRAINT `fk_Attendance_Class1` FOREIGN KEY (`Class_ID`) REFERENCES `testFYP`.`Class` (`Class_ID`) ON DELETE NO ACTION, CONSTRAINT `fk_Attendance_Student1` FOREIGN KEY (`Student_ID`) REFERENCES `testFYP`.`Student` (`Student_ID`) ON DELETE NO ACTION) ENGINE = InnoDB;",
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
  [connect, insetIntoTeacherTable, insetIntoParentTable, insetIntoStudentTable, insetIntoSubjectTable, insetIntoRoomTable, insetIntoAdminTable, insetIntoStudentHasParentTable, insetIntoClassTable, insetIntoStudentHasClassTable, insetIntoAttendanceTable, endConnection], 2000);
