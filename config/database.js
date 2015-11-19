"use strict";
//Connection to the database
var connection = require('../config/connection.js');

module.exports = {
  //Function called from routes.js to update te users profile.
  updatProfile: function(email, number) {
    //Put the data to update in a JSON Object
     let updateData = {
            email: email,
            number: number
          };
          //Do a cheeky update query to my database to update the users profile.
          connection.query(" UPDATE User SET ? WHERE 'email' = 'email' ", updateData, function(err) {
              //If error with SQL Query throw error to console
              if (err){
                console.log(err);
                console.log("Can't update the users profile :(");
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
