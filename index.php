<?php
require_once 'classes/Users.php';
$userObj = new User();
$users = $userObj->getAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
    <a class="navbar-brand" href="#">
        <img src="https://via.placeholder.com/30" alt="Logo" class="d-inline-block align-top">
        <span class="ms-2">UserAdmin Pro</span>
    </a>
    <div class="ms-auto d-flex align-items-center text-white">
        <i class="bi bi-bell me-3"></i>
        <i class="bi bi-person-circle me-3"></i>
        <i class="bi bi-gear"></i>
    </div>
</nav>

<div class="container-fluid">
    <div class="row" style="height: calc(100vh - 56px);">
        
        <div class="col-md-4 border-end bg-white p-0 d-flex flex-column">
            <div class="p-3 border-bottom bg-light">
                <div class="input-group">
                    <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                    <input type="text" id="userSearch" class="form-control" placeholder="Search users...">
                </div>
            </div>
            
            <div class="list-group list-group-flush overflow-auto" id="userListContainer">
                <?php foreach ($users as $user): ?>
                <button type="button" 
                        class="list-group-item list-group-item-action p-3 user-item" 
                        onclick="loadUserForm(<?php echo $user['id']; ?>)">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1 text-primary"><?php echo $user['first_name'] . " " . $user['surname']; ?></h6>
                        <small class="text-muted"><?php echo $user['role']; ?></small>
                    </div>
                    <small class="text-secondary"><?php echo $user['email']; ?></small>
                </button>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="col-md-8 bg-light p-4 overflow-auto">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 id="panelTitle">User Details</h4>
                <button class="btn btn-primary" onclick="loadNewUserForm()">
                    <i class="bi bi-plus-lg"></i> Add New User
                </button>
            </div>

            <div id="dynamicContent" class="card shadow-sm">
                <div class="card-body text-center py-5 text-muted">
                    <i class="bi bi-person-bounding-box" style="font-size: 3rem;"></i>
                    <p class="mt-3">Select a user from the list to view or edit details.</p>
                </div>
            </div>
        </div>

    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/script.js"></script>
</body>
</html>