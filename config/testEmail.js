"use strict";
//Load the .env file from root directory.
var dotenv  = require('dotenv');
dotenv.load();
var sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);
var email     = new sendgrid.Email();
email.addTo('UP653591@myport.ac.uk');
email.setFrom('noreply@schooltool.com');
email.setSubject('Nick Liffen is in trouble');
email.setHtml('<h1>Some html</h1>');
sendgrid.send(email, function(err, json) {
if(err){
  console.log(err);
}
console.log(json);
 });
