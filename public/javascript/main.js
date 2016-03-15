"use strict";
$(document).ready(function() {
var $input = $('#typeahead');

$.get('/getStudent', function(data){
  //Creates an empty array where Student_ID and Parent_ID is going to go.
  let usernames = [];
    let map = {};

    $.each(data, function (i, username) {
        map[username.Student_Username] = username;
        let newName = username.Student_Username.replace(/([a-z])([A-Z])/g, '$1 $2');

        usernames.push(`#${username.Student_ID} ${newName} Year: ${username.Student_Year}`);
    });

    $input.typeahead({ source:usernames });
},'json');


$("#searchForm").submit(function(event) {
    event.preventDefault();
    let searchValue, userID;

    searchValue = $('#typeahead').val();
    console.log("Search Value" + searchValue);
    if(searchValue === ''){
      console.log("Do Nothing");
    }
    else{
    userID = searchValue.charAt(1);
    window.location.href = `/student/${userID}`;
  }
  });

});
