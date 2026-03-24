<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../classes/Users.php';

$userObj = new User();
$response = ["success" => false, "message" => ""];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
   
    $data = [
        'id'                 => $_POST['id'] ?? null,
        'first_name'         => trim($_POST['first_name'] ?? ''),
        'surname'            => trim($_POST['surname'] ?? ''),
        'email'              => trim($_POST['email'] ?? ''),
        'password'           => $_POST['password'] ?? '',
        'confirm_password'   => $_POST['confirm_password'] ?? '',
        'role'               => $_POST['role'] ?? 'Viewer',
        'is_active'          => isset($_POST['is_active']) ? 1 : 0,
        'special_app_access' => isset($_POST['special_app_access']) ? 1 : 0
    ];

    // --- Server-Side Validation ---
    if (empty($data['first_name']) || empty($data['surname']) || empty($data['email'])) {
        $response['message'] = "Please fill in all required fields.";
    } 
    elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Invalid email format.";
    } 
    // Password validation only for NEW users
    elseif (empty($data['id']) && (empty($data['password']) || $data['password'] !== $data['confirm_password'])) {
        $response['message'] = "Passwords are required and must match.";
    } 
    else {
        // Validation passed -> Save to Database
        try {
            if ($userObj->save($data)) {
                $response['success'] = true;
                $response['message'] = empty($data['id']) ? "User created successfully!" : "User updated successfully!";
            } else {
                $response['message'] = "Failed to save user data.";
            }
        } catch (Exception $e) {
            // Check for duplicate email error
            if (str_contains($e->getMessage(), 'Duplicate entry')) {
                $response['message'] = "This email is already registered.";
            } else {
                $response['message'] = "Database Error: " . $e->getMessage();
            }
        }
    }
} else {
    $response['message'] = "Invalid Request Method.";
}

echo json_encode($response);