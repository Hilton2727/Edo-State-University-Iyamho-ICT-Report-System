<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$role = strtolower($_POST['role'] ?? '');
$id = $_POST['id'] ?? null;
if (!$id || ($role !== 'student' && $role !== 'staff' && $role !== 'admin' && $role !== 'tech')) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

if (!isset($_FILES['photo'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}
$ext = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
$filename = uniqid('profile_', true) . '.' . $ext;
$targetFile = $uploadDir . $filename;
if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
    exit;
}

// Save relative path to DB
$relativePath = 'api/uploads/' . $filename;
$conn = getDbConnection();
$table = $role === 'admin' ? 'admin' : ($role === 'staff' ? 'staff' : ($role === 'tech' ? 'tech' : 'student'));
$stmt = $conn->prepare("UPDATE $table SET profile_photo = ? WHERE id = ?");
$stmt->bind_param('si', $relativePath, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'profilePhoto' => $relativePath]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'DB update failed']);
}
$stmt->close();
$conn->close(); 