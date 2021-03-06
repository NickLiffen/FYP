"use strict";

var databaseQuery = require('../config/database.js');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(app, passport, sendgridClient, twilioClient) {

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the login.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/checkAuth', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/checkAuth', function(req, res) {
        if (!req.user) {
            req.flash('loginMessage', "Something went wrong, re-login please");
            res.redirect('/login');
        } else if (req.user.role === 'Admin') {
            res.redirect('/admin');
        } else if (req.user.role === 'Teacher') {
            res.redirect('/teacher');
        } else if (req.user.role === 'Parent') {
            res.redirect('/parent');
        } else {
            res.redirect('/login');
        }
    });

    app.get('/attendance', loggedIn, function(req, res) {
        res.render('parent/attendance.ejs', {
            message: req.flash('appMessage')
        });
    });

    app.get('/parent', allowParents, function(req, res) {
        res.render('parent/index.ejs', {
            user: req.user,
            message: req.flash('appMessage')
        });
    });

    app.get('/parent/record', allowParents, function(req, res) {
        res.render('parent/record.ejs', {
            user: req.user,
            message: req.flash('recordMessage')
        });
    });

    app.get('/currentStudentStatus', allowParents, function(req, res) {
        databaseQuery.currentStudentStatus(req.body.studentID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/getParentStudents', allowParents, function(req, res) {
        databaseQuery.getParentStudents(req.user.id)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/teacherCurrentClassStatus', loggedIn, function(req, res) {
        databaseQuery.teacherCurrentClassStatus(req.user.id)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });


    app.get('/teacher', allowTeachers, function(req, res) {
        res.render('teacher/index.ejs', {
            user: req.user,
            message: req.flash('appMessage')
        });
    });

    app.get('/teacher/attendance', allowTeachers, function(req, res) {
        res.render('teacher/attendance.ejs', {
            user: req.user,
            message: req.flash('atattendanceMessage')
        });
    });


    app.post('/teacherTimetable', loggedIn, function(req, res) {
        let data;
        if (Object.keys(req.body).length === 0 || !req.body.ID) {
            data = req.user.id;
        } else {
            data = req.body.ID;
        }
        databaseQuery.teacherTimetable(data)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/studentTimetable', loggedIn, function(req, res) {
        databaseQuery.studentTimetable(req.body.ID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/getBarChartDetails', loggedIn, function(req, res) {
        databaseQuery.getBarChartDetails(req.body.id)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });
    app.post('/parentGraphRequest', function(req, res) {
        console.log(req.body);
        databaseQuery.parentGraphRequest(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/absenceAllYears', loggedIn, function(req, res) {
        databaseQuery.absenceAllYears()
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/mostPopularTruenters', loggedIn, function(req, res) {
        databaseQuery.mostPopularTruenters()
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/totalStudents', loggedIn, function(req, res) {
        databaseQuery.totalStudents()
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/teacherTodayClasses', loggedIn, function(req, res) {
      databaseQuery.teacherTodayClasses(req.user.id)
          .then(function(data) {
              res.send(data);
          })
          .catch(function(e) {
              res.status(500, {
                  error: e
              });
          });
    });


    app.get('/absencesPerSubject', loggedIn, function(req, res) {
        databaseQuery.absencesPerSubject()
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/getRadarChartDetails', loggedIn, function(req, res) {
        databaseQuery.getRadarChartDetails(req.body.id)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/studentTodayAttendance', loggedIn, function(req, res) {
        console.log(" day were here");
        databaseQuery.studentTodayAttendance(req.body.id)
            .then(function(data) {
                console.log(data);
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/studentWeekAttendance', loggedIn, function(req, res) {
        console.log(" week were here");
        databaseQuery.studentWeekAttendance(req.body.id)
            .then(function(data) {
                console.log(data);
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/studentMonthAttendance', loggedIn, function(req, res) {
        console.log("month were here");
        databaseQuery.studentMonthAttendance(req.body.id)
            .then(function(data) {
                console.log(data);
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/studentt/:id', loggedIn, function(req, res) {
      let studentID = req.params.id;
      databaseQuery.getIndividualStudent(studentID)
          .then(function(data) {
              res.send(data);
          })
          .catch(function(e) {
              res.status(500, {
                  error: e
              });
          });
    });

    app.get('/student/:id', loggedIn, function(req, res) {
        let studentID = req.params.id;
        databaseQuery.getStudentProfile(studentID)
            .then(function(data) {
                console.log(req.user);
                res.render('teacher/student.ejs', {
                    user: req.user,
                    message: req.flash('user'),
                    studentID: data[0].Student_ID,
                    studentName: data[0].Student_Name,
                    studentYear: data[0].Student_Year,
                    studentEmail: data[0].Student_Email,
                    studentUsername: data[0].Student_Username,
                    parentName: data[0].Parent_Name,
                    parentID: data[0].Parent_ID
                });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/parent/:id', loggedIn, function(req, res) {
        let parentID = req.params.id;
        databaseQuery.getIndividualParent(parentID)
            .then(function(data) {
              res.render('teacher/parent.ejs', {
                  user: req.user,
                  message: req.flash('user'),
                  parentID: data[0].Parent_ID
              });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/parent/:id/contact', loggedIn, function(req, res) {
        let parentID = req.params.id;
        databaseQuery.getIndividualParent(parentID)
            .then(function(data) {
              res.render('contact.ejs', {
                  user: req.user,
                  message: req.flash('user'),
                  contactEmail: data[0].Parent_Email,
                  contactNumber: data[0].Parent_Mobile_Number,
                  contactName: data[0].Parent_Title + " ".concat(data[0].Parent_Fname) + " ".concat(data[0].Parent_Lname)
                  //parentID: data[0].Parent_ID
              });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });


    app.get('/parent/:id/contact', loggedIn, function(req, res) {
        let parentID = req.params.id;
        databaseQuery.getIndividualParent(parentID)
            .then(function(data) {
              res.render('teacher/parent.ejs', {
                  user: req.user,
                  message: req.flash('user'),
                  parentID: data[0].Parent_ID
              });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/student/:id/attendance', loggedIn, function(req, res) {
        let studentID = req.params.id;
        databaseQuery.getStudentProfile(studentID)
            .then(function(data) {
                console.log(data);
                res.render('parent/attendance.ejs', {
                    message: req.flash('user'),
                    studentID: data[0].Student_ID,
                    studentName: data[0].Student_Name,
                    user: req.user,
                });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.patch('/student/:id', loggedIn, function(req, res) {
        let studentID       = req.params.id;
        let studentObject   = req.body;
        let StudentTitle    = req.body.StudentTitle;
        let StudentFName    = req.body.StudentFName;
        let StudentLName    = req.body.StudentLName;
        let StudentEmail    = req.body.StudentEmail;
        let StudentYear     = req.body.StudentYear;
        let StudentUsername = req.body.StudentUsername;
        console.log(studentObject);
        databaseQuery.updateStudent(StudentTitle, StudentFName, StudentLName, StudentEmail, StudentYear, StudentUsername, studentID, studentObject)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.delete('/student/:id', loggedIn, function(req, res) {
        let studentID = req.params.id;
        databaseQuery.deleteStudent(studentID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/teacher/:id', loggedIn, function(req, res) {
        let teacherID = req.params.id;
        databaseQuery.getTeacherProfile(teacherID)
            .then(function(data) {
                console.log(data);
                res.render('teacher/teacher.ejs', {
                    user: req.user,
                    message: req.flash('user'),
                    teacherID: data[0].Teacher_ID,
                    teacherName: data[0].Teacher_Name,
                    teacherNumber: data[0].Teacher_Number,
                    teacherEmail: data[0].Teacher_Email,
                    teacherUsername: data[0].Teacher_Username
                });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    //THIS IS SUCH A BAD HACK FIND ANOTHER WAY AROUND IT
    app.get('/teacherr/:id', loggedIn, function(req, res) {
      let teacherID = req.params.id;
      databaseQuery.getIndividualTeacher(teacherID)
          .then(function(data) {
              res.send(data);
          })
          .catch(function(e) {
              res.status(500, {
                  error: e
              });
          });
    });

    app.patch('/teacher/:id', loggedIn, function(req, res) {
        let teacherID = req.params.id;
        let teacherTitle = req.body.TeacherTitle;
        let teacherFname = req.body.TeacherFName;
        let teacherLname = req.body.TeacherLName;
        let teacherEmail = req.body.TeacherEmail;
        let teacherMobile = req.body.TeacherMobile;
        let teacherUsername= req.body.TeacherUsername;
        databaseQuery.updateTeacher(teacherTitle, teacherFname, teacherLname, teacherEmail, teacherMobile, teacherUsername, teacherID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.delete('/teacher/:id', loggedIn, function(req, res) {
        let teacherID = req.params.id;
        databaseQuery.deleteTeacher(teacherID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/class/:id', loggedIn, function(req, res) {
        let classID = req.params.id;
        databaseQuery.getIndividualClass(classID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.patch('/class/:id', loggedIn, function(req, res) {
        let classID = req.params.id;
        let classObject = req.body;
        let Class_Level = req.body.Class_Level;
        let Class_Start_Timestamp = req.body.Class_Start_Timestamp;
        let Class_End_Timestamp = req.body.Class_End_Timestamp;
        let Subject_ID = req.body.Subject_ID;
        let Room_ID = req.body.Room_ID;
        let Teacher_ID = req.body.Teacher_ID;

        databaseQuery.updateClass(Class_Level, Class_Start_Timestamp, Class_End_Timestamp, Subject_ID, Room_ID, Teacher_ID, classID, classObject)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.delete('/class/:id', loggedIn, function(req, res) {
        let ClassID = req.params.id;
        databaseQuery.deleteClass(ClassID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/parentt/:id', loggedIn, function(req, res) {
      let parentID = req.params.id;
      databaseQuery.getIndividualParent(parentID)
          .then(function(data) {
              res.send(data);
          })
          .catch(function(e) {
              res.status(500, {
                  error: e
              });
          });
    });

    app.patch('/parent/:id', loggedIn, function(req, res) {
        let parentID        = req.params.id;
        let parentObject    = req.body;
        let ParentTitle     = req.body.ParentTitle;
        let ParentFName     = req.body.ParentFName;
        let ParentLName     = req.body.ParentLName;
        let ParentEmail     = req.body.ParentEmail;
        let ParentMobile    = req.body.ParentMobile;
        let ParentHome      = req.body.ParentHome;
        let ParentAddress   = req.body.ParentAddress;
        let ParentUsername  = req.body.ParentUsername;

        databaseQuery.updateParent(ParentTitle, ParentFName, ParentLName, ParentEmail, ParentMobile, ParentHome, ParentAddress, ParentUsername, parentID, parentObject)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.delete('/parent/:id', loggedIn, function(req, res) {
        let parentID = req.params.id;
        databaseQuery.deleteParent(parentID)
            .then(function(data) {
              console.log("Routes: ", data);
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/subject/:id', loggedIn, function(req, res) {
        let subjectID = req.params.id;
        databaseQuery.getIndividualSubject(subjectID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.patch('/subject/:id', loggedIn, function(req, res) {
        let subjectID = req.params.id;
        let subjectName = req.body.Subject_Name;
        let subjectDescription = req.body.Subject_Description;

        databaseQuery.updateSubject(subjectName, subjectDescription, subjectID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.delete('/subject/:id', loggedIn, function(req, res) {
        let subjectID = req.params.id;
        databaseQuery.deleteSubject(subjectID)
            .then(function(data) {
              console.log("Routes: ", data);
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/room/:id', loggedIn, function(req, res) {
        let roomID = req.params.id;

        databaseQuery.getIndividualRoom(roomID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.patch('/room/:id', loggedIn, function(req, res) {
        let roomID = req.params.id;
        let roomName = req.body.Room_Name;
        let roomDescription = req.body.Rom_Description;

        databaseQuery.updateRoom(roomName, roomDescription, roomID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.delete('/room/:id', loggedIn, function(req, res) {
        let roomID = req.params.id;
        databaseQuery.deleteRoom(roomID)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/admin', allowAdmins, function(req, res) {
        res.render('admin/admin.ejs', {
            message: req.flash('appMessage')
        });
    });

    app.get('/admin/parent', allowAdmins, function(req, res) {
        res.render('admin/parent.ejs', {
            user: req.user,
            message: req.flash('parentMessage')
        });
    });

    app.get('/admin/teacher', allowAdmins, function(req, res) {
        res.render('admin/teacher.ejs', {
            user: req.user,
            message: req.flash('teahcerMessage')
        });
    });

    app.get('/admin/pupil', allowAdmins, function(req, res) {
        res.render('admin/pupil.ejs', {
            user: req.user,
            message: req.flash('pupilMessage')
        });
    });

    app.get('/admin/room', allowAdmins, function(req, res) {
        res.render('admin/room.ejs', {
            user: req.user,
            message: req.flash('roomMessage')
        });
    });

    app.get('/admin/subject', allowAdmins, function(req, res) {
        res.render('admin/subject.ejs', {
            user: req.user,
            message: req.flash('subjectMessage')
        });
    });

    app.get('/admin/class', allowAdmins, function(req, res) {
        res.render('admin/class.ejs', {
            user: req.user,
            message: req.flash('profileMessage') // get the user out of session and pass to template
        });
    });

    app.get('/admin/profile', allowAdmins, function(req, res) {
        res.render('admin/profile.ejs', {
            user: req.user,
            message: req.flash('profileMessage')
        });
    });

    app.get('/admin/update', allowAdmins, function(req, res) {
        res.render('admin/update.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });


    app.get('/getParent', loggedIn, function(req, res) {
      console.log(req);
        databaseQuery.getParent(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });


    app.get('/getStudent', loggedIn, function(req, res) {
            databaseQuery.getStudent(req.user.role, req.user.id)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/getStudentParentSide', loggedIn, function(req, res) {
        databaseQuery.getStudentParentSide(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/getTeacher', loggedIn, function(req, res) {
        databaseQuery.getTeacher(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/getClass', loggedIn, function(req, res) {
        databaseQuery.getClass(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/getRoom', loggedIn, function(req, res) {
        databaseQuery.getRoom(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/getSubject', loggedIn, function(req, res) {
        databaseQuery.getSubject(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });



    app.post('/takeAttendance', loggedIn, function(req, res) {
        databaseQuery.takeAttendance(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/getClassStudent', loggedIn, function(req, res) {
        //Add the Teahcer ID to the JSON Object to get specifc students;
        req.body.teacherID = req.user.id;
        databaseQuery.addClassStudent(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/class', loggedIn, function(req, res) {
        databaseQuery.addClass(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/room', loggedIn, function(req, res) {
        databaseQuery.addRoom(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/subject', loggedIn, function(req, res) {
        databaseQuery.addSubject(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.post('/contact', loggedIn, function(req, res) {
      console.log(req.body);
      if(req.body.contactMethod ==='Email'){
          const email = new sendgridClient.Email();

              email.addTo(req.body.recipientEmail);
              email.setFrom('admin@schooltool.com');
              email.setSubject('Message From School');
              email.setHtml(`<p>${req.body.message}<p>`);

          sendgridClient.send(email, function(err, json) {
              if(err){
                console.log(err);
              }else{
              console.log("About to go back to front end.....");
              res.send(json);
            }
           });
      }
      else if(req.body.contactMethod ==='Text'){
        twilioClient.sendMessage({

            to:`${req.body.recipientNumber}`, // Any number Twilio can deliver to
            from: '+441143599282', // A number you bought from Twilio and can use for outbound communication
            body: `${req.body.message}` // body of the SMS message

        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) {
              res.send(responseData);
            }
            else{
              console.log(err);
            }
          });
      }

      else{
        res.send("ERROR");
      }
    });


    app.post('/pupil', loggedIn, function(req, res) {
        //Store the unhashed password in a variable
        let unhashedPassword = req.body.Student_Password;
        //Hash the users password
        bcrypt.hash(unhashedPassword, null, null, function(err, hash) {
            //If there is a problem with hashing send me a message
            if (err) {
                return err;
            }
            //Chnage the value in the object to the new password
            req.body.Student_Password = hash;
            databaseQuery.addStudent(req.body).then(function(data) {
                    res.send(data);
                })
                .catch(function(e) {
                    res.status(500, {
                        error: e
                    });
                });
        });
    });

    app.post('/teacher', loggedIn, function(req, res) {
        //Store the unhashed password in a variable
        let unhashedPassword = req.body.Teacher_Password;
        //Hash the users password
        bcrypt.hash(unhashedPassword, null, null, function(err, hash) {
            //If there is a problem with hashing send me a message
            if (err) {
                return err;
            }
            //Chnage the value in the object to the new password
            req.body.Teacher_Password = hash;
            databaseQuery.addTeacher(req.body).then(function(data) {
                    res.send(data);
                })
                .catch(function(e) {
                    res.status(500, {
                        error: e
                    });
                });
        });
    });


    app.post('/parent', loggedIn, function(req, res) {
        //Store the unhashed password in a variable
        let unhashedPassword = req.body.Parent_Password;
        //Hash the users password
        bcrypt.hash(unhashedPassword, null, null, function(err, hash) {
            //If there is a problem with hashing send me a message
            if (err) {
                return err;
            }
            //Chnage the value in the object to the new password
            req.body.Parent_Password = hash;
            databaseQuery.addParent(req.body).then(function(data) {
                    res.send(data);
                })
                .catch(function(e) {
                    res.status(500, {
                        error: e
                    });
                });
        });
    });

    app.post('/update', loggedIn, function(req, res) {

        //Declare vars
        let email, username, id;
        //Get the information sent through by the profile page and store it in our variables
        email = req.body.email;
        username = req.body.username;
        id = req.user.id;

        //Run the function that goes to config/database.js to update the users settings
        databaseQuery.updateProfile(email, username, id);

        //This is the new information about the user
        let user = {
            id: req.user.id,
            name: req.user.name,
            email: email,
            username: username,
            password: req.user.password,
            privlidge: req.user.privlidge,
            role: req.user.role
        };

        //Have to re-log the user in to update the users information in session.
        req.logIn(user, function() {
            req.session.save(function() {
                res.redirect('/admin/profile');
            });
        });

        req.flash('profileMessage', 'You have successfully updated your profile');
        res.redirect('/admin/profile');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

//Allow Admin to view only Admin URI's
function allowAdmins(req, res, next) {
    if (!req.user) {
        req.flash('loginMessage', "Something went wrong, re-login please");
        res.redirect('/login');
    } else if (req.user.role === 'Admin') {
        return next();
    } else {
        req.flash('loginMessage', "Naughty, Naughty your not an admin!");
        res.redirect('/login');
    }
}
//Allow Teachers to view only Teachers URI's
function allowTeachers(req, res, next) {
    if (!req.user) {
        req.flash('loginMessage', "Something went wrong, re-login please");
        res.redirect('/login');
    } else if (req.user.role === 'Teacher') {
        return next();
    } else {
        req.flash('loginMessage', "Naughty, Naughty your not an Teacher!");
        res.redirect('/login');
    }
}
//Allow Parents to view only Parents URI's
function allowParents(req, res, next) {
    if (!req.user) {
        req.flash('loginMessage', "Something went wrong, re-login please");
        res.redirect('/login');
    } else if (req.user.role === 'Parent') {
        return next();
    } else {
        req.flash('loginMessage', "Naughty, Naughty your not an Teacher!");
        res.redirect('/login');
    }
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        req.flash('loginMessage', "You need to be logged in to access this area!");
        res.redirect('/login');
    }
}
