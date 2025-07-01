<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$input = json_decode(file_get_contents('php://input'), true);
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$gender = trim($input['gender'] ?? '');
$phone = trim($input['phone'] ?? '');
$specialization = trim($input['specialization'] ?? '');
$password = $input['password'] ?? '';

if (!$name || !$email || !$gender || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$conn = getDbConnection();
$stmt = $conn->prepare("INSERT INTO tech (name, email, password, gender, phone, specialization) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param('ssssss', $name, $email, $password, $gender, $phone, $specialization);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'tech_id' => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add technician. Email may already exist.']);
}
$stmt->close();
$conn->close(); 