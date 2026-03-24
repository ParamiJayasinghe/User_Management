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
    <title>MOTORDAT - User Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="bg-primary-custom">

<nav class="navbar navbar-light bg-white px-4 border-bottom shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand text-primary fw-bold" href="#">MOTORDAT</a>
        <div class="d-flex align-items-center gap-4 text-primary">
            <i class="bi bi-house-door-fill cursor-pointer"></i>
            <i class="bi bi-search cursor-pointer"></i>
            <i class="bi bi-gear-fill cursor-pointer"></i>
            <i class="bi bi-person-fill cursor-pointer"></i>
            <i class="bi bi-box-arrow-right cursor-pointer"></i>
            <span class="ms-3 text-dark small">MG HEADOFFICE <i class="bi bi-chevron-down"></i></span>
        </div>
    </div>
</nav>

<div class="d-flex mt-3">
    <div class="sidebar-nav px-2">
        <button class="btn btn-primary-dark w-100 mb-2 btn-sm py-2 active">USERS</button>
        <button class="btn btn-primary-dark w-100 btn-sm py-2">DEALER INFO</button>
    </div>

    <div class="container-fluid mx-3">
        <div class="card shadow rounded-3 border-0">
            <div class="card-body p-0">
                
                <div class="row g-0 border-bottom p-3 align-items-center">
                    <div class="col-md-4 pe-3">
                        <input type="text" id="userSearch" class="form-control form-control-sm" placeholder="Search users (enter full name)...">
                    </div>
                    <div class="col-md-8 d-flex justify-content-end">
                        <button class="btn btn-primary btn-sm px-3 shadow-sm" onclick="loadNewUserForm()">+ Add new user</button>
                    </div>
                </div>

                <div class="row g-0">
                    
                    <div class="col-md-4 border-end p-0">
                        <div class="table-responsive list-scroll">
                            <table class="table table-sm table-hover text-center mb-0">
                                <thead class="table-light text-primary border-bottom">
                                    <tr><th class="py-2">Username</th></tr>
                                </thead>
                                <tbody id="userListBody">
                                    <?php if (!empty($users)): ?>
                                        <?php foreach ($users as $u): ?>
                                        <tr onclick="loadUserForm(<?= $u['id'] ?>)" class="cursor-pointer border-bottom">
                                            <td class="small py-2"><?= htmlspecialchars($u['first_name'] . ' ' . $u['surname']) ?></td>
                                        </tr>
                                        <?php endforeach; ?>
                                    <?php else: ?>
                                        <tr><td class="text-muted py-3">No users found</td></tr>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="dynamicContent" class="col-md-8 p-4 bg-light-form">
                        <div class="text-center py-5">
                            <i class="bi bi-person-circle display-1 text-primary opacity-25"></i>
                            <p class="text-muted mt-3">Select a user from the list to view or edit details.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="text-center mt-3">
            <button class="btn btn-primary btn-sm px-4 shadow-sm">RESEND WELCOME MAIL</button>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/script.js"></script>
</body>
</html>