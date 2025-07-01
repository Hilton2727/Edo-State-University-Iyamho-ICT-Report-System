<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$conn = getDbConnection();
$sql = "SELECT status, COUNT(*) as count FROM tickets GROUP BY status";
$result = $conn->query($sql);
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
$conn->close(); 