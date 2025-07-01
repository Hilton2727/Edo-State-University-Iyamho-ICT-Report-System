<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$ticket_id = $_GET['id'] ?? null;
if (!$ticket_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ticket ID']);
    exit;
}

$conn = getDbConnection();

// Get ticket details
$stmt = $conn->prepare("
    SELECT t.*, 
           c.name as created_by_name,
           c.role as created_by_role,
           a.name as assigned_to_name,
           a.role as assigned_to_role
    FROM tickets t
    LEFT JOIN (
        SELECT id, name, 'student' as role FROM student
        UNION ALL
        SELECT id, name, 'staff' as role FROM staff
        UNION ALL
        SELECT id, name, 'admin' as role FROM admin
        UNION ALL
        SELECT id, name, 'tech' as role FROM tech
    ) c ON c.id = t.created_by
    LEFT JOIN (
        SELECT id, name, 'student' as role FROM student
        UNION ALL
        SELECT id, name, 'staff' as role FROM staff
        UNION ALL
        SELECT id, name, 'admin' as role FROM admin
        UNION ALL
        SELECT id, name, 'tech' as role FROM tech
    ) a ON a.id = t.assigned_to
    WHERE t.id = ?
");

$stmt->bind_param('s', $ticket_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Ticket not found']);
    exit;
}

$ticket = $result->fetch_assoc();

// Get comments
$stmt = $conn->prepare("
    SELECT tc.*, 
        CASE 
            WHEN tc.user_role = 'Admin' THEN a.name
            WHEN tc.user_role = 'Staff' THEN s.name
            WHEN tc.user_role = 'Tech' THEN t.name
            WHEN tc.user_role = 'Student' THEN st.name
            ELSE NULL
        END AS user_name
    FROM ticket_comments tc
    LEFT JOIN admin a ON tc.user_role = 'Admin' AND tc.user_id = a.id
    LEFT JOIN staff s ON tc.user_role = 'Staff' AND tc.user_id = s.id
    LEFT JOIN tech t ON tc.user_role = 'Tech' AND tc.user_id = t.id
    LEFT JOIN student st ON tc.user_role = 'Student' AND tc.user_id = st.id
    WHERE tc.ticket_id = ?
    ORDER BY tc.created_at ASC
");

$stmt->bind_param('s', $ticket_id);
$stmt->execute();
$comments_result = $stmt->get_result();
$comments = [];
while ($comment = $comments_result->fetch_assoc()) {
    $comments[] = [
        'id' => $comment['id'],
        'content' => $comment['content'],
        'createdAt' => $comment['created_at'],
        'user' => [
            'id' => $comment['user_id'],
            'name' => $comment['user_name'],
            'role' => ucfirst($comment['user_role'])
        ]
    ];
}

// Get attachments
$stmt = $conn->prepare("
    SELECT * FROM ticket_attachments 
    WHERE ticket_id = ?
");

$stmt->bind_param('s', $ticket_id);
$stmt->execute();
$attachments_result = $stmt->get_result();
$attachments = [];
while ($attachment = $attachments_result->fetch_assoc()) {
    $attachments[] = [
        'id' => $attachment['id'],
        'name' => $attachment['filename'],
        'size' => $attachment['file_size'],
        'url' => '/api/uploads/' . $attachment['filename']
    ];
}

// Format the response
$response = [
    'id' => $ticket['id'],
    'title' => $ticket['title'],
    'description' => $ticket['description'],
    'status' => $ticket['status'],
    'priority' => $ticket['priority'],
    'category' => $ticket['category'],
    'location' => $ticket['location'],
    'createdAt' => $ticket['created_at'],
    'updatedAt' => $ticket['updated_at'],
    'createdBy' => [
        'id' => $ticket['created_by'],
        'name' => $ticket['created_by_name'],
        'role' => ucfirst($ticket['created_by_role'])
    ],
    'assignedTo' => $ticket['assigned_to'] ? [
        'id' => $ticket['assigned_to'],
        'name' => $ticket['assigned_to_name'],
        'role' => ucfirst($ticket['assigned_to_role'])
    ] : null,
    'comments' => $comments,
    'attachments' => $attachments
];

echo json_encode($response);
$stmt->close();
$conn->close();