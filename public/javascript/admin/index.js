"use strict";
$(document).ready(function() {

  const randomColorFactor = function() {
      return Math.round(Math.random() * 255);
  };
  const randomColor = function(opacity) {
      return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
  };

$.ajax({
    type: 'GET',
    url: '/absenceAllYears',
    dataType: 'JSON'
}).done(function(attendance) {

  console.log(attendance);

    // create some arrays for our graph
    const labels = [];
    const dataArray = [];

    $.each(attendance, function(){
        labels.push(this.Student_Year);
        dataArray.push(this.Attendance_Count);
    });


    const config = {
    type: 'bar',
    data: {
        labels,
        datasets: [
          {
            label: "Absent",
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

$.each(config.data.datasets, function(i, dataset) {
   dataset.borderColor = randomColor(0.4);
   dataset.backgroundColor = randomColor(0.5);
   dataset.pointBorderColor = randomColor(0.7);
   dataset.pointBackgroundColor = randomColor(0.5);
   dataset.pointBorderWidth = 1;
});
const ctx = document.getElementById("totalAbsencesAllYears").getContext("2d");
const myBarChart = new Chart(ctx, config);
myBarChart.update();
});


$.ajax({
    type: 'GET',
    url: '/totalStudents',
    dataType: 'JSON'
}).done(function(attendance) {

  console.log(attendance);

    // create some arrays for our graph
    const labels = [];
    const dataArray = [];

    $.each(attendance, function(){
        labels.push(this.Student_Year);
        dataArray.push(this.Number_Of_Students);
    });


    const config = {
    type: 'bar',
    data: {
        labels,
        datasets: [
          {
            label: "Absent",
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

$.each(config.data.datasets, function(i, dataset) {
   dataset.borderColor = randomColor(0.4);
   dataset.backgroundColor = randomColor(0.5);
   dataset.pointBorderColor = randomColor(0.7);
   dataset.pointBackgroundColor = randomColor(0.5);
   dataset.pointBorderWidth = 1;
});
const ctx = document.getElementById("searchClass").getContext("2d");
const myBarChart = new Chart(ctx, config);
myBarChart.update();
});

$.ajax({
    type: 'GET',
    url: '/absencesPerSubject',
    dataType: 'JSON'
}).done(function(attendance) {

  console.log(attendance);

    // create some arrays for our graph
    const labels = [];
    const dataArray = [];

    $.each(attendance, function(){
        labels.push(this.Subject_Name);
        dataArray.push(this.Attendance_Count);
    });


    const config = {
    type: 'bar',
    data: {
        labels,
        datasets: [
          {
            label: "Absent",
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

$.each(config.data.datasets, function(i, dataset) {
   dataset.borderColor = randomColor(0.4);
   dataset.backgroundColor = randomColor(0.5);
   dataset.pointBorderColor = randomColor(0.7);
   dataset.pointBackgroundColor = randomColor(0.5);
   dataset.pointBorderWidth = 1;
});
const ctx = document.getElementById("totalAbsencesAllSubjects").getContext("2d");
const myBarChart = new Chart(ctx, config);
myBarChart.update();
});

$.ajax({
    type: 'GET',
    url: '/mostPopularTruenters',
    dataType: 'JSON'
}).done(function(response) {
  let tableContent;
  tableContent= $('<tbody></tbody>');

  $.each(response, function(){

    tableContent.append(
                        `<tr>
                        <th><span rel="${this.Student_ID}" id="${this.Student_ID}" scope="row"">${this.Student_ID}</th>
                        <td>${this.Student_Name}</td>
                        <td>${this.Attendance_Count}</td>
                        <td><button type="button" id="${this.Student_ID}" class="btn btn-primary">Profile</button></td>
                        </tr>`
                    );

  });
// Inject the whole content string into our existing HTML table
$('#studentList table').append(tableContent);
  //tableContent.empty();

});

});
