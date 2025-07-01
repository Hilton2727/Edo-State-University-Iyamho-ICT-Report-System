<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$role = strtolower($data['role'] ?? '');
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');

if (!$id || !$role || !$name || !$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$conn = getDbConnection();
$table = $role === 'staff' ? 'staff' : 'student';
$stmt = $conn->prepare("UPDATE $table SET name = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssi", $name, $email, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Update failed']);
}
$stmt->close();
$conn->close(); 