<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$staff_id = $data['staff_id'] ?? null;

if (!$staff_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing staff_id']);
    exit;
}

$conn = getDbConnection();
$stmt = $conn->prepare('DELETE FROM staff WHERE id = ?');
$stmt->bind_param('i', $staff_id);
$success = $stmt->execute();
$stmt->close();
$conn->close();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete staff']);
} 