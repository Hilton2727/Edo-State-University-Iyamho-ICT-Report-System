<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT * FROM tech";
$result = $conn->query($sql);
$techs = [];
while ($row = $result->fetch_assoc()) {
    $techs[] = $row;
}
echo json_encode(['techs' => $techs]);
$conn->close(); 