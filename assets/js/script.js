document.addEventListener("DOMContentLoaded", function () {
  // Initial search filter listener
  initSearch();
});

// SEARCH FILTER LOGIC
function initSearch() {
  const searchInput = document.getElementById("userSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      let filter = this.value.toLowerCase();
      let rows = document.querySelectorAll("#userListBody tr");
      rows.forEach((row) => {
        let name = row.querySelector("td").innerText.toLowerCase();
        row.style.display = name.includes(filter) ? "" : "none";
      });
    });
  }
}

// LOAD USER FORM (AJAX)
function loadUserForm(userId) {
  fetch(`api/get_user.php?id=${userId}`)
    .then((response) => {
      if (!response.ok) throw new Error("User not found");
      return response.json();
    })
    .then((data) => {
      renderForm(data, "EDIT USER");
    })
    .catch((err) => alert(err.message));
}

// LOAD NEW USER FORM
function loadNewUserForm() {
  const emptyData = {
    id: "",
    first_name: "",
    surname: "",
    email: "",
    special_app_access: 0,
    role: "Viewer",
    user_since: new Date().toLocaleDateString(),
    last_login: "Never",
    is_active: 1,
  };
  renderForm(emptyData, "ADD NEW USER");
}

//  RENDER FORM HTML
function renderForm(data, title) {
  const container = document.getElementById("dynamicContent");
  const isNewUser = !data.id; // true if we are adding a new user

  // Checkboxes logic
  const isActiveChecked = data.is_active == 1 ? "checked" : "";
  const isSpecialAccess = data.special_app_access == 1 ? "checked" : "";
  const isAdmin = data.role === "Admin" ? "checked" : "";

  container.innerHTML = `
        <div class="card-header bg-white border-0">
            <h5 class="text-primary fw-bold">${title}</h5>
        </div>
        
        ${
          !isNewUser
            ? `
        <div class="text-center mb-4">
            <div class="profile-img-placeholder mb-2 d-flex align-items-center justify-content-center text-white">
                <i class="bi bi-person-fill display-4"></i>
            </div>
            <div class="btn-group">
                <button class="btn btn-primary btn-sm px-3">Change Profile Picture</button>
                <button class="btn btn-danger btn-sm">X</button>
            </div>
        </div>
        `
            : ""
        }

        <form id="userForm" class="px-lg-5 mt-3">
            <input type="hidden" name="id" value="${data.id}">
            
            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">First Name :</label>
                <div class="col-sm-8"><input type="text" name="first_name" value="${data.first_name}" class="form-control form-control-sm" required></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Surname :</label>
                <div class="col-sm-8"><input type="text" name="surname" value="${data.surname}" class="form-control form-control-sm" required></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Email :</label>
                <div class="col-sm-8"><input type="email" name="email" value="${data.email}" class="form-control form-control-sm" required></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Special App Access :</label>
                <div class="col-sm-8">
                    <input type="checkbox" name="special_app_access" class="form-check-input" ${isSpecialAccess}>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">New password :</label>
                <div class="col-sm-8">
                    <div class="input-group input-group-sm">
                        <input type="password" name="password" id="passField" class="form-control" placeholder="Enter new password..">
                        ${isNewUser ? `<button class="btn btn-outline-primary" type="button" onclick="generatePassword()">Generate</button>` : ""}
                    </div>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Confirm password :</label>
                <div class="col-sm-8"><input type="password" name="confirm_password" id="confirmPassField" class="form-control form-control-sm" placeholder="Confirm new password.."></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Make admin :</label>
                <div class="col-sm-8"><input type="checkbox" name="role" value="Admin" class="form-check-input" ${isAdmin}></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-sm-4 form-label-blue">Make dealer admin :</label>
                <div class="col-sm-8"><input type="checkbox" name="role_dealer_admin" class="form-check-input"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-sm-4 form-label-blue">After Sales :</label>
                <div class="col-sm-8"><input type="checkbox" name="role_after_sales" class="form-check-input"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-sm-4 form-label-blue">After Sales Manager :</label>
                <div class="col-sm-8"><input type="checkbox" name="role_after_sales_manager" class="form-check-input"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-sm-4 form-label-blue">Sales User :</label>
                <div class="col-sm-8"><input type="checkbox" name="role_sales_user" class="form-check-input"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-sm-4 form-label-blue">Contact Centre User :</label>
                <div class="col-sm-8"><input type="checkbox" name="role_contact_centre" class="form-check-input"></div>
            </div>

            <div class="row mb-2 align-items-center mt-3">
                <label class="col-sm-4 form-label-blue">User since :</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control form-control-sm bg-light" value="${data.user_since || ''}" readonly>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Last login :</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control form-control-sm bg-light" value="${data.last_login || ''}" readonly>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-sm-4 form-label-blue">Active Status :</label>
                <div class="col-sm-8"><input type="checkbox" name="is_active" class="form-check-input" ${isActiveChecked}></div>
            </div>

            <div class="d-flex gap-2 mt-4 justify-content-center">
                <button type="submit" class="btn btn-primary px-4 fw-bold">SAVE USER</button>
                ${!isNewUser ? `<button type="button" class="btn btn-primary px-4 fw-bold" onclick="confirmDelete(${data.id})">DELETE USER</button>` : ""}
            </div>
        </form>
    `;

  attachFormSubmitListener();
}

//  SUBMIT HANDLER (SAVE/UPDATE) ---
function attachFormSubmitListener() {
  const form = document.getElementById("userForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    // Basic Password Match Validation
    const pass = formData.get("password");
    const confirmPass = formData.get("confirm_password");
    if (pass && pass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    fetch("api/save_user.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.success) window.location.reload();
      })
      .catch((err) => console.error("Error saving:", err));
  });
}

//  DELETE LOGIC ---
function confirmDelete(id) {
  if (
    confirm(
      "Are you sure you want to delete this record? This cannot be undone.",
    )
  ) {
    const fd = new FormData();
    fd.append("id", id);

    fetch("api/delete_user.php", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.success) window.location.reload();
      })
      .catch((err) => console.error("Error deleting:", err));
  }
}

// Function to generate a random password
function generatePassword() {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0; i < 10; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById("passField").value = retVal;
  document.getElementById("confirmPassField").value = retVal;

  document.getElementById("passField").type = "text";
  document.getElementById("confirmPassField").type = "text";

  alert("Generated Password: " + retVal);
}
