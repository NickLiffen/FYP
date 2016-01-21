"use strict";

$(document).ready(function() {

  //Load Parents into the input feild
  $.ajax({
        type: 'GET',
        url: '/getParent',
        dataType: 'JSON'
    }).done(function(response) {

      $.each(response, function(i, d) {

        //Concatination of the Users Name
        let title = d.Parent_Title;
        let fName = d.Parent_Fname;
        let lName = d.Parent_Lname;
        let concatName = title + " ".concat(fName) + " ".concat(lName);

        $('#parentPicker').append('<option value="' + d.Parent_ID + '">' + concatName + '</option>');
            });
    });


    //Playing around with the Calender API
    $('#calendar').fullCalendar({
        weekends: false,
        height: 500,
        dayClick: function() {
          console.log("A date has been clicked");
        }
    });

    //Onclick of the Add Student Bottom show the Add Student Form.
    $('#addStudent').click(function() {
      $('.hideAddStudentForm').toggleClass('showAddStudentForm');
    });

    //Onclick of the View Student Bottom show the Student List.
    $('#viewStudent').click(function() {
      $('.hideViewStudentList').toggleClass('showViewStudentList');
    });

    $('#addStudentForm').submit(function(){
      //Stop the Form from submiting automatically
      event.preventDefault();
      //Declaring varibales
      let newStudent;

      //Creating the new student object will all information from the form
      newStudent = {
        Student_Title   :     $('#addStudentForm input#studentTitle').val(),
        Student_Fname   :     $('#addStudentForm input#studentFName').val(),
        Student_Lname   :     $('#addStudentForm input#studentLName').val(),
        Student_Email   :     $('#addStudentForm input#studentEmail').val(),
        Student_Year    :     $('#addStudentForm input#studentYear').val(),
        Student_Username:     $('#addStudentForm input#studentUsername').val(),
        Student_Password:     $('#addStudentForm input#studentPassword').val(),
        Role: "Student"
      };

      //Get Values from the add parents option
      let parentPickerValues = $('#parentPicker').val();
      console.log(parentPickerValues);

      //Checks the value of the object, if no parents assigned don't add it to the newStudent Object
      if(parentPickerValues.indexOf("0") > -1){
        console.log("No Parent Assigned ATM");
      }
      else{
        //As there is a parent assigned i am adding it to the newStudent Object
        newStudent.Parent = parentPickerValues;
      }

      //Send off the AJAX Request to the /pupil route
      $.ajax({
            type: 'POST',
            data: newStudent,
            url: '/pupil',
            dataType: 'JSON'
        }).done(function(response) {
              //Do nothing for the time being
              console.log(response);
        });
      });
});
