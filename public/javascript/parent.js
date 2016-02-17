"use strict";

$(document).ready(function() {

  let parentID = $('.parentID').attr('id');

  //Send off the AJAX Request to the /pupil route
  $.ajax({
      type: 'GET',
      url: `/parentt/${parentID}`,
      dataType: 'JSON'
  }).done(function(response) {
    console.log(response);
    let title = response[0].Parent_Title;
    let fName = response[0].Parent_Fname;
    let lName = response[0].Parent_Lname;
    let concatName = title + " ".concat(fName) + " ".concat(lName);
    console.log(concatName);
    $('#parentName').html(concatName);
    $('#parentNamee').html(concatName);
    $('#parentEmail').html(response[0].Parent_Email);
    $('#parentMNumber').html(response[0].Parent_Mobile_Number);
    $('#parentHNumber').html(response[0].Parent_Home_Number);
    $('#parentUsername').html(response[0].Parent_Username);
    $('#parentAddress').html(response[0].Parent_Address);

    let studentInfo = response.splice(1,response.length);

    $.each(studentInfo, function(i, d) {
        $('#currentStudent').append('<option value="' + d.Student_ID + '">' + d.Student_Name + '</option>');
    });
  });

});
