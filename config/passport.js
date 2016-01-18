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

    //Loging in using Passport
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            //MySQL Query to handle query for logging in.
            connection.query({
                    sql: '(SELECT * FROM `Admin` WHERE `Admin_Username` = ? OR `Admin_email` = ?)',
                }, [username, username],
                function(error, results) {
                    //If error with SQL Query throw error to console
                    if (error) {
                        throw error;
                    }
                    //If there was no user found if enters the following statment
                    if (typeof results === 'undefined' || results.length < 1) {
                        return done(null, false, req.flash('loginMessage', 'Could not find any user with that email or username'));
                    }

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
                        privlidge: results[0].Admin_Privledge_Level,
                        role: results[0].Role
                    };

                    //Compare users password to the password in the database
                    bcrypt.compare(password, user.password, function(err, res) {
                        //If ther is an error with the hashing it will appear here
                        if (err) {
                            throw error;
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
        }));
};
