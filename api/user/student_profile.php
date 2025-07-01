<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing id']);
    exit;
}
$conn = getDbConnection();
$stmt = $conn->prepare('SELECT * FROM student WHERE id = ?');
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$student = $result->fetch_assoc();
echo json_encode(['student' => $student]);
$stmt->close();
$conn->close(); 