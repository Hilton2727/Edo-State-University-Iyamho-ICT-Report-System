<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT id, title, excerpt, content, date, author, category, created_at, updated_at FROM blog_posts ORDER BY created_at DESC";
$result = $conn->query($sql);
$posts = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}
$conn->close();
echo json_encode($posts); 