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

    //Signup Using Passport
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                //MySQL Query to handle query for logging in.
                connection.query({
                        sql: 'SELECT email FROM `User` WHERE `email` = ?',
                    }, [email],
                    function(error, results) {
                        //If error with SQL Query throw error to console
                        if (error) {
                            throw error;
                        }
                        //Outputs data to the user saying that User already exisits
                        for (var i = 0; i < results.length; i++) {
                            var DBemail;
                            DBemail = results[i].email;
                            if (DBemail) {
                                return done(null, false, req.flash('signupMessage', 'Email Already Taken, Sorry.'));
                            }
                        }
                        //Adds information to the database as no user exisits
                        if (Object.keys(results).length === 0) {

                            var number = req.body.number;

                            bcrypt.hash(password, null, null, function(err, hash) {
                                //If there is a problem with the hash then it returns this error
                                if (err) {
                                    throw error;
                                }
                                //This is going to be stored in the databse
                                var Newuser = {
                                    email,
                                    password: hash,
                                        number
                                };
                                //SQL Query to insert the data to the database.
                                connection.query('INSERT INTO User SET ?', Newuser, function(err, res) {
                                    //If error with SQL Query throw error to console
                                    if (err) {
                                        throw err;
                                    }
                                    //This is the information stored in the session
                                    var user = {
                                        id: res.insertId,
                                        email: email,
                                        password: hash,
                                        number: number
                                    };
                                    return done(null, user);
                                });
                            });
                        }
                    });
            });
        }));

    //Loging in using Passport
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            //MySQL Query to handle query for logging in.
            connection.query({
                    sql: 'SELECT id, email, password, number FROM `User` WHERE `email` = ?',
                }, [email],
                function(error, results) {
                    //If error with SQL Query throw error to console
                    if (error) {
                        throw error;
                    }
                    //If there was no user found if enters the following statment
                    if (typeof results === 'undefined' || results.length < 1) {
                        console.log("error");
                        return done(null, false, req.flash('loginMessage', 'Could not find any user with that email'));
                    }
                    //Information brought back from the SQL query and stored in a JSON object.
                    var user = {
                        id: results[0].id,
                        email: results[0].email,
                        password: results[0].password,
                        number: results[0].number
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
