//Require the SendGrid package.
var sendgridClient  = require('sendgrid')(process.env.SENDGRID_API_KEY);
//Make it avaible to my whole application
module.exports = sendgridClient;
