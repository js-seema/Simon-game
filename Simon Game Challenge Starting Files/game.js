gamePattern = [];
level = 0;
// userClickedPattern = [];
buttonColors= ["red", "blue", "green", "yellow" ];
start = false;
// alert('Present custom js')
function nextSequence(){
  userClickedPattern = [];
  random = Math.random() * 4;
  random = Math.floor(random);
  console.log(random);
  $('h1').text("level "+level);
  level++;
  return random;
}

function randomChosenColor(){
  i = nextSequence();
  color= buttonColors[i];
  gamePattern.push(color);
  console.log(color);
  return color;
}

function buttonFlash(){
  buttonColor=randomChosenColor();
  $('#'+buttonColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(buttonColor);
  return buttonColor;
}
// buttonFlash();


function playSound(name){
  audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(color){
  $('#'+color).addClass("pressed");
  setTimeout(function (){
    $('#'+color).removeClass("pressed");
  },100);
}



$(document).keypress(function(){
if(!start){
  buttonFlash();
  start=true;
  }
});


$(".btn").click(function(){
if(start){
    userChosenColor= this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
  }
});

function checkAnswer(chkLevel){
if(userClickedPattern[chkLevel]===gamePattern[chkLevel]){
  console.log("success");
  if (userClickedPattern.length===gamePattern.length) {
    setTimeout(function(){
      buttonFlash();
    },1000);
  }
}
else {
  $('body').addClass("game-over");
  setTimeout(function(){
    $('body').removeClass("game-over");
    playSound("wrong");
    console.log("wrong");
    $('h1').text("Game Over, Press Any Key to Restart")
    startOver();
  },200);
}
}

function startOver(){
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
  // buttonColors= ["red", "blue", "green", "yellow" ];
  start = false;
}
