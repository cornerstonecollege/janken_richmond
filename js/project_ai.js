
var score = 0;

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

              if (result == "Win"){
                score = score + 100;
              }
              if (result == "Lose"){
                score = score - 100;
              }
              console.log(person + " vs " + com)
              console.log("TotalScore is " + score)
              console.log("You are " + result)
          }
          console.log("fin")
          console.log("TotalScore is " + score)
          console.log("You are " + result)
}
