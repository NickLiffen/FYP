"use strict";

$(document).ready(function() {

    //Onclick of the Add Room Bottom show the Add Room Form.
    $('#addRoom').click(function() {
        $('.hideAddRoomForm').toggleClass('showAddRoomForm');
    });

    //Onclick of the View Room Bottom show the Room List.
    $('#viewRoom').click(function() {
        $('.hideViewRoomList').toggleClass('showViewRoomList');
    });

    //AJAX function to go and collect information about all pupils.
    $.ajax({
      type: 'GET',
      url: '/getRoom',
      dataType: 'JSON'
    }).done(function(response){
      console.log(response);

      let tableContent = '';

      $.each(response, function(){

          tableContent += '<tr>';
          tableContent += '<th><span rel="' + this.Room_ID + '" id="' + this.Room_ID + '" scope="row"">' + this.Room_ID + '</th>';
          tableContent += '<td>' + this.Room_Name + '</td>';
          tableContent += '<td>' + this.Rom_Description + '</td>';
          tableContent += '<td><button type="button" id="' + this.Room_ID + '" class="btn btn-primary">Profile</button></td>';
          tableContent += '<td><button type="button" id="' + this.Room_ID + '" class="btn btn-success">Update</button></td>';
          tableContent += '<td><button type="button" id="' + this.Room_ID + '" class="btn btn-warning">Delete</button></td>';
          tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#RoomList table tbody').html(tableContent);
    });

    $('#addRoomForm').submit(function() {
        //Stop the Form from submiting automatically
        event.preventDefault();
        //Declaring varibales
        let newRoom;
        //Creating the new Room object will all information from the form
        newRoom = {
            Room_Name: $('#addRoomForm input#roomName').val(),
            Rom_Description: $('#addRoomForm input#roomDescription').val()
        };

        console.log(newRoom);
        //Send off the AJAX Request to the /pupil route
        $.ajax({
            type: 'POST',
            data: newRoom,
            url: '/room',
            dataType: 'JSON'
        }).done(function() {
            $('#addRoomstatus').html("Room Created Okay");
        });
    });
});
