//Initialize Firebase

$(document).ready(function() {

var config = {
    apiKey: "AIzaSyBemrO8C4qMXAEqaHdWB9D9H8pa7ewMTrE",
    authDomain: "trainscheduler-18d12.firebaseapp.com",
    databaseURL: "https://trainscheduler-18d12.firebaseio.com/",
    projectId: "trainscheduler-18d12",
    storageBucket: "gs://trainscheduler-18d12.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

//setting up add train button

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

//Grabbing user input

var trainName = $("#train-name-input").val().trim();
var trainDest = $("#dest-input").val().trim();
var firstTrain = $("#firstTrain-input").val().trim();
var trainFrequency = $("#freq-input").val().trim();

//Creating a temporary object to hold the new train data

var newTrain = {
    name: trainName,
    destination: trainDest,
    start: firstTrain,
    frequency: trainFrequency
};

//Method to upload the train data to the database

database.ref().push(newTrain);

//setting up an alert to confirm train has been added

alert("Train succesfully added");

//Clearing all of the text-boxes, resetting the form

$("#train-name-input").val("");
$("#dest-input").val("");
$("#firstTrain-input").val("");
$("#freq-input").val("");
});

//Creating a FireBase event to add a train to database and a row in html when user
//adds new train

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

//Storing everything to their variables

var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().start;
var trainFrequency = childSnapshot.val().frequency;

// Declare variable
var trainFrequency;

// Time is to be entered on the entry form
  var firstTime = 0;

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequency + 
"</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

});