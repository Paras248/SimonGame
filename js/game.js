var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"]; 

var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function(){
	if(started!=true){
		$("#level-title").text("Level " + level );
		nextSequence();
		started=true;
	}
});

function nextSequence(){
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level "+ level);
	var randomNumber = Math.floor(Math.random()*3);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	
	playSound(randomChosenColour);
	
}

$(".btn").click(function(){
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	animatePress(userChosenColour);
	playSound(userChosenColour);

	checkAnswer(userClickedPattern.length-1);
});


function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");

	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
	},100);
}	

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
		if(gamePattern.length===userClickedPattern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}

	}
	else{
		playSound("wrong");
		
		$("body").addClass("game-over");

		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);

		$("#level-title").text("Game Over, Press Any Key to Restart");

		startOver();
	}
}

function startOver(){
	level = 0;
	started = false;	
	gamePattern = [];
}

