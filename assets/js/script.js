// Function to load the Edit Form into the right panel
function loadUserForm(userId) {
    fetch(`api/get_user.php?id=${userId}`)
    .then(response => response.json())
    .then(data => {
        const dynamicContent = document.getElementById('dynamicContent');
        document.getElementById('panelTitle').innerText = "Edit User";
        
        // Generate the HTML for the form
        dynamicContent.innerHTML = `
            <div class="card-body">
                <form id="userForm">
                    <input type="hidden" name="id" value="${data.id}">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">First Name</label>
                            <input type="text" name="first_name" class="form-control" value="${data.first_name}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Surname</label>
                            <input type="text" name="surname" class="form-control" value="${data.surname}" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-control" value="${data.email}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Role</label>
                            <select name="role" class="form-select">
                                <option value="Admin" ${data.role === 'Admin' ? 'selected' : ''}>Admin</option>
                                <option value="Editor" ${data.role === 'Editor' ? 'selected' : ''}>Editor</option>
                                <option value="Viewer" ${data.role === 'Viewer' ? 'selected' : ''}>Viewer</option>
                            </select>
                        </div>
                        <div class="col-md-6 d-flex align-items-end mb-2">
                             <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" ${data.is_active == 1 ? 'checked' : ''}>
                                <label class="form-check-label">Active Status</label>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-danger" onclick="confirmDelete(${data.id})">Delete User</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        `;
        attachFormSubmitListener();
    });
}

// Function to load the New User Form
function loadNewUserForm() {
    document.getElementById('panelTitle').innerText = "Add New User";
    document.getElementById('dynamicContent').innerHTML = `
        <div class="card-body">
            <form id="userForm">
                <div class="row g-3">
                    <div class="col-md-6"><label class="form-label">First Name</label><input type="text" name="first_name" class="form-control" required></div>
                    <div class="col-md-6"><label class="form-label">Surname</label><input type="text" name="surname" class="form-control" required></div>
                    <div class="col-md-12"><label class="form-label">Email</label><input type="email" name="email" class="form-control" required></div>
                    <div class="col-md-6"><label class="form-label">Password</label><input type="password" name="password" class="form-control" required></div>
                    <div class="col-md-6"><label class="form-label">Confirm Password</label><input type="password" name="confirm_password" class="form-control" required></div>
                </div>
                <button type="submit" class="btn btn-success mt-4 w-100">Create User</button>
            </form>
        </div>
    `;
    attachFormSubmitListener();
}

function attachFormSubmitListener() {
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch('api/save_user.php', { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.success) location.reload();
        });
    });
}

function confirmDelete(id) {
    if(confirm("Are you sure you want to delete this record?")) {
        const fd = new FormData(); fd.append('id', id);
        fetch('api/delete_user.php', { method: 'POST', body: fd })
        .then(res => res.json())
        .then(data => { alert(data.message); if(data.success) location.reload(); });
    }
}