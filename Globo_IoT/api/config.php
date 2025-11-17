<?php
/**
 * Database Configuration
 * Handles all database connection settings
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'globe_iot');
define('DB_USER', 'postgres');
define('DB_PASSWORD', 'your_password'); // Change this!
define('DB_PORT', 5432);

// Environment
define('ENVIRONMENT', 'development'); // development or production

// Error handling
if (ENVIRONMENT === 'development') {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    error_reporting(E_ALL);
}

// Helper function to get database connection
function getDatabaseConnection() {
    try {
        $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME;
        $conn = new PDO(
            $dsn,
            DB_USER,
            DB_PASSWORD,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        return $conn;
    } catch (PDOException $e) {
        throw new Exception("Database connection failed: " . $e->getMessage());
    }
}
?>
