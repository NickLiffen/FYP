"use strict";

$(document).ready(function() {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
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

	});
