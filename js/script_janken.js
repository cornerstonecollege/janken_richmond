//animation for computer image
var images = ["rock", "scissors", "paper"];
var index = 0;
var clickAnswer = "false";
var serverUrl = "http://192.168.0.15/";
setInterval(changeImage, 100);

function changeImage() {
    if (clickAnswer == "false") {
        document.getElementById("imgComputer").src = "img/" + images[index] + ".png";
        index++;
        if (index >= images.length) {
            index = 0;
        }
    }
}
//clickAnswer = "true" --> "false" after 7 seconds and animation will start
function startchangeImage() {
    global_timeout = setTimeout(function() {
        clickAnswer = "false";
    }, 7000);
}

var global_timeout;
var name;
var j_token_val;
var score = 0;

$(window).ready(function() {
    $("#btnEnd").hide();
    document.getElementById("yourName1").innerHTML = "";
    document.getElementById("Score1").innerHTML = "";
    document.getElementById("End").innerHTML = "";
    name = get_name();
    document.getElementById("yourName1").innerHTML = name;
    get_score();
    document.getElementById("Score1").innerHTML = score;
    get_all_score();
    $('.selectImages').slideDown(1000);
    $("#btnEnd").show();
    $('#btnEnd').click(function() {
        document.getElementById("End").innerHTML = "<p>Game End</p>";
        $("#btnEnd").hide();
    });
});

$(window).ready(function() {
    $('.btn-logout').click(function() {
        localStorage.removeItem("lastname");
        localStorage.removeItem("j_token");
        name = get_name();
        score = 0;
        document.getElementById("Score1").innerHTML = 0;
    });
});

function get_name() {
  if (typeof(Storage) !== "undefined") {
    var existing_name = localStorage.getItem("lastname")
      if(existing_name){
        j_token_val = localStorage.getItem("j_token")
        document.getElementById("yourName1").innerHTML = existing_name;
        return existing_name;
      }else{
        var new_name_boo = true;
        do {
            var new_name = prompt("Please enter your name");
            if (new_name === "") {
                // user pressed OK, but the input field was empty
            } else if (new_name) {
                // user typed something and hit OK
                new_name_boo = false;
            } else {
                // user hit cancel
            }
        } while (new_name_boo);
        j_token_val = token();
        localStorage.setItem("j_token", j_token_val);
        localStorage.setItem("lastname", new_name);
        document.getElementById("yourName1").innerHTML = new_name;
        return new_name;
      }
  } else {
      // document.getElementById("Result").innerHTML = "Sorry, your browser does not support Web Storage...";
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
    clickAnswer = "true";//stop animation for computer image
    clearTimeout(global_timeout);
    startchangeImage();
    var janken = ["rock", "scissors", "paper"];
    var computerAnswer = janken[Math.floor(Math.random() * janken.length)]; //Computer pic one of those from array
    var x = document.getElementsByClassName("pChoice");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.width = "80%";
    }
    document.getElementById("imgComputer").src = "img/" + computerAnswer + ".png"; //Show image of computer's answer
    document.getElementById("imgComputer").style.width = "30%";
    var element = document.getElementById('' + personAnswer).style.width = "100%";
    var result = judge(personAnswer, computerAnswer);
    if (result == "Win") {
        score = score + 100;
    }
    if (result == "Lose") {
        score = score - 100;
    }
    document.getElementById("Score1").innerHTML = score;
    post();
}
//Compare personAnswer and computerAnswer
function judge(personAnswer, computerAnswer) {
    var result = "";
    if (personAnswer == computerAnswer) {
        return result = "Tie";
    }
    if (personAnswer == "rock") {
        if (computerAnswer == "scissors") {
            result = "Win";
        } else {
            result = "Lose";
        }
    }
    if (personAnswer == "scissors") {
        if (computerAnswer == "rock") {
            result = "Lose";
        } else {
            result = "Win";
        }
    }
    if (personAnswer == "paper") {
        if (computerAnswer == "rock") {
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
            url: serverUrl + 'php/insert_jresult.php',
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
                get_all_score();
            }
        });
    });
}

function get_score(){
    $.ajax({
        url: serverUrl+'php/ScoreTable.php',
        method: 'post',
        dataType: 'json',
        data: {
            'janken_name': name,
            'janken_token': j_token_val
        },
        success: function(data) {
            if(data[0].score !== undefined){
                document.getElementById("Score1").innerHTML = data[0].score;
            }else{
                document.getElementById("Score1").innerHTML = 0;
            }
        }
    });
}
function get_all_score(){
    $.getJSON(serverUrl+"php/ScoreTable.php", function(data) {
        $('tr.add').remove();
        for (var i in data) {
            var tr = $("<tr class='add'>");
            var td_data = $("<td>").text(data[i].rank);
            tr.append(td_data);
            var td_name = $("<td>").text(data[i].name);
            tr.append(td_name);
            var td_score = $("<td>").text(data[i].score);
            tr.append(td_score);
            $("tbody").append(tr);
        }
    });
}
