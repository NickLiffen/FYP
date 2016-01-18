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
  //Deletes the users profile :(
  deleteProfile: function() {

  }
};
