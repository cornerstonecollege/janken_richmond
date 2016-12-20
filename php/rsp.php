<?php
# To Confirm from Javascript library
if (! isset($_SERVER['HTTP_X_REQUESTED_WITH']) ||
	$_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
	die(json_encode(array('status' => "This call is not allowded")));
}
# DB
$connection = mysqli_connect('127.0.0.1','root','admin',"janken") or die("Error " . mysqli_error($connection));
$sql = "select * from score";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();

 while($row =mysqli_fetch_assoc($result))
 {
     $emparray[] = $row;
 }

 echo json_encode($emparray);

 # close the db connection
 mysqli_close($connection);
?>
