<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';
$mat_no = isset($data['matNo']) ? trim($data['matNo']) : null;
$level = isset($data['level']) ? trim($data['level']) : null;
$gender = isset($data['gender']) ? trim($data['gender']) : null;
$staff_id = isset($data['staffId']) ? trim($data['staffId']) : null;
$department = isset($data['department']) ? trim($data['department']) : null;
$faculty = isset($data['faculty']) ? trim($data['faculty']) : null;

if (!$name || !$email || !$password || !in_array($role, ['student', 'staff'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$conn = getDbConnection();

if ($role === 'student') {
    if (!$mat_no) {
        http_response_code(400);
        echo json_encode(['error' => 'Matriculation number is required for students']);
        exit;
    }
    if (!$level) {
        http_response_code(400);
        echo json_encode(['error' => 'Level is required for students']);
        exit;
    }
    if (!$gender || !in_array(strtolower($gender), ['male','female'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Gender is required for students']);
        exit;
    }
    if (!$faculty) {
        http_response_code(400);
        echo json_encode(['error' => 'Faculty is required for students']);
        exit;
    }
    if (!$department) {
        http_response_code(400);
        echo json_encode(['error' => 'Department is required for students']);
        exit;
    }
    // Check if email exists in student
    $stmt = $conn->prepare("SELECT id FROM student WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered']);
        exit;
    }
    $stmt->close();
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO student (name, email, password, role, mat_no, level, gender, faculty, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $name, $email, $hashed, $role, $mat_no, $level, $gender, $faculty, $department);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'user' => [
            'id' => $stmt->insert_id,
            'name' => $name,
            'email' => $email,
            'role' => $role,
            'matNo' => $mat_no,
            'level' => $level,
            'gender' => $gender,
            'faculty' => $faculty,
            'department' => $department
        ]]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed']);
    }
    $stmt->close();
    $conn->close();
    exit;
}

if ($role === 'staff') {
    if (!$gender || !in_array(strtolower($gender), ['male','female'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Gender is required for staff']);
        exit;
    }
    if (!$staff_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Staff ID is required for staff']);
        exit;
    }
    if (!$faculty) {
        http_response_code(400);
        echo json_encode(['error' => 'Faculty is required for staff']);
        exit;
    }
    if (!$department) {
        http_response_code(400);
        echo json_encode(['error' => 'Department is required for staff']);
        exit;
    }
    // Check if email exists in staff
    $stmt = $conn->prepare("SELECT id FROM staff WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered']);
        exit;
    }
    $stmt->close();
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO staff (name, email, password, gender, staff_id, faculty, department) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $email, $hashed, $gender, $staff_id, $faculty, $department);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'user' => [
            'id' => $stmt->insert_id,
            'name' => $name,
            'email' => $email,
            'role' => $role,
            'gender' => $gender,
            'staff_id' => $staff_id,
            'faculty' => $faculty,
            'department' => $department
        ]]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed']);
    }
    $stmt->close();
    $conn->close();
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid role']); 