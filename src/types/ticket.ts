export interface Ticket {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: User | null;
  reporter: User;
  project: string;
  issueType: IssueType;
  createdDate: string;
  updatedDate: string;
  comments: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdDate: string;
}

export type TicketStatus = 'todo' | 'in-progress' | 'in-review' | 'done';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type IssueType = 'story' | 'task' | 'bug' | 'epic';

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  assignee?: string[];
  search?: string;
}

export interface CreateTicketForm {
  project: string;
  issueType: IssueType;
  summary: string;
  description: string;
  priority: TicketPriority;
  assignee?: string;
}