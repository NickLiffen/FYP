"use strict";

$(document).ready(function() {
    //Playing around with the Calender API
    $('#calendar').fullCalendar({
        weekends: false,
        height: 500,
        dayClick: function() {
          console.log("A date has been clicked");
        }
    });

});
