<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$input = json_decode(file_get_contents('php://input'), true);

$ticket_id = $input['ticket_id'] ?? null;
$user_id = $input['user_id'] ?? null;
$content = $input['content'] ?? null;
$user_role = $input['user_role'] ?? null;

if (!$ticket_id || !$user_id || !$content || !$user_role) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$conn = getDbConnection();

// Insert comment
$stmt = $conn->prepare("
    INSERT INTO ticket_comments (ticket_id, user_id, user_role, content, created_at) 
    VALUES (?, ?, ?, ?, NOW())
");

$stmt->bind_param('ssss', $ticket_id, $user_id, $user_role, $content);

if ($stmt->execute()) {
    $comment_id = $conn->insert_id;
    $stmt->close(); // Close the insert statement before reusing

    // Get the created comment with user details
    $stmt = $conn->prepare("
        SELECT tc.*, 
               u.name as user_name,
               u.role as user_role
        FROM ticket_comments tc
        LEFT JOIN (
            SELECT id, name, 'student' as role FROM student
            UNION ALL
            SELECT id, name, 'staff' as role FROM staff
            UNION ALL
            SELECT id, name, 'admin' as role FROM admin
            UNION ALL
            SELECT id, name, 'tech' as role FROM tech
        ) u ON u.id = tc.user_id AND u.role = tc.user_role
        WHERE tc.id = ?
    ");
    $stmt->bind_param('i', $comment_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $comment = $result->fetch_assoc();

    echo json_encode([
        'success' => true,
        'comment' => [
            'id' => $comment['id'],
            'content' => $comment['content'],
            'createdAt' => $comment['created_at'],
            'user' => [
                'id' => $comment['user_id'],
                'name' => $comment['user_name'],
                'role' => ucfirst($comment['user_role'])
            ]
        ]
    ]);
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add comment']);
}

$conn->close(); 