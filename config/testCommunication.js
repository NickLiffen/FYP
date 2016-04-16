"use strict";
const dotenv = require('dotenv');
dotenv.load();
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
const email = new sendgrid.Email();
//Send an SMS text message
function testCommunication(){
  let errors = 0;
client.sendMessage({
    to: '+447981691495',
    from: '+441143599282',
    body: 'Text Successfully Sent.'

}, function(err, responseData) {
    if (err) {
      errors++;
        console.log(err);
    }
    if (responseData) {
        console.log("Text Successfully Sent");
        console.log(responseData.from);
        console.log(responseData.body);
    }

});
//Send an Email
email.addTo('UP653591@myport.ac.uk');
email.setFrom('noreply@schooltool.com');
email.setSubject('Nick Liffen is in trouble');
email.setHtml('<h1>Email Successfully Sent.</h1>');
sendgrid.send(email, function(err, json) {
    if (err) {
      errors++;
        console.log(err);
    }
    if (json) {
        console.log("Email Successfully Sent");
        console.log(json);
    }
});
if(errors > 0){
  console.log("Testing Broke. Check Above Errors to confirm");
}
}
window.onLoad = testCommunication();
