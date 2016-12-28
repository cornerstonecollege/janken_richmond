var score = 0;

var compare = function (choice1, choice2) {
    if (choice1 === choice2) {
        return "tie";
    } else if (choice1 === "rock") {
        if (choice2 === "scissors") {
            score += 100;
        } else {
            score -= 100;
        }
    } else if (choice1 === "paper") {
        if (choice2 === "rock") {
            score += 100;
        } else {
            score -= 100;
        }
    } else if (choice1 === "scissors") {
        if (choice2 === "paper") {
            score += 100;
        } else {
            score -= 100;
        }
    }
}

function rps(choice) {
    while (-300 < score && score < 300) {

        var playerChoice = choice;

        var computerChoice = Math.random();
        if (computerChoice < 0.34) {
            computerChoice = "rock";
        } else if (computerChoice < 0.67) {
            computerChoice = "paper";
        } else {
            computerChoice = "scissors";
        }
        document.getElementById("imgComputer").src = "img/" + computerChoice + ".jpg";
        compare(playerChoice, computerChoice);
        document.getElementById("scoreBoard").innerHTML = "<h1>SCORE: " + score + "</h1>";
        if (score == 300) {
            document.getElementById("scoreBoard").innerHTML = "<h1>WIN</h1>";
        } else if (score == -300) {
            document.getElementById("scoreBoard").innerHTML = "<h1>LOSE</h1>";
        }
        break;
    }
}