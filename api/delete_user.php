<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../classes/Users.php';

$userObj = new User();
$response = ["success" => false, "message" => ""];

// Only accept POST requests for data modification (Security best practice)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get the ID from the POST data
    $id = $_POST['id'] ?? null;

    if (!empty($id)) {
        try {
            if ($userObj->delete($id)) {
                $response['success'] = true;
                $response['message'] = "User deleted successfully!";
            } else {
                $response['message'] = "Could not delete user. Record might not exist.";
            }
        } catch (Exception $e) {
            $response['message'] = "Database Error: " . $e->getMessage();
        }
    } else {
        $response['message'] = "Bad Request: No ID provided.";
    }
} else {
    $response['message'] = "Invalid Request Method.";
}

echo json_encode($response);