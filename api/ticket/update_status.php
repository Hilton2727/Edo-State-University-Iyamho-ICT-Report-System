<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$input = json_decode(file_get_contents('php://input'), true);
$ticket_id = $input['ticket_id'] ?? null;
$status = $input['status'] ?? null;
$assigned_to = array_key_exists('assigned_to', $input) ? $input['assigned_to'] : '__not_set__';

if (!$ticket_id || !$status) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$conn = getDbConnection();

if ($assigned_to !== '__not_set__') {
    // Accept both null and 'null' (string) as unassign
    if ($assigned_to === null || $assigned_to === 'null') {
        // Unassign: set assigned_to to NULL
        $stmt = $conn->prepare("
            UPDATE tickets 
            SET status = ?, assigned_to = NULL, updated_at = NOW() 
            WHERE id = ?
        ");
        $stmt->bind_param('ss', $status, $ticket_id);
    } else {
        // Assign: set assigned_to to value
        $stmt = $conn->prepare("
            UPDATE tickets 
            SET status = ?, assigned_to = ?, updated_at = NOW() 
            WHERE id = ?
        ");
        $stmt->bind_param('sis', $status, $assigned_to, $ticket_id);
    }
} else {
    // Update status only
    $stmt = $conn->prepare("
        UPDATE tickets 
        SET status = ?, updated_at = NOW() 
        WHERE id = ?
    ");
    $stmt->bind_param('ss', $status, $ticket_id);
}

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Ticket updated successfully'
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ticket not found']);
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update ticket']);
}

$stmt->close();
$conn->close(); 