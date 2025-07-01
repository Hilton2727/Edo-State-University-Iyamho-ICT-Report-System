<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT * FROM student";
$result = $conn->query($sql);
$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}
echo json_encode(['students' => $students]);
$conn->close(); 