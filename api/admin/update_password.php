<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$password = $data['password'] ?? '';

if (!$id || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$conn = getDbConnection();
$stmt = $conn->prepare("UPDATE admin SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hashed, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Password update failed']);
}
$stmt->close();
$conn->close(); 