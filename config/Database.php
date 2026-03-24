<?php
class Database {
    private $host = "localhost";
    private $db_name = "user_management";
    private $username = "root"; 
    private $password = "Peterpan@8576";     
    private static $instance = null;
    public $conn;

    // Private constructor to prevent direct instantiation
    private function __construct() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            // Set error mode to exceptions for better debugging
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Fetch as associative arrays by default
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
    }

    // Static method to get the single instance of the class
    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // Method to return the actual PDO connection object
    public function getConnection() {
        return $this->conn;
    }
}
?>