// src/services/api.service.ts

// Generic fetcher for GET requests
async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

// Fetch all blog posts
export async function fetchBlogPosts() {
  return fetchFromApi<any[]>("/api/blog/list.php");
}

// Fetch all knowledge base articles
export async function fetchKnowledgeArticles() {
  return fetchFromApi<any[]>("/api/knowledge/list.php");
}

// Fetch all FAQs
export async function fetchFaqs() {
  return fetchFromApi<any[]>("/api/faq/list.php");
}

// Login (all roles)
export async function loginApi(email: string, password: string) {
  const res = await fetch('/api/auth/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// Update profile (admin, staff, student)
export async function updateProfileApi({ id, role, name, email }: { id: string, role: string, name: string, email: string }) {
  const endpoint = role === 'Admin'
    ? '/api/admin/update_profile.php'
    : '/api/user/update_profile.php';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, role, name, email }),
  });
  return res.json();
}

// Update password (admin, staff, student)
export async function updatePasswordApi({ id, role, password }: { id: string, role: string, password: string }) {
  const endpoint = role === 'Admin'
    ? '/api/admin/update_password.php'
    : '/api/user/update_password.php';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, role, password }),
  });
  return res.json();
}

export async function fetchAdmins() {
  return fetchFromApi<any[]>("/api/user/list_admin.php");
}

export async function fetchTechs() {
  return fetchFromApi<any[]>("/api/user/list_tech.php");
}

export async function fetchAdminProfile(id: number) {
  return fetchFromApi<any>(`/api/user/admin_profile.php?id=${id}`);
}

export async function fetchTechProfile(id: number) {
  return fetchFromApi<any>(`/api/user/tech_profile.php?id=${id}`);
}

export async function createTicket({ title, category, location, priority, description, createdBy, files }: {
  title: string,
  category: string,
  location: string,
  priority: string,
  description: string,
  createdBy: { id: string, role: string },
  files: File[]
}) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('location', location);
  formData.append('priority', priority);
  formData.append('description', description);
  formData.append('created_by', createdBy.id);
  formData.append('created_by_role', createdBy.role);
  files.forEach(file => formData.append('attachments[]', file));
  const res = await fetch('/api/ticket/create.php', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function fetchTicketsByUser(userId: string) {
  const res = await fetch(`/api/ticket/list_by_user.php?user_id=${userId}`);
  return res.json();
}

export async function fetchAdminTicketStats() {
  const res = await fetch('/api/stats/admin_ticket_stats.php');
  return res.json();
}

export async function fetchTechTicketStats(techId: string) {
  const res = await fetch(`/api/stats/tech_ticket_stats.php?tech_id=${techId}`);
  return res.json();
}

export async function fetchTicketById(ticketId: string) {
  const res = await fetch(`/api/ticket/get_by_id.php?id=${ticketId}`);
  if (!res.ok) {
    throw new Error('Ticket not found');
  }
  return res.json();
}

export async function addTicketComment(ticketId: string, content: string, userId: string, userRole: string) {
  const res = await fetch('/api/ticket/add_comment.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ticket_id: ticketId,
      user_id: userId,
      user_role: userRole,
      content: content
    })
  });
  return res.json();
}

export async function updateTicketStatus(ticketId: string, status: string, assignedTo?: string | null) {
  const body: any = {
    ticket_id: ticketId,
    status: status
  };
  if (assignedTo !== undefined) {
    body.assigned_to = assignedTo;
  }
  const res = await fetch('/api/ticket/update_status.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

// Assign a ticket to a technician (admin only)
export async function assignTicket(ticketId: string, techId: string) {
  const res = await fetch('/api/ticket/update_status.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ticket_id: ticketId,
      status: 'In Progress',
      assigned_to: techId
    })
  });
  return res.json();
}

export async function fetchStaff() {
  return fetchFromApi<any>("/api/user/list_staff.php");
}

export async function fetchStudents() {
  return fetchFromApi<any>("/api/user/list_students.php");
}

export async function fetchAllTickets() {
  return fetchFromApi<any>("/api/ticket/list.php");
}

export async function deleteTicket(ticketId: string) {
  const res = await fetch('/api/ticket/delete.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticket_id: ticketId })
  });
  return res.json();
}

export async function deleteStudent(studentId: string) {
  const res = await fetch('/api/user/delete_student.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: studentId })
  });
  return res.json();
}

export async function deleteStaff(staffId: string) {
  const res = await fetch('/api/user/delete_staff.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ staff_id: staffId })
  });
  return res.json();
}

export async function deleteAdmin(adminId: string) {
  const res = await fetch('/api/user/delete_admin.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ admin_id: adminId })
  });
  return res.json();
}

export async function deleteTech(techId: string) {
  const res = await fetch('/api/user/delete_tech.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tech_id: techId })
  });
  return res.json();
}

export async function createAdmin({ name, email, gender, password }: { name: string, email: string, gender: string, password: string }) {
  const res = await fetch('/api/user/create_admin.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, gender, password })
  });
  return res.json();
}

export async function createTech({ name, email, gender, password, phone, specialization }: { name: string, email: string, gender: string, password: string, phone?: string, specialization?: string }) {
  const res = await fetch('/api/user/create_tech.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, gender, password, phone, specialization })
  });
  return res.json();
} 