import { Ticket, KnowledgeArticle, User, TicketComment, Attachment } from '@/types';

// Mock users
export const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@edouniversity.edu.ng', role: 'Admin' },
  { id: '2', name: 'Tech Support', email: 'tech@edouniversity.edu.ng', role: 'Technician' },
  { id: '3', name: 'Itseh Hillary Oshiobughie', email: 'itseh21.hillary@edouniversity.edu.ng', role: 'Student', matricNumber: 'FSC/CSC/21002806', year: '4' },
  { id: '4', name: 'Jane Staff', email: 'staff@edouniversity.edu.ng', role: 'Staff' },
  { id: '5', name: 'Alice Technician', email: 'alice@edouniversity.edu.ng', role: 'Technician' },
  { id: '6', name: 'Bob Admin', email: 'bob@edouniversity.edu.ng', role: 'Admin' },
];

// Mock comments
const generateComments = (ticketId: string): TicketComment[] => {
  return [
    {
      id: `comment-${ticketId}-1`,
      content: 'I will look into this issue right away.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      user: users[1], // Tech Support
    },
    {
      id: `comment-${ticketId}-2`,
      content: 'Thank you, please let me know if you need any additional information.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      user: users[2], // John Student
    },
  ];
};

// Mock attachments
const generateAttachments = (ticketId: string): Attachment[] => {
  return [
    {
      id: `attachment-${ticketId}-1`,
      name: 'screenshot.png',
      size: 225000,
      type: 'image/png',
      url: 'https://example.com/screenshot.png',
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      uploadedBy: users[2], // John Student
    },
  ];
};

// Mock tickets
export const tickets: Ticket[] = [
  {
    id: 'T-1001',
    title: 'Cannot connect to campus Wi-Fi',
    category: 'Network',
    location: 'Library Building',
    priority: 'High',
    description: 'I am unable to connect to the campus Wi-Fi network from my laptop. It shows connected but there is no internet access.',
    status: 'Open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    createdBy: users[2], // John Student
    assignedTo: users[1], // Tech Support
    comments: generateComments('T-1001'),
    attachments: generateAttachments('T-1001'),
  },
  {
    id: 'T-1002',
    title: 'Printer not working in Staff Room',
    category: 'Hardware',
    location: 'Admin Block',
    priority: 'Medium',
    description: 'The main printer in the staff room is showing an error message and will not print any documents.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    createdBy: users[3], // Jane Staff
    assignedTo: users[4], // Alice Technician
    comments: generateComments('T-1002'),
    attachments: generateAttachments('T-1002'),
  },
  {
    id: 'T-1003',
    title: 'Need access to research database',
    category: 'System Access',
    location: 'Online',
    priority: 'Low',
    description: 'I require access to the research database for my final year project.',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdBy: users[2], // John Student
    assignedTo: users[5], // Bob Admin
    comments: generateComments('T-1003'),
    attachments: [],
  },
  {
    id: 'T-1004',
    title: 'Microsoft Office not activating',
    category: 'Software',
    location: 'Computer Lab 2',
    priority: 'Medium',
    description: 'The Microsoft Office installation on computers in Lab 2 is showing activation errors.',
    status: 'Closed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    createdBy: users[3], // Jane Staff
    assignedTo: users[1], // Tech Support
    comments: generateComments('T-1004'),
    attachments: generateAttachments('T-1004'),
  },
  {
    id: 'T-1005',
    title: 'Projector not displaying in Lecture Hall',
    category: 'Hardware',
    location: 'Science Block',
    priority: 'Urgent',
    description: 'The projector in the main lecture hall is not displaying anything. We have an important presentation in 1 hour.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    createdBy: users[3], // Jane Staff
    assignedTo: users[4], // Alice Technician
    comments: generateComments('T-1005'),
    attachments: [],
  },
];

// Mock knowledge base articles - expanded to 30 articles
export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'KB-001',
    title: 'How to connect to campus Wi-Fi',
    content: `
# Connecting to Campus Wi-Fi

Follow these steps to connect to the Edo State University Iyamho campus Wi-Fi network:

1. Go to your device's Wi-Fi settings
2. Select the network named "ESUI-Wifi"
3. Enter your student/staff ID as the username
4. Enter your portal password
5. Accept the security certificate if prompted

## Troubleshooting

If you cannot connect:
- Make sure you are within range of a Wi-Fi access point
- Verify your credentials are correct
- Restart your device's Wi-Fi adapter
- Clear saved networks and try again

For persistent issues, please visit the ICT office in the Admin Block.
    `,
    category: 'Network',
    tags: ['wifi', 'network', 'connection', 'internet'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    author: users[1], // Tech Support
    relatedTickets: ['T-1001'],
  },
  {
    id: 'KB-002',
    title: 'Accessing software licenses for students',
    content: `
# Student Software License Guide

As an Edo State University Iyamho student, you have access to various software licenses for academic use.

## Available Software
- Microsoft Office 365
- SPSS
- MATLAB
- AutoCAD
- Adobe Creative Cloud

## How to Access

1. Visit [software.edouniversity.edu.ng](https://software.edouniversity.edu.ng)
2. Log in with your student credentials
3. Select the software you need
4. Follow the download and installation instructions
5. Use your student email for activation

## License Durations

Most licenses are valid for the duration of your studies and will expire upon graduation.

For assistance with software installation, please submit a ticket or visit the ICT Support Center.
    `,
    category: 'Software',
    tags: ['software', 'license', 'office', 'adobe', 'student'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 150).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    author: users[5], // Bob Admin
  },
  {
    id: 'KB-003',
    title: 'Printing guide for campus printers',
    content: `
# Campus Printing Guide

This guide explains how to use the printing services available on campus.

## Printer Locations
- Library (3 printers)
- Computer Lab 1 (2 printers)
- Admin Block (1 printer)
- Each Faculty Building (1 printer per floor)

## How to Print

1. Connect to the campus network
2. Open the document you want to print
3. Select File > Print
4. Choose a printer from the dropdown list (printers are named by location)
5. Set your print options and click Print
6. Go to the selected printer and scan your ID card to release the print job

## Print Quotas

- Students: 200 pages per semester
- Staff: 500 pages per semester
- Additional pages can be purchased from the Finance Office

## Troubleshooting

If your document doesn't print:
- Check that you're connected to the campus network
- Ensure the printer is online and not in an error state
- Verify you have sufficient print quota
- Try sending the job again

For assistance, contact the ICT department.
    `,
    category: 'Hardware',
    tags: ['printer', 'printing', 'hardware', 'quota'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    author: users[4], // Alice Technician
    relatedTickets: ['T-1002'],
  },
  {
    id: 'KB-004',
    title: 'Password reset procedures',
    content: `
# Password Reset Guide

If you've forgotten your university account password, follow these steps:

## Self-Service Reset

1. Go to [portal.edouniversity.edu.ng](https://portal.edouniversity.edu.ng)
2. Click "Forgot Password"
3. Enter your student/staff ID
4. Check your university email for reset instructions
5. Follow the link in the email to create a new password

## Password Requirements

Your new password must:
- Be at least 8 characters long
- Include uppercase and lowercase letters
- Include at least one number
- Include at least one special character

## If Self-Service Fails

Contact the ICT Help Desk with:
- Your full name
- Student/Staff ID
- Valid ID card for verification

## Security Tips

- Never share your password
- Use a unique password for your university account
- Change your password every 6 months
    `,
    category: 'System Access',
    tags: ['password', 'reset', 'account', 'security'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    author: users[1],
  },
  {
    id: 'KB-005',
    title: 'Email setup on mobile devices',
    content: `
# Mobile Email Setup

Configure your university email on your mobile device.

## For Android Devices

1. Open the Gmail app
2. Tap "Add another account"
3. Select "Other"
4. Enter your full university email
5. Use IMAP settings:
   - Server: mail.edouniversity.edu.ng
   - Port: 993 (SSL)
   - Username: your full email
   - Password: your account password

## For iOS Devices

1. Go to Settings > Mail > Accounts
2. Tap "Add Account" > "Other"
3. Select "Add Mail Account"
4. Enter your university email details
5. Use the same IMAP settings as above

## Troubleshooting

- Ensure you're connected to Wi-Fi or mobile data
- Check your email and password are correct
- Contact ICT if you continue to have issues
    `,
    category: 'Software',
    tags: ['email', 'mobile', 'setup', 'configuration'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-006',
    title: 'Computer lab access and rules',
    content: `
# Computer Lab Usage Guide

Information about accessing and using the university computer labs.

## Lab Locations and Hours

- Computer Lab 1: Admin Block, 8AM-8PM
- Computer Lab 2: Science Block, 8AM-6PM
- Computer Lab 3: Library, 24/7 (for students)

## Access Requirements

- Valid student/staff ID card
- Current semester registration
- Lab access fee payment (students only)

## Lab Rules

1. No food or drinks allowed
2. Save work frequently
3. Log out when finished
4. Report any technical issues immediately
5. No unauthorized software installation
6. Respect equipment and other users

## Available Software

- Microsoft Office Suite
- Programming IDEs (Visual Studio, Eclipse)
- Statistical software (SPSS, R)
- Design software (Adobe Creative Suite)
- Web browsers and internet access

## Getting Help

Lab assistants are available during operating hours for technical support.
    `,
    category: 'Hardware',
    tags: ['computer', 'lab', 'access', 'rules', 'software'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 160).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-007',
    title: 'LMS (Learning Management System) guide',
    content: `
# Learning Management System Guide

How to access and use the university's online learning platform.

## Accessing the LMS

1. Go to [lms.edouniversity.edu.ng](https://lms.edouniversity.edu.ng)
2. Log in with your university credentials
3. Your enrolled courses will appear on the dashboard

## Key Features

- Course materials and lectures
- Assignment submissions
- Grade viewing
- Discussion forums
- Online quizzes and exams
- Video conferencing for virtual classes

## Troubleshooting Common Issues

### Cannot see enrolled courses
- Ensure you're registered for the current semester
- Contact your academic advisor
- Clear browser cache and try again

### Assignment upload fails
- Check file size (max 50MB)
- Supported formats: PDF, DOC, DOCX, PPT, PPTX
- Ensure stable internet connection

### Video not playing
- Update your browser
- Check internet speed
- Try a different browser

## Mobile App

Download the "ESUI LMS" app from Google Play Store or Apple App Store for mobile access.
    `,
    category: 'Software',
    tags: ['lms', 'learning', 'online', 'courses', 'assignments'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 140).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    author: users[1],
  },
  {
    id: 'KB-008',
    title: 'VPN setup for off-campus access',
    content: `
# VPN Setup Guide

Access university resources from off-campus using VPN.

## Why Use VPN?

- Access library databases from home
- Connect to campus network drives
- Use licensed software remotely
- Secure connection to university systems

## Setup Instructions

### Windows
1. Download VPN client from [vpn.edouniversity.edu.ng](https://vpn.edouniversity.edu.ng)
2. Install the application
3. Enter your university credentials
4. Connect to "ESUI-VPN"

### Mac
1. Go to System Preferences > Network
2. Click "+" to add new connection
3. Select VPN (IKEv2)
4. Enter server: vpn.edouniversity.edu.ng
5. Use your university username and password

### Mobile Devices
Download "ESUI VPN" app from your device's app store.

## Troubleshooting

- Ensure your account is active
- Check internet connection
- Try different VPN servers if available
- Contact ICT for authentication issues
    `,
    category: 'Network',
    tags: ['vpn', 'remote', 'access', 'off-campus', 'security'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-009',
    title: 'Library database access',
    content: `
# Library Database Access

Access academic databases and journals for research.

## Available Databases

- JSTOR - Academic journals
- IEEE Xplore - Engineering and technology
- PubMed - Medical and life sciences
- ScienceDirect - Scientific publications
- Google Scholar - General academic search

## Access Methods

### On Campus
Direct access through any campus computer or Wi-Fi connection.

### Off Campus
1. Connect to university VPN first
2. Go to [library.edouniversity.edu.ng](https://library.edouniversity.edu.ng)
3. Click on "Database Access"
4. Select your desired database
5. Log in with university credentials if prompted

## Search Tips

- Use specific keywords
- Apply filters for publication date
- Check "peer-reviewed" for academic sources
- Use quotation marks for exact phrases
- Combine terms with AND, OR, NOT

## Downloading Articles

- Most databases allow PDF downloads
- Check usage rights and copyright
- Cite sources properly in your work

## Need Help?

Librarians offer research assistance and database training sessions.
    `,
    category: 'System Access',
    tags: ['library', 'database', 'research', 'journals', 'academic'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-010',
    title: 'Antivirus and security guidelines',
    content: `
# Computer Security Guidelines

Protect your devices and data with these security practices.

## Antivirus Software

### For Students (Free)
- Windows Defender (built-in for Windows)
- Avast Free Antivirus
- AVG Free Antivirus

### For Staff (University License)
Contact ICT for enterprise antivirus installation.

## Security Best Practices

### Passwords
- Use strong, unique passwords
- Enable two-factor authentication when available
- Don't share passwords
- Use password managers

### Email Safety
- Don't open suspicious attachments
- Verify sender identity for sensitive requests
- Report phishing emails to ICT
- Don't click unknown links

### Software Updates
- Keep operating system updated
- Update browsers regularly
- Install security patches promptly
- Use official software sources only

## Reporting Security Incidents

If you suspect a security breach:
1. Disconnect from the network immediately
2. Don't shut down the computer
3. Contact ICT Help Desk immediately
4. Document what happened

## Data Backup

- Backup important files regularly
- Use both local and cloud storage
- Test backup restoration periodically
    `,
    category: 'Software',
    tags: ['security', 'antivirus', 'password', 'backup', 'safety'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    author: users[1],
  },
  {
    id: 'KB-011',
    title: 'Video conferencing setup (Zoom/Teams)',
    content: `
# Video Conferencing Guide

Set up and use video conferencing tools for virtual classes and meetings.

## Microsoft Teams

### Installation
1. Download from [teams.microsoft.com](https://teams.microsoft.com)
2. Log in with your university email
3. Join teams using codes provided by instructors

### Features
- Video and audio calls
- Screen sharing
- Chat messaging
- File sharing
- Recording meetings

## Zoom

### For Students
1. Download Zoom client
2. Join meetings using links from instructors
3. No account required for joining

### For Staff
University provides Zoom Pro accounts - contact ICT for setup.

## Best Practices

### Audio/Video Quality
- Use headphones to prevent echo
- Test microphone and camera before meetings
- Ensure good lighting for video
- Mute when not speaking

### Meeting Etiquette
- Join meetings on time
- Use appropriate backgrounds
- Dress professionally
- Participate actively when appropriate

## Troubleshooting

- Check internet connection speed
- Close unnecessary applications
- Restart the application if issues persist
- Update to latest version
    `,
    category: 'Software',
    tags: ['video', 'conferencing', 'zoom', 'teams', 'virtual', 'meetings'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-012',
    title: 'Network drive access and file sharing',
    content: `
# Network Drive Access

Access shared university network drives for file storage and collaboration.

## Available Network Drives

- H: Drive - Personal home directory
- S: Drive - Shared departmental resources
- P: Drive - Project collaboration space
- L: Drive - Library resources

## Accessing from Windows

1. Open File Explorer
2. Click "This PC"
3. Click "Map network drive"
4. Enter drive path: \\\\server.edouniversity.edu.ng\\[drive]
5. Use university credentials to authenticate

## Accessing from Mac

1. Open Finder
2. Press Cmd+K
3. Enter: smb://server.edouniversity.edu.ng/[drive]
4. Enter university username and password

## File Sharing Guidelines

### Do's
- Organize files in appropriate folders
- Use descriptive file names
- Regular backup important files
- Set appropriate permissions

### Don'ts
- Don't store personal files on shared drives
- Don't share sensitive information inappropriately
- Don't delete files without permission
- Don't exceed storage quotas

## Storage Quotas

- Students: 5GB personal, 2GB shared
- Staff: 20GB personal, 10GB shared
- Faculty: 50GB personal, 25GB shared

## Troubleshooting

- Ensure you're connected to campus network or VPN
- Check username and password
- Verify drive path is correct
- Contact ICT if access is denied
    `,
    category: 'Network',
    tags: ['network', 'drive', 'file', 'sharing', 'storage', 'collaboration'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 55).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-013',
    title: 'Projector and AV equipment troubleshooting',
    content: `
# AV Equipment Troubleshooting

Resolve common issues with projectors and audio-visual equipment.

## Projector Issues

### No Display
1. Check power cable connections
2. Ensure projector is powered on
3. Verify input source selection
4. Check cable connections (HDMI, VGA)
5. Try a different cable if available

### Blurry Image
1. Adjust focus ring on projector lens
2. Check projector distance from screen
3. Clean projector lens with soft cloth
4. Ensure projector is level

### Color Issues
1. Check color settings in projector menu
2. Verify cable connections are secure
3. Test with different input source
4. Reset projector to factory settings

## Audio Issues

### No Sound
1. Check volume levels on both device and projector
2. Ensure audio cable is connected
3. Select correct audio output on laptop
4. Test with different audio source

### Poor Audio Quality
1. Check for loose connections
2. Adjust audio settings
3. Move away from interference sources
4. Use external speakers if available

## Laptop Connection

### Windows
1. Press Windows + P
2. Select "Duplicate" or "Extend"
3. If no signal, check display settings
4. Update graphics drivers if needed

### Mac
1. Go to System Preferences > Displays
2. Click "Detect Displays"
3. Arrange displays as needed
4. Mirror or extend as required

## Getting Help

If issues persist:
- Contact ICT immediately for urgent presentations
- Report faulty equipment for repair
- Request backup equipment if needed
    `,
    category: 'Hardware',
    tags: ['projector', 'audio', 'visual', 'presentation', 'equipment'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.5).toISOString(),
    author: users[4],
    relatedTickets: ['T-1005'],
  },
  {
    id: 'KB-014',
    title: 'Software installation procedures',
    content: `
# Software Installation Guide

Guidelines for installing software on university computers and personal devices.

## University Computers

### Restrictions
- Only authorized software can be installed
- Admin rights required for installations
- All software must be licensed properly
- Personal software installation is prohibited

### Request Process
1. Submit software request through ICT portal
2. Provide business justification
3. Include licensing information
4. Wait for approval before installation

## Personal Devices

### Licensed Software
Students and staff can install university-licensed software on personal devices:
- Microsoft Office 365
- Antivirus software
- Statistical packages (for relevant courses)
- Programming environments

### Installation Steps
1. Access software portal with university credentials
2. Download approved software
3. Follow installation instructions
4. Activate with university license key

## Common Software

### Programming Tools
- Visual Studio Code (free)
- Eclipse IDE (free)
- Python (free)
- R and RStudio (free)

### Productivity
- Microsoft Office 365 (university license)
- Google Workspace (free with university email)
- Adobe Creative Cloud (limited university license)

### Security
- University-approved antivirus
- VPN client
- Password managers

## Troubleshooting

### Installation Fails
- Check system requirements
- Ensure sufficient disk space
- Run as administrator (if permitted)
- Disable antivirus temporarily during installation

### Licensing Issues
- Verify university license status
- Check internet connection for activation
- Contact software vendor support
- Submit ticket to ICT for assistance

## Prohibited Software

- Pirated or cracked software
- Peer-to-peer file sharing applications
- Unauthorized remote access tools
- Games on university computers
    `,
    category: 'Software',
    tags: ['installation', 'software', 'license', 'approval', 'procedures'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.3).toISOString(),
    author: users[1],
    relatedTickets: ['T-1004'],
  },
  {
    id: 'KB-015',
    title: 'Internet and bandwidth management',
    content: `
# Internet Usage Guidelines

Optimize internet usage and understand bandwidth policies.

## Bandwidth Allocation

### Priority Traffic
1. Academic research
2. Administrative systems
3. Email and communication
4. Educational streaming

### Limited Traffic
- Social media browsing
- Entertainment streaming
- Large file downloads
- Gaming

## Usage Policies

### Acceptable Use
- Academic research and coursework
- University business activities
- Professional communication
- Educational content access

### Prohibited Activities
- Illegal downloads
- Excessive personal streaming
- Bandwidth-intensive gaming
- Commercial activities

## Optimization Tips

### For Better Performance
- Close unnecessary browser tabs
- Pause automatic updates during peak hours
- Use wired connection when possible
- Clear browser cache regularly

### Peak Hours
Heavy usage typically occurs:
- 9AM-12PM: Classes and research
- 2PM-5PM: Administrative work
- 7PM-10PM: Student online activities

### Off-Peak Hours
Better performance expected:
- Early morning (6AM-8AM)
- Late evening (after 11PM)
- Weekends

## Troubleshooting Slow Internet

1. Test connection speed at [speedtest.net](https://speedtest.net)
2. Try different websites to isolate issues
3. Restart your device's network adapter
4. Connect closer to Wi-Fi access point
5. Report persistent issues to ICT

## Mobile Data Alternatives

When campus internet is slow:
- Use mobile hotspot for urgent tasks
- Download large files at off-peak hours
- Use university Wi-Fi for basic browsing
- Plan ahead for bandwidth-intensive tasks

## Monitoring Usage

Staff and faculty can request bandwidth usage reports from ICT for their departments.
    `,
    category: 'Network',
    tags: ['internet', 'bandwidth', 'usage', 'optimization', 'policies'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.2).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-016',
    title: 'Backup and data recovery procedures',
    content: `
# Data Backup and Recovery

Protect your important data with proper backup strategies.

## Backup Options

### Personal Files
1. **Cloud Storage**
   - OneDrive (university account): 1TB
   - Google Drive (with university email): 15GB
   - Dropbox: Limited free storage

2. **Local Backup**
   - External hard drives
   - USB flash drives
   - Network attached storage (NAS)

3. **University Network Drive**
   - Automatic backup to H: drive
   - Daily incremental backups
   - 30-day retention policy

## Backup Best Practices

### What to Backup
- Research data and documents
- Course assignments and projects
- Email and contacts
- Important personal files
- Software configurations

### Backup Schedule
- **Critical files**: Daily
- **Important files**: Weekly
- **General files**: Monthly
- **Full system**: Quarterly

### 3-2-1 Rule
- 3 copies of important data
- 2 different storage media types
- 1 copy stored off-site

## University Data Recovery

### Network Drive Recovery
1. Contact ICT with specific file details
2. Provide approximate deletion date
3. Allow 24-48 hours for recovery
4. Files can be recovered up to 30 days

### Email Recovery
- Deleted emails: Check "Deleted Items"
- Permanently deleted: Contact ICT within 14 days
- Mailbox corruption: Automatic restoration available

## Data Loss Prevention

### Common Causes
- Hardware failure
- Accidental deletion
- Virus/malware infection
- Theft or loss of device
- Natural disasters

### Prevention Tips
- Save work frequently
- Use version control for documents
- Enable auto-save features
- Protect devices with passwords
- Regular system maintenance

## Emergency Data Recovery

### Immediate Steps
1. Stop using the affected device
2. Don't attempt DIY recovery software
3. Contact ICT immediately
4. Document what happened

### Professional Recovery
For severely damaged storage devices:
- ICT can recommend data recovery services
- University may cover costs for critical academic data
- Recovery success rates vary by damage type

## Legal and Policy Considerations

- University data remains property of the institution
- Personal use of university storage should be minimal
- Sensitive data requires special handling
- Data retention policies must be followed
    `,
    category: 'System Access',
    tags: ['backup', 'recovery', 'data', 'protection', 'storage'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.1).toISOString(),
    author: users[1],
  },
  {
    id: 'KB-017',
    title: 'Online exam and assessment platform',
    content: `
# Online Assessment Platform Guide

Navigate the university's online examination and assessment system.

## Platform Access

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection (minimum 2 Mbps)
- Working webcam and microphone (for proctored exams)
- Updated browser plugins

### Logging In
1. Go to [exams.edouniversity.edu.ng](https://exams.edouniversity.edu.ng)
2. Enter your student ID and password
3. Complete two-factor authentication if required
4. Review scheduled assessments

## Types of Assessments

### Quiz Assessments
- Multiple choice questions
- Short answer responses
- True/false questions
- Immediate feedback available

### Timed Examinations
- Strict time limits
- Auto-submission when time expires
- No ability to return to previous questions
- Browser lockdown may be enabled

### Proctored Exams
- Live supervision via webcam
- Identity verification required
- Screen recording throughout exam
- Strict academic integrity monitoring

## Exam Preparation

### Technical Checklist
- Test internet connection speed
- Update browser to latest version
- Check webcam and microphone functionality
- Close unnecessary applications
- Have backup internet source ready

### Academic Preparation
- Review course materials thoroughly
- Practice with sample questions if available
- Understand exam format and timing
- Prepare permitted materials in advance

## During the Exam

### Best Practices
- Read instructions carefully
- Manage time effectively
- Save answers frequently (if option available)
- Stay within designated exam area
- Maintain academic integrity

### Technical Guidelines
- Don't refresh browser unless instructed
- Don't open other applications
- Keep device plugged in or fully charged
- Ensure stable internet throughout

## Troubleshooting

### Common Issues
- **Exam won't load**: Clear browser cache, try different browser
- **Lost connection**: Exam will typically resume where you left off
- **Technical glitch**: Contact ICT immediately with exam details
- **Browser crash**: Restart browser and log back in

### Emergency Contacts
- ICT Help Desk: Available during all exam periods
- Course instructor: For content-related questions
- Academic office: For policy and procedure issues

## Academic Integrity

### Permitted
- Using allowed reference materials
- Taking breaks if specified in instructions
- Having water and permitted snacks nearby

### Prohibited
- Communication with others during exam
- Using unauthorized materials or websites
- Having mobile phones accessible
- Allowing others in exam area

### Consequences
Violations result in:
- Automatic exam failure
- Academic misconduct investigation
- Possible course failure
- Disciplinary action per university policy

## Post-Exam

### Results
- Grades typically available within 48-72 hours
- Check university portal for official scores
- Request grade review if discrepancies found

### Feedback
- Some assessments provide detailed feedback
- Review incorrect answers for learning
- Contact instructor for clarification if needed
    `,
    category: 'Software',
    tags: ['exam', 'assessment', 'online', 'testing', 'proctoring'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.05).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-018',
    title: 'IT service request procedures',
    content: `
# IT Service Request Guide

How to properly submit and track IT service requests.

## Service Categories

### Hardware Support
- Computer and laptop issues
- Printer problems
- Network equipment
- Projector and AV equipment
- Phone system issues

### Software Support
- Application installation
- License activation
- Software troubleshooting
- Account access issues
- Email configuration

### Network Services
- Internet connectivity
- Wi-Fi access problems
- VPN setup
- Network drive access
- Bandwidth issues

## Request Submission

### Online Portal
1. Visit [helpdesk.edouniversity.edu.ng](https://helpdesk.edouniversity.edu.ng)
2. Log in with university credentials
3. Click "Submit New Request"
4. Select appropriate category
5. Provide detailed description
6. Attach screenshots if helpful
7. Submit request

### Email Support
Send detailed requests to: ict@edouniversity.edu.ng
Include:
- Your full name and department
- Contact information
- Detailed problem description
- Steps you've already tried
- Urgency level

### Phone Support
- General support: +234-123-456-7890
- Emergency line: +234-987-654-3210
- Available: Monday-Friday, 8AM-5PM

## Priority Levels

### Critical (Response: 2 hours)
- Complete system outages
- Security breaches
- Equipment failure affecting multiple users
- Infrastructure problems

### High (Response: 8 hours)
- Individual computer failures
- Email access problems
- Software licensing issues
- Printer malfunctions

### Medium (Response: 24 hours)
- Software installation requests
- Account setup
- Training requests
- Non-urgent configuration changes

### Low (Response: 72 hours)
- Information requests
- Consultation services
- Enhancement requests
- General inquiries

## Request Information

### Required Details
- **Contact Information**: Name, department, phone, email
- **Location**: Building and room number
- **Asset Details**: Computer name, serial number (if known)
- **Problem Description**: Specific symptoms and error messages
- **Business Impact**: How this affects your work
- **Preferred Resolution Time**: When you need this resolved

### Helpful Information
- Screenshots of error messages
- Steps that led to the problem
- When the problem started
- What you've tried to fix it
- Whether problem is consistent or intermittent

## Tracking Your Request

### Ticket System
- You'll receive a ticket number via email
- Use this number for all follow-up communication
- Check status at any time through the portal
- Receive automatic updates on progress

### Status Definitions
- **Open**: Request received and assigned
- **In Progress**: Technician actively working on issue
- **Waiting**: Awaiting information or parts
- **Resolved**: Solution implemented
- **Closed**: Issue confirmed resolved by requestor

## Service Level Agreements

### Response Times
Response times begin when request is received during business hours.

### Resolution Times
- Simple issues: Same day
- Complex issues: 2-3 business days
- Hardware replacement: 3-5 business days
- Software procurement: 1-2 weeks

### Escalation Process
If service levels aren't met:
1. Contact ICT supervisor
2. Escalate to IT Director
3. Involve department head if necessary

## Self-Service Options

### Knowledge Base
Search common solutions before submitting requests.

### Software Downloads
Access university-licensed software through the portal.

### Password Reset
Use self-service password reset for account issues.

### Status Pages
Check system status for known outages.
    `,
    category: 'Other',
    tags: ['service', 'request', 'helpdesk', 'support', 'procedures'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.02).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-019',
    title: 'Campus technology policies',
    content: `
# Campus Technology Policies

Understanding and compliance with university technology policies.

## Acceptable Use Policy

### General Principles
- Technology resources are provided for educational and administrative purposes
- Users must respect intellectual property rights
- Maintain professional and ethical standards
- Comply with applicable laws and regulations

### Permitted Activities
- Academic research and coursework
- University business and administration
- Professional development
- Reasonable personal use
- Educational collaboration

### Prohibited Activities
- Illegal or fraudulent activities
- Harassment or threatening behavior
- Commercial activities without authorization
- Excessive personal use that impacts performance
- Violating intellectual property rights

## Data Security Policies

### Password Requirements
- Minimum 8 characters
- Include uppercase, lowercase, numbers, symbols
- Change every 90 days
- No password reuse for 12 months
- No sharing of credentials

### Data Classification
1. **Public**: No restrictions
2. **Internal**: University community only
3. **Confidential**: Restricted access
4. **Highly Confidential**: Strictly controlled

### Data Handling
- Encrypt sensitive data in transit and at rest
- Use secure methods for data transfer
- Limit access to need-to-know basis
- Report data breaches immediately

## Software Compliance

### Licensed Software
- Use only properly licensed software
- Comply with license terms and restrictions
- Report software needs through proper channels
- Don't install unauthorized software

### Personal Software
- Limited personal software on university computers
- Must not interfere with university operations
- Subject to university security policies
- May be removed without notice

## Email and Communication

### Professional Standards
- Use professional language and tone
- Respect recipient's time and privacy
- Don't send spam or mass emails without authorization
- Follow university branding guidelines

### Privacy Expectations
- University reserves right to monitor communications
- Email may be subject to public records requests
- Use university email for university business
- Personal use should be minimal

## Network Usage

### Bandwidth Management
- University prioritizes academic and administrative traffic
- Excessive personal use may be restricted
- Streaming and gaming may be limited during peak hours
- Large downloads should be scheduled appropriately

### Network Security
- Don't attempt to circumvent security measures
- Don't share network credentials
- Report security incidents immediately
- Use VPN for off-campus access to secure resources

## Mobile Device Policy

### Personal Devices
- May access university email and systems
- Must comply with security requirements
- University may require device management software
- User responsible for device security

### University-Owned Devices
- For university business use only
- Must install required security software
- Regular security updates required
- Return when employment/enrollment ends

## Social Media Guidelines

### Personal Use
- Distinguish personal views from university positions
- Respect confidentiality and privacy
- Follow applicable laws and regulations
- Consider impact on university reputation

### University Accounts
- Only authorized personnel may create official accounts
- Follow university branding and messaging guidelines
- Maintain professional standards
- Coordinate with communications office

## Enforcement

### Violations
- May result in loss of technology privileges
- Could lead to disciplinary action
- Serious violations may result in termination
- Illegal activities will be reported to authorities

### Reporting
- Report policy violations to ICT or HR
- Anonymous reporting options available
- Protection for good faith reporters
- Investigation procedures will be followed

## Policy Updates

- Policies reviewed annually
- Users notified of significant changes
- Training provided when needed
- Current policies available on university website
    `,
    category: 'Other',
    tags: ['policy', 'compliance', 'security', 'acceptable', 'use'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.01).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-020',
    title: 'Research data management',
    content: `
# Research Data Management Guide

Best practices for managing research data throughout the research lifecycle.

## Data Management Planning

### Research Data Management Plan (DMP)
- Required for all externally funded research
- Describes data collection, storage, and sharing plans
- Updated throughout research project
- Templates available from library

### Key Components
- Data types and formats
- Storage and backup procedures
- Access and sharing policies
- Retention and disposal plans
- Budget for data management

## Data Collection

### Best Practices
- Use consistent naming conventions
- Document data collection procedures
- Maintain version control
- Record data provenance
- Ensure data quality and validation

### File Naming
- Use descriptive, consistent names
- Include dates (YYYY-MM-DD format)
- Avoid spaces and special characters
- Use version numbers for iterations
- Example: ResearchProject_Survey_2024-01-15_v2.xlsx

## Data Storage

### University Storage Options
- **Research Drive**: 100GB per faculty member
- **Cloud Storage**: OneDrive with 1TB capacity
- **High-Performance Storage**: For large datasets
- **Secure Storage**: For sensitive/confidential data

### Storage Requirements by Data Type
- **Survey Data**: Standard university storage
- **Medical Data**: HIPAA-compliant storage required
- **Financial Data**: Encrypted storage mandatory
- **International Data**: Consider data sovereignty laws

### Backup Strategy
- Follow 3-2-1 backup rule
- Automated daily backups to research drive
- Weekly backups to separate location
- Test backup restoration regularly

## Data Security

### Sensitive Data
- Identify personal, financial, or proprietary information
- Use appropriate security controls
- Limit access to authorized personnel
- Encrypt data in transit and at rest

### Access Controls
- Use role-based access permissions
- Regular access reviews and updates
- Remove access when no longer needed
- Maintain access logs

## Data Sharing

### Open Data Principles
- Share data when possible and appropriate
- Use recognized data repositories
- Provide comprehensive metadata
- Consider data reuse potential

### Restrictions
- Personal/private information
- Proprietary or commercially sensitive data
- Data under embargo
- Third-party data with sharing restrictions

### Data Repositories
- **Institutional Repository**: For university research
- **Disciplinary Repositories**: Field-specific platforms
- **General Repositories**: Figshare, Zenodo, Dryad
- **Government Repositories**: NIH, NSF requirements

## Compliance Requirements

### Federal Regulations
- NIH Data Sharing Policy
- NSF Data Management Plan requirements
- FERPA for educational records
- HIPAA for health information

### University Policies
- Institutional Review Board (IRB) approval
- Data governance policies
- Intellectual property considerations
- Export control regulations

## Data Documentation

### Metadata Standards
- Use discipline-appropriate standards
- Include data description and context
- Document data collection methods
- Provide variable definitions and codes

### README Files
- Overview of dataset contents
- File organization and naming
- Software requirements for access
- Contact information for questions

## Data Preservation

### Retention Schedules
- **Research Data**: Minimum 5 years after publication
- **Federal Grant Data**: Per agency requirements
- **Clinical Trial Data**: Up to 25 years
- **Student Theses Data**: Permanent retention

### Format Considerations
- Use open, non-proprietary formats when possible
- Migration plans for obsolete formats
- Regular format validation
- Multiple format preservation when needed

## Training and Support

### Available Resources
- Data management workshops
- One-on-one consultations
- Online training modules
- Discipline-specific guidance

### Library Support
- Data management plan assistance
- Repository selection guidance
- Metadata creation help
- Data citation support

### ICT Support
- Technical infrastructure
- Storage allocation
- Security implementation
- Backup and recovery services

## Data Lifecycle Management

### Planning Phase
- Develop data management plan
- Identify storage and backup needs
- Plan for data sharing and preservation
- Budget for data management costs

### Collection Phase
- Implement data organization systems
- Maintain data quality standards
- Regular backup verification
- Document any changes to protocols

### Analysis Phase
- Version control for analysis files
- Document analysis procedures
- Preserve intermediate results
- Maintain data lineage

### Publication Phase
- Prepare data for sharing
- Create comprehensive documentation
- Deposit in appropriate repositories
- Update data management plan

### Preservation Phase
- Migrate to preservation formats
- Verify long-term accessibility
- Maintain metadata quality
- Plan for future access needs
    `,
    category: 'Other',
    tags: ['research', 'data', 'management', 'storage', 'compliance'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.008).toISOString(),
    author: users[1],
  },
  // Adding 10 more articles to reach 30 total
  {
    id: 'KB-021',
    title: 'Student portal navigation guide',
    content: `
# Student Portal Guide

Complete guide to using the Edo State University Iyamho student portal.

## Portal Access
- URL: [portal.edouniversity.edu.ng](https://portal.edouniversity.edu.ng)
- Login with your student ID and password
- Two-factor authentication required for security

## Dashboard Features
- Academic calendar and important dates
- Quick access to frequently used services
- Announcements and notifications
- GPA calculator and academic summary

## Registration
- Course registration for each semester
- Add/drop courses within deadline
- View registration status and confirmation
- Print course schedule and confirmation

## Academic Records
- View current semester grades
- Download unofficial transcripts
- Academic progress tracking
- Degree audit and requirements

## Financial Information
- Account balance and payment history
- Fee payment online
- Financial aid status
- Payment plan options
    `,
    category: 'System Access',
    tags: ['portal', 'student', 'registration', 'grades', 'academic'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.006).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-022',
    title: 'Library card and services',
    content: `
# Library Services Guide

Access and use university library resources effectively.

## Library Card
- Automatic activation with student/staff ID
- Required for book checkout and database access
- Report lost cards to library circulation desk
- Replacement fee applies for lost cards

## Borrowing Privileges
- Students: 10 books for 14 days
- Staff: 20 books for 30 days
- Faculty: 50 books for semester
- Renewals available if no holds exist

## Digital Resources
- E-books and online journals
- Research databases and archives
- Digital media and streaming services
- Remote access through VPN

## Study Spaces
- Silent study areas
- Group collaboration rooms
- Computer workstations
- 24/7 access for registered students

## Research Support
- Research consultations with librarians
- Citation management training
- Database search assistance
- Interlibrary loan services
    `,
    category: 'System Access',
    tags: ['library', 'books', 'research', 'databases', 'study'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.004).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-023',
    title: 'Campus WiFi troubleshooting advanced',
    content: `
# Advanced WiFi Troubleshooting

Detailed solutions for complex WiFi connectivity issues.

## Network Diagnostics
- Check signal strength and quality
- Identify interference sources
- Test connection speed and stability
- Analyze network configuration

## DNS Issues
- Flush DNS cache regularly
- Use university DNS servers
- Test with alternative DNS (8.8.8.8)
- Clear browser DNS cache

## Device-Specific Solutions
### Windows
- Update network drivers
- Reset network stack
- Configure power management settings
- Use Windows network troubleshooter

### Mac
- Reset network settings
- Delete and recreate WiFi profile
- Update macOS and drivers
- Check keychain access issues

### Mobile Devices
- Forget and reconnect to network
- Reset network settings
- Update device software
- Clear network data in settings

## Advanced Configuration
- Configure static IP if needed
- Set up proxy settings
- Manage WiFi profiles
- Enable/disable WiFi bands (2.4GHz/5GHz)
    `,
    category: 'Network',
    tags: ['wifi', 'troubleshooting', 'advanced', 'diagnostics', 'configuration'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.002).toISOString(),
    author: users[1],
  },
  {
    id: 'KB-024',
    title: 'Microsoft Office 365 features',
    content: `
# Microsoft Office 365 University Features

Maximize your productivity with Office 365 tools and features.

## Core Applications
### Word
- Real-time collaboration
- Version history and comments
- Research tools and citations
- Templates for academic writing

### Excel
- Data analysis and visualization
- Collaborative spreadsheets
- Advanced formulas and functions
- Power BI integration

### PowerPoint
- Design ideas and templates
- Presenter coach
- Live presentations
- Video recording capabilities

### OneNote
- Digital note-taking
- Class notebooks
- Cross-device synchronization
- Audio and video recording

## Collaboration Features
- Real-time co-authoring
- Shared workspaces
- Version control
- Comment and review tools

## OneDrive Integration
- 1TB cloud storage
- File sharing and permissions
- Offline access
- Mobile app synchronization

## Teams Integration
- Virtual classrooms
- Assignment distribution
- Group projects
- Video conferencing

## Mobile Apps
- Full editing capabilities
- Camera document scanning
- Handwriting recognition
- Offline editing support
    `,
    category: 'Software',
    tags: ['office365', 'microsoft', 'collaboration', 'productivity', 'features'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.001).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-025',
    title: 'Computer maintenance and care',
    content: `
# Computer Maintenance Guide

Keep your university and personal computers running optimally.

## Regular Maintenance Tasks
### Daily
- Restart computer at least once
- Close unnecessary applications
- Save work frequently
- Check for Windows updates

### Weekly
- Clear browser cache and cookies
- Empty recycle bin/trash
- Run disk cleanup utility
- Update antivirus definitions

### Monthly
- Full antivirus scan
- Disk defragmentation (HDD only)
- Clear temporary files
- Update software applications

### Quarterly
- Hardware cleaning
- Check hard drive health
- Review startup programs
- Backup important data

## Hardware Care
### Cleaning
- Use compressed air for dust removal
- Clean monitor with appropriate cleaner
- Sanitize keyboard and mouse
- Keep vents clear of obstructions

### Environment
- Maintain proper temperature (60-75°F)
- Avoid direct sunlight
- Use surge protectors
- Ensure adequate ventilation

## Performance Optimization
### Startup Management
- Disable unnecessary startup programs
- Use Task Manager to identify resource usage
- Remove unused software
- Configure automatic updates appropriately

### Storage Management
- Keep 15-20% free disk space
- Organize files in logical folders
- Use cloud storage for large files
- Regular cleanup of downloads folder

## Troubleshooting Tips
- Document error messages
- Note when problems occur
- Try restarting before contacting support
- Keep software updated
    `,
    category: 'Hardware',
    tags: ['maintenance', 'care', 'performance', 'cleaning', 'optimization'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.0008).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-026',
    title: 'Academic software licenses',
    content: `
# Academic Software License Management

Understanding and managing software licenses for academic use.

## Available Software Categories
### Statistical Analysis
- SPSS: Statistical Package for Social Sciences
- R and RStudio: Open source statistical computing
- SAS: Advanced analytics platform
- Stata: Data analysis and statistical software

### Engineering and Design
- AutoCAD: Computer-aided design
- MATLAB: Mathematical computing platform
- Solidworks: 3D CAD design software
- LabVIEW: Systems engineering platform

### Creative and Media
- Adobe Creative Cloud: Design and media suite
- Final Cut Pro: Video editing (Mac)
- Logic Pro: Music production (Mac)
- Sketch: Digital design tool

## License Types
### Concurrent Licenses
- Limited number of simultaneous users
- Network-based activation
- Automatic checkout/checkin system
- Priority access for courses and research

### Named User Licenses
- Assigned to specific individuals
- Installation on multiple devices allowed
- Annual renewal required
- Transfer process for departing users

### Site Licenses
- Unlimited use within university
- Installation on any university computer
- Home use often included
- Covers all students and staff

## Requesting Software Access
### Process
1. Submit request through IT portal
2. Provide academic justification
3. Specify intended use and duration
4. Wait for license allocation

### Required Information
- Course number or research project
- Number of users needed
- Installation timeline
- Faculty sponsor approval

## Installation Guidelines
### University Computers
- Install only through IT department
- Use university license keys
- Follow configuration standards
- Maintain usage logs

### Personal Devices
- Download from university portal
- Use university email for activation
- Comply with license restrictions
- Remove software when no longer eligible

## Compliance Requirements
- Use software only for academic purposes
- Don't share license keys or accounts
- Report software issues promptly
- Uninstall when access expires
    `,
    category: 'Software',
    tags: ['licenses', 'academic', 'software', 'compliance', 'installation'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.0006).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-027',
    title: 'Network security best practices',
    content: `
# Network Security Best Practices

Protect yourself and the university network from security threats.

## Secure Browsing
### Safe Websites
- Verify SSL certificates (https://)
- Check website authenticity
- Avoid suspicious downloads
- Use official software sources

### Browser Security
- Keep browsers updated
- Use security extensions
- Configure privacy settings
- Regular cache clearing

## WiFi Security
### Public Networks
- Avoid sensitive activities
- Use VPN when possible
- Turn off auto-connect
- Verify network authenticity

### University Network
- Use WPA2/WPA3 encryption
- Don't share network passwords
- Report suspicious activity
- Monitor connected devices

## Email Security
### Phishing Protection
- Verify sender identity
- Don't click suspicious links
- Report phishing attempts
- Use email filtering tools

### Attachment Safety
- Scan downloads with antivirus
- Verify file types
- Don't open unexpected attachments
- Use cloud-based document sharing

## Password Security
### Strong Passwords
- Use 12+ character passwords
- Include mixed character types
- Avoid personal information
- Use unique passwords per account

### Password Management
- Use password managers
- Enable two-factor authentication
- Regular password updates
- Secure password recovery methods

## Incident Reporting
### When to Report
- Suspected malware infection
- Unusual network activity
- Phishing attempts
- Data breaches

### How to Report
- Contact ICT immediately
- Preserve evidence
- Document incidents
- Follow up on resolution
    `,
    category: 'Network',
    tags: ['security', 'network', 'protection', 'best practices', 'safety'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.0004).toISOString(),
    author: users[1],
  },
  {
    id: 'KB-028',
    title: 'Digital accessibility guidelines',
    content: `
# Digital Accessibility Guidelines

Creating inclusive digital content for all users.

## Web Accessibility Standards
### WCAG 2.1 Principles
- Perceivable: Information presentable to users
- Operable: Interface components must be operable
- Understandable: Information must be understandable
- Robust: Content must be robust enough for assistive technologies

### Implementation
- Use semantic HTML markup
- Provide alternative text for images
- Ensure keyboard navigation
- Maintain color contrast ratios

## Document Accessibility
### Microsoft Office
- Use built-in heading styles
- Add alt text to images
- Create descriptive link text
- Use accessibility checker tool

### PDF Documents
- Create from accessible source documents
- Add tags and structure
- Include bookmarks for navigation
- Test with screen readers

## Video and Audio Content
### Captions and Transcripts
- Provide accurate captions
- Include speaker identification
- Add audio descriptions for visual content
- Offer transcript downloads

### Player Accessibility
- Keyboard-accessible controls
- Clear button labels
- Volume control options
- Pause/play functionality

## Assistive Technology Support
### Screen Readers
- Test with NVDA or JAWS
- Ensure proper heading structure
- Provide skip navigation links
- Use ARIA labels appropriately

### Voice Recognition
- Support voice commands
- Provide keyboard alternatives
- Test with Dragon NaturallySpeaking
- Ensure focus indicators

## Testing and Validation
### Automated Testing
- Use accessibility scanning tools
- Run regular compliance checks
- Monitor accessibility metrics
- Generate accessibility reports

### Manual Testing
- Navigate with keyboard only
- Test with screen reader
- Check color contrast
- Verify with real users

## Training and Resources
- Accessibility training workshops
- Online certification courses
- University accessibility policies
- External accessibility resources
    `,
    category: 'Other',
    tags: ['accessibility', 'inclusive', 'design', 'guidelines', 'compliance'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 0.8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.0002).toISOString(),
    author: users[4],
  },
  {
    id: 'KB-029',
    title: 'Cloud storage and file synchronization',
    content: `
# Cloud Storage and File Sync Guide

Effectively use cloud storage for academic and administrative work.

## Available Cloud Services
### University OneDrive
- 1TB storage per user
- Office 365 integration
- Advanced sharing controls
- Version history and recovery

### Google Drive (University)
- 15GB storage with university email
- Google Workspace integration
- Real-time collaboration
- Mobile app access

### Personal Cloud Services
- Use with caution for university data
- Check university policies
- Consider data location and security
- Backup important university files

## File Organization
### Folder Structure
- Create logical hierarchies
- Use consistent naming conventions
- Separate personal and university files
- Implement date-based organization

### File Naming
- Use descriptive file names
- Include version numbers
- Add dates (YYYY-MM-DD format)
- Avoid special characters

## Synchronization Setup
### Desktop Applications
- Install university-approved sync clients
- Configure selective sync
- Monitor storage usage
- Set up automatic backup

### Mobile Devices
- Install official mobile apps
- Enable automatic photo backup
- Configure offline access
- Manage mobile storage limits

## Sharing and Collaboration
### Permission Levels
- View only: Read access
- Comment: Add comments and suggestions
- Edit: Full editing capabilities
- Admin: Manage permissions and settings

### Best Practices
- Share at folder level when appropriate
- Set expiration dates for shared links
- Use password protection for sensitive files
- Regular permission audits

## Security Considerations
### Data Classification
- Identify sensitive information
- Apply appropriate protection levels
- Use university-approved services for confidential data
- Consider data residency requirements

### Access Control
- Use strong authentication
- Enable two-factor authentication
- Regular access review
- Revoke access for departed users

## Backup and Recovery
### Multiple Backup Locations
- Local computer backup
- Cloud storage sync
- External drive backup
- Network drive storage

### Recovery Procedures
- Version history access
- Deleted file recovery
- Account recovery process
- Data export capabilities
    `,
    category: 'System Access',
    tags: ['cloud', 'storage', 'synchronization', 'backup', 'collaboration'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.0001).toISOString(),
    author: users[5],
  },
  {
    id: 'KB-030',
    title: 'IT emergency procedures and contacts',
    content: `
# IT Emergency Procedures

Quick reference for IT emergencies and critical situations.

## Emergency Classifications
### Critical (Immediate Response)
- Complete network outages
- Security breaches or cyber attacks
- Data center emergencies
- Infrastructure failures affecting entire campus

### Urgent (Within 2 Hours)
- Department-wide system failures
- Email system problems
- Learning management system issues
- Major application outages

### High Priority (Same Day)
- Individual computer failures during critical times
- Printer problems during important events
- Audio/visual equipment failures during presentations
- Phone system issues

## Emergency Contacts
### 24/7 Emergency Line
- **Phone**: +234-987-654-3210
- **Purpose**: Critical infrastructure issues
- **Response**: Immediate acknowledgment

### ICT Help Desk
- **Phone**: +234-123-456-7890
- **Email**: emergency@edouniversity.edu.ng
- **Hours**: Monday-Friday, 8AM-5PM
- **After Hours**: Leave detailed voicemail

### Security Incidents
- **ICT Security Team**: security@edouniversity.edu.ng
- **Campus Security**: +234-555-0199
- **Police (if criminal activity**: 199

## Immediate Response Steps
### System Outages
1. Check if issue affects multiple users
2. Verify network connectivity
3. Contact ICT emergency line
4. Document time and symptoms
5. Wait for official updates

### Security Incidents
1. Disconnect affected systems from network
2. Don't shut down computers (preserves evidence)
3. Contact ICT security immediately
4. Document what happened
5. Don't attempt to fix the issue yourself

### Data Loss
1. Stop using the affected system immediately
2. Don't attempt data recovery software
3. Contact ICT with details
4. Preserve any error messages
5. Identify backup sources

## Communication Channels
### Official Updates
- University website announcements
- Email alerts to all users
- Social media updates (@ESUIOfficial)
- Text message alerts (for registered users)

### Status Monitoring
- **System Status Page**: status.edouniversity.edu.ng
- **Real-time Updates**: Available 24/7
- **Historical Downtime**: Previous incident reports
- **Planned Maintenance**: Scheduled maintenance windows

## Preparation and Prevention
### Personal Preparedness
- Keep important files backed up
- Know alternative communication methods
- Have emergency contact information
- Understand basic troubleshooting

### Department Preparedness
- Identify critical systems and data
- Create emergency contact lists
- Develop backup procedures
- Train staff on emergency protocols

## Recovery Procedures
### Post-Incident
- Wait for official "all clear" notification
- Test systems before resuming normal operations
- Report any lingering issues
- Participate in post-incident reviews

### Business Continuity
- Use backup systems and procedures
- Communicate with stakeholders
- Document business impact
- Plan for extended outages

## Reporting Requirements
### Incident Documentation
- Time and date of incident
- Systems and users affected
- Business impact assessment
- Actions taken during incident
- Lessons learned and improvements

### Follow-up Actions
- Review and update emergency procedures
- Conduct post-incident training
- Implement recommended improvements
- Schedule regular emergency drills
    `,
    category: 'Other',
    tags: ['emergency', 'procedures', 'contacts', 'crisis', 'response'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 0.2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 0.00005).toISOString(),
    author: users[1],
  },
];

// Data service methods
export const ticketService = {
  getAllTickets: (): Promise<Ticket[]> => {
    return Promise.resolve([...tickets]);
  },
  
  getTicketById: (id: string): Promise<Ticket | undefined> => {
    const ticket = tickets.find(t => t.id === id);
    return Promise.resolve(ticket);
  },
  
  getTicketsByUser: (userId: string): Promise<Ticket[]> => {
    const userTickets = tickets.filter(t => t.createdBy.id === userId);
    return Promise.resolve(userTickets);
  },
  
  getTicketsByAssignee: (userId: string): Promise<Ticket[]> => {
    const assignedTickets = tickets.filter(t => t.assignedTo?.id === userId);
    return Promise.resolve(assignedTickets);
  },
  
  createTicket: (ticketData: Partial<Ticket>): Promise<Ticket> => {
    const newTicket: Ticket = {
      id: `T-${1000 + tickets.length + 1}`,
      title: ticketData.title || '',
      category: ticketData.category || 'Other',
      location: ticketData.location || '',
      priority: ticketData.priority || 'Medium',
      description: ticketData.description || '',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: ticketData.createdBy!,
      comments: [],
      attachments: ticketData.attachments || [],
    };
    
    tickets.push(newTicket);
    return Promise.resolve(newTicket);
  },
  
  updateTicket: (id: string, updates: Partial<Ticket>): Promise<Ticket | undefined> => {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return Promise.resolve(undefined);
    
    const updatedTicket = {
      ...tickets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    tickets[index] = updatedTicket;
    return Promise.resolve(updatedTicket);
  },
  
  addComment: (ticketId: string, comment: Omit<TicketComment, 'id'>): Promise<Ticket | undefined> => {
    const index = tickets.findIndex(t => t.id === ticketId);
    if (index === -1) return Promise.resolve(undefined);
    
    const newComment: TicketComment = {
      id: `comment-${ticketId}-${tickets[index].comments.length + 1}`,
      ...comment,
    };
    
    tickets[index].comments.push(newComment);
    tickets[index].updatedAt = new Date().toISOString();
    
    return Promise.resolve(tickets[index]);
  },
  
  addAttachment: (ticketId: string, attachment: Omit<Attachment, 'id'>): Promise<Ticket | undefined> => {
    const index = tickets.findIndex(t => t.id === ticketId);
    if (index === -1) return Promise.resolve(undefined);
    
    const newAttachment: Attachment = {
      id: `attachment-${ticketId}-${tickets[index].attachments.length + 1}`,
      ...attachment,
    };
    
    tickets[index].attachments.push(newAttachment);
    tickets[index].updatedAt = new Date().toISOString();
    
    return Promise.resolve(tickets[index]);
  },
};

export const knowledgeBaseService = {
  getAllArticles: (): Promise<KnowledgeArticle[]> => {
    return Promise.resolve([...knowledgeArticles]);
  },
  
  getArticleById: (id: string): Promise<KnowledgeArticle | undefined> => {
    const article = knowledgeArticles.find(a => a.id === id);
    return Promise.resolve(article);
  },
  
  searchArticles: (query: string): Promise<KnowledgeArticle[]> => {
    const lowercaseQuery = query.toLowerCase();
    const matchingArticles = knowledgeArticles.filter(
      article =>
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    return Promise.resolve(matchingArticles);
  },
  
  getArticlesByCategory: (category: string): Promise<KnowledgeArticle[]> => {
    const filteredArticles = knowledgeArticles.filter(a => a.category === category);
    return Promise.resolve(filteredArticles);
  },
  
  createArticle: (articleData: Partial<KnowledgeArticle>): Promise<KnowledgeArticle> => {
    const newArticle: KnowledgeArticle = {
      id: `KB-${knowledgeArticles.length + 1}`.padStart(6, '0'),
      title: articleData.title || '',
      content: articleData.content || '',
      category: articleData.category || 'Other',
      tags: articleData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: articleData.author!,
      relatedTickets: articleData.relatedTickets || [],
    };
    
    knowledgeArticles.push(newArticle);
    return Promise.resolve(newArticle);
  },
  
  updateArticle: (id: string, updates: Partial<KnowledgeArticle>): Promise<KnowledgeArticle | undefined> => {
    const index = knowledgeArticles.findIndex(a => a.id === id);
    if (index === -1) return Promise.resolve(undefined);
    
    const updatedArticle = {
      ...knowledgeArticles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    knowledgeArticles[index] = updatedArticle;
    return Promise.resolve(updatedArticle);
  },
};

// Stats and dashboard data
export const dashboardService = {
  getTicketStats: (): Promise<{
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    byLocation: Record<string, number>;
  }> => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
      resolved: tickets.filter(t => t.status === 'Resolved').length,
      closed: tickets.filter(t => t.status === 'Closed').length,
      byCategory: {} as Record<string, number>,
      byPriority: {} as Record<string, number>,
      byLocation: {} as Record<string, number>,
    };
    
    // Calculate by category
    tickets.forEach(ticket => {
      // By category
      if (!stats.byCategory[ticket.category]) {
        stats.byCategory[ticket.category] = 0;
      }
      stats.byCategory[ticket.category]++;
      
      // By priority
      if (!stats.byPriority[ticket.priority]) {
        stats.byPriority[ticket.priority] = 0;
      }
      stats.byPriority[ticket.priority]++;
      
      // By location
      if (!stats.byLocation[ticket.location]) {
        stats.byLocation[ticket.location] = 0;
      }
      stats.byLocation[ticket.location]++;
    });
    
    return Promise.resolve(stats);
  },
  
  getTechnicianPerformance: (): Promise<{
    technician: User;
    assigned: number;
    resolved: number;
    averageResolutionTime: number; // in hours
  }[]> => {
    const technicianIds = users
      .filter(user => user.role === 'Technician')
      .map(tech => tech.id);
    
    const performance = technicianIds.map(techId => {
      const technician = users.find(u => u.id === techId)!;
      const assignedTickets = tickets.filter(t => t.assignedTo?.id === techId);
      const resolvedTickets = assignedTickets.filter(
        t => t.status === 'Resolved' || t.status === 'Closed'
      );
      
      // Calculate average resolution time (mock data)
      const averageResolutionTime = Math.floor(Math.random() * 24) + 1; // 1-24 hours
      
      return {
        technician,
        assigned: assignedTickets.length,
        resolved: resolvedTickets.length,
        averageResolutionTime,
      };
    });
    
    return Promise.resolve(performance);
  },
};
