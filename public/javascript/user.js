"use strict";

$(document).ready(function() {
  let parentID = $('.parentID').attr("id");
  let studentID = $('.studentID').attr("id");

    $("#contactParents").click(function(){
        window.location.href = `/parent/${parentID}/contact`;
});

  $("#attendanceInfo").click(function(){
      window.location.href = `/student/${studentID}/attendance`;
  });



  $(".calendarEffect").fadeOut();

    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        });
    });

    $('[data-toggle="tooltip"]').tooltip();

    $("#getTimetable").click(function(){
      $(".profileEffect").fadeOut();
      $(".calendarEffect").fadeIn();

      let urlToUse, idToUse;

      let studentID = $('.studentID').attr("id");
      let teacherID = $('.teacherID').attr("id");


      if(studentID){
        urlToUse = '/studentTimetable';
        idToUse = studentID;
      }
      else{
        urlToUse = '/teacherTimetable';
        idToUse = teacherID;
      }

      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        eventLimit: true,
        timezone: 'local',
        weekends: false,
        eventSources: [
          {
              url: urlToUse,
              type: 'POST',
              data: {
                ID: idToUse
              }
          }
        ],
        eventRender: function(event, element) {
          console.log(event);
          $(element).tooltip({
            title: `Title: ${event.title}  Room: ${event.room} Teacher: ${event.teacher}`
          });
        },
        minTime: "06:00",
        maxTime: "21:00"
      });
    });

    $("#hidecalendar").click(function() {
      $(".calendarEffect").fadeOut();
      $(".profileEffect").fadeIn();
    });


});
