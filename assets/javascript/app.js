
//create an animals array
var animals = ["french bulldog", "parakeet","parrot","piglet","chameleon", "black mamba","gold fish","british bulldog","tarsier","killer bees", "koala","kangaroo", "humming bird", "jumping spider", "king crab", "guinea pig", "bald eagle", "polar bear", "penguin"]

//as soon as the html document loads, append the buttons to the animal-buttons div
$(document).ready( function() {

  //iterate through the animals in the list
  animals.forEach(function(element) {
    //console.log(element);
    //crete a button for each animal
    var animalButton = $("<button>").addClass("btn btn-primary animal-button").attr("id", "btn-" + element).val(element).text(element);
    $("#animal-buttons").append(animalButton);

  });
  console.log("I am done with the loop");
});

//add a new animal button whenever it is submiited in the form 
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  //grab the animal that is to be added
  var newAnimal = $("#animalInput").val();

  //if the input text is an empty string or already exists, do nothing 
  if(newAnimal === "" || animals.indexOf(newAnimal) !== -1) {
    //empty the text box
    $("#animalInput").val("");

    return;
  }
  //otherwise, add into the array and add a new button
  else {
    //add the new animal button
    var newAnimalButton = $("<button>").addClass("btn btn-primary animal-button").attr("id", "btn-" + newAnimal).val(newAnimal).text(newAnimal);
    $("#animal-buttons").append(newAnimalButton);
    
    //empty the text box
    $("#animalInput").val("");
  }

});

//add a button click listener to the animal button class
$(document).on("click", ".animal-button", function() {
  //first, empty out whatever is inside the animals div
  $("#animals").empty(); 

  //capture the animal we want to get giphys for
  var animal = $(this).val().split(" ").join("+");
  var giphyAPIKey = "dc6zaTOxFJmzC";
  var resultsLimit = 20;

  //console.log("giphy request : " + animal);

  //generate the query URL
  queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + animal + "&limit=" + resultsLimit;
  
  //ajax call
  $.ajax({
    url : queryURL,
    method : "GET"
  }).done(function(response) {
    console.log(response);

    //var data = response.data;

    console.log(typeof(response));
    console.log(typeof(response.data));

    // for(var i=0; i<response.data.length; i++) {
    //   console.log(response.data[i].embed_url);
    // }

    response.data.forEach(function(element) {
      //create a new div
      var div = $("<div>");

      //add a class to the div
      div.addClass("animal-div");

      //create a new p elememt
      var p = $("<p>");

      //create a new img element
      var img = $("<img>");

      //grab the rating 
      var rating = element.rating;

      //show the rating in the p element
      p.text("Rating : " + rating);

      //add attributes
      img.attr("src", element.images.fixed_height_still.url);
      img.attr("data-still", element.images.fixed_height_still.url);
      img.attr("data-animate", element.images.fixed_height.url);
      img.attr("data-state", "still");

      //add a class
      img.addClass("gif");

      //populate the new div
      div.append(p, img);

      //display the rating and gif inside the animals div
      $("#animals").append(div);
    })
  });
});

//add event listener for gif click events
$(document).on("click", ".gif", function() {
  //get the current data state of the image
  var state = $(this).attr("data-state");
  console.log("I am in the gif click event :" + state);

  //toggle the data state
  if(state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));  
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still")); 
  }
});

