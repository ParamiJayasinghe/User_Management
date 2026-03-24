<?php
require_once 'classes/Users.php';
$userObj = new User();
$users = $userObj->getAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5">
    <h2>User List</h2>
    <table class="table table-bordered table-hover bg-white">
        <thead class="table-dark">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
            <tr>
                <td>
                    <a href="javascript:void(0)" onclick="testAjax(<?php echo $user['id']; ?>)">
                        <?php echo $user['first_name'] . " " . $user['surname']; ?>
                    </a>
                </td>
                <td><?php echo $user['email']; ?></td>
                <td><?php echo $user['role']; ?></td>
                <td><button class="btn btn-sm btn-danger">Delete</button></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <div id="test-output" class="mt-4 p-3 border d-none bg-white">
        <h5>API Test Output (AJAX):</h5>
        <pre id="json-result"></pre>
    </div>
</div>

<script>
function testAjax(userId) {
    // This simulates what will happen when you click a username
    fetch(`api/get_user.php?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('test-output').classList.remove('d-none');
            document.getElementById('json-result').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}
</script>
</body>
</html>