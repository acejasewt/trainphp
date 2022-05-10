<?php
if (!isset($_SESSION)){
	session_start();
};
class userinfo{
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}
	
	function find($id) {
		if (!array_key_exists("isLogged", $_SESSION)) {
			http_response_code(403);
			die();
		}
		$sql = "SELECT * FROM schedule WHERE id=?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$result = $stmt->get_result();
		$result = $result->fetch_assoc();
		$result['username'] = $_SESSION["username"];
		$result = json_encode($result);
		print_r($result);
	}

	function get(){
		$cond1 = array_key_exists('start_time', $_GET);
		$cond2 = array_key_exists('departure', $_GET);
		$cond3 = array_key_exists('destination', $_GET);
		$hour = explode(':',$_GET["start_time"])[0];
		$intHour = intval($hour);
		if (is_numeric($hour) and 24 > $intHour and $intHour >= 0) {
			$sql = "SELECT * FROM schedule WHERE departure=? AND destination=? AND departure_time_h>=?";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param("ssi", $_GET["departure"], $_GET['destination'], $intHour);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 0) {
				http_response_code(404);
			} else {
				$result = $result->fetch_all(MYSQLI_ASSOC); // nested assoc array
				for ($i = 0; $i < count($result); $i++) {
					$result[$i] = json_encode($result[$i], JSON_UNESCAPED_UNICODE);
				};
				$result = json_encode($result, JSON_UNESCAPED_UNICODE);
				print_r($result);
			}
		} else {
			http_response_code(400);
		}
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php"); // include db function (return conn Object)
$model = new userinfo(db()); // call the function as the constructor
switch ($_SERVER["REQUEST_METHOD"]) {
	case "GET":
		if (array_key_exists("trainid", $_GET)) {
			echo $model->find($_GET["trainid"]);
		} else {
			echo $model->get();
		}
		break;
	default:
		http_response_code(405);
}

?>

