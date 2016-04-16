"use strict";
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.load();
//Insert Credentials to Connect to our database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
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

function deleteDatabase(){
  const query = "Drop Database " + process.env.DB_DATABASE + ";";
  console.log(query);
  connection.query({
      sql: query,
      timeout: 10000,
  }, function(error) {
      if (error) {
          console.log(error);
      }
      console.log("Dropped Database Successfully!");
  });
}

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
    setTimeout(functions[i], timeout);
  }
}

executeAsynchronously(
  [connect, deleteDatabase], 5000);
