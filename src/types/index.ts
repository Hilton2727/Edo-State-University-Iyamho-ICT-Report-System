export type UserRole = 'Student' | 'Staff' | 'Technician' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  matricNumber?: string;
  year?: string;
  profile_photo?: string;
}

export type IncidentCategory = 'Network' | 'Software' | 'Hardware' | 'System Access' | 'Other';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface Ticket {
  id: string;
  title: string;
  category: IncidentCategory;
  location: string;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  assignedTo?: User;
  comments: TicketComment[];
  attachments: Attachment[];
}

export interface TicketComment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: User;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: IncidentCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: User;
  relatedTickets?: string[];
}
