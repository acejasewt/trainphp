<?php

class attraction {
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}
	
	function find($id) {
		$sql = "SELECT * FROM attraction WHERE id=?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$result = $stmt->get_result();
		$result = $result->fetch_assoc();
		$result = json_encode($result);
		print_r($result);
	}

	function get() {
		$sql = "SELECT * FROM attraction";
		$stmt = $this->conn->prepare($sql); 
		$stmt->execute();
		$result = $stmt->get_result();
		$result = $result->fetch_all(MYSQLI_ASSOC); // nested assoc array
		for ($i = 0; $i < count($result); $i++) {
			$result[$i] = json_encode($result[$i]);
		};
		$result = json_encode($result);
		print_r($result);
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php"); // include db function (return conn Object)
$model = new attraction(db()); // call the function as the constructor
switch ($_SERVER["REQUEST_METHOD"]) {
	case "GET":
		if (array_key_exists("id", $_GET)) {
			echo $model->find($_GET["id"]);
		} else {
			echo $model->get();
		}
		break;
	default:
		http_response_code(405);
}

?>

