<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$role = strtolower($data['role'] ?? '');
if (!$id || ($role !== 'student' && $role !== 'staff')) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$conn = getDbConnection();
$table = $role === 'staff' ? 'staff' : 'student';
// Get current photo path
$stmt = $conn->prepare("SELECT profile_photo FROM $table WHERE id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$photo = $row['profile_photo'] ?? null;
$stmt->close();

if ($photo && file_exists(__DIR__ . '/../' . basename($photo))) {
    @unlink(__DIR__ . '/../' . basename($photo));
}

// Remove from DB
$stmt = $conn->prepare("UPDATE $table SET profile_photo = NULL WHERE id = ?");
$stmt->bind_param('i', $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'DB update failed']);
}
$stmt->close();
$conn->close(); 