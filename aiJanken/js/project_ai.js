var yName = "";

$(window).ready(function() {
    $("#btnEnd").hide();
    $('.selectImages').hide();
    document.getElementById("yourName1").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
    document.getElementById("Score1").innerHTML = "";
    document.getElementById("End").innerHTML = "";
    yName = prompt("Please enter your name", "ai");
    document.getElementById("yourName1").innerHTML = yName;
    $('.selectImages').slideDown(1000);
    $("#btnEnd").show();
    $('#btnEnd').click(function() {
        document.getElementById("End").innerHTML = "<p>Game End</p>";
        $('.selectImages').hide();
        $("#btnEnd").hide();
    });
});

var score = 0;

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
            url: 'http://192.168.0.15/php/insertrsp.php',
            method: 'post',
            data: {
                'janken_name': yName,
                'janken_score': score
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
