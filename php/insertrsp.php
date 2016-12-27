
<?php
# To Confirm from Javascript library
if (! isset($_SERVER['HTTP_X_REQUESTED_WITH']) ||
	$_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
	die(json_encode(array('status' => "This call is not allowded")));
}
# DB
$connection = mysqli_connect('127.0.0.1','root','admin',"janken") or die("Error " . mysqli_error($connection));
$sql = "select * from score";

# Escape user inputs for security
$janken_name = mysqli_real_escape_string($connection, $_POST['name']);
$janken_score = mysqli_real_escape_string($connection, $_POST['score']);

$sql = "INSERT INTO Janken (id, name, score)
VALUES (NULL, '$janken_name', '$janekn_score')";

if(mysqli_query($connection, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($connection);
}

// close connection
mysqli_close($connection);
?>
