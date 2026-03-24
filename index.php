<?php
require_once 'classes/Users.php';
$userObj = new User();
$users = $userObj->getAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API Test Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
<div class="container">
    <h2 class="mb-4">User Management API Testing</h2>

    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                    <tr id="user-row-<?php echo $user['id']; ?>">
                        <td><?php echo $user['id']; ?></td>
                        <td><?php echo $user['first_name'] . " " . $user['surname']; ?></td>
                        <td><?php echo $user['email']; ?></td>
                        <td>
                            <button class="btn btn-sm btn-info" onclick="fetchUser(<?php echo $user['id']; ?>)">Edit (Fetch)</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteUser(<?php echo $user['id']; ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">Test Save User (Insert/Update)</div>
        <div class="card-body">
            <form id="saveUserForm">
                <input type="hidden" name="id" id="user_id">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label>First Name</label>
                        <input type="text" name="first_name" id="first_name" class="form-control" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>Surname</label>
                        <input type="text" name="surname" id="surname" class="form-control" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" id="email" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label>Password (New User Only)</label>
                    <input type="password" name="password" id="password" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Confirm Password</label>
                    <input type="password" name="confirm_password" id="confirm_password" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Save User</button>
                <button type="button" class="btn btn-secondary" onclick="resetForm()">Clear/New User</button>
            </form>
        </div>
    </div>
</div>

<script>
// --- TEST FETCH (GET API) ---
function fetchUser(id) {
    fetch(`api/get_user.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('user_id').value = data.id;
        document.getElementById('first_name').value = data.first_name;
        document.getElementById('surname').value = data.surname;
        document.getElementById('email').value = data.email;
        alert("Data Fetched! Form is now in UPDATE mode.");
    });
}

// --- TEST SAVE (POST API) ---
document.getElementById('saveUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('api/save_user.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if(data.success) location.reload(); 
    });
});

// --- TEST DELETE (POST API) ---
function deleteUser(id) {
    if(confirm("Are you sure you want to delete this user?")) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('api/delete_user.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.success) document.getElementById(`user-row-${id}`).remove();
        });
    }
}

function resetForm() {
    document.getElementById('saveUserForm').reset();
    document.getElementById('user_id').value = '';
}
</script>
</body>
</html>