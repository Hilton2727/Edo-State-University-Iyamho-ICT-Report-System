<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT * FROM admin";
$result = $conn->query($sql);
$admins = [];
while ($row = $result->fetch_assoc()) {
    $admins[] = $row;
}
echo json_encode(['admins' => $admins]);
$conn->close(); 