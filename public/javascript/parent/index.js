"use strict";
$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/getParentStudents',
    dataType: 'JSON'
  }).done(function(response){
    console.log(response);

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
                          <td>Stuff will come here later</td>
                          <td><button type="button" id="${this.Student_ID}" class="btn btn-primary">Profile</button></td>
                          </tr>`
                      );
      });
      $('#ClassList table').append(tableContent);
  });

  $.ajax({
    type: 'GET',
    url: '/currentStudentStatus',
    dataType: 'JSON'
  }).done(function(response){

    let currentTimestamp = moment().format("YYYY-MM-DD HH:mm");

    if (currentDateTime >= '2016-02-04 19:00' && currentDateTime <= '2016-02-04 20:00') {
         console.log('We should be here');
  } else {
        console.log('we shouldnt be here');
  }

  });






});
