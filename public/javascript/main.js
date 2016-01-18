"use strict";

$(document).ready(function() {

    $('#calendar').fullCalendar({
        weekends: false,
        height: 500,
        dayClick: function() {
          console.log("A date has been clicked");
        }
    });

});
