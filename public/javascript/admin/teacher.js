"use strict";

$(document).ready(function() {

    //Onclick of the Add Teacher Bottom show the Add Teacher Form.
    $('#addTeacher').click(function() {
        $('.hideAddTeacherForm').toggleClass('showAddTeacherForm');
    });

    //Onclick of the View Teacher Bottom show the Teacher List.
    $('#viewTeacher').click(function() {
        $('.hideViewTeacherList').toggleClass('showViewTeacherList');
    });

    //AJAX function to go and collect information about all pupils.
    $.ajax({
      type: 'GET',
      url: '/getTeacher',
      dataType: 'JSON'
    }).done(function(response){
      console.log(response);

      let tableContent = '';

      $.each(response, function(){

          let title = this.Teacher_Title;
          let fName = this.Teacher_Fname;
          let lName = this.Teacher_Lname;
          let concatName = title + " ".concat(fName) + " ".concat(lName);

          tableContent += '<tr>';
          tableContent += '<th><span rel="' + this.Teacher_ID + '" id="' + this.Teacher_ID + '" scope="row"">' + this.Teacher_ID + '</th>';
          tableContent += '<td>' + concatName + '</td>';
          tableContent += '<td>' + this.Teacher_Email + '</td>';
          tableContent += '<td><button type="button" id="' + this.Teacher_ID + '" class="btn btn-success">Profile</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#TeacherList table tbody').html(tableContent);
    });

    //Load Parents into the input feild
    $.ajax({
        type: 'GET',
        url: '/getStudent',
        dataType: 'JSON'
    }).done(function(response) {
        //Loop through all the results and put them into the select box
        $.each(response, function(i, d) {
            //Concatination of the Users Name
            let title = d.Stuent_Title;
            let fName = d.Student_Fname;
            let lName = d.Student_Lname;
            let concatName = title + " ".concat(fName) + " ".concat(lName);
            //Append results to the select box.
            $('#studentPicker').append('<option value="' + d.Student_ID + '">' + concatName + '</option>');
        });
    });

    $('#addTeacherForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newTeacher;

        //Creating the new Teacher object will all information from the form
        newTeacher = {
            Teacher_Title: $('#addTeacherForm input#TeacherTitle').val(),
            Teacher_Fname: $('#addTeacherForm input#TeacherFName').val(),
            Teacher_Lname: $('#addTeacherForm input#TeacherLName').val(),
            Teacher_Email: $('#addTeacherForm input#TeacherEmail').val(),
            Teacher_Mobile_Number: $('#addTeacherForm input#TeacherMobileNumber').val(),
            Teacher_Username: $('#addTeacherForm input#TeacherUsername').val(),
            Teacher_Password: $('#addTeacherForm input#TeacherPassword').val(),
            Role: "Teacher"
        };

        //Send off the AJAX Request to the /pupil route
        $.ajax({
            type: 'POST',
            data: newTeacher,
            url: '/teacher',
            dataType: 'JSON'
        }).done(function() {
            $('#addTeacherstatus').html("Teacher Created Okay");
        });
    });
});
