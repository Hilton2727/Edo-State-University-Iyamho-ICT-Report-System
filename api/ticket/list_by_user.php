<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$user_id = $_GET['user_id'] ?? null;
if (!$user_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing user_id']);
    exit;
}

$conn = getDbConnection();
$stmt = $conn->prepare("
SELECT 
  t.*, 
  -- Creator info
  CASE 
    WHEN t.created_by_role = 'Admin' THEN a.name
    WHEN t.created_by_role = 'Staff' THEN s.name
    WHEN t.created_by_role = 'Technician' THEN te.name
    WHEN t.created_by_role = 'Student' THEN st.name
    ELSE NULL
  END as creator_name,
  t.created_by_role as creator_role,
  -- Assignee info
  CASE 
    WHEN a2.id IS NOT NULL THEN a2.name
    WHEN s2.id IS NOT NULL THEN s2.name
    WHEN te2.id IS NOT NULL THEN te2.name
    WHEN st2.id IS NOT NULL THEN st2.name
    ELSE NULL
  END as assignee_name,
  CASE 
    WHEN a2.id IS NOT NULL THEN 'Admin'
    WHEN s2.id IS NOT NULL THEN 'Staff'
    WHEN te2.id IS NOT NULL THEN 'Technician'
    WHEN st2.id IS NOT NULL THEN 'Student'
    ELSE NULL
  END as assignee_role
FROM tickets t
LEFT JOIN admin a ON t.created_by_role = 'Admin' AND t.created_by = a.id
LEFT JOIN staff s ON t.created_by_role = 'Staff' AND t.created_by = s.id
LEFT JOIN tech te ON t.created_by_role = 'Technician' AND t.created_by = te.id
LEFT JOIN student st ON t.created_by_role = 'Student' AND t.created_by = st.id
LEFT JOIN admin a2 ON t.assigned_to = a2.id
LEFT JOIN staff s2 ON t.assigned_to = s2.id
LEFT JOIN tech te2 ON t.assigned_to = te2.id
LEFT JOIN student st2 ON t.assigned_to = st2.id
WHERE t.created_by = ?
ORDER BY t.created_at DESC
");
$stmt->bind_param('i', $user_id);
$stmt->execute();
$result = $stmt->get_result();
$tickets = [];
while ($row = $result->fetch_assoc()) {
    $tickets[] = [
        'id' => $row['id'],
        'title' => $row['title'],
        'category' => $row['category'],
        'location' => $row['location'],
        'priority' => $row['priority'],
        'description' => $row['description'],
        'status' => $row['status'],
        'createdAt' => $row['created_at'],
        'updatedAt' => $row['updated_at'],
        'createdBy' => [
            'name' => $row['creator_name'],
            'role' => $row['creator_role'],
        ],
        'assignedTo' => $row['assignee_name'] ? [
            'name' => $row['assignee_name'],
            'role' => $row['assignee_role'],
        ] : null,
    ];
}
echo json_encode(['tickets' => $tickets]);
$stmt->close();
$conn->close(); 