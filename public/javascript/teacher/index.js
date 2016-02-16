"use strict";

$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/teacherCurrentClassStatus',
    dataType: 'JSON'
  }).done(function(response){
    if(response.length < 1){
      $('#currentClassStatus').addClass('alert alert-success');
      $('#currentClassStatus').addClass('center');
      $('#currentClassStatus').html('No Class - WOOP!');
    }
    else if (response[0].Has_Attendance_Been_Taken){
      $('#currentClassStatus').addClass('alert alert-warning');
      $('#currentClassStatus').addClass('center');
      $('#currentClassStatus').html(`You are supposed to be teaching <div class='strong'>${response[0].Subject_Name}</div> which started <div class='strong'>${response[0].Time_Difference}</div> ago. Please Take Attendance.`);
    }
    else{
      $('#currentClassStatus').addClass('alert alert-sucess');
      $('#currentClassStatus').addClass('center');
      $('#currentClassStatus').html(`You are supposed to be teaching <div class='strong'>${response[0].Subject_Name}</div> which started <div class='strong'>${response[0].Time_Difference}</div> ago. Attendance has been Taken.`);

    }
  });
  $.ajax({
    type: 'GET',
    url: '/teacherTodayClasses',
    dataType: 'JSON'
  }).done(function(response){
    console.log(response);
    						let tableContent;
    						tableContent= $('<tbody></tbody>');
    						$.each(response, function(){
    							tableContent.append(
    											            `<tr>
    											            <th><span rel="${this.Class_ID}" id="${this.Class_ID}" scope="row"">${this.Class_ID}</th>
    											            <td>${this.Subject_Name}</td>
    																	<td>${this.Class_Start_Time}</td>
    																	<td>${this.Class_End_Time}</td>
    																	<td>${this.Class_Level}</td>
    																	<td>${this.Room_Name}</td>
    																	</tr>`
    							        				);
    			      });
    		      // Inject the whole content string into our existing HTML table
    		      $('#ClassList table').append(tableContent);
              			//tableContent.empty();
    					});
});
