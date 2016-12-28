var score = 0;
function game(personAnswer){
  while(-300 < score && score < 300){// -200 to 200
    var result = "";
    var janken = ["Rock","Scissors","Pepar"];
    var computerAnswer = janken[Math.floor( Math.random() * janken.length)];
    document.getElementById("imgComputer").src = "img/" + computerAnswer + ".png";
    if(personAnswer == null){
      result = ("done");
      break;
    }
    if(personAnswer == computerAnswer){
      result = "Even";
    }
    if(personAnswer == "Rock"){
      if(computerAnswer == "Scissors"){
        result = "Win";
      }
      if(computerAnswer == "Pepar"){
        result = "Lose";
      }
    }
    if(personAnswer == "Scissors"){
      if(computerAnswer == "Rock"){
        result = "Lose";
      }
      if(computerAnswer == "Pepar"){
        result = "Win";
      }
    }
    if(personAnswer == "Pepar"){
      if(computerAnswer == "Rock"){
        result = "Win";
      }
      if(computerAnswer == "Scissors"){
        result = "Lose";
      }
    }
    if(result == "Win"){
      score = score + 100;
    }
    if (result == "Lose"){
      score = score - 100;
    }
    document.getElementById("Result").innerHTML = "<p>" + personAnswer + "!! " + result + "</p>";
    document.getElementById("Score").innerHTML = "<p>TotalScore : " + score + "</p>";
    break;
  }
  if(-300 == score || score == 300){
    document.getElementById("End").innerHTML = "<p>Game End</p>";
  }
}

<<<<<<< HEAD
        function game(){
          while(score < 300 || score < -300){
            var result = 0;
            var person = prompt("Rock? Scissors? Pepar?");
            var j = ["Rock","Scissors","Pepar"];
            var com = j[ Math.floor( Math.random() * j.length ) ] ;
            console.log(com);

                 break;
              if (person == "B"){
                result = ("done")
                 break;
              }
              // if (person != ("Rock" && "Scissors" && "Pepar" && "B")){
              //   console.log("Wrong!")
              //   break;
              // }
            // even
              if(person == com){
                result = "Even";
              }
              //if "Rock"
              if(person == "Rock"){
                if(com == "Scissors"){
                  result = "Win";
                }
                if(com == "Pepar"){
                  result = "Lose";
                }
              }
              //if "Scissors"
              if(person == "Scissors"){
                if(com == "Rock"){
                  result = "Lose";
                }
                if(com == "Pepar"){
                  result = "Win";
                }
              }
              //if "Peper"
              if(person == "Pepar"){
                if(com == "Rock"){
                  result = "Win";
                }
                if(com == "Scissors"){
                  result = "Lose";
                }
              }
=======

>>>>>>> cornerstonecollege/master

// console.log("TotalScore is " + score)
// console.log("You are " + result)
// document.getElementById("End").innerHTML = "<p>END</p>";
