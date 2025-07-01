<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$role = strtolower($data['role'] ?? '');
$password = $data['password'] ?? '';

if (!$id || !$role || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$conn = getDbConnection();
$table = $role === 'staff' ? 'staff' : 'student';
$stmt = $conn->prepare("UPDATE $table SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hashed, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Password update failed']);
}
$stmt->close();
$conn->close(); 