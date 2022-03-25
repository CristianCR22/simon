var gamePattern = [];
var userClickedPattern = [];
var newGame = 0;
var level = -1;
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  flashButton(randomChosenColour);
  playSound(randomChosenColour);
  userClickedPattern = [];
}

$(".btn").click(function() {
  if (gamePattern.length == 0) {
    alert("Press a key to start.");
  } else {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    flashButton(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userChosenColour);
  }

})

function flashButton(name) {
  var randomButtonSelected = "." + name;
  $(randomButtonSelected).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name, flash) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

$(document).keypress(function(event) {
  if (newGame == 0) {
    nextSequence();
    newGame++

  } else {
    console.log("Not first keypress.");
  }

});

function checkAnswer() {
  var currentLevel = (userClickedPattern.length) - 1;
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel] && currentLevel == level) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  } else if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  level = -1
  newGame = 0
}
