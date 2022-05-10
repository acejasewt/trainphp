<?php
if (!isset($_SESSION)){
	session_start();
};
class userinfo{
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}
	
	function get(){
		if (!array_key_exists("isLogged", $_SESSION)) {
			http_response_code(403);
			die();
		}
		$username = $_SESSION["username"];
		$password = $_SESSION["password"];
		$sql = "SELECT * FROM userinfo WHERE username=? AND password=?";
		$stmt = $this->conn->prepare($sql); 
		$stmt->bind_param("ss", $username, $password);
		$stmt->execute();
		$result = $stmt->get_result();
		$result = $result->fetch_assoc();
		return json_encode($result);
	}
	
	function post($array){
		$cond1 = array_key_exists('username', $array);
		$cond2 = array_key_exists('password', $array);
		$cond3 = array_key_exists('real_name', $array);
		$cond4 = array_key_exists('mail', $array);
		$cond5 = array_key_exists('phone', $array);
		if ($cond1 and $cond2 and $cond3 and $cond4 and $cond5) {
			$sql = "SELECT * FROM userinfo WHERE username=?";
			$stmt = $this->conn->prepare($sql); 
			$stmt->bind_param("s", $array["username"]);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 0) {
				$sql = "INSERT INTO userinfo (username, password, real_name, mail, phone) VALUES (?, ?, ?, ?, ?)";
				$stmt = $this->conn->prepare($sql);
				$stmt->bind_param("sssss", $array["username"],$array["password"],$array["real_name"],$array["mail"],$array["phone"]);
				$stmt->execute();
				http_response_code(201);
			} else {
				http_response_code(409);
				// 帳號已存在(conflict)
			}
		} else {
			http_response_code(400);
			// missing value
		}
	}
	
	function patch($array){
		$cond1 = array_key_exists('username', $array);
		$cond2 = array_key_exists('password', $array);
		$cond3 = array_key_exists('real_name', $array);
		$cond4 = array_key_exists('mail', $array);
		$cond5 = array_key_exists('phone', $array);
		if ($cond1 and $cond2 and $cond3 and $cond4 and $cond5) {
			if (array_key_exists("isLogged", $_SESSION)) {
				$sql = "UPDATE userinfo SET username=?, password=?, real_name=?, mail=?, phone=? WHERE username=? AND password=?";
				$stmt = $this->conn->prepare($sql); 
				// 前面5個是set的參數，後面兩個是where的參數
				$stmt->bind_param(
					"sssssss",
					$array["username"],
					$array["password"],
					$array["real_name"],
					$array["mail"],
					$array["phone"],
					$_SESSION['username'],
					$_SESSION['password']
				);
				$stmt->execute();
				$sql = "UPDATE journey SET username=? WHERE username=?";
				$stmt = $this->conn->prepare($sql); 
				$stmt->bind_param(
					"ss",
					$array["username"],
					$_SESSION['username']
				);
				$stmt->execute();
				unset($_SESSION["username"]);
				unset($_SESSION["password"]);
				$_SESSION["username"] = $array["username"];
				$_SESSION["password"] = $array["password"];
			} else {
				http_response_code(403);
			}
		} else {
			http_response_code(400);
			// missing value
		}
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php"); // include db function (return conn Object)
$model = new userinfo(db()); // call the function as the constructor
switch ($_SERVER["REQUEST_METHOD"]) {
	case "GET":
		echo $model->get();
		break;
	case "POST":
		$array = $_POST;
		//$entityBody = file_get_contents('php://input'); // get req body
		//$array = json_decode($entityBody, true);
		echo $model->post($array);
		break;
	case "PATCH":
		//$entityBody = file_get_contents('php://input'); // get req body
		parse_str(file_get_contents('php://input'), $_PATCH);
		//$array = json_decode($entityBody, true);
		echo $model->patch($_PATCH);
		break;
	default:
		http_response_code(405);
}

?>

