<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

date_default_timezone_set('Africa/Lagos');

// Accept JSON or multipart/form-data
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$conn = getDbConnection();

// If JSON, get raw input
if (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $data = json_decode(file_get_contents('php://input'), true);
    $_POST = $data;
}

// Required fields
$title = trim($_POST['title'] ?? '');
$category = $_POST['category'] ?? '';
$location = $_POST['location'] ?? '';
$priority = $_POST['priority'] ?? '';
$description = $_POST['description'] ?? '';
$created_by = intval($_POST['created_by'] ?? 0);
$created_by_role = $_POST['created_by_role'] ?? '';

if (!$title || !$category || !$priority || !$description || !$created_by || !$created_by_role) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Generate ticket ID
$ticket_id = uniqid('T-');
$now = date('Y-m-d H:i:s');

// Insert ticket
$stmt = $conn->prepare("INSERT INTO tickets (id, title, category, location, priority, description, status, created_at, updated_at, created_by, created_by_role) VALUES (?, ?, ?, ?, ?, ?, 'Open', ?, ?, ?, ?)");
$stmt->bind_param('ssssssssss', $ticket_id, $title, $category, $location, $priority, $description, $now, $now, $created_by, $created_by_role);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create ticket']);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Handle attachments (if any)
$attachments = [];
if (!empty($_FILES['attachments'])) {
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    foreach ($_FILES['attachments']['tmp_name'] as $i => $tmpName) {
        if ($_FILES['attachments']['error'][$i] === UPLOAD_ERR_OK) {
            $name = basename($_FILES['attachments']['name'][$i]);
            $ext = pathinfo($name, PATHINFO_EXTENSION);
            $filename = uniqid('attach_', true) . '.' . $ext;
            $targetFile = $uploadDir . $filename;
            if (move_uploaded_file($tmpName, $targetFile)) {
                $file_url = 'api/uploads/' . $filename;
                $file_type = $_FILES['attachments']['type'][$i];
                $file_size = $_FILES['attachments']['size'][$i];
                $uploaded_at = $now;
                $uploaded_by = $created_by;
                $attach_id = uniqid('attachment-');
                $stmt = $conn->prepare("INSERT INTO ticket_attachments (id, ticket_id, file_name, file_url, file_type, file_size, uploaded_at, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param('ssssssis', $attach_id, $ticket_id, $name, $file_url, $file_type, $file_size, $uploaded_at, $uploaded_by);
                $stmt->execute();
                $stmt->close();
                $attachments[] = [
                    'id' => $attach_id,
                    'file_name' => $name,
                    'file_url' => $file_url,
                    'file_type' => $file_type,
                    'file_size' => $file_size,
                    'uploaded_at' => $uploaded_at,
                    'uploaded_by' => $uploaded_by
                ];
            }
        }
    }
}

// Return created ticket
$ticket = [
    'id' => $ticket_id,
    'title' => $title,
    'category' => $category,
    'location' => $location,
    'priority' => $priority,
    'description' => $description,
    'status' => 'Open',
    'created_at' => $now,
    'updated_at' => $now,
    'created_by' => $created_by,
    'created_by_role' => $created_by_role,
    'attachments' => $attachments
];
echo json_encode(['success' => true, 'ticket' => $ticket]);
$conn->close(); 