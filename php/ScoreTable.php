<?php
$connection = mysqli_connect('127.0.0.1','root','admin',"janken") or die("Error " . mysqli_error($connection));

if((!isset($_POST['janken_name']) || $_POST['janken_name'] === '') && (!isset($_POST['janken_token']) || $_POST['janken_token'] === '')){
	$sql = "SELECT name, score, (select count(DISTINCT score) 
	FROM new_score b WHERE a.score < b.score) + 1 rank 
	FROM new_score a 
	ORDER BY rank ASC 
	limit 100";
}else{
	$sql = "SELECT name, score FROM new_score where (name = ".$_POST['janken_name']." and token = ". $_POST['janken_token'] ." )";
}
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
# check result
if (!$result) {
  $message  = 'Invalid query: ' . mysql_error() . "\n";
  die($message);
}

$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
  $emparray[] = $row;
}
echo json_encode($emparray);
# close the db connection
mysqli_close($connection);
?>
