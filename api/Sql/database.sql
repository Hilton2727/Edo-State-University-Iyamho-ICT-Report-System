-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2025 at 12:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `incident_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_photo` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `profile_photo`, `gender`) VALUES
(1, 'Admin User', 'admin@edouniversity.edu.ng', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2025-06-29 09:36:25', '2025-06-29 10:41:00', 'api/uploads/profile_68617aacdc5ff2.21174711.png', NULL),
(2, 'itseh Hillary', 'itsehhillary@edouniversity.edu.ng', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2025-06-30 08:30:29', '2025-06-30 09:03:53', 'api/uploads/profile_6862b533063d79.93886667.webp', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `excerpt`, `content`, `date`, `author`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Welcome to the New IT Support System', 'We\'re excited to announce the launch of our new IT support ticketing system! This modern platform will streamline how we handle technical issues and provide better service to our university community.', 'Key Features:\n- Easy ticket submission\n- Real-time status tracking\n- Knowledge base integration\n- Mobile-friendly interface\n- Automated notifications', '2024-01-01', 'admin', 'Updates', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
(2, 'Network Infrastructure Upgrade Complete', 'Our summer network infrastructure upgrade has been completed successfully! The new system provides: 50% faster Wi-Fi speeds across campus, improved reliability, and reduced downtime.', 'Students and staff should notice significantly improved performance in all campus buildings. If you experience any connectivity issues, please submit a ticket through our new support system.', '2024-01-15', 'tech', 'Network', '2024-01-15 14:30:00', '2024-01-15 14:30:00'),
(3, 'Cybersecurity Awareness Month', 'October is Cybersecurity Awareness Month! This year\'s theme is \"See Yourself in Cyber\" - emphasizing that cybersecurity is everyone\'s responsibility.', 'Join us for our security awareness events and help make our campus more secure!', '2024-01-20', 'admin', 'Security', '2024-01-20 10:15:00', '2024-01-20 10:15:00'),
(4, 'Software Updates and New Applications', 'We\'ve rolled out several software updates and new applications across campus computers.', 'All updates have been tested and deployed during maintenance windows to minimize disruption.', '2024-01-25', 'tech', 'Software', '2024-01-25 16:45:00', '2024-01-25 16:45:00'),
(5, 'Remote Work and Learning Best Practices', 'As we continue to support flexible work and learning arrangements, here are some best practices for staying productive and secure.', 'Our IT team is here to support your remote work and learning needs!', '2024-02-01', 'admin', 'Remote', '2024-02-01 11:20:00', '2024-02-01 11:20:00'),
(6, 'Server Maintenance and Performance Improvements', 'Last weekend\'s scheduled maintenance was completed successfully with significant performance improvements.', 'Thank you for your patience during the maintenance window. The improvements will benefit all users with faster and more reliable services.', '2024-02-05', 'tech', 'Maintenance', '2024-02-05 13:40:00', '2024-02-05 13:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `sender` enum('user','admin') NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_sessions`
--

CREATE TABLE `chat_sessions` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `category`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 'Account', 'How do I reset my password?', 'You can reset your password by clicking the \"Forgot Password\" link on the login page and following the instructions sent to your email.', '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
(2, 'General', 'How do I submit a new incident?', 'Click on \"Submit Incident\" in your dashboard and fill out the required information including title, description, category, and location.', '2024-01-01 10:30:00', '2024-01-01 10:30:00'),
(3, 'Tickets', 'What are the different ticket priorities?', 'We have four priority levels: Low (minor issues), Medium (standard issues), High (significant impact), and Urgent (critical system down).', '2024-01-01 11:00:00', '2024-01-01 11:00:00'),
(4, 'Tickets', 'How long does it take to resolve a ticket?', 'Resolution time depends on priority: Urgent (4 hours), High (24 hours), Medium (3 days), Low (1 week). Complex issues may take longer.', '2024-01-01 11:30:00', '2024-01-01 11:30:00'),
(5, 'Tickets', 'Can I track the status of my ticket?', 'Yes, you can view all your tickets and their current status in your dashboard. You\'ll also receive email notifications for updates.', '2024-01-01 12:00:00', '2024-01-01 12:00:00'),
(6, 'Support', 'Who can I contact for urgent issues?', 'For urgent issues, submit a ticket with \"Urgent\" priority or call our emergency IT hotline at ext. 5555 during business hours.', '2024-01-01 12:30:00', '2024-01-01 12:30:00'),
(7, 'Knowledge', 'How do I access the knowledge base?', 'The knowledge base is available in your dashboard under \"Knowledge Articles\" or you can access it directly from the main navigation.', '2024-01-01 13:00:00', '2024-01-01 13:00:00'),
(8, 'Tickets', 'Can I attach files to my ticket?', 'Yes, you can attach screenshots, documents, or other relevant files when creating or updating a ticket to help us understand the issue better.', '2024-01-01 13:30:00', '2024-01-01 13:30:00'),
(9, 'Tickets', 'What information should I include in a ticket?', 'Include a clear title, detailed description, steps to reproduce the issue, error messages, affected location, and any relevant files or screenshots.', '2024-01-01 14:00:00', '2024-01-01 14:00:00'),
(10, 'Account', 'How do I change my account information?', 'Go to your user profile in the dashboard where you can update your contact information, preferences, and other account details.', '2024-01-01 14:30:00', '2024-01-01 14:30:00'),
(11, 'Technical', 'What browsers are supported?', 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For best experience, keep your browser updated.', '2024-01-01 15:00:00', '2024-01-01 15:00:00'),
(12, 'Technical', 'Is there a mobile app available?', 'Currently, our system is web-based and optimized for mobile browsers. A dedicated mobile app is planned for future release.', '2024-01-01 15:30:00', '2024-01-01 15:30:00'),
(13, 'Security', 'How do I report a security issue?', 'Security issues should be reported immediately using the \"Urgent\" priority level or by contacting IT Security directly at security@university.edu.', '2024-01-01 16:00:00', '2024-01-01 16:00:00'),
(14, 'Tickets', 'Can I reopen a closed ticket?', 'If you need to reopen a closed ticket, you can add a comment to it explaining why it needs to be reopened, or create a new ticket referencing the old one.', '2024-01-01 16:30:00', '2024-01-01 16:30:00'),
(15, 'Technical', 'What are the system maintenance hours?', 'Scheduled maintenance typically occurs on the second Sunday of each month from 2:00 AM to 6:00 AM. Emergency maintenance may occur as needed with advance notice.', '2024-01-01 17:00:00', '2024-01-01 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_articles`
--

CREATE TABLE `knowledge_articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `author_type` varchar(50) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knowledge_articles`
--

INSERT INTO `knowledge_articles` (`id`, `title`, `content`, `category`, `tags`, `author_type`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'How to Reset Your University Email Password', 'To reset your university email password:\n\n1. Go to the IT Services portal\n2. Click on \"Password Reset\"\n3. Enter your student/staff ID\n4. Follow the verification steps\n5. Create a new strong password\n\nYour new password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.', 'System Access', '[\"password\", \"email\", \"reset\", \"authentication\"]', 'admin', 1, '2024-03-12 10:00:00', '2024-03-12 10:00:00'),
(2, 'Connecting to University Wi-Fi', 'Step-by-step guide to connect to the university Wi-Fi network:\n\n1. Select \"UniSecure\" from available networks\n2. Enter your student/staff credentials\n3. Accept the security certificate\n4. You should now be connected\n\nIf you experience issues, try forgetting the network and reconnecting.', 'Network', '[\"wifi\", \"connection\", \"network\", \"wireless\"]', 'tech', 1, '2024-07-05 09:00:00', '2024-07-05 09:00:00'),
(3, 'Installing Software on Lab Computers', 'Guidelines for software installation in computer labs:\n\n1. Only approved software can be installed\n2. Contact IT Services for software requests\n3. Provide justification for educational use\n4. Installation requires administrator approval\n\nPersonal software installation is not permitted.', 'Software', '[\"software\", \"installation\", \"lab\", \"computers\"]', 'tech', 2, '2024-02-18 11:00:00', '2024-02-18 11:00:00'),
(4, 'Troubleshooting Printer Issues', 'Common printer problems and solutions:\n\n**Paper Jams:**\n- Turn off printer\n- Remove jammed paper carefully\n- Check for torn pieces\n- Turn printer back on\n\n**Print Quality Issues:**\n- Check ink/toner levels\n- Clean print heads\n- Use correct paper type\n\n**Connection Problems:**\n- Verify network connection\n- Restart printer\n- Check driver installation', 'Hardware', '[\"printer\", \"troubleshooting\", \"paper jam\", \"print quality\"]', 'tech', 3, '2024-06-21 14:00:00', '2024-06-21 14:00:00'),
(5, 'VPN Setup for Remote Access', 'Setting up VPN for off-campus access:\n\n1. Download the university VPN client\n2. Install with administrator privileges\n3. Configure with provided server settings\n4. Enter your university credentials\n5. Connect to access internal resources\n\nVPN is required for accessing library databases and internal systems from off-campus.', 'Network', '[\"vpn\", \"remote access\", \"off-campus\", \"security\"]', 'admin', 2, '2024-09-09 08:30:00', '2024-09-09 08:30:00'),
(6, 'Email Security Best Practices', 'Protecting your university email account:\n\n1. Use strong, unique passwords\n2. Enable two-factor authentication\n3. Be cautious of phishing emails\n4. Don\'t share credentials\n5. Report suspicious emails to IT Security\n6. Log out from shared computers\n7. Regularly update your password', 'System Access', '[\"email\", \"security\", \"phishing\", \"two-factor\"]', 'admin', 1, '2024-04-27 13:00:00', '2024-04-27 13:00:00'),
(7, 'Computer Maintenance Guidelines', 'Keeping lab computers in good condition:\n\n**Daily:**\n- Shut down properly\n- Clean keyboard and mouse\n- Report any issues immediately\n\n**Weekly:**\n- Check for software updates\n- Clear temporary files\n- Scan for malware\n\n**Monthly:**\n- Deep clean hardware\n- Check hardware connections\n- Update drivers', 'Hardware', '[\"maintenance\", \"computers\", \"cleaning\", \"updates\"]', 'tech', 3, '2024-11-03 16:00:00', '2024-11-03 16:00:00'),
(8, 'Accessing Online Library Resources', 'How to access digital library resources:\n\n1. Visit the library website\n2. Click on \"Digital Resources\"\n3. Select your subject area\n4. Log in with university credentials\n5. Browse or search for materials\n\nOff-campus access requires VPN connection. Contact the library for assistance with specific databases.', 'System Access', '[\"library\", \"digital resources\", \"databases\", \"research\"]', 'admin', 3, '2024-05-14 12:00:00', '2024-05-14 12:00:00'),
(9, 'Microsoft Office Troubleshooting', 'Common Microsoft Office issues and fixes:\n\n**Won\'t Start:**\n- Run Office repair utility\n- Check for Windows updates\n- Restart computer\n- Reinstall if necessary\n\n**Crashes Frequently:**\n- Disable add-ins\n- Run in safe mode\n- Check available memory\n- Update Office\n\n**Files Won\'t Open:**\n- Check file permissions\n- Try different computer\n- Verify file format compatibility', 'Software', '[\"microsoft office\", \"troubleshooting\", \"crashes\", \"repair\"]', 'tech', 2, '2024-08-16 10:30:00', '2024-08-16 10:30:00'),
(10, 'Reporting IT Security Incidents', 'Steps to report security incidents:\n\n1. **Immediate Action:**\n   - Disconnect affected devices\n   - Don\'t attempt to fix yourself\n   - Document what happened\n\n2. **Report to IT Security:**\n   - Call emergency hotline for urgent issues\n   - Email security@university.edu\n   - Provide detailed description\n   - Include screenshots if safe\n\n3. **Follow Up:**\n   - Cooperate with investigation\n   - Implement recommended changes\n   - Monitor for further issues', 'Other', '[\"security\", \"incident\", \"reporting\", \"emergency\"]', 'admin', 1, '2024-10-24 15:45:00', '2024-10-24 15:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_photo` varchar(255) DEFAULT NULL,
  `staff_id` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `faculty` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `email`, `password`, `gender`, `created_at`, `updated_at`, `profile_photo`, `staff_id`, `department`, `faculty`) VALUES
(2, 'Promise james', 'promisejames@edouniversity.edu.ng', '$2y$10$2UkSxSwguppYq85EuFVP0eDn/atpqiNNSJ11E4zZzLBLTORRb3i4C', 'female', '2025-06-30 08:33:50', '2025-06-30 08:56:34', 'api/uploads/profile_6862b3b25ac1e1.60450682.jpg', 'EDSU-138292', 'Law (LL.B)', 'Faculty of Law');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','staff') NOT NULL,
  `mat_no` varchar(50) DEFAULT NULL,
  `level` varchar(10) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_photo` varchar(255) DEFAULT NULL,
  `faculty` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `email`, `password`, `role`, `mat_no`, `level`, `gender`, `created_at`, `updated_at`, `profile_photo`, `faculty`, `department`) VALUES
(3, 'Itseh Hilton', 'itseh22.hilton@edouniversity.edu.ng', '$2y$10$D2djmxfnZte8xMlZ1SzRzuwoWiNvBNZVkj4acD82GTCTUL2tkTvV2', 'student', 'Fsc/csc/21002003', '100L', 'male', '2025-06-29 14:47:24', '2025-06-30 08:57:36', 'api/uploads/profile_6862b3f06d5ab0.31849250.jpg', NULL, NULL),
(4, 'Itseh Harriet', 'itseh19.harriet@edouniversity.edu.ng', '$2y$10$pJypRH0AllzhDXjcc1tj6eKckjbf0zrKxaQgIpLq4etgpjRsJKLTS', 'student', 'MLS/MBS/30203332', '500L', 'female', '2025-06-30 05:06:39', '2025-06-30 08:59:32', 'api/uploads/profile_6862b464846275.86174556.jpg', 'Faculty of Applied Health Sciences', 'Medical Laboratory Science');

-- --------------------------------------------------------

--
-- Table structure for table `tech`
--

CREATE TABLE `tech` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tech`
--

INSERT INTO `tech` (`id`, `name`, `email`, `password`, `gender`, `phone`, `specialization`, `created_at`, `updated_at`, `profile_photo`) VALUES
(20, 'Tech User', 'tech@edouniversity.edu.ng', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'male', '08012345678', 'Network', '2025-06-29 11:34:30', '2025-06-29 18:08:12', 'api/uploads/profile_6861a9d24e20c6.67951817.jpg'),
(22, 'Itseh Erasmus', 'itseherasmus@edouniversity.edu.ng', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'male', '07406741353', 'Course adviser', '2025-06-30 02:08:32', '2025-06-30 09:04:44', 'api/uploads/profile_6862b59c094aa6.89043249.jpg'),
(23, 'Itseh Hero', 'itsehhero@edouniversity.edu.ng', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'female', '08148868023', 'Secretary', '2025-06-30 08:17:32', '2025-06-30 09:00:18', 'api/uploads/profile_6862b492c74457.56635389.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `priority` enum('Low','Medium','High','Urgent') NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Open','In Progress','Resolved','Closed') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_by_role` varchar(20) NOT NULL DEFAULT 'Student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `category`, `location`, `priority`, `description`, `status`, `created_at`, `updated_at`, `created_by`, `assigned_to`, `created_by_role`) VALUES
('T-6861e02c83b0a', 'Network not working in the admin office', 'Network', 'admin', 'Medium', 'the newtwork is waving ', 'In Progress', '2025-06-30 01:54:04', '2025-07-01 00:47:14', 20, NULL, 'Student'),
('T-6861e41761178', 'having issue buying EUI Suit', 'Network', 'online ', 'Medium', 'the portal is closed ', 'Resolved', '2025-06-30 02:10:47', '2025-06-30 08:06:05', 3, 20, 'Student'),
('T-6862457d9deb4', 'I forgot my canvas login', 'Other', 'online ', 'Urgent', 'the email and password help me recover them', 'Resolved', '2025-06-30 09:06:21', '2025-06-30 07:45:24', 3, 22, 'Student'),
('T-6862983cd99c7', 'the printing is not working in the dean office', 'Network', 'admin', 'Medium', 'it not showing sign of current ', 'In Progress', '2025-06-30 14:59:24', '2025-07-01 15:39:01', 22, 20, 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_attachments`
--

CREATE TABLE `ticket_attachments` (
  `id` varchar(50) NOT NULL,
  `ticket_id` varchar(20) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_attachments`
--

INSERT INTO `ticket_attachments` (`id`, `ticket_id`, `file_name`, `file_url`, `file_type`, `file_size`, `uploaded_at`, `uploaded_by`) VALUES
('attachment-6861ba73f3f2d', 'T-6861ba73f1451', 'coin (1).png', 'api/uploads/attach_6861ba73f33f96.38644076.png', 'image/png', 726780, '0000-00-00 00:00:00', 3),
('attachment-6861db057ade5', 'T-6861db05768ed', 'Screenshot_26-6-2025_154713_supabase.com.jpeg', 'api/uploads/attach_6861db05795d12.49375484.jpeg', 'image/jpeg', 107351, '0000-00-00 00:00:00', 3),
('attachment-686297e131967', 'T-686297e12e2ff', 'Incident_Report_T-6862457d9deb4.pdf', 'api/uploads/attach_686297e1304b61.48192199.pdf', 'application/pdf', 8394, '0000-00-00 00:00:00', 22),
('attachment-T-1001-1', 'T-1001', 'screenshot.png', 'https://example.com/screenshot.png', 'image/png', 225000, '2024-07-08 07:00:00', 3),
('attachment-T-1002-1', 'T-1002', 'screenshot.png', 'https://example.com/screenshot.png', 'image/png', 225000, '2024-07-06 07:00:00', 3),
('attachment-T-1004-1', 'T-1004', 'screenshot.png', 'https://example.com/screenshot.png', 'image/png', 225000, '2024-07-01 07:00:00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_comments`
--

CREATE TABLE `ticket_comments` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(20) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_role` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_comments`
--

INSERT INTO `ticket_comments` (`id`, `ticket_id`, `content`, `created_at`, `user_id`, `user_role`) VALUES
(1, 'T-6861e41761178', 'the portal is online\n', '2025-06-30 06:24:47', 1, 'Admin'),
(2, 'T-6862457d9deb4', 'check ypur email', '2025-06-30 06:32:35', 1, 'Admin'),
(3, 'T-6862457d9deb4', 'i havent gotten any email\n', '2025-06-30 06:34:44', 3, 'student'),
(4, 'T-6862983cd99c7', 'uninstall the app', '2025-06-30 07:17:51', 1, 'Admin'),
(5, 'T-6862ab331a9ab', 'blank \n', '2025-06-30 09:12:46', 1, 'Admin'),
(6, 'T-68629da7e0b88', 'hh', '2025-06-30 09:24:05', 1, 'Admin'),
(7, 'T-6861e02c83b0a', 'Check now the sever has beign restarted ', '2025-07-01 00:49:57', 1, 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `chat_sessions`
--
ALTER TABLE `chat_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knowledge_articles`
--
ALTER TABLE `knowledge_articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tech`
--
ALTER TABLE `tech`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_attachments`
--
ALTER TABLE `ticket_attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_sessions`
--
ALTER TABLE `chat_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `knowledge_articles`
--
ALTER TABLE `knowledge_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tech`
--
ALTER TABLE `tech`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
