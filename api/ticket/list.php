<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();

// Join tickets with all user tables for creator and assignee
$sql = "
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
  END as assignee_role,
  CASE 
    WHEN a2.id IS NOT NULL THEN a2.email
    WHEN s2.id IS NOT NULL THEN s2.email
    WHEN te2.id IS NOT NULL THEN te2.email
    WHEN st2.id IS NOT NULL THEN st2.email
    ELSE NULL
  END as assignee_email
FROM tickets t
LEFT JOIN admin a ON t.created_by_role = 'Admin' AND t.created_by = a.id
LEFT JOIN staff s ON t.created_by_role = 'Staff' AND t.created_by = s.id
LEFT JOIN tech te ON t.created_by_role = 'Technician' AND t.created_by = te.id
LEFT JOIN student st ON t.created_by_role = 'Student' AND t.created_by = st.id
LEFT JOIN admin a2 ON t.assigned_to = a2.id
LEFT JOIN staff s2 ON t.assigned_to = s2.id
LEFT JOIN tech te2 ON t.assigned_to = te2.id
LEFT JOIN student st2 ON t.assigned_to = st2.id
ORDER BY t.created_at DESC
";

$result = $conn->query($sql);
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
            'email' => $row['assignee_email'],
            'id' => $row['assigned_to'],
        ] : null,
    ];
}
echo json_encode(['tickets' => $tickets]);
$conn->close(); 