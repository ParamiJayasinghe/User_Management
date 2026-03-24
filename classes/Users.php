<?php
require_once __DIR__ . '/../config/database.php';

class User {
    private $conn;
    private $table_name = "users";

    // User Properties
    public $id;
    public $first_name;
    public $surname;
    public $email;
    public $special_app_access;
    public $password;
    public $role;
    public $user_since;
    public $last_login;
    public $is_active;

    public function __construct() {
        $database = Database::getInstance();
        $this->conn = $database->getConnection();
    }

    // Read All Users 
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    //  Read Single User 
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    //  Create or Update User
    public function save($data) {
        if (isset($data['id']) && !empty($data['id'])) {
            // UPDATE Logic
            $query = "UPDATE " . $this->table_name . " 
                      SET first_name=:first_name, surname=:surname, email=:email, 
                          role=:role, is_active=:is_active, special_app_access=:special_app_access
                      WHERE id=:id";
        } else {
            // INSERT Logic
            $query = "INSERT INTO " . $this->table_name . " 
                      SET first_name=:first_name, surname=:surname, email=:email, 
                          password=:password, role=:role, is_active=:is_active, 
                          special_app_access=:special_app_access";
        }

        $stmt = $this->conn->prepare($query);

        // Bind common values
        $stmt->bindParam(':first_name', $data['first_name']);
        $stmt->bindParam(':surname', $data['surname']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':role', $data['role']);
        $stmt->bindParam(':is_active', $data['is_active']);
        $stmt->bindParam(':special_app_access', $data['special_app_access']);

        if (!isset($data['id'])) {
            // Only hash and bind password for new users
            $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
            $stmt->bindParam(':password', $hashed_password);
        } else {
            $stmt->bindParam(':id', $data['id']);
        }

        return $stmt->execute();
    }

    //   Delete User
    public function delete($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}