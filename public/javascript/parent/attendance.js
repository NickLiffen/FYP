"use strict";
$(document).ready(function() {

    let studentID = $('h3').attr('id');

    $("#todayAttendanceButton").click(function() {
        var $target = $('#todayAttendance'),
            $toggle = $(this);

        $target.slideToggle(500, function() {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Records');
        });
    });

    $("#weekAttendanceButton").click(function() {
        var $target = $('#weekAttendance'),
            $toggle = $(this);

        $target.slideToggle(500, function() {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Records');
        });
    });

    $("#monthAttendanceButton").click(function() {
        var $target = $('#monthAttendance'),
            $toggle = $(this);

        $target.slideToggle(500, function() {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Records');
        });
    });
    $("#graphAttendanceButton").click(function() {
        var $target = $('#graphAttendance'),
            $toggle = $(this);

        $target.slideToggle(500, function() {
            $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Records');
        });
        $('html, body').animate({
        scrollTop: $("#graphAttendanceButton").offset().top
    }, 2000);
    });

    let student = {
        id: studentID
    };

    $('#todayTable').dataTable({
        responsive: true,
        "ajax": {
            "url": "/studentTodayAttendance",
            "type": "POST",
            "data": student,
            "dataSrc": "results"
        },
        "columns": [{
            "data": "Class_ID"
        }, {
            "data": "Subject_Name"
        }, {
            "data": "start"
        }, {
            "data": "Teacher_Name"
        }, {
            "data": "Attendance_Status"
        }
      ],
    });


    $('#weekTable').dataTable({
        responsive: true,
        "ajax": {
            "url": "/studentWeekAttendance",
            "type": "POST",
            "data": student,
            "dataSrc": "results"
        },
        "columns": [{
            "data": "Class_ID"
        }, {
            "data": "Subject_Name"
        }, {
            "data": "start"
        }, {
            "data": "Teacher_Name"
        }, {
            "data": "Attendance_Status"
        }]
    });

    $('#monthTable').dataTable({
        responsive: true,
        "ajax": {
            "url": "/studentMonthAttendance",
            "type": "POST",
            "data": student,
            "dataSrc": "results"
        },
        "columns": [{
            "data": "Class_ID"
        }, {
            "data": "Subject_Name"
        }, {
            "data": "start"
        }, {
            "data": "Teacher_Name"
        }, {
            "data": "Attendance_Status"
        }]
    });

    $.ajax({
        type: 'POST',
        url: '/getBarChartDetails',
        data: student,
        dataType: 'JSON'
    }).done(function(subjects) {

        // create some arrays for our graph
        const labels = [];

        const present = [];
        const late = [];
        const absent = [];

        // loop through the subjects
        for (let i = 0; i < subjects.length; i++) {
          const subject = subjects[i];

          // loop through the labels we already have
          for (let j = 0; j < labels.length + 1; j++) {
            const label = labels[j];

            // if the subject is a label
            if (label === subject.Subject_Name) {

              // assign attendence category the relative count
              switch (subject.Attendance_Info) {
                case 'present':
                  present[j] = subject.Attendance_Count;
                  break;
                case 'late':
                  late[j] = subject.Attendance_Count;
                  break;
                case 'absent':
                  absent[j] = subject.Attendance_Count;
                  break;
              }

              // break out as we dont need to see if any other labels
              // match the label as we assume labels are unique
              break;
            }

            // if at the end of the labels and still havent found a label
            // this subject should be added to the labels
            if (j === labels.length) {

              // push subject to labels and initialize relative attendance info to 0
              labels.push(subject.Subject_Name);
              const labelPosition = labels.length - 1;
              present[labelPosition] = 0;
              late[labelPosition] = 0;
              absent[labelPosition] = 0;

              switch (subject.Attendance_Info) {
                case 'present':
                  present[labelPosition] = subject.Attendance_Count;
                  break;
                case 'late':
                  late[labelPosition] = subject.Attendance_Count;
                  break;
                case 'absent':
                  absent[labelPosition] = subject.Attendance_Count;
                  break;
              }

              // break out as we dont need to see if any other match as we assume
              // labels are unique
              break;
            }
          }
        }

        const config = {
        type: 'bar',
        data: {
            labels,
            datasets: [
              {
                label: "Present",
                data: present,
                fill: false,
                borderDash: [5, 5],
            },
              {
                label: "Late",
                data: late,
                fill: false,
                borderDash: [5, 5],
            },
            {
              label: "Absent",
              data: absent,
              fill: false,
              borderDash: [5, 5],
            }
          ]
        },
        options: {
            responsive: true,
            hover: {
              mode: 'dataset'
            },
          legend: {
            display: true,
            position: top
          },
            scales: {
                xAxes: [{
                    display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Subjects'
                  }
                }],
                yAxes: [{
                    display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Number of Occurences'
                  }
                }]
            }
        }
    };


    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };
    $.each(config.data.datasets, function(i, dataset) {
       dataset.borderColor = randomColor(0.4);
       dataset.backgroundColor = randomColor(0.5);
       dataset.pointBorderColor = randomColor(0.7);
       dataset.pointBackgroundColor = randomColor(0.5);
       dataset.pointBorderWidth = 1;
   });

        const ctx = document.getElementById("myChart").getContext("2d");
        const myBarChart = new Chart(ctx, config);
        //document.getElementById('js-legend').innerHTML = myBarChart.generateLegend();
        myBarChart.update();
    });

    $.ajax({
        type: 'POST',
        url: '/getRadarChartDetails',
        data: student,
        dataType: 'JSON'
    }).done(function(attendance) {

      console.log(attendance);

        // create some arrays for our graph
        const labels = [];
        const dataArray = [];

        $.each(attendance, function(){
            labels.push(this.Attendance_Info);
            dataArray.push(this.Attendance_Count);
        });


        const config = {
        type: 'bar',
        data: {
            labels,
            datasets: [
              {
                label: "Present",
                data: dataArray,
                fill: false,
                borderDash: [5, 5],
            }
          ]
        },
        options: {
            responsive: true,
            hover: {
              mode: 'dataset'
            },
          legend: {
            display: true,
            position: top
          },
            scales: {
                xAxes: [{
                    display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Subjects'
                  }
                }],
                yAxes: [{
                    display: true,
                    ticks:{
                            beginAtZero:true
                        },
                  scaleLabel: {
                    display: true,
                    labelString: 'Number of Occurences'
                  }
                }]
            }
        }
    };


    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };
    $.each(config.data.datasets, function(i, dataset) {
       dataset.borderColor = randomColor(0.4);
       dataset.backgroundColor = randomColor(0.5);
       dataset.pointBorderColor = randomColor(0.7);
       dataset.pointBackgroundColor = randomColor(0.5);
       dataset.pointBorderWidth = 1;
    });

    const ctx = document.getElementById("pieChart").getContext("2d");
    const myBarChart = new Chart(ctx, config);
    myBarChart.update();
});


//Moving onto when User wants to find information for a specifc class
var $input = $('#typeaheadGraph');

$.get('/getSubject', function(data){
  //Creates an empty array where Student_ID and Parent_ID is going to go.
  let usernames = [];
    let map = {};

    $.each(data, function (i, username) {
        map[username.Subject_Name] = username;
        let newName = username.Subject_Name.replace(/([a-z])([A-Z])/g, '$1 $2');

        usernames.push(`#${username.Subject_ID} ${newName}`);
    });

    $input.typeahead({ source:usernames });
},'json');


$("#getGraphUniqueClass").submit(function(event) {
    event.preventDefault();
    let searchValue, subjectID;

    searchValue = $('#typeaheadGraph').val();

    subjectID = searchValue.charAt(1);

    student.subjectID = subjectID;

    console.log(student);

    $.ajax({
        type: 'POST',
        url: '/parentGraphRequest',
        data: student,
        dataType: 'JSON'
    }).done(function(subjects) {

      // create some arrays for our graph
      const labels = [];
      const presentArray = [];
      const lateArray = [];
      const absentArray = [];

      $.each(subjects, function(){
          labels.push(this.Attendance_Info);

          if(this.Attendance_Info === 'present'){
              presentArray.push(this.Attendance_Count);
          }

          if(this.Attendance_Info === 'late'){
              presentArray.push(this.Attendance_Count);
          }

          if(this.Attendance_Info === 'absent'){
              presentArray.push(this.Attendance_Count);
          }
      });

      if(presentArray.length < 1){
        presentArray.push(0);
      }
      if(lateArray.length < 1){
        lateArray.push(0);
      }
      if(absentArray.length < 1){
        absentArray.push(0);
      }

      console.log(presentArray);
      console.log(lateArray);
      console.log(absentArray);


      const config = {
      type: 'bar',
      data: {
          labels,
          datasets: [
            {
              label: "Present",
              data: presentArray,
              fill: false,
              borderDash: [5, 5],
            },
            {
              label: "Late",
              data: lateArray,
              fill: false,
              borderDash: [5, 5],
            },
            {
              label: "Absent",
              data: absentArray,
              fill: false,
              borderDash: [5, 5],
            },

        ]
      },
      options: {
          responsive: true,
          hover: {
            mode: 'dataset'
          },
        legend: {
          display: true,
          position: top
        },
          scales: {
              xAxes: [{
                  display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Subjects'
                }
              }],
              yAxes: [{
                  display: true,
                  ticks:{
                          beginAtZero:true
                      },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Occurences'
                }
              }]
          }
      }
  };

  var randomColorFactor = function() {
      return Math.round(Math.random() * 255);
  };
  var randomColor = function(opacity) {
      return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
  };
  $.each(config.data.datasets, function(i, dataset) {
     dataset.borderColor = randomColor(0.4);
     dataset.backgroundColor = randomColor(0.5);
     dataset.pointBorderColor = randomColor(0.7);
     dataset.pointBackgroundColor = randomColor(0.5);
     dataset.pointBorderWidth = 1;
  });


  const ctx = document.getElementById("searchClass").getContext("2d");
    ctx.clearRect(0, 0, ctx.width, ctx.height);
  const myBarChart = new Chart(ctx, config);
  myBarChart.update();
    });
  });

});
