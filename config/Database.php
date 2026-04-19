<?php

require_once __DIR__ . '/setup.php'; //to load credentials

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private static $instance = null; //singleton variable
    public $conn; //actual PDO connection

    // Private constructor to prevent direct instantiation
    private function __construct() {
        // Assign credentials from the $_ENV superglobal populated by setup.php
        $this->host     = $_ENV['DB_HOST'] ?? 'localhost';
        $this->db_name  = $_ENV['DB_NAME'] ?? '';
        $this->username = $_ENV['DB_USER'] ?? 'root';
        $this->password = $_ENV['DB_PASS'] ?? '';

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            $this->conn->exec("set names utf8");

        } catch(PDOException $exception) {
            die("Connection error: " . $exception->getMessage());
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>