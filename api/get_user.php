<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../classes/Users.php';

$userObj = new User();

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $userData = $userObj->getById($id);

    if ($userData) {
        
        http_response_code(200);
        echo json_encode($userData);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Bad Request: No ID provided."]);
}