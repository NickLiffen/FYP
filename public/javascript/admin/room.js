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

      let tableContent;
      tableContent= $('<tbody></tbody>');

      $.each(response, function(){
          tableContent.append(
         `<tr>
          <th><span rel="${this.Room_ID}" id="${this.Room_ID}" scope="row"">${this.Room_ID}</th>
          <td>${this.Room_Name}</td>
          <td>${this.Rom_Description}</td>
          <td><button type="button" id="${this.Room_ID}" value="Profile" class="btn btn-primary">Profile</button></td>
          <td><button type="button" id="${this.Room_ID}" value="Update"  class="btn btn-success">Update</button></td>
          <td><button type="button" id="${this.Room_ID}" value="Delete"  class="btn btn-warning" data-toggle="modal" data-target="#confirm-delete">Delete</button></td>
          </tr>`);
        });
    $('#RoomList table').append(tableContent);
});

$('#RoomList').on('click', '.btn ', function(){
  let roomID = this.id;
  let buttonValue = $(this).attr("value");

  if(buttonValue === "Profile"){
    console.log("Im in Profile");
  }
  else if(buttonValue === "Update"){
    var $target = $('.hideUpdateRoomForm'),
        $toggle = $(this);

    $target.slideToggle(500, function() {
        $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Update');
    });

    $.ajax({
             url: `/room/${roomID}`,
             type: 'GET',
             success: function(result) {
              $('#roomNameUpdate').val(result[0].Room_Name);
              $('#roomDescriptionUpdate').val(result[0].Rom_Description);
             }
           });

           $('#updateRoomForm').submit(function() {
               //Stop the Form from submiting automatically
               event.preventDefault();
               //Declaring varibales
               let newRoom;
               //Creating the new Room object will all information from the form
               newRoom = {
                   Room_Name: $('#updateRoomForm input#roomNameUpdate').val(),
                   Rom_Description: $('#updateRoomForm input#roomDescriptionUpdate').val()
               };

               //Send off the AJAX Request to the /pupil route
               $.ajax({
                   type: 'PATCH',
                   data: newRoom,
                   url: `/room/${roomID}`,
                   dataType: 'JSON'
               }).done(function() {
                   $('#updateRoomstatus').html("Room Update Okay");
               });
           });
  }
  else if(buttonValue === "Delete"){
       $('#confirm-delete').on('show.bs.modal', function() {
         $('.debug-url').html("");
         $("#confirmDelete").click(function(){
           $.ajax({
                    url: `/room/${roomID}`,
                    type: 'DELETE',
                    success: function(result) {
                      if(result[0].Class_ID){
                        $('.debug-url').html(` <strong>Couldn't delete class!!!! Room is in use in Class: ${result[0].Class_ID}. Please change room for this class.</strong>`);
                      }
                      else{
                      console.log(result);
                        $('#confirm-delete').modal('hide');
                        $('#Roomstatus').html("Room Action Completed");
                      }
              }
            });
          });
       });
  }
  else{
    console.log("Theres a Problem");
  }

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
