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
                    resolve();
                }
            });
        });
    },

    getParent: function() {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            //Query to get parent information to put into the select box.
            connection.query('SELECT Parent_ID, Parent_Title, Parent_Fname, Parent_Lname FROM Parent', function(err, results) {
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
        connection.query('SELECT Student_ID, Student_Title, Student_Fname, Student_Lname, Student_Email, Student_Year FROM Student', function(err, results) {
            //If error reject the promise.
            if (err) {
                reject(Error(err));
            } else {
                resolve(results);
            }
        });
      });
    }
};
