<?php
function db(){
	// try {
	//   $conn = new PDO("mysql:host=localhost","root","");
	//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//   return $conn;
	// } catch(PDOException $e) {
	//   die("db error");
	// }
	$conn = new mysqli('localhost', 'root', '', 'railway');
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} else {
		return $conn;
	}
}

?>
