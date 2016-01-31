"use strict";
import mysql from 'mysql';

//Insert Credentials to Connect to our database
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE,
  port     : process.env.DB_PORT,
  multipleStatements: true
});

//Connect to our database
connection.connect(function(err) {
  if (err) {
    console.error('Error Connecting to Database becuase: ' + err.stack);
    return;
  }
  console.log('Connected to Database');
  console.log('Connected to Database using the following ID:  ' + connection.threadId);
});

//Making the connection avaiible to the application.
module.exports = connection;
