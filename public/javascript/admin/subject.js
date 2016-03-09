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
          tableContent += '<td><button type="button" id="' + this.Subject_ID + '" value="Update" class="btn btn-success">Update</button></td>';
          tableContent += '<td><button type="button" id="' + this.Subject_ID + '" value="Delete" class="btn btn-warning" data-toggle="modal" data-target="#confirm-delete">Delete</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#SubjectList table tbody').html(tableContent);
    });

    $('#SubjectList').on('click', '.btn ', function(){
      let SubjectID = this.id;
      let buttonValue = $(this).attr("value");

      if(buttonValue === "Profile"){
        console.log("Im in Profile");
      }
      else if(buttonValue === "Update"){
        var $target = $('.hideUpdateSubjectForm'),
            $toggle = $(this);

        $target.slideToggle(500, function() {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Update');
        });

        $.ajax({
                 url: `/Subject/${SubjectID}`,
                 type: 'GET',
                 success: function(result) {
                   console.log(result);
                  $('#subjectNameUpdate').val(result[0].Subject_Name);
                  $('#subjectDescriptionUpdate').val(result[0].Subject_Description);
                 }
               });

               $('#updateSubjectForm').submit(function() {
                   //Stop the Form from submiting automatically
                   event.preventDefault();
                   //Declaring varibales
                   let newSubject;
                   //Creating the new Subject object will all information from the form
                   newSubject = {
                       Subject_Name: $('#updateSubjectForm input#subjectNameUpdate').val(),
                       Subject_Description: $('#updateSubjectForm input#subjectDescriptionUpdate').val()
                   };

                   //Send off the AJAX Request to the /pupil route
                   $.ajax({
                       type: 'PATCH',
                       data: newSubject,
                       url: `/Subject/${SubjectID}`,
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
                        url: `/Subject/${SubjectID}`,
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
                            $('.debug-url').html(`<strong>Couldn't delete class!!!! Subject is in use in Class: ${result[0].Class_ID}. Please change Subject for this class.</strong>`);
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
          $('html, body').animate({
          scrollTop: $("#hide").offset().top
      }, 2000);
            $("#hide").attr('id', 'show');
        });
    });
});
