'use strict';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
// expose this function to our app using module.exports
module.exports = function(passport, connection) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    //Find a user in our database that corresponds to the users information inputted in the login form
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            //Firstly check if our user is an admin
            checkAdmin(req, username, password, done);
        }));

    function checkAdmin(req, username, password, done) {
        connection.query({
                sql: '(SELECT * FROM `Admin` WHERE `Admin_Username` = ? OR `Admin_email` = ?)',
            }, [username, username],
            function(error, results) {
                if (error) {
                    throw error;
                }
                //This checks if there is any results found from the above query.
                if(typeof results === 'undefined' || results.length < 1) {
                  //If nothing is found check if the user is a teacher.
                    checkTeacher(req, username, password, done);
                }
                else{
                //Concatination of the Users Name
                let title = results[0].Admin_Title;
                let fName = results[0].Admin_Fname;
                let lName = results[0].Admin_Lname;
                let concatName = title + " ".concat(fName) + " ".concat(lName);

                //Information brought back from the SQL query and going to be stored in the Passport Session.
                var user = {
                    id: results[0].Admin_ID,
                    name: concatName,
                    email: results[0].Admin_Email,
                    username: results[0].Admin_Username,
                    password: results[0].Admin_Password,
                    role: results[0].Role
                };

                //Compare users password to the password in the database
                bcrypt.compare(password, user.password, function(err, res) {
                    //If ther is an error with the hashing it will appear here
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    //If password hashed okay carry on.
                    if (res === true) {
                        return done(null, user);
                    }
                    //If the password didnt match the return an eror the to user
                    else {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                });
              }
            });

    }

    function checkTeacher(req, username, password, done) {
        connection.query({
                sql: '(SELECT * FROM `Teacher` WHERE `Teacher_Username` = ? OR `Teacher_email` = ?)',
            }, [username, username],
            function(error, results) {
                if (error) {
                    throw error;
                }

                if (typeof results === 'undefined' || results.length < 1) {
                    checkParent(req, username, password, done);
                }
                else{
                //Concatination of the Users Name
                let title = results[0].Teacher_Title;
                let fName = results[0].Teacher_Fname;
                let lName = results[0].Teacher_Lname;
                let concatName = title + " ".concat(fName) + " ".concat(lName);

                //Information brought back from the SQL query and going to be stored in the Passport Session.
                var user = {
                    id: results[0].Teacher_ID,
                    name: concatName,
                    email: results[0].Teacher_Email,
                    username: results[0].Teacher_Username,
                    password: results[0].Teacher_Password,
                    role: results[0].Role
                };

                //Compare users password to the password in the database
                bcrypt.compare(password, user.password, function(err, res) {
                    //If ther is an error with the hashing it will appear here
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    //If password hashed okay carry on.
                    if (res === true) {
                      return done(null, user);
                    }
                    //If the password didnt match the return an eror the to user
                    else {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                });
              }
            });
    }

    function checkParent(req, username, password, done) {
        connection.query({
                sql: '(SELECT * FROM `Parent` WHERE `Parent_Username` = ? OR `Parent_email` = ?)',
            }, [username, username],
            function(error, results) {
                if (error) {
                    throw error;
                }
                if (typeof results === 'undefined' || results.length < 1) {
                    return done(null, false, req.flash('loginMessage', 'No Record, Try Again'));
                }
                //Concatination of the Users Name
                let title = results[0].Parent_Title;
                let fName = results[0].Parent_Fname;
                let lName = results[0].Parent_Lname;
                let concatName = title + " ".concat(fName) + " ".concat(lName);

                //Information brought back from the SQL query and going to be stored in the Passport Session.
                var user = {
                    id: results[0].Parent_ID,
                    name: concatName,
                    email: results[0].Parent_Email,
                    username: results[0].Parent_Username,
                    password: results[0].Parent_Password,
                    role: results[0].Role
                };

                //Compare users password to the password in the database
                bcrypt.compare(password, user.password, function(err, res) {
                    //If ther is an error with the hashing it will appear here
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    //If password hashed okay carry on.
                    if (res === true) {
                        return done(null, user);
                    }
                    //If the password didnt match the return an eror the to user
                    else {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                });
            });
    }

};
