"use strict";

$(document).ready(function() {

    //Onclick of the Add Parent Bottom show the Add Parent Form.
    $('#addParent').click(function() {
        $('.hideAddParentForm').toggleClass('showAddParentForm');
    });

    //Onclick of the View Parent Bottom show the Parent List.
    $('#viewParent').click(function() {
        $('.hideViewParentList').toggleClass('showViewParentList');
    });

    //AJAX function to go and collect information about all parents.
    $.ajax({
      type: 'GET',
      url: '/getParent',
      dataType: 'JSON'
    }).done(function(response){
      console.log(response);

      let tableContent = '';

      $.each(response, function(){

          let title = this.Parent_Title;
          let fName = this.Parent_Fname;
          let lName = this.Parent_Lname;
          let concatName = title + " ".concat(fName) + " ".concat(lName);

          tableContent += '<tr>';
          tableContent += '<th><span rel="' + this.Parent_ID + '" id="' + this.Parent_ID + '" scope="row"">' + this.Parent_ID + '</th>';
          tableContent += '<td>' + concatName + '</td>';
          tableContent += '<td>' + this.Parent_Email + '</td>';
          tableContent += '<td><button type="button" id="' + this.Parent_ID + '" class="btn btn-success">Profile</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#ParentList table tbody').html(tableContent);
    });

    //Load Students into the input feild
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

    $('#addParentForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newParent;
        //Creating the new Parent object will all information from the form
        newParent = {
            Parent_Title:         $('#addParentForm input#ParentTitle').val(),
            Parent_Fname:         $('#addParentForm input#ParentFName').val(),
            Parent_Lname:         $('#addParentForm input#ParentLName').val(),
            Parent_Email:         $('#addParentForm input#ParentEmail').val(),
            Parent_Mobile_Number: $('#addParentForm input#ParentMobileNumber').val(),
            Parent_Home_Number:   $('#addParentForm input#ParentHomeNumber').val(),
            Parent_Address:       $('#addParentForm input#ParentAddress').val(),
            Parent_Username:      $('#addParentForm input#ParentUsername').val(),
            Parent_Password:      $('#addParentForm input#ParentPassword').val(),
            Role: "Parent"
        };

        //Get Values from the add parents option
        let studentPickerValues = $('#studentPicker').val();
        console.log(studentPickerValues);

        //Checks the value of the object, if no parents assigned don't add it to the newParent Object
        if (studentPickerValues.indexOf("0") > -1) {
            console.log("No Parent Assigned ATM");
        } else {
            //As there is a parent assigned i am adding it to the newParent Object
            newParent.Student = studentPickerValues;
        }

        //Send off the AJAX Request to the /pupil route
        $.ajax({
            type: 'POST',
            data: newParent,
            url: '/parent',
            dataType: 'JSON'
        }).done(function(response) {
          console.log("Were back!!" + response);
            //Do nothing for the time being
            $('#addParentstatus').html("Parent Created Okay" + response);
        });
    });
});
