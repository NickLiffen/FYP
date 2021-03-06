"use strict";

$(document).ready(() => {

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
											            <th><span rel="${this.Student_ID}" id="${this.Student_ID}" scope="row">${this.Student_ID}</th>
											            <td>${this.Student_Name}</td>
																	<td><label><input type="radio" value='Present' id='${this.Student_ID} ${this.Class_ID} ${this.Attendance_ID}' name='optradio${this.Student_ID}' checked="checked" required> Present</label></td>
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
					});

		    });
    },
      defaultView: 'agendaWeek',
			eventLimit: true,
			weekends: true,
			timezone: 'local',
			eventSources: [
        {
            url: '/teacherTimetable',
						type: 'POST',
            textColor: 'black'
        }
			],
			eventRender: function(event, element) {
				console.log(event);
				$(element).tooltip({
					title: `Title: ${event.title}  Room: ${event.room} Teacher: ${event.teacher}`
				});
			},
			minTime: "00:00",
			maxTime: "23:00"
		});

			$('#ClassList').on('click', '.btn ', function(){
				let studentID = this.id;
				  window.location.href = `/student/${studentID}`;
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
							$('html, body').animate({
							scrollTop: $("#hide").offset().top
					}, 2000);
							$("#hide").attr('id', 'show');
						});
					}
			});
		});
	});
