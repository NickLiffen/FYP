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
    }).done(function(response) {

        let tableContent = '';

        $.each(response, function() {
            let title = this.Parent_Title;
            let fName = this.Parent_Fname;
            let lName = this.Parent_Lname;
            let concatName = title + " ".concat(fName) + " ".concat(lName);
            //Start Adding the data to our table.
            tableContent += '<tr>';
            tableContent += '<th><span rel="' + this.Parent_ID + '" id="' + this.Parent_ID + '" scope="row"">' + this.Parent_ID + '</th>';
            tableContent += '<td>' + concatName + '</td>';
            tableContent += '<td>' + this.Parent_Email + '</td>';
            tableContent += '<td><button type="button" id="' + this.Parent_ID + '" value="Profile" class="btn btn-primary">Profile</button></td>';
            tableContent += '<td><button type="button" id="' + this.Parent_ID + '" value="Update" class="btn btn-success">Update</button></td>';
            tableContent += '<td><button type="button" id="' + this.Parent_ID + '" value="Delete" class="btn btn-warning" data-toggle="modal" data-target="#confirm-delete">Delete</button></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#ParentList table tbody').html(tableContent);
    });


    $('#ParentList').on('click', '.btn ', function() {
        let parentID = this.id;
        let buttonValue = $(this).attr("value");

        if (buttonValue === "Profile") {
          window.location.href = `/parent/${parentID}/`;
        } else if (buttonValue === "Update") {
            var $target = $('.hideUpdateParentForm'),
                $toggle = $(this);

            $target.slideToggle(500, function() {
                $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Update');
            });
            console.log(parentID);
            $.ajax({
                url: `/parentt/${parentID}`,
                type: 'GET',
                success: function(result) {
                    $('#ParentTitleUpdate').val(result[0].Parent_Title);
                    $('#ParentFNameUpdate').val(result[0].Parent_Fname);
                    $('#ParentLNameUpdate').val(result[0].Parent_Lname);
                    $('#ParentEmailUpdate').val(result[0].Parent_Email);
                    $('#ParentMobileNumberUpdate').val(result[0].Parent_Mobile_Number);
                    $('#ParentHomeNumberUpdate').val(result[0].Parent_Home_Number);
                    $('#ParentUsernameUpdate').val(result[0].Parent_Username);
                    $('#ParentAddressUpdate').val(result[0].Parent_Address);

                    let studentInfo = result.splice(1,result.length);

                    $.each(studentInfo, function(i, d) {
                      $(`select option:contains("${d.Student_Name}")`).prop('selected',true);
                        $('#currentStudent').append('<option value="' + d.Student_ID + '">' + d.Student_Name + '</option>');
                    });
                }
            });

            $("#showStudent").click(function(){
              var $target = $('#studentFieldset'),
                  $toggle = $(this);

              $target.slideToggle(500, function() {
                  $toggle.text(($target.is(':visible') ? 'Hide' : 'Update') + ' Student');
              });
             });

            $('#updateParentForm').submit(function() {
                //Stop the Form from submiting automatically
                event.preventDefault();
                //Declaring varibales
                let newParent;
                //Creating the new Teacher object will all information from the form
                newParent = {
                    ParentTitle: $('#updateParentForm input#ParentTitleUpdate').val(),
                    ParentFName: $('#updateParentForm input#ParentFNameUpdate').val(),
                    ParentLName: $('#updateParentForm input#ParentLNameUpdate').val(),
                    ParentEmail: $('#updateParentForm input#ParentEmailUpdate').val(),
                    ParentMobile: $('#updateParentForm input#ParentMobileNumberUpdate').val(),
                    ParentHome: $('#updateParentForm input#ParentHomeNumberUpdate').val(),
                    ParentAddress: $('#updateParentForm input#ParentAddressUpdate').val(),
                    ParentUsername: $('#updateParentForm input#ParentUsernameUpdate').val(),
                    Student:      $('#studentPickerUpdate').val()
                };

                //Send off the AJAX Request to the /pupil route
                $.ajax({
                    type: 'PATCH',
                    data: newParent,
                    url: `/parent/${parentID}`,
                    dataType: 'JSON'
                }).done(function() {
                    $('#updateParentstatus').html("Teacher Update Okay");
                });
            });
        } else if (buttonValue === "Delete") {
            $('#confirm-delete').on('show.bs.modal', function() {
                $('.debug-url').html("");
                $("#confirmDelete").click(function() {
                    $.ajax({
                        url: `/parent/${parentID}`,
                        type: 'DELETE',
                        success: function(result) {
                          if(result[0] === undefined){
                            $('#confirm-delete').modal('hide');
                            $("#hide").attr('id', 'show');
                          }
                          else if(result[0].Student_ID){
                            $('.debug-url').html(` <strong>Couldn't delete Parent!!!! Parent Username is assigned to this student:: ${result[0].Student_ID}. Please Unassign from Student.</strong>`);
                          }
                          else{
                            console.log("waaa");
                          }
                        }
                    });
                });
            });
        } else {
            console.log("Theres a Problem");
        }
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
            $('#studentPickerUpdate').append('<option value="' + d.Student_ID + '">' + concatName + '</option>');
        });
    });

    $('#addParentForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newParent;
        //Creating the new Parent object will all information from the form
        newParent = {
            Parent_Title: $('#addParentForm input#ParentTitle').val(),
            Parent_Fname: $('#addParentForm input#ParentFName').val(),
            Parent_Lname: $('#addParentForm input#ParentLName').val(),
            Parent_Email: $('#addParentForm input#ParentEmail').val(),
            Parent_Mobile_Number: $('#addParentForm input#ParentMobileNumber').val(),
            Parent_Home_Number: $('#addParentForm input#ParentHomeNumber').val(),
            Parent_Address: $('#addParentForm input#ParentAddress').val(),
            Parent_Username: $('#addParentForm input#ParentUsername').val(),
            Parent_Password: $('#addParentForm input#ParentPassword').val(),
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
