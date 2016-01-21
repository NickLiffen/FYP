"use strict";

$(document).ready(function() {

    //Onclick of the Add Student Bottom show the Add Student Form.
    $('#addStudent').click(function() {
        $('.hideAddStudentForm').toggleClass('showAddStudentForm');
    });

    //Onclick of the View Student Bottom show the Student List.
    $('#viewStudent').click(function() {
        $('.hideViewStudentList').toggleClass('showViewStudentList');
    });

    //AJAX function to go and collect information about all pupils.
    $.ajax({
      type: 'GET',
      url: '/getStudent',
      dataType: 'JSON'
    }).done(function(response){
      console.log(response);

      let tableContent = '';

      $.each(response, function(){

          let title = this.Student_Title;
          let fName = this.Student_Fname;
          let lName = this.Student_Lname;
          let concatName = title + " ".concat(fName) + " ".concat(lName);

          tableContent += '<tr>';
          tableContent += '<th><span rel="' + this.Student_ID + '" id="' + this.Student_ID + '" scope="row"">' + this.Student_ID + '</th>';
          tableContent += '<td>' + concatName + '</td>';
          tableContent += '<td>' + this.Student_Email + '</td>';
          tableContent += '<td>' + this.Student_Year + '</td>';
          tableContent += '<td><button type="button" id="' + this.Student_ID + '" class="btn btn-success">Profile</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#studentList table tbody').html(tableContent);
    });



    //Load Parents into the input feild
    $.ajax({
        type: 'GET',
        url: '/getParent',
        dataType: 'JSON'
    }).done(function(response) {
        //Loop through all the results and put them into the select box
        $.each(response, function(i, d) {
            //Concatination of the Users Name
            let title = d.Parent_Title;
            let fName = d.Parent_Fname;
            let lName = d.Parent_Lname;
            let concatName = title + " ".concat(fName) + " ".concat(lName);
            //Append results to the select box.
            $('#parentPicker').append('<option value="' + d.Parent_ID + '">' + concatName + '</option>');
        });
    });

    $('#addStudentForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newStudent;

        //Creating the new student object will all information from the form
        newStudent = {
            Student_Title: $('#addStudentForm input#studentTitle').val(),
            Student_Fname: $('#addStudentForm input#studentFName').val(),
            Student_Lname: $('#addStudentForm input#studentLName').val(),
            Student_Email: $('#addStudentForm input#studentEmail').val(),
            Student_Year: $('#addStudentForm input#studentYear').val(),
            Student_Username: $('#addStudentForm input#studentUsername').val(),
            Student_Password: $('#addStudentForm input#studentPassword').val(),
            Role: "Student"
        };

        //Get Values from the add parents option
        let parentPickerValues = $('#parentPicker').val();
        console.log(parentPickerValues);

        //Checks the value of the object, if no parents assigned don't add it to the newStudent Object
        if (parentPickerValues.indexOf("0") > -1) {
            console.log("No Parent Assigned ATM");
        } else {
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
