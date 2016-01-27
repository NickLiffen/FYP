"use strict";

$(document).ready(function() {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
      defaultView: 'agendaWeek',
			eventLimit: true, // allow "more" link when too many events
      events: [
      				{
      					title: 'Meeting',
      					start: '2016-01-27T10:30:00',
      					end: '2016-01-27T12:30:00'
      				}
      			]
		});

	});
