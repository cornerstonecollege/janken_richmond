var name;
var j_token_val;
var score = 0;

$(window).ready(function() {
    $("#btnEnd").hide();
    // $('.selectImages').hide();
    console.log("hi");
    document.getElementById("yourName1").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
    document.getElementById("Score1").innerHTML = "";
    document.getElementById("End").innerHTML = "";
    name = get_name();
    document.getElementById("yourName1").innerHTML = name;
    $('.selectImages').slideDown(1000);
    $("#btnEnd").show();
    $('#btnEnd').click(function() {
        document.getElementById("End").innerHTML = "<p>Game End</p>";
        // $('.selectImages').hide();
        $("#btnEnd").hide();
    });
});


function get_name() {
  if (typeof(Storage) !== "undefined") {
    var existing_name = localStorage.getItem("lastname")
      if(existing_name){
        document.getElementById("Result").innerHTML = existing_name;
        return existing_name;
      }else{
        var new_name = prompt("Please enter your name");
        j_token_val = token();
         localStorage.setItem("j_token", j_token_val);
         localStorage.setItem("lastname", new_name);
         document.getElementById("Result").innerHTML = new_name;
         return new_name;
      }
  } else {
      document.getElementById("Result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

// make token
var rand = function() {
    return Math.random().toString(36).substr(2);
};
var token = function() {
    return rand() + rand();
};

function game(personAnswer) {
    var result = "";
    var janken = ["Rock", "Scissors", "Pepar"];
    var computerAnswer = janken[Math.floor(Math.random() * janken.length)]; //Computer pic one of those from array
    document.getElementById("imgComputer").src = "img/" + computerAnswer + ".png"; //Show image of computer's answer
    document.getElementById("imgPerson").src = "img/" + personAnswer + ".png"; //Show image of your answer
    result = judge(personAnswer, computerAnswer);
    console.log("result = " + result);
    if (result == "Win") {
        score = score + 100;
    }
    if (result == "Lose") {
        score = score - 100;
    }
    document.getElementById("Result").innerHTML = personAnswer + "!! " + result;
    document.getElementById("Score1").innerHTML = score;
    // document.getElementById("Score2").value = score;
    post();
}
//Compare personAnswer and computerAnswer
function judge(personAnswer, computerAnswer) {
    if (personAnswer == computerAnswer) {
        result = "Tie";
    }
    if (personAnswer == "Rock") {
        if (computerAnswer == "Scissors") {
            result = "Win";
        } else {
            result = "Lose";
        }
    }
    if (personAnswer == "Scissors") {
        if (computerAnswer == "Rock") {
            result = "Lose";
        } else {
            result = "Win";
        }
    }
    if (personAnswer == "Pepar") {
        if (computerAnswer == "Rock") {
            result = "Win";
        } else {
            result = "Lose";
        }
    }
    return result;
}
//post to server
function post() {
    $(function() {
        var request;
        request = $.ajax({
            url: 'http://192.168.0.15/php/insert_jresult.php',
            method: 'post',
            data: {
                'janken_name': name,
                'janken_score': score,
                'janken_token': j_token_val
            },
            success: function(result) {
                $("#result")
                    .html("Data has sent!!!")
                    .addClass("bg-success");
            }
        });
    });
}

// view score
$(function() {
    $("#load").on("click", function() {
        $.getJSON("http://192.168.0.15/php/ScoreTable.php", function(data) {
            for (var i in data) {
                var tr = $("<tr>");
                var td_data = $("<td>").text(data[i].id);
                tr.append(td_data);
                var td_name = $("<td>").text(data[i].name);
                tr.append(td_name);
                var td_score = $("<td>").text(data[i].score);
                tr.append(td_score);
                $("tbody").append(tr);
                $("#load").hide();
            }
        });
    });
});
