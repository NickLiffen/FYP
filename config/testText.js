"use strict";
var dotenv  = require('dotenv');
dotenv.load();
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

//Send an SMS text message
client.sendMessage({

    to:'+447981691495', // Any number Twilio can deliver to
    from: '+441143599282', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
});
