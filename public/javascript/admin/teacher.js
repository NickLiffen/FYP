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
          tableContent += '<td><button type="button" id="' + this.Teacher_ID + '" value="Profile" class="btn btn-primary">Profile</button></td>';
          tableContent += '<td><button type="button" id="' + this.Teacher_ID + '" value="Update" class="btn btn-success">Update</button></td>';
          tableContent += '<td><button type="button" id="' + this.Teacher_ID + '" value="Delete" class="btn btn-warning" data-toggle="modal" data-target="#confirm-delete">Delete</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#TeacherList table tbody').html(tableContent);
    });

    $('#TeacherList').on('click', '.btn ', function(){
      let teacherID = this.id;
      let buttonValue = $(this).attr("value");

      if(buttonValue === "Profile"){
        window.location.href = `/teacher/${teacherID}/`;
      }
      else if(buttonValue === "Update"){
        var $target = $('.hideUpdateTeacherForm'),
            $toggle = $(this);

        $target.slideToggle(500, function() {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Update');
        });
        console.log(teacherID);
        $.ajax({
                 url: `/teacherr/${teacherID}`,
                 type: 'GET',
                 success: function(result) {
                   console.log(result);
                  $('#TeacherTitleUpdate').val(result[0].Teacher_Title);
                  $('#TeacherFNameUpdate').val(result[0].Teacher_Fname);
                  $('#TeacherLNameUpdate').val(result[0].Teacher_Lname);
                  $('#TeacherEmailUpdate').val(result[0].Teacher_Email);
                  $('#TeacherMobileNumberUpdate').val(result[0].Teacher_Mobile_Number);
                  $('#TeacherUsernameUpdate').val(result[0].Teacher_Username);
                 }
               });

               $('#updateTeacherForm').submit(function() {
                   //Stop the Form from submiting automatically
                   event.preventDefault();
                   //Declaring varibales
                   let newTeacher;
                   //Creating the new Teacher object will all information from the form
                   newTeacher = {
                       TeacherTitle: $('#updateTeacherForm input#TeacherTitleUpdate').val(),
                       TeacherFName: $('#updateTeacherForm input#TeacherFNameUpdate').val(),
                       TeacherLName: $('#updateTeacherForm input#TeacherLNameUpdate').val(),
                       TeacherEmail: $('#updateTeacherForm input#TeacherEmailUpdate').val(),
                       TeacherMobile: $('#updateTeacherForm input#TeacherMobileNumberUpdate').val(),
                       TeacherUsername: $('#updateTeacherForm input#TeacherUsernameUpdate').val(),
                   };

                   //Send off the AJAX Request to the /pupil route
                   $.ajax({
                       type: 'PATCH',
                       data: newTeacher,
                       url: `/teacher/${teacherID}`,
                       dataType: 'JSON'
                   }).done(function() {
                     $('html, body').animate({
                     scrollTop: $("#hide").offset().top
                 }, 2000);
                     $("#hide").attr('id', 'show');
                   });
               });
      }
      else if(buttonValue === "Delete"){
           $('#confirm-delete').on('show.bs.modal', function() {
             $('.debug-url').html("");
             $("#confirmDelete").click(function(){
               $.ajax({
                        url: `/teacher/${teacherID}`,
                        type: 'DELETE',
                        success: function(result) {
                          if(result[0] === undefined){
                            $('#confirm-delete').modal('hide');
                            $('html, body').animate({
                            scrollTop: $("#hide").offset().top
                        }, 2000);
                            $("#hide").attr('id', 'show');
                          }
                          else if(result[0].Class_ID){
                            $('.debug-url').html(` <strong>Couldn't delete Teacher!!!! Teacher is in use in Class: ${result[0].Class_ID}. Please change Teacher for this class.</strong>`);
                          }
                          else{
                            console.log("waaa");
                          }
                  }
                });
              });
           });
      }
      else{
        console.log("Theres a Problem");
      }

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
          $('html, body').animate({
          scrollTop: $("#hide").offset().top
      }, 2000);
            $("#hide").attr('id', 'show');
        });
    });
});
