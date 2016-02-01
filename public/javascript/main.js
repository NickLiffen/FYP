"use strict";
$(document).ready(function() {
var $input = $('#typeahead');

$.get('/getStudent', function(data){
console.log(data);
  //Creates an empty array where Student_ID and Parent_ID is going to go.
  let usernames = [];
    let map = {};

    $.each(data, function (i, username) {
        map[username.Student_Username] = username;
        usernames.push(username.Student_Username + " Year: " + username.Student_Year);
    });

    console.log(usernames);

    $input.typeahead({ source:usernames });
},'json');


});
