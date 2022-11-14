var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;

$(document).keypress(function(event) {
  if (event.key = "a" && level === 0) {
    nextSequence();
    }
})

$(".btn").click(function() {
  // var userChosenColor = event.target.id;
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];

  gamePattern.push(randomChosenColor)
  $("#"+randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level "+level);
}

function playSound(name) {
  var soundPlay = new Audio("sounds/"+name+".mp3");
  soundPlay.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout( function() {
    $("#"+currentColor).delay(100).removeClass("pressed");
    }, 100 );
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document).keypress(function() {
      StartOver();
    }
    );
  }
}

function StartOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  // $("h1").text("Press A Key to Start");
  nextSequence();
}
