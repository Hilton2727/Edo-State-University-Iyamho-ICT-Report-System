<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$tech_id = $_GET['tech_id'] ?? null;
if (!$tech_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing tech_id']);
    exit;
}

$conn = getDbConnection();
$stmt = $conn->prepare("SELECT status, COUNT(*) as count FROM tickets WHERE assigned_to = ? GROUP BY status");
$stmt->bind_param('i', $tech_id);
$stmt->execute();
$result = $stmt->get_result();
$stats = [
    'total' => 0,
    'open' => 0,
    'in_progress' => 0,
    'resolved' => 0,
    'closed' => 0
];
while ($row = $result->fetch_assoc()) {
    $stats['total'] += $row['count'];
    switch (strtolower($row['status'])) {
        case 'open':
            $stats['open'] = $row['count'];
            break;
        case 'in progress':
            $stats['in_progress'] = $row['count'];
            break;
        case 'resolved':
            $stats['resolved'] = $row['count'];
            break;
        case 'closed':
            $stats['closed'] = $row['count'];
            break;
    }
}
echo json_encode($stats);
$stmt->close();
$conn->close(); 