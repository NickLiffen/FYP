"use strict";
//Connection to the database
var connection = require('../config/connection.js');

module.exports = {
  //Function called from routes.js to update te users profile.
  updateProfile: function(email, username, id) {
          //Do a cheeky update query to my database to update the users profile.
          connection.query('UPDATE Admin SET Admin_Email = ?, Admin_Username = ? WHERE Admin_ID = ?', [email, username, id], function(err){
              //If error with SQL Query throw error to console
              if (err){
                console.log("Problem Updating User's Profile: " + err);
                return err;
              }
              console.log("Updated the users profile successfully");
              return;
          });
        },

  //Function called from routes.js and adds a student to the database
  addStudent: function(newUser){

    connection.query('INSERT INTO Student SET ?', newUser, function(err) {
      //If error inserting student to database throw error.
      if (err){
        console.log("Problem Updating User's Profile: " + err);
        return err;
      }
      console.log("Added the Student successfully");
      return;
    });
  },

/*
  getParent: function(){
    //Query fired off to go collect parent information
    connection.query('SELECT Parent_ID, Parent_Title, Parent_Fname, Parent_Lname FROM Parent', function (err, results) {
      if (err){
        console.log("Couldn't get Parents: " + err);
        return err;
      }
      console.log(results);
      return results;
    });
  }*/

  getParent: function(){
    // Return a new promise.
  return new Promise(function(resolve, reject) {

    connection.query('SELECT Parent_ID, Parent_Title, Parent_Fname, Parent_Lname FROM Parent', function (err, results) {

      if (err){
        reject(Error(err));
      }
      else{
        console.log(results);
        resolve(results);
      }

        });
      });
    }
};
