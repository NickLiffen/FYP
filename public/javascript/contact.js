"use strict";
$(document).ready(function() {

$("#contactForm").submit(function(event) {
  let $btn, contactMethod, contactInformation;
    event.preventDefault();
      $btn = $(document.activeElement);
        contactMethod = $btn.attr("id");

    //Creating the new student object will all information from the form
    contactInformation = {
        message:          $('textarea#message').val(),
        recipientEmail:   $('p#email').text(),
        recipientNumber:  $('p#number').text(),
        recipientName:    $('p#name').text(),
        contactMethod: contactMethod
    };

    $.ajax({
        type: 'POST',
        data: contactInformation,
        url: '/contact',
        dataType: 'JSON'
    }).done(function(response) {
        console.log("were back front end", response);
      $('#contactState').addClass('alert alert-success');
      $('#contactState').addClass('center');
      $('#contactState').html(`Message Successfully Sent`);
    });


  });

});
