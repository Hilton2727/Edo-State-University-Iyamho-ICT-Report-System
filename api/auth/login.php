<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

session_start();

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$conn = getDbConnection();
// First, check student table
$stmt = $conn->prepare("SELECT id, name, email, password, role, mat_no, level, gender FROM student WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['user_name'] = $user['name'];
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'matNo' => $user['mat_no'],
            'level' => $user['level'],
            'gender' => $user['gender']
        ]
    ]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();
// Next, check staff table
$stmt = $conn->prepare("SELECT id, name, email, password, gender FROM staff WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$staff = $result->fetch_assoc();
if ($staff && password_verify($password, $staff['password'])) {
    $_SESSION['user_id'] = $staff['id'];
    $_SESSION['user_role'] = 'Staff';
    $_SESSION['user_name'] = $staff['name'];
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $staff['id'],
            'name' => $staff['name'],
            'email' => $staff['email'],
            'role' => 'Staff',
            'gender' => $staff['gender']
        ]
    ]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();
// Finally, check admin table
$stmt = $conn->prepare("SELECT id, name, email, password, profile_photo FROM admin WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();
if ($admin && password_verify($password, $admin['password'])) {
    $_SESSION['user_id'] = $admin['id'];
    $_SESSION['user_role'] = 'Admin';
    $_SESSION['user_name'] = $admin['name'];
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $admin['id'],
            'name' => $admin['name'],
            'email' => $admin['email'],
            'role' => 'Admin',
            'profile_photo' => $admin['profile_photo']
        ]
    ]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();
// Now, check tech table
$stmt = $conn->prepare("SELECT id, name, email, password, gender, phone, specialization, profile_photo FROM tech WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$tech = $result->fetch_assoc();
if ($tech && password_verify($password, $tech['password'])) {
    $_SESSION['user_id'] = $tech['id'];
    $_SESSION['user_role'] = 'Tech';
    $_SESSION['user_name'] = $tech['name'];
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $tech['id'],
            'name' => $tech['name'],
            'email' => $tech['email'],
            'role' => 'Tech',
            'gender' => $tech['gender'],
            'phone' => $tech['phone'],
            'specialization' => $tech['specialization'],
            'profile_photo' => $tech['profile_photo']
        ]
    ]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();
$conn->close();
http_response_code(401);
echo json_encode(['error' => 'Invalid credentials']); 