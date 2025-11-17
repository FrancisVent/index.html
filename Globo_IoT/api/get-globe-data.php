<?php
/**
 * API Endpoint: Get Globe Data from PostgreSQL
 * Returns: JSON with arcsData and pontosAdicionais
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$host = 'localhost';
$db = 'globe_iot';
$user = 'postgres';
$password = 'your_password'; // Change this to your actual PostgreSQL password

try {
    // Create PDO connection
    $conn = new PDO(
        "pgsql:host=$host;dbname=$db",
        $user,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Get arcs data
    $arcsQuery = "SELECT startLat, startLng, endLat, endLng, name, color FROM arcs ORDER BY id";
    $arcsStmt = $conn->query($arcsQuery);
    $arcsData = $arcsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Get additional points
    $pontosQuery = "SELECT lat, lng, size, color FROM pontos_adicionais ORDER BY id";
    $pontosStmt = $conn->query($pontosQuery);
    $pontosAdicionais = $pontosStmt->fetchAll(PDO::FETCH_ASSOC);

    // Return JSON response
    echo json_encode(
        [
            'success' => true,
            'arcsData' => $arcsData,
            'pontosAdicionais' => $pontosAdicionais,
            'count' => [
                'arcs' => count($arcsData),
                'pontos' => count($pontosAdicionais)
            ]
        ],
        JSON_PRETTY_PRINT
    );

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed',
        'message' => $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred',
        'message' => $e->getMessage()
    ]);
}
?>
