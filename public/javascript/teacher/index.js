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
    else if (response[0].Has_Attendance_Been_Taken === "No"){
      $('#currentClassStatus').addClass('alert alert-warning');
      $('#currentClassStatus').addClass('center');
      $('#currentClassStatus').html(`You are supposed to be teaching <div class='strong'>${response[0].Subject_Name}</div> which started <div class='strong'>${response[0].Time_Difference}</div> ago. Please Take Attendance.`);
    }
    else if ((response[0].Has_Attendance_Been_Taken === "Yes")){
      $('#currentClassStatus').addClass('alert alert-success');
      $('#currentClassStatus').addClass('center');
      $('#currentClassStatus').html(`Current Class: <div class='strong'>${response[0].Subject_Name}</div> which started <div class='strong'>${response[0].Time_Difference}</div> ago. Attendance has been Taken.`);
    }
    else{
      console.log("err");
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
    											            `<tr value='${this.Class_Start_Time}'>
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
              setInterval(function(){
                  let hours = moment().format('HH');
                  console.log(hours);
                  $('#ClassList table tbody tr').each(function(i,v){
                    console.log($(this).attr("value"));
                  	if($(this).attr("value").split(":")[0]===hours){
                          $(this).addClass("hightlight");
                        }
                      else{
                          $(this).removeClass("hightlight");
                        }
                  });
              },1000);
});
