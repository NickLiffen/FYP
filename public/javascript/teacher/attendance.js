"use strict";

$(document).ready(function() {

		//On Page Load only show the calender not the layout for taking attendnace.
		$("#attendanceEffect").fadeOut();
		//Do all the calender stuff.
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			eventClick: function(calEvent) {

				let classInfo = {
					classID: calEvent.id,
					className: calEvent.title
				};

				$.ajax({
		      type: 'POST',
					data: classInfo,
		      url: '/getClassStudent',
		      dataType: 'JSON'
		    }).done(function(response){

						let tableContent;
						tableContent= $('<tbody></tbody>');

						$.each(response, function(){

							tableContent.append(
											            `<tr>
											            <th><span rel="${this.Student_ID}" id="${this.Student_ID}" scope="row"">${this.Student_ID}</th>
											            <td>${this.Student_Name}</td>
																	<td><label><input type="radio" value='Present' id='${this.Student_ID} ${this.Class_ID} ${this.Attendance_ID}' name='optradio${this.Student_ID}' required> Present</label></td>
																	<td><label><input type="radio" value='Late' id='${this.Student_ID} ${this.Class_ID} ${this.Attendance_ID}' name="optradio${this.Student_ID}" required> Late</label></td>
																	<td><label><input type="radio" value='Absent' id='${this.Student_ID} ${this.Class_ID} ${this.Attendance_ID}' name="optradio${this.Student_ID}" required> Absent</label></td>
																	<td><button type="button" id="${this.Student_ID}" class="btn btn-primary">Profile</button></td>
																	</tr>`
							        				);

						$(tableContent).find(`input[type=radio][name=optradio${this.Student_ID}][value=${this.Status}]`).prop("checked", true);

			      });
		      // Inject the whole content string into our existing HTML table
		      $('#ClassList table').append(tableContent);
					$('#calendarEffect').fadeOut();
					$('#attendanceEffect').fadeIn();


					$("#hideAttendance").click(function(){
						$("#attendanceEffect").fadeOut();
						$('#calendarEffect').fadeIn();
						tableContent.empty();
						//location.reload();
					});

		    });
    },
      defaultView: 'agendaWeek',
			eventLimit: true,
			weekends: false,
			eventSources: [
        {
            url: '/getTimetable',
            textColor: 'black'
        }
			],
			minTime: "06:00",
			maxTime: "21:00"
		});

			$('#ClassList').on('click', '.btn ', function(){
				let studentID = this.id;
				  window.location.href = `/user/${studentID}`;
			});

		$("#takeAttendance").submit(function(event) {
				event.preventDefault();

				const elems = $('input:radio');
				let count = elems.length;
				let output = [];

				elems.each(function() {
  				if($(this).is(':checked')) {
							var stuentID = this.id;
							var res = stuentID.split(" ");
							console.log(res);
							if((res[2] !== "undefined")){
								output.push([this.value, this.value, res[2]]);
							}
							else{
						  output.push([this.value, this.value, res[1], res[0]]);
						}
													console.log(output);
  				}
					if(!--count){


						$.ajax({
								type: 'POST',
								data: JSON.stringify(output),
								url: '/takeAttendance',
								dataType: 'json',
								contentType: "application/json; charset=utf-8"
						}).done(function(response) {
							console.log("Were back!!" + response);
								$('#attendanceStatus').html("Attendance Recordes Successfully");
						});
					}
			});
		});
	});
