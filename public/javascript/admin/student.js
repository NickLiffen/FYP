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
          tableContent += '<td><button type="button" id="' + this.Student_ID + '" value="Profile" class="btn btn-primary">Profile</button></td>';
          tableContent += '<td><button type="button" id="' + this.Student_ID + '" value="Update" class="btn btn-success">Update</button></td>';
          tableContent += '<td><button type="button" id="' + this.Student_ID + '" value="Discard" class="btn btn-warning" data-toggle="modal" data-target="#confirm-delete">Discard</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#studentList table tbody').html(tableContent);


    });

    $('#studentList').on('click', '.btn ', function() {
        let studentID = this.id;
        let buttonValue = $(this).attr("value");

        if (buttonValue === "Profile") {
            console.log("Im in Profile");
        } else if (buttonValue === "Update") {
            var $target = $('.hideUpdateStudentForm'),
                $toggle = $(this);

            $target.slideToggle(500, function() {
                $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Update');
            });
            console.log(studentID);
            $.ajax({
                url: `/studentt/${studentID}`,
                type: 'GET',
                success: function(result) {
                  console.log(result);

                    $('#studentTitleUpdate').val(result[0].Student_Title);
                    $('#studentFNameUpdate').val(result[0].Student_Fname);
                    $('#studentLNameUpdate').val(result[0].Student_Lname);
                    $('#studentEmailUpdate').val(result[0].Student_Email);
                    $('#studentYearUpdate').val(result[0].Student_Year);
                    $('#studentUsernameUpdate').val(result[0].Student_Username);

                    let parentInfo = result.splice(1,result.length);

                    $.each(parentInfo, function(i, d) {
                      $(`select option:contains("${d.Parent_Name}")`).prop('selected',true);
                        $('#currentParent').append('<option value="' + d.Parent_ID + '">' + d.Parent_Name + '</option>');
                    });
                }
            });

            $("#showParent").click(function(){
              var $target = $('#parentFieldset'),
                  $toggle = $(this);

              $target.slideToggle(500, function() {
                  $toggle.text(($target.is(':visible') ? 'Hide' : 'Update') + ' Parent');
              });
             });

            $('#updateStudentForm').submit(function() {
                //Stop the Form from submiting automatically
                event.preventDefault();
                //Declaring varibales
                let newStudent;
                //Creating the new Teacher object will all information from the form
                newStudent = {
                    StudentTitle:     $('#updateStudentForm input#studentTitleUpdate').val(),
                    StudentFName:     $('#updateStudentForm input#studentFNameUpdate').val(),
                    StudentLName:     $('#updateStudentForm input#studentLNameUpdate').val(),
                    StudentEmail:     $('#updateStudentForm input#studentEmailUpdate').val(),
                    StudentYear:      $('#updateStudentForm input#studentYearUpdate').val(),
                    StudentUsername:  $('#updateStudentForm input#studentUsernameUpdate').val(),
                    Parent:           $('#parentPickerUpdate').val()
                };

                console.log(newStudent);
                //Send off the AJAX Request to the /pupil route
                $.ajax({
                    type: 'PATCH',
                    data: newStudent,
                    url: `/student/${studentID}`,
                    dataType: 'JSON'
                }).done(function() {
                    $('#updateStudentstatus').html("Student Update Okay");
                });
            });
        } else if (buttonValue === "Discard") {
            $('#confirm-delete').on('show.bs.modal', function() {
                $('.debug-url').html("");
                $("#confirmDelete").click(function() {
                    $.ajax({
                        url: `/student/${studentID}`,
                        type: 'DELETE',
                        success: function(result) {
                          if(!result[0]){
                            $('#confirm-delete').modal('hide');
                            $('#updateStudentstatus').html("Student Action Completed");
                          }
                          else{
                            $('.debug-url').html(` <strong>Couldn't delete class!!!! Room is in use in Class: ${result[0].Class_ID}. Please change room for this class.</strong>`);
                          }
                        }
                    });
                });
            });
        } else {
            console.log("Theres a Problem");
        }

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
            $('#parentPickerUpdate').append('<option value="' + d.Parent_ID + '">' + concatName + '</option>');
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
          console.log("Were back!!" + response);
            $('#addStudentstatus').html("Student Created Okay" + response);
        });
    });
});
