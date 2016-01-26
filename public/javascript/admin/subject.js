"use strict";

$(document).ready(function() {

    //Onclick of the Add Subject Bottom show the Add Subject Form.
    $('#addSubject').click(function() {
        $('.hideAddSubjectForm').toggleClass('showAddSubjectForm');
    });

    //Onclick of the View Subject Bottom show the Subject List.
    $('#viewSubject').click(function() {
        $('.hideViewSubjectList').toggleClass('showViewSubjectList');
    });

    //AJAX function to go and collect information about all pupils.
    $.ajax({
      type: 'GET',
      url: '/getSubject',
      dataType: 'JSON'
    }).done(function(response){
      console.log(response);

      let tableContent = '';

      $.each(response, function(){

          tableContent += '<tr>';
          tableContent += '<th><span rel="' + this.Subject_ID + '" id="' + this.Subject_ID + '" scope="row"">' + this.Subject_ID + '</th>';
          tableContent += '<td>' + this.Subject_Name + '</td>';
          tableContent += '<td>' + this.Subject_Description + '</td>';
          tableContent += '<td><button type="button" id="' + this.Subject_ID + '" class="btn btn-success">Profile</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#SubjectList table tbody').html(tableContent);
    });

    $('#addSubjectForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newSubject;
        //Creating the new Subject object will all information from the form
        newSubject = {
            Subject_Name:         $('#addSubjectForm input#subjectName').val(),
            Subject_Description:  $('#addSubjectForm input#subjectDescription').val()
        };
        console.log(newSubject);
        //Send off the AJAX Request to the /pupil route
        $.ajax({
            type: 'POST',
            data: newSubject,
            url: '/subject',
            dataType: 'JSON'
        }).done(function() {
            $('#addSubjectstatus').html("Subject Created Okay");
        });
    });
});
