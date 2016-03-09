"use strict";
$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/getParentStudents',
    dataType: 'JSON'
  }).done(function(response){

    let tableContent;
    tableContent= $('<tbody></tbody>');

    $.each(response, function(){

          tableContent.append(
                              `<tr>
                              <th><span rel="${this.Student_ID}" id="${this.Student_ID}" scope="row"">${this.Student_ID}</th>
                              <td>${this.Student_Name}</td>
                              <td>${this.Student_Email}</td>
                              <td>${this.Student_Year}</td>
                              <td>${this.Student_Username}</td>
                              <td>${this.Subject_Name}</td>
                              <td>${this.Attendance_Status}</td>
                              <td><button type="button" id="${this.Student_ID}" value="Profile" class="btn btn-primary">Profile</button></td>
                              <td><button type="button" id="${this.Student_ID}" value="Attendance" class="btn btn-primary">Attendance</button></td>
                              </tr>`
                          );
      });

      $('#ClassList table').append(tableContent);
  });

  $('#ClassList').on('click', '.btn ', function(){
    let buttonValue = $(this).attr("value");
let studentID = this.id;

    if(buttonValue === "Profile"){
      window.location.href = `/student/${studentID}/`;

    }
    else{
      window.location.href = `/student/${studentID}/attendance`;
    }


  });
/*
  $.ajax({
    type: 'GET',
    url: '/currentStudentStatus',
    dataType: 'JSON'
  }).done(function(response){
    console.log(response);
  });
*/
});
