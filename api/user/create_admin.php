<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$input = json_decode(file_get_contents('php://input'), true);
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$gender = trim($input['gender'] ?? '');
$password = $input['password'] ?? '';

if (!$name || !$email || !$gender || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$conn = getDbConnection();
$stmt = $conn->prepare("INSERT INTO admin (name, email, password, gender) VALUES (?, ?, ?, ?)");
$stmt->bind_param('ssss', $name, $email, $password, $gender);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'admin_id' => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add admin. Email may already exist.']);
}
$stmt->close();
$conn->close(); 