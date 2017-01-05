<?php
$connection = mysqli_connect('127.0.0.1','root','admin',"janken") or die("Error " . mysqli_error($connection));
$sql = "select * from new_score order by score DESC limit 100";
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
