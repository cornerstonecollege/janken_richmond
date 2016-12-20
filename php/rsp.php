<?php
# To Confirm from Javascript library
if (! isset($_SERVER['HTTP_X_REQUESTED_WITH']) ||
	$_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
	die(json_encode(array('status' => "This call is not allowded")));
}
//
# DB
$con = mysqli_connect('192.168.0.21','root@localhost','admin',"janken") or die("Error " . mysqli_error($connection));
$sql = "select * from Score";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();

 while($row =mysqli_fetch_assoc($result))
 {
     $emparray[] = $row;
 }

 echo json_encode($emparray);

 //close the db connection
 mysqli_close($connection);
// $result = mysql_select_db('janken', $con);
// if (!$result) {
//   exit('sorry, we can not select the database');
// }
//
// $result = mysql_query('SET NAMES utg8', $con);
// if (!$result) {
//   exit('unknow utftype was selected');
// }
//
// $result = mysql_query('SELECT * FROM address', $con);
// while ($data = mysql_fetch_array($result)) {
//   $value = array(
//     $data['no'] => array('name' => $data['name'], 'score' => $data['name'])
//   );
//   # Content-Typeを「application/json」に設定します。
//   header("Content-Type: application/json; charset=UTF-8");
//   # IEがContent-Typeヘッダーを無視しないようにします(HTML以外のものをHTML扱いしてしまうことを防ぐため)
//   header("X-Content-Type-Options: nosniff");
//
//   # 可能な限りのエスケープを行い、JSON形式で結果を返します。
//   echo json_encode(
//   	$value,
//   	JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP
//   );
// }
//
// $con = mysql_close($con);
//  if (!$con) {
//    exit('I could not close the connection');
//  }
// // //
// # to insert data from js to DB
// $value = array(
// 	1 => array('item' => '台湾ラーメン', 'price' => 580, 'orders' => 113),
// 	2 => array('item' => '味噌ラーメン', 'price' => 580, 'orders' => 72),
// 	3 => array('item' => 'ニンニクチャーハン', 'price' => 630, 'orders' => 87),
// );
//
// # Content-Typeを「application/json」に設定します。
// header("Content-Type: application/json; charset=UTF-8");
// # IEがContent-Typeヘッダーを無視しないようにします(HTML以外のものをHTML扱いしてしまうことを防ぐため)
// header("X-Content-Type-Options: nosniff");
//
// # 可能な限りのエスケープを行い、JSON形式で結果を返します。
// echo json_encode(
// 	$value,
// 	JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP
// );

?>
