//Require the Twilio package.
var twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
//Make it avaible to my whole application
module.exports = twilioClient;
