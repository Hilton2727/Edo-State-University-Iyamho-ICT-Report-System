<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT * FROM staff";
$result = $conn->query($sql);
$staff = [];
while ($row = $result->fetch_assoc()) {
    $staff[] = $row;
}
echo json_encode(['staff' => $staff]);
$conn->close(); 