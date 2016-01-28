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

						let tableContent = '';

						$.each(response, function(){

			        	tableContent += `<tr>`;
			          tableContent += `<th><span rel="${this.Student_ID}" id="${this.Student_ID}" scope="row"">${this.Student_ID}</th>`;
			          tableContent += `<td>${this.Student_Name}</td>`;
			          tableContent += `<td><label><input type="radio" id='Present'name="optradio${this.Student_ID}" required> Present</label></td>`;
			          tableContent += `<td><label><input type="radio" id='Late' name="optradio${this.Student_ID}" required> Late</label></td>`;
			          tableContent += `<td><label><input type="radio" id='Absent' name="optradio${this.Student_ID}" required> Absent</label></td>`;
			          tableContent += `<td><button type="button" id="${this.Student_ID}" class="btn btn-primary" required>Profile</button></td>`;
			          tableContent += `</tr>`;
			      });
		      // Inject the whole content string into our existing HTML table
		      $('#ClassList table tbody').html(tableContent);
					$('#calendarEffect').fadeOut();
					$('#attendanceEffect').fadeIn();
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
			]
		});

		$("#hideAttendance").click(function(){
    	$("#attendanceEffect").fadeOut();
			$('#calendarEffect').fadeIn();
		});

	});
