"use strict";
//Connection to the database
var connection = require('../config/connection.js');

module.exports = {
    //Function called from routes.js to update te users profile.
    updateProfile: function(email, username, id) {
        return new Promise(function(resolve, reject) {
            //Do a cheeky update query to my database to update the users profile.
            connection.query('UPDATE Admin SET Admin_Email = ?, Admin_Username = ? WHERE Admin_ID = ?', [email, username, id], function(err) {
                //If error with SQL Query throw error to console
                if (err) {
                    console.log("Problem Updating User's Profile: " + err);
                    reject(Error(err));
                }
                console.log("Updated the users profile successfully");
                resolve();
            });
        });
    },

    //Function called from routes.js and adds a student to the database
    addStudent: function(newUser) {
        //Starting the promise for adding Student / Parent.
        return new Promise(function(resolve, reject) {
            //Declaring varuables for the addStudent function
            let parent, parentObjectLength, insertId, output, sqlStatement;
            //Extracts the parent part of the Object and stores it in the parent variable
            if (newUser.Parent) {
                parent = newUser.Parent;
                delete newUser.Parent;
            }
            //Adding the new student to the database
            connection.query('INSERT INTO Student SET ?', newUser, function(err, result) {
                //If error inserting student to database throw error.
                if (err) {
                    console.log("Problem Updating User's Profile: " + err);
                    reject(Error(err));
                }
                //Grabs the ID of the student just added to the database
                insertId = result.insertId;
                //Creates an empty array where Student_ID and Parent_ID is going to go.
                output = [];
                //Loops through the Parent Array and pushed the Parent_ID to the Student_ID.
                if (parent) {
                    parentObjectLength = parent.length;
                    //The reason for this is becuase if there is no parents we do not want to add anything to the database.
                    console.log("We have a parent");
                    for (var i = 0; i < parent.length; i++) {
                        output.push([insertId, parent[i]]);
                    }
                    //Prepares a SQL statement for inserting student and parent ID to the Student_has_Parent table.
                    sqlStatement = "INSERT INTO Student_has_Parent (Student_Student_ID, Parent_Parent_ID) VALUES ?";
                    //Inserting into database.
                    connection.query(sqlStatement, [output], function(err, results) {
                        if (err) {
                            console.log("Problem Adding to Parents_Has_Student table: " + err);
                            reject(Error(err));
                        }
                        resolve(results);
                    });
                } else {
                    console.log("We have noooooooo parent");
                    resolve(result);
                }
            });
        });
    },

    getParent: function() {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            //Query to get parent information to put into the select box.
            connection.query('SELECT Parent_ID, Parent_Title, Parent_Fname, Parent_Lname, Parent_Email FROM Parent', function(err, results) {
                //If error reject the promise.
                if (err) {
                    reject(Error(err));
                } else {
                    resolve(results);
                }
            });
        });
    },

    getStudent: function() {
        //Return a new promise
        return new Promise(function(resolve, reject) {
            connection.query('SELECT Student_ID, Student_Title, Student_Fname, Student_Lname, Student_Email, Student_Year, Student_Username FROM Student', function(err, results) {
                //If error reject the promise.
                if (err) {
                    reject(Error(err));
                } else {
                    resolve(results);
                }
            });
        });
    },

    getStudentProfile: function(studentID) {
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT Student_ID, CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name', CONCAT( Parent.Parent_Fname, ' ' , Parent.Parent_Lname)  AS 'Parent_Name', Student_Email, Student_Year, Student_Username FROM Student, Parent, Student_has_Parent WHERE Student_has_Parent.Student_Student_ID = Student.Student_ID AND Student_has_Parent.Parent_Parent_ID = Parent.Parent_ID AND LOWER( Student_ID ) LIKE  '${studentID}' LIMIT 1`, function(err, results) {
                //If error reject the promise.
                if (err) {
                    reject(Error(err));
                } else {
                    resolve(results);
                }
            });
        });
    },

    //Teacher SECTION (ADMIN PART)

    getTeacher: function() {
        return new Promise(function(resolve, reject) {
            connection.query('SELECT Teacher_ID, Teacher_Title, Teacher_Fname, Teacher_Lname, Teacher_Email FROM Teacher', function(err, results) {
                //If error reject the promise.
                if (err) {
                    reject(Error(err));
                } else {
                    resolve(results);
                }
            });
        });
    },

    getTeacherProfile: function(teacherID) {
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT Teacher_ID, CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname)  AS 'Teacher_Name', Teacher_Email, Teacher_Mobile_Number AS 'Teacher_Number', Teacher_Username FROM Teacher WHERE LOWER( Teacher_ID ) LIKE  '${teacherID}' LIMIT 1`, function(err, results) {
                //If error reject the promise.
                if (err) {
                    reject(Error(err));
                } else {
                    resolve(results);
                }
            });
        });
    },

    addTeacher: function(newUser) {
        //Starting the promise for adding Student / Parent.
        return new Promise(function(resolve, reject) {
            //Adding the new student to the database
            connection.query('INSERT INTO Teacher SET ?', newUser, function(err, results) {
                //If error inserting student to database throw error.
                if (err) {
                    console.log("Problem Adding Teacher to Database. Check addTeacher Function. database.js: " + err);
                    reject(Error(err));
                }
                resolve(results);
            });
        });
    },

    //PARENT SECTION (ADMIN PART)
    addParent: function(newUser) {
        //Starting the promise for adding Student / Parent.
        return new Promise(function(resolve, reject) {
            //Declaring varuables for the addTeacher function
            let student, studentObjectLength, insertId, output, sqlStatement;
            //Extracts the student part of the Object and stores it in the student variable
            if (newUser.Student) {
                student = newUser.Student;
                delete newUser.Student;
            }
            //Adding the new parent to the database
            connection.query('INSERT INTO Parent SET ?', newUser, function(err, result) {
                //If error inserting student to database throw error.
                if (err) {
                    console.log("Problem Updating Teachers Profile: " + err);
                    reject(Error(err));
                }
                //Grabs the ID of the parent just added to the database
                insertId = result.insertId;
                //Creates an empty array where Student_ID and Parent_ID is going to go.
                output = [];
                //Loops through the Parent Array and pushed the Parent_ID to the Student_ID.
                if (student) {
                    studentObjectLength = student.length;
                    //The reason for this is becuase if there is no parents we do not want to add anything to the database.
                    console.log("We have a student");
                    for (var i = 0; i < student.length; i++) {
                        output.push([student[i], insertId]);
                    }
                    //Prepares a SQL statement for inserting student and parent ID to the Student_has_Parent table.
                    sqlStatement = "INSERT INTO Student_has_Parent (Student_Student_ID, Parent_Parent_ID) VALUES ?";
                    //Inserting into database.
                    connection.query(sqlStatement, [output], function(err, results) {
                        if (err) {
                            console.log("Problem Adding to Parents_Has_Student table: " + err);
                            reject(Error(err));
                        }
                        resolve(results);
                    });
                } else {
                    console.log("We have noooooooo student");
                    resolve(result);
                }
            });
        });
    },

    addClass: function(newClass) {
        //Starting the promise for adding Student / Parent.
        return new Promise(function(resolve, reject) {
            //Declaring varuables for the addTeacher function
            let student, studentObjectLength, insertId, output, sqlStatement;
            //Extracts the student part of the Object and stores it in the student variable
            if (newClass.Student) {
                student = newClass.Student;
                delete newClass.Student;
            }
            //Adding the new parent to the database
            connection.query('INSERT INTO Class SET ?', newClass, function(err, result) {
                //If error inserting student to database throw error.
                if (err) {
                    console.log("Problem Added to Class Table: " + err);
                    reject(Error(err));
                }
                //Grabs the ID of the parent just added to the database
                insertId = result.insertId;
                //Creates an empty array where Student_ID and Parent_ID is going to go.
                output = [];
                //Loops through the Parent Array and pushed the Parent_ID to the Student_ID.
                studentObjectLength = student.length;
                //The reason for this is becuase if there is no parents we do not want to add anything to the database.
                for (var i = 0; i < student.length; i++) {
                    output.push([student[i], insertId]);
                }
                //Prepares a SQL statement for inserting student and parent ID to the Student_has_Parent table.
                sqlStatement = "INSERT INTO Student_Has_Class (Student_ID, Class_ID) VALUES ?";
                //Inserting into database.
                connection.query(sqlStatement, [output], function(err, results) {
                    if (err) {
                        console.log("Problem Adding to Student_Has_Class table: " + err);
                        reject(Error(err));
                    }
                    resolve(results);
                });
            });
        });
    },

    getClass: function() {
        return new Promise(function(resolve, reject) {
            connection.query('SELECT Class.Class_ID, Class.Class_Start_Timestamp, Class.Class_End_Timestamp, Class.Class_Level, Subject.Subject_Name, Room.Room_Name, Teacher.Teacher_Title, Teacher.Teacher_Fname, Teacher.Teacher_Lname FROM Class, Subject, Room, Teacher WHERE Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Class.Teacher_ID = Teacher.Teacher_ID', function(err, results) {
                if (err) {
                    console.log("Problem getting class information. Check getClass Function. database.js: " + err);
                    reject(Error(err));
                }
                resolve(results);
            });
        });
    },

    getSubject: function() {
        return new Promise(function(resolve, reject) {
            connection.query('SELECT Subject_ID, Subject_Name, Subject_Description FROM Subject', function(err, results) {
                //If error reject the promise.
                if (err) {
                    reject(Error(err));
                } else {
                    resolve(results);
                }
            });
        });
    },

    addSubject: function(newSubject) {
        //Starting the promise for adding Student / Parent.
        return new Promise(function(resolve, reject) {
            //Adding the new student to the database
            connection.query('INSERT INTO Subject SET ?', newSubject, function(err, results) {
                //If error inserting student to database throw error.
                if (err) {
                    console.log("Problem Adding Subject to Database. Check addSubject Function. database.js: " + err);
                    reject(Error(err));
                }
                resolve(results);
            });
        });
    },

    getRoom: function() {
        return new Promise(function(resolve, reject) {
            connection.query('SELECT Room_ID, Room_Name, Rom_Description FROM Room', function(err, results) {
                //If error reject the promise.
                if (err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    console.log("Made it");
                    resolve(results);
                }
            });
        });
    },

    addRoom: function(newRoom) {
        //Starting the promise for adding Student / Parent.
        return new Promise(function(resolve, reject) {
            //Adding the new student to the database
            connection.query('INSERT INTO Room SET ?', newRoom, function(err, results) {
                //If error inserting student to database throw error.
                if (err) {
                    console.log("Problem Adding Room to Database. Check addRoom Function. database.js: " + err);
                    reject(Error(err));
                }
                resolve(results);
            });
        });
    },

    teacherTimetable: function(userID) {
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT Class.Class_ID AS 'id', Subject.Subject_Name AS 'title', Class_Start_Timestamp AS 'start', Class_End_Timestamp AS 'end', Room.Room_Name AS 'room', CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'teacher' FROM Teacher, Subject, Class, Room WHERE Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Teacher.Teacher_ID LIKE ${userID}`, function(err, results) {
                if (err) {
                    console.log("Problem Getting Class Information. Check getTimetable Function. database.js: " + err);
                    reject(Error(err));
                }
                resolve(results);
            });

        });
    },

    studentTimetable: function(userID) {
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT Class.Class_ID AS 'id', Subject.Subject_Name AS 'title', Class_Start_Timestamp AS 'start', Class_End_Timestamp AS 'end', Room.Room_Name AS 'room', CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'teacher' FROM Student, Student_has_Class, Subject, Class, Room, Teacher WHERE Student_has_Class.Student_ID = Student.Student_ID AND Student_has_Class.Class_ID = Class.Class_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Teacher_ID = Teacher.Teacher_ID AND Class.Room_ID = Room.Room_ID AND Student.Student_ID LIKE ${userID}`, function(err, results) {
                if (err) {
                    console.log("Problem Getting Class Information. Check getStudentTimetable Function. database.js: " + err);
                    reject(Error(err));
                }
                console.log(results);
                resolve(results);
            });

        });
    },
    addClassStudent: function(classInfo) {
        return new Promise(function(resolve, reject) {

            connection.query(`SELECT Attendance.Attendance_ID AS 'Attendance_ID', Attendance.Attendance_Status AS 'Status', Attendance.Student_ID AS 'Student_ID', Attendance.Class_ID AS 'Class_ID', CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name' from Attendance, Student WHERE Attendance.Student_ID = Student.Student_ID AND Class_ID LIKE ${classInfo.classID}`, function(err, results) {
                if (err) {
                    console.log("Problem Getting Students in Class Information. Check addClassStudent Function. database.js: " + err);
                    reject(Error(err));
                }
                console.log(results);
                if (Object.keys(results).length === 0) {
                    connection.query(`SELECT Student.Student_ID AS 'Student_ID', Class.Class_ID AS 'Class_ID', CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name' FROM Student, Class, Student_Has_Class WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Class.Class_ID LIKE  ${classInfo.classID}`, function(err, results) {
                        if (err) {
                            console.log("Problem Getting Students in Class Information. Check addClassStudent Function. database.js: " + err);
                            reject(Error(err));
                        }
                        console.log(results);
                        resolve(results);
                    });
                } else {
                    resolve(results);
                }
            });

        });
    },

    takeAttendance: function(attendanceInfo) {
        return new Promise(function(resolve, reject) {

            if (attendanceInfo[0].length === 3) {

              let sqlStatement = "UPDATE Attendance SET Attendance_Status = ?, Attendance_Remarks = ? WHERE Attendance_ID = ?;";
              let variables = [];
              let finalQuery = '';

                var arrayLength = attendanceInfo.length;
                for (var i = 0; i < arrayLength; i++) {
                    variables.push(attendanceInfo[i][0], attendanceInfo[i][1], attendanceInfo[i][2]);
                    finalQuery += sqlStatement;
                }

                connection.query(finalQuery, variables, function(err, results) {
                    if (err) {
                        console.log("Problem Adding to Parents_Has_Student table: " + err);
                        reject(Error(err));
                    }

                    resolve(results);
                });


            } else {
              console.log("We should be here");
                let sqlStatement = "INSERT INTO Attendance (Attendance_Status, Attendance_Remarks, Class_ID, Student_ID) VALUES ?";
                connection.query(sqlStatement, [attendanceInfo], function(err, results) {
                    if (err) {
                        console.log("Problem Adding to Parents_Has_Student table: " + err);
                        reject(Error(err));
                    }
                    resolve(results);
                });
            }
        });
    },

    getParentStudents: function(parentID){
      return new Promise(function(resolve, reject) {
        let sqlStatement = `SELECT Student_ID, CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name', Student.Student_Email, Student.Student_Year, Student.Student_Username FROM Parent, Student, Student_has_Parent WHERE Student_has_Parent.Student_Student_ID = Student.Student_ID AND Student_has_Parent.Parent_Parent_ID = Parent.Parent_ID AND LOWER( Parent_ID ) LIKE  '${parentID}'`;
        connection.query(sqlStatement, function(err, results) {
            if (err) {
                console.log("Problem Getting Student Information : " + err);
                reject(Error(err));
            }
            resolve(results);
          });
        });
      },

      studentTodayAttendance: function(studentID){
        return new Promise(function(resolve, reject) {
          let sqlStatement = `SELECT Class.Class_ID AS 'Class_ID', Subject.Subject_Name as 'Subject_Name', Class.Class_Start_Timestamp AS 'start',  CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'Teacher_Name', Attendance.Attendance_Status AS 'Attendance_Status' FROM Student, Class, Student_Has_Class, Subject, Teacher, Attendance WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Class_Start_Timestamp > DATE_SUB(NOW(), INTERVAL 1 DAY) AND Student.Student_ID LIKE '${studentID}' ORDER BY start ASC`;
          connection.query(sqlStatement, function(err, results) {
              if (err) {
                  console.log("Problem Getting Student's Today Attendnace Information : " + err);
                  reject(Error(err));
              }
              var type = {results};
              resolve(type);
            });
          });
      },

      studentWeekAttendance: function(studentID){
        return new Promise(function(resolve, reject) {
          let sqlStatement = `SELECT Class.Class_ID AS 'Class_ID', Subject.Subject_Name as 'Subject_Name', Class.Class_Start_Timestamp AS 'start',  CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'Teacher_Name', Attendance.Attendance_Status AS 'Attendance_Status' FROM Student, Class, Student_Has_Class, Subject, Teacher, Attendance WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Class_Start_Timestamp > DATE_SUB(NOW(), INTERVAL 1 Week) AND Student.Student_ID LIKE '${studentID}' ORDER BY start ASC`;
          connection.query(sqlStatement, function(err, results) {
              if (err) {
                  console.log("Problem Getting Student's Today Attendnace Information : " + err);
                  reject(Error(err));
              }
              var type = {results};
              resolve(type);
            });
          });
      },

      studentMonthAttendance: function(studentID){
        return new Promise(function(resolve, reject) {
          let sqlStatement = `SELECT Class.Class_ID AS 'Class_ID', Subject.Subject_Name as 'Subject_Name', Class.Class_Start_Timestamp AS 'start',  CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'Teacher_Name', Attendance.Attendance_Status AS 'Attendance_Status' FROM Student, Class, Student_Has_Class, Subject, Teacher, Attendance WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Class_Start_Timestamp > DATE_SUB(NOW(), INTERVAL 1 Month) AND Student.Student_ID LIKE '${studentID}' ORDER BY start ASC`;
          connection.query(sqlStatement, function(err, results) {
              if (err) {
                  console.log("Problem Getting Student's Today Attendnace Information : " + err);
                  reject(Error(err));
              }
              var type = {results};
              resolve(type);
            });
          });
      },

      getBarChartDetails: function(studentID){
        return new Promise(function(resolve, reject) {
          let sqlStatement = `SELECT LOWER(  Subject.Subject_Name ) AS 'Subject_Name', LOWER(  Attendance.Attendance_Status )AS 'Attendance_Info', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class, Subject WHERE Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Subject_ID = Subject.Subject_ID AND LOWER( Student.Student_ID ) LIKE  '${studentID}'  GROUP BY Subject.Subject_Name, Attendance.Attendance_Status;`;
          connection.query(sqlStatement, function(err, results) {
              if (err) {
                  console.log("Problem Getting Bar Chart Information : " + err);
                  reject(Error(err));
              }
              resolve(results);
            });
          });
      },
      getRadarChartDetails: function(studentID){
        return new Promise(function(resolve, reject) {
          let sqlStatement = `SELECT LOWER(  Attendance.Attendance_Status )AS 'Attendance_Info', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class, Subject WHERE Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Subject_ID = Subject.Subject_ID AND LOWER( Student.Student_ID ) LIKE  '${studentID}' GROUP BY Attendance.Attendance_Status`;
          connection.query(sqlStatement, function(err, results) {
              if (err) {
                  console.log("Problem Getting Bar Chart Information : " + err);
                  reject(Error(err));
              }
              resolve(results);
            });
          });
      },
      parentGraphRequest: function(parentInfo){
        return new Promise(function(resolve, reject) {
          let sqlStatement = `SELECT LOWER( Attendance.Attendance_Status )AS 'Attendance_Info', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class, Subject WHERE Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Subject_ID = Subject.Subject_ID AND LOWER( Student.Student_ID ) = '${parentInfo.id}' AND LOWER( Subject.Subject_ID ) = '${parentInfo.subjectID}' GROUP BY Attendance.Attendance_Status`;
          connection.query(sqlStatement, function(err, results) {
              if (err) {
                  console.log("Problem Getting Bar Chart Information : " + err);
                  reject(Error(err));
              }
              resolve(results);
            });
          });

      }
};
