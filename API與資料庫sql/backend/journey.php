<?php
header('Access-Control-Allow-Origin: http://localhost:8081/');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: Get,Post,Delete,Patch');
session_start();

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
		$sql = "SELECT * FROM journey WHERE username=?";
		$stmt = $this->conn->prepare($sql); 
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$idArray = $stmt->get_result();
		if ($idArray->num_rows === 0) {
			http_response_code(404);
			die();
		}
		$idArray = $idArray->fetch_all(MYSQLI_ASSOC); // nested assoc array (id)
		$arr = array(); 
		for ($i = 0; $i < count($idArray); $i++) {
			$sql = "SELECT * FROM schedule WHERE id=?";
			$stmt = $this->conn->prepare($sql); 
			$stmt->bind_param("s", $idArray[$i]["id"]);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 0) {
				http_response_code(500);
				die();
			}
			$result = $result->fetch_assoc();
			$result["child"] = $idArray[$i]["child"];
			$result["adult"] = $idArray[$i]["adult"];
			$result["elder"] = $idArray[$i]["elder"];
			$result = json_encode($result, JSON_UNESCAPED_UNICODE);
			$arr[$i] = $result;
		}
		$arr = json_encode($arr, JSON_UNESCAPED_UNICODE);
		print_r($arr);
	}
	
	function post($array){
		if (!array_key_exists("isLogged", $_SESSION)) {
			http_response_code(403);
			die();
		}

		$cond1 = array_key_exists('trainid', $array);
		$cond2 = array_key_exists('child', $array);
		$cond3 = array_key_exists('adult', $array);
		$cond4 = array_key_exists('elder', $array);

		if ($cond1 and $cond2 and $cond3 and $cond4){
			$sql = "INSERT INTO journey (id, username, child, adult, elder) VALUES (?,?,?,?,?)";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param("sssss", $array["trainid"], $_SESSION['username'], $array["child"], $array["adult"], $array["elder"]);
			$stmt->execute();
			http_response_code(201);
		}else{
			http_response_code(400);
			die();
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
	default:
		http_response_code(405);
}

?>

