var totalScore = 0;

var compare = function(playerChoice, computerChoice) {
  var result = "";
  if (playerChoice === computerChoice) {
    // do nothing
    return result;
  } else {
    if (playerChoice == "rock") {
      result = computerChoice === "scissors" ? "lose" : "win";
    } else if (playerChoice == "scissors") {
      result = computerChoice == "paper" ? "lose" : "win";
    } else {
      result = computerChoice == "rock" ? "lose" : "win";
    }
    $("#resultText").text(result);
    return result;
  }
}

var caliculator = function(result) {
  totalScore = result === "win" ? totalScore + 100 : totalScore - 100;
}

function makeComputerChoice() {
  var computerChoice = Math.random();
  if (computerChoice < 0.34) {
    computerChoice = "rock";
  } else if(computerChoice <= 0.67) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }
  $("#computer").attr("src", "img/" + computerChoice + ".png");
  return computerChoice;
}

$(document).ready(function() {
  $(".imgContain").click(function() {
    if (totalScore < 100) {
      var playerId = this.id;
      var result = compare(playerId, makeComputerChoice());
      console.log(totalScore);
      caliculator(result);
    } else {
      $("#resultText").text("finish");
    }
  });
});
