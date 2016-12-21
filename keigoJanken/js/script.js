var button = document.getElementById("botan");

button.onclick = function janken() {

    var playerScore = 0;

    while (-200 < playerScore && playerScore < 200) {
        var playerChoice = prompt("rock, paper, scissors?");

        var computerChoice = Math.random();
        if (0 < computerChoice < 0.3) {
            computerChoice = "rock";
        } else if (0.34 < computerChoice < 0.66) {
            computerChoice = "paper";
        } else {
            computerChoice = "scissors";
        }

        var compare = function (choice1, choice2) {
            if (choice1 === choice2) {
                return "tie";
            } else if (choice1 === "rock") {
                if (choice2 === "scissors") {
                    playerScore += 100;
                } else {
                    playerScore -= 100;
                }
            } else if (choice1 === "paper") {
                if (choice2 === "rock") {
                    playerScore += 100;
                } else {
                    playerScore -= 100;
                }
            } else if (choice1 === "scissors") {
                if (choice2 === "paper") {
                    playerScore += 100;
                } else {
                    playerScore -= 100;
                }
            }
        }
        compare(playerChoice, computerChoice);
        console.log(playerScore);
    }
    document.getElementById("owari").innerHTML = "<h1>END</h1>";
}