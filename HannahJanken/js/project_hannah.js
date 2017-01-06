var j_token_val;
var name;
var score = 0;

function get_name() {
  if (typeof(Storage) !== "undefined") {
    var existing_name = localStorage.getItem("lastgname")
      if(existing_name){
        document.getElementById("Result").innerHTML = existing_name;
        return existing_name;
      }else{
        var new_name = prompt("Please enter your name");
        j_token_val = token();
         localStorage.setItem("j_token", j_token_val);
         localStorage.setItem("lastname", new_name);
         document.getElementById("Result").innerHTML = new_name;
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

$(function() {
    $("#btnEnd").hide();
    $('.selectImages').hide();
    $('#btnStart').click(function() {
        document.getElementById("yourName1").innerHTML = "";
        document.getElementById("yourName2").innerHTML = "";
        document.getElementById("Result").innerHTML = "";
        document.getElementById("Score1").innerHTML = "";
        document.getElementById("Score2").value = "";
        document.getElementById("End").innerHTML = "";
        name = get_name();
        document.getElementById("yourName1").innerHTML = name;
        document.getElementById("yourName2").value = name;
        $('.selectImages').slideDown(1000);
        $("#btnEnd").show();
    });
    $('#btnEnd').click(function() {
        document.getElementById("End").innerHTML = "<p>Game End</p>";
        $('.selectImages').hide();
        $("#btnEnd").hide();
    });
});

function game(personAnswer) {
    while (-300 < score && score < 300) {
        var result = "";
        var janken = ["Rock", "Scissors", "Pepar"];
        var computerAnswer = janken[Math.floor(Math.random() * janken.length)]; //Computer pic one of those from array
        document.getElementById("imgComputer").src = "img/" + computerAnswer + ".png"; //Show image of computer's answer
        document.getElementById("imgPerson").src = "img/" + personAnswer + ".png"; //Show image of computer's answer
        if (personAnswer == computerAnswer) {
            result = "Tie";
        }
        if (personAnswer == "Rock") {
            if (computerAnswer == "Scissors") {
                result = "Win";
            }
            if (computerAnswer == "Pepar") {
                result = "Lose";
            }
        }
        if (personAnswer == "Scissors") {
            if (computerAnswer == "Rock") {
                result = "Lose";
            }
            if (computerAnswer == "Pepar") {
                result = "Win";
            }
        }
        if (personAnswer == "Pepar") {
            if (computerAnswer == "Rock") {
                result = "Win";
            }
            if (computerAnswer == "Scissors") {
                result = "Lose";
            }
        }
        if (result == "Win") {
            score = score + 100;
        }
        if (result == "Lose") {
            score = score - 100;
        }
        document.getElementById("Result").innerHTML = personAnswer + "!! " + result;
        document.getElementById("Score1").innerHTML = score;
        document.getElementById("Score2").value = score;
        break;
    }
    if (-300 == score || score == 300) { // if score is 300 or -300 game end
        document.getElementById("End").innerHTML = "<p>Game End</p>";
    }
}

$("#send").on("click", function(){
    var dataInsert = {
        'janken_name': name,
        'janken_score': score,
        'janken_token': j_token_val
    };
    btnSend(dataInsert);
});

function btnSend(datas) {
    $.ajax({
        type:"POST",
        url:"http://192.168.0.15/php/insert_jresult.php",
        data:datas,
        dataType: "json",
        success: function(json_data) {
            if (!json_data[0]) {
                return;
            }
            // console.log(json_data);
        },
        error: function() {
            // alert("Server Error. Pleasy try again later.");
        },
        complete: function() {
            // alert("Complete!");
        }
    });
}


// view score
$(function() {
    $("#load").on("click", function() {
        $.getJSON("http://192.168.0.21/rsp.php", function(data) {
            for (var i in data) {
                var tr = $("<tr>");
                var td_data = $("<td>").text("data[i]".id);
                tr.append(td_data);
                var td_name = $("<td>").text("data[i]".name);
                tr.append(td_name);
                var td_score = $("<td>").text("data[i]".score);
                tr.append(td_score);
                $("tbody").append(tr);
                $("#load").hide();
            }
        });
    });
});
// Bucket Sort
function btnBucket() {
    var bucket = [];
    var sortData = [];
    var max = 11; //number of buckets
    for (var i = 0; i < max; i++) { // create max numbert of buckets
        bucket[i] = "";
    }
    for (var i = 0; i < bucket.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (i == data[j]) {
                bucket[i] = data[j];
            }
        }
    }
    for (var i = 0; i < bucket.length; i++) {
        if (bucket[i] != "") {
            sortData.push(bucket[i]);
        }
    }
    console.log("data : " + data);
    console.log("sortData : " + sortData);
}

// Merge Sort (only work for 8 data,,,)
function btnMerge() {
    var leftSlice = data.slice(0, data.length / 2); //divid half
    var rightSlice = data.slice(data.length / 2, data.length);

    function mergeSortLeft() {
        var result = [];
        var slice1 = leftSlice.slice(0, leftSlice.length / 2);
        var slice2 = leftSlice.slice(leftSlice.length / 2, leftSlice.length);
        if (slice1.length <= 2) { // conpair slice[0] & slice[1]
            slice1[0] < slice1[1] ? result.push(slice1[0], slice1[1]) : result.push(slice1[1], slice1[0]);
            slice2[0] < slice2[1] ? result.push(slice2[0], slice2[1]) : result.push(slice2[1], slice2[0]);
            leftSlice = result;
            return leftSlice;
        }
    }

    function mergeSortRight() {
        var result = [];
        var slice1 = rightSlice.slice(0, rightSlice.length / 2);
        var slice2 = rightSlice.slice(rightSlice.length / 2, rightSlice.length);
        if (slice1.length <= 2) {
            slice1[0] < slice1[1] ? result.push(slice1[0], slice1[1]) : result.push(slice1[1], slice1[0]);
            slice2[0] < slice2[1] ? result.push(slice2[0], slice2[1]) : result.push(slice2[1], slice2[0]);
            rightSlice = result;
            return rightSlice;
        }
    }
    var left = mergeSortLeft();
    var right = mergeSortRight();
    var sortData = [];
    while (left.length > 0 && right.length > 0) { //if both.length are not 0, conpair left[0] &right[0]
        if (left[0] < right[0]) {
            sortData.push(left.shift()); //add left[0] to sortData[] & delete left[0]
        } else {
            sortData.push(right.shift()); //add right[0] to sortData[] & delete right[0]
        }
    }
    if (left.length == 0) {
        for (var i = 0; right.length > i; i++) {
            sortData.push(right[i]);
        }
    }
    if (right.length == 0) {
        for (var j = 0; left.length > j; j++) {
            sortData.push(left[j]);
        }
    }
    console.log("data : " + data);
    console.log("sortData : " + sortData);
}
