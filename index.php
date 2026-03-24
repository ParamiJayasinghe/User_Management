<?php
require_once 'config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    echo "<h1>Database Connection Successful!</h1>";
} catch (Exception $e) {
    echo "<h1>Connection Failed: " . $e->getMessage() . "</h1>";
}
?>