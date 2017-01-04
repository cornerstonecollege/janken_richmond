$(document).ready(function () {
  $("#target").submit(function() {
    var name = $("#janken_name").val();
    var score = $("#janken_score").val();
    if (name == '' || score == '') {
      alert("please check your name and score");
    } else {
      var dataString = 'janken_name=' + name + "&janken_score=" + score;
      $.ajax({
        type: "POST",
        url: "http://192.168.0.15/php/insertrsp.php",
        data: dataString,
        cache: false,
        success: function(result) {
          alert(result);
        }
      });
    }
    return false;
  });
});
