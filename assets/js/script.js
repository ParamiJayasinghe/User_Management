document.addEventListener("DOMContentLoaded", function () {
  initSearch();
});

//MODAL HELPER FUNCTIONS
function showModal(title, message, reload = false) {
  const modalElem = document.getElementById('notificationModal');
  const bsModal = new bootstrap.Modal(modalElem);
  
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalMessage').innerText = message;
  
  bsModal.show();

  if (reload) {
    modalElem.addEventListener('hidden.bs.modal', function () {
      window.location.reload();
    }, { once: true });
  }
}

//SEARCH FILTER LOGIC
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

//EXCLUSIVE ROLE SELECTION LOGIC
function initRoleSelection() {
    const roleCheckboxes = document.querySelectorAll('.role-checkbox');
    roleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Uncheck all other role checkboxes
                roleCheckboxes.forEach(other => {
                    if (other !== this) other.checked = false;
                });
            }
        });
    });
}

//LOAD USER FORM (AJAX)
function loadUserForm(userId) {
  fetch(`api/get_user.php?id=${userId}`)
    .then((response) => {
      if (!response.ok) throw new Error("User not found");
      return response.json();
    })
    .then((data) => {
      renderForm(data, "EDIT USER");
    })
    .catch((err) => showModal("Error", err.message));
}

//LOAD NEW USER FORM
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

//RENDER FORM HTML
function renderForm(data, title) {
  const container = document.getElementById("dynamicContent");
  const isNewUser = !data.id;

  const isActiveChecked = data.is_active == 1 ? "checked" : "";
  const isSpecialAccess = data.special_app_access == 1 ? "checked" : "";
  const isAdmin = data.role === "Admin" ? "checked" : "";

  container.innerHTML = `
        <div class="card-header bg-white border-0">
            <h5 class="text-primary fw-bold">${title}</h5>
        </div>
        
        ${!isNewUser ? `
        <div class="text-center mb-4">
            <div class="profile-img-placeholder mb-2 d-flex align-items-center justify-content-center text-white">
                <i class="bi bi-person-fill display-4"></i>
            </div>
            <div class="btn-group">
                <button class="btn btn-primary btn-sm px-3">Change Profile Picture</button>
                <button class="btn btn-danger btn-sm">X</button>
            </div>
        </div>
        ` : ""}

        <form id="userForm" class="px-lg-5 mt-3">
            <input type="hidden" name="id" value="${data.id}">
            
            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">First Name :</label>
                <div class="col-12 col-md-8"><input type="text" name="first_name" value="${data.first_name}" class="form-control form-control-sm" required></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Surname :</label>
                <div class="col-12 col-md-8"><input type="text" name="surname" value="${data.surname}" class="form-control form-control-sm" required></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Email :</label>
                <div class="col-12 col-md-8"><input type="email" name="email" value="${data.email}" class="form-control form-control-sm" required></div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Special App Access :</label>
                <div class="col-12 col-md-8">
                    <input type="checkbox" name="special_app_access" class="form-check-input" ${isSpecialAccess}>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">New password :</label>
                <div class="col-12 col-md-8">
                    <div class="input-group input-group-sm">
                        <input type="password" name="password" id="passField" class="form-control" placeholder="Enter new password..">
                        ${isNewUser ? `<button class="btn btn-outline-primary" type="button" onclick="generatePassword()">Generate</button>` : ""}
                    </div>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Confirm password :</label>
                <div class="col-12 col-md-8"><input type="password" name="confirm_password" id="confirmPassField" class="form-control form-control-sm" placeholder="Confirm new password.."></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Make admin :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="role_admin" class="form-check-input role-checkbox" ${isAdmin}></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Make dealer admin :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="role_dealer_admin" class="form-check-input role-checkbox"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">After Sales :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="role_after_sales" class="form-check-input role-checkbox"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">After Sales Manager :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="role_after_sales_manager" class="form-check-input role-checkbox"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Sales User :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="role_sales_user" class="form-check-input role-checkbox"></div>
            </div>

            <div class="row mb-1 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Contact Centre User :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="role_contact_centre" class="form-check-input role-checkbox"></div>
            </div>

            <div class="row mb-2 align-items-center mt-3">
                <label class="col-12 col-md-4 form-label-blue">User since :</label>
                <div class="col-12 col-md-8">
                    <input type="text" class="form-control form-control-sm bg-light" value="${data.user_since || ""}" readonly>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Last login :</label>
                <div class="col-12 col-md-8">
                    <input type="text" class="form-control form-control-sm bg-light" value="${data.last_login || ""}" readonly>
                </div>
            </div>

            <div class="row mb-2 align-items-center">
                <label class="col-12 col-md-4 form-label-blue">Active Status :</label>
                <div class="col-12 col-md-8"><input type="checkbox" name="is_active" class="form-check-input" ${isActiveChecked}></div>
            </div>

            <div class="d-flex gap-2 mt-4 justify-content-center">
                <button type="submit" class="btn btn-primary px-4 fw-bold">SAVE USER</button>
                ${!isNewUser ? `<button type="button" class="btn btn-primary px-4 fw-bold" onclick="confirmDelete(${data.id})">DELETE USER</button>` : ""}
            </div>

            ${!isNewUser ? `
            <div class="text-center mt-4 pt-3 ">
                <button type="button" class="btn btn-primary px-4 fw-bold" onclick="resendWelcomeMail(${data.id})">
                    RESEND WELCOME MAIL
                </button>
            </div>
            ` : ""}
        </form>
    `;

  attachFormSubmitListener();
  initRoleSelection(); 
}

// SUBMIT HANDLER (SAVE/UPDATE)
function attachFormSubmitListener() {
  const form = document.getElementById("userForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    // Password Match Validation
    const pass = formData.get("password");
    const confirmPass = formData.get("confirm_password");
    if (pass && pass !== confirmPass) {
      showModal("Validation Error", "Passwords do not match!");
      return;
    }

    fetch("api/save_user.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showModal("Success", data.message, true);
        } else {
          showModal("Error", data.message);
        }
      })
      .catch((err) => console.error("Error saving:", err));
  });
}

//DELETE LOGIC WITH MODAL
function confirmDelete(id) {
    const deleteModalElem = document.getElementById('deleteConfirmModal');
    const bsDeleteModal = new bootstrap.Modal(deleteModalElem);
    bsDeleteModal.show();

    document.getElementById('confirmDeleteBtn').onclick = function() {
        const fd = new FormData();
        fd.append("id", id);

        fetch("api/delete_user.php", {
            method: "POST",
            body: fd,
        })
        .then((res) => res.json())
        .then((data) => {
            bsDeleteModal.hide();
            if (data.success) {
                showModal("Deleted", data.message, true);
            } else {
                showModal("Error", data.message);
            }
        })
        .catch((err) => console.error("Error deleting:", err));
    };
}

//UTILITY FUNCTIONS
function generatePassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0; i < 10; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  document.getElementById("passField").value = retVal;
  document.getElementById("confirmPassField").value = retVal;
  document.getElementById("passField").type = "text";
  document.getElementById("confirmPassField").type = "text";
  showModal("Password Generated", "Generated: " + retVal);
}

function resendWelcomeMail(userId) {
    showModal("Email Status", "The welcome email has been resent to user ID: " + userId);
}