<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT id, title, content, category, tags, author_type, author_id, created_at, updated_at FROM knowledge_articles ORDER BY created_at DESC";
$result = $conn->query($sql);
$articles = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row['tags'] = json_decode($row['tags'], true);
        // Convert snake_case to camelCase for frontend compatibility
        $row['createdAt'] = $row['created_at'];
        $row['updatedAt'] = $row['updated_at'];
        $row['authorType'] = $row['author_type'];
        $row['authorId'] = $row['author_id'];
        unset($row['created_at'], $row['updated_at'], $row['author_type'], $row['author_id']);
        $articles[] = $row;
    }
}
$conn->close();
echo json_encode($articles); 