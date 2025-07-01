<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT id, question, answer, category, created_at, updated_at FROM faqs ORDER BY created_at DESC";
$result = $conn->query($sql);
$faqs = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $faqs[] = $row;
    }
}
$conn->close();
echo json_encode($faqs); 