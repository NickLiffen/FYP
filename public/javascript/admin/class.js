"use strict";

$(document).ready(function() {

    //Onclick of the Add Class Bottom show the Add Class Form.
    $('#addClass').click(function() {
        $('.hideAddClassForm').toggleClass('showAddClassForm');
    });

    //Onclick of the View Class Bottom show the Class List.
    $('#viewClass').click(function() {
        $('.hideViewClassList').toggleClass('showViewClassList');
    });

    //AJAX function to go and collect information about all classes.
    $.ajax({
      type: 'GET',
      url: '/getClass',
      dataType: 'JSON'
    }).done(function(response){
      console.log(response);

      let tableContent = '';

      $.each(response, function(){

      let title = this.Teacher_Title;
      let fName = this.Teacher_Fname;
      let lName = this.Teacher_Lname;
      let concatName = title + " ".concat(fName) + " ".concat(lName);

      let date      =   this.Class_Start_Timestamp;
      let endTime   =   this.Class_End_Timestamp;

      let newDate = moment(date).format('DD-MM-YYYY');
      let newStartTime = moment(date).format('HH:mm');
      let newEndTime = moment(endTime).format('HH:mm');

          tableContent += '<tr>';
          tableContent += '<th><span rel="' + this.Class_ID + '" id="' + this.Class_ID + '" scope="row"">' + this.Class_ID + '</th>';
          tableContent += '<td>' + this.Class_Level + '</td>';
          tableContent += '<td>' + newDate + '</td>';
          tableContent += '<td>' + newStartTime + '</td>';
          tableContent += '<td>' + newEndTime + '</td>';
          tableContent += '<td>' + this.Subject_Name + '</td>';
          tableContent += '<td>' + this.Room_Name + '</td>';
          tableContent += '<td>' + concatName + '</td>';
          tableContent += '<td><button type="button" id="' + this.Class_ID + '" value="Profile" class="btn btn-primary">Profile</button></td>';
          tableContent += '<td><button type="button" id="' + this.Class_ID + '" value="Update" class="btn btn-success">Update</button></td>';
          tableContent += '<td><button type="button" id="' + this.Class_ID + '" value="Delete" class="btn btn-warning" data-toggle="modal" data-target="#confirm-delete" >Delete</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#ClassList table tbody').html(tableContent);
    });

    $('#ClassList').on('click', '.btn ', function(){
      let ClassID = this.id;
      let buttonValue = $(this).attr("value");


      if(buttonValue === "Profile"){
        console.log("Im in Profile");
      }
      else if(buttonValue === "Update"){
          console.log("Im in Update");
      }
      else if(buttonValue === "Delete"){
           $('#confirm-delete').on('show.bs.modal', function() {
             $('.debug-url').html("");
             $("#confirmDelete").click(function(){
               $.ajax({
                        url: `/class/${ClassID}`,
                        type: 'DELETE',
                        success: function(result) {
                          console.log(result);
                  }
                });
              });
           });
      }
      else{
        console.log("Theres a Problem");
      }

    });


    //Load Teacher into the input feild - to assign a teacher to a class
    $.ajax({
        type: 'GET',
        url: '/getTeacher',
        dataType: 'JSON'
    }).done(function(response) {
        //Loop through all the results and put them into the select box
        $.each(response, function(i, d) {
            //Concatination of the Users Name
            let title = d.Teacher_Title;
            let fName = d.Teacher_Fname;
            let lName = d.Teacher_Lname;
            let concatName = title + " ".concat(fName) + " ".concat(lName);
            //Append results to the select box.
            $('#teacherPicker').append('<option value="' + d.Teacher_ID + '">' + concatName + '</option>');
        });
    });

    //Load Students into the input feild -  to assign students to a class
    $.ajax({
        type: 'GET',
        url: '/getStudent',
        dataType: 'JSON'
    }).done(function(response) {
        //Loop through all the results and put them into the select box
        $.each(response, function(i, d) {
            //Concatination of the Users Name
            let title = d.Student_Title;
            let fName = d.Student_Fname;
            let lName = d.Student_Lname;
            let concatName = title + " ".concat(fName) + " ".concat(lName);
            //Append results to the select box.
            $('#studentPicker').append('<option value="' + d.Student_ID + '">' + concatName + '</option>');
        });
    });

    //Load Subject into the input feild -  to assign subject to a class
    $.ajax({
        type: 'GET',
        url: '/getSubject',
        dataType: 'JSON'
    }).done(function(response) {
        //Loop through all the results and put them into the select box
        $.each(response, function(i, d) {
            //Append results to the select box.
            $('#subjectPicker').append('<option value="' + d.Subject_ID + '">' + d.Subject_Name + '</option>');
        });
    });

    //Load Rooms into the input feild -  to assign Rooms to a class
    $.ajax({
        type: 'GET',
        url: '/getRoom',
        dataType: 'JSON'
    }).done(function(response) {
        //Loop through all the results and put them into the select box
        $.each(response, function(i, d) {
            //Append results to the select box.
            $('#roomPicker').append('<option value="' + d.Room_ID + '">' + d.Room_Name + '</option>');
        });
    });

    $('#addClassForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newClass, date, inputStartTime, inputEndTime, startTimestamp, endTimestamp;

        date = $('#addClassForm input#ClassDate').val();
        inputStartTime = $('#addClassForm input#ClassSTime').val();
        inputEndTime = $('#addClassForm input#ClassETime').val();

        date = date.split("/").reverse().join("-");

        startTimestamp = date + ' ' + inputStartTime;
        endTimestamp   = date + ' ' + inputEndTime;

        //Creating the new Class object will all information from the form
        newClass = {
            Class_Level:             $('#addClassForm input#ClassLevel').val(),
            Class_Start_Timestamp:   startTimestamp,
            Class_End_Timestamp:     endTimestamp,
            Subject_ID:              $('#subjectPicker').val(),
            Room_ID:                 $('#roomPicker').val(),
            Teacher_ID:              $('#teacherPicker').val(),
            Student:                 $('#studentPicker').val()
        };

        //Send off the AJAX Request to the /pupil route
        $.ajax({
            type: 'POST',
            data: newClass,
            url: '/class',
            dataType: 'JSON'
        }).done(function(response) {
          console.log("Were back!!" + response);
            $('#addClassstatus').html("Class Created Okay");
        });
    });
});
