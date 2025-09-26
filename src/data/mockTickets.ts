import { Ticket, User, TicketStatus, TicketPriority } from '@/types/ticket';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
  }
];

export const mockTickets: Ticket[] = [
  {
    id: '1',
    key: 'PROJ-101',
    summary: 'Implement user authentication system',
    description: 'Create a comprehensive authentication system with email/password login, password reset, and user profile management.',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[0],
    reporter: mockUsers[1],
    project: 'PROJECT',
    issueType: 'story',
    createdDate: '2024-01-15T10:00:00Z',
    updatedDate: '2024-01-20T14:30:00Z',
    comments: [
      {
        id: '1',
        author: mockUsers[1],
        content: 'Starting work on the login form component.',
        createdDate: '2024-01-16T09:00:00Z'
      },
      {
        id: '2',
        author: mockUsers[0],
        content: 'Authentication API endpoints are ready for testing.',
        createdDate: '2024-01-18T15:30:00Z'
      }
    ]
  },
  {
    id: '2',
    key: 'PROJ-102',
    summary: 'Fix dashboard loading performance',
    description: 'Dashboard takes too long to load initial data. Need to optimize API calls and implement proper caching.',
    status: 'todo',
    priority: 'medium',
    assignee: mockUsers[2],
    reporter: mockUsers[3],
    project: 'PROJECT',
    issueType: 'bug',
    createdDate: '2024-01-18T11:00:00Z',
    updatedDate: '2024-01-18T11:00:00Z',
    comments: []
  },
  {
    id: '3',
    key: 'PROJ-103',
    summary: 'Add dark mode support',
    description: 'Implement dark mode theme throughout the application with user preference persistence.',
    status: 'in-review',
    priority: 'low',
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    project: 'PROJECT',
    issueType: 'task',
    createdDate: '2024-01-10T14:00:00Z',
    updatedDate: '2024-01-22T16:45:00Z',
    comments: [
      {
        id: '3',
        author: mockUsers[1],
        content: 'Dark mode styles completed, ready for review.',
        createdDate: '2024-01-22T16:45:00Z'
      }
    ]
  },
  {
    id: '4',
    key: 'PROJ-104',
    summary: 'Create mobile responsive design',
    description: 'Ensure the application works seamlessly on mobile devices with proper responsive design.',
    status: 'done',
    priority: 'high',
    assignee: mockUsers[3],
    reporter: mockUsers[2],
    project: 'PROJECT',
    issueType: 'story',
    createdDate: '2024-01-05T09:00:00Z',
    updatedDate: '2024-01-25T13:20:00Z',
    comments: [
      {
        id: '4',
        author: mockUsers[3],
        content: 'Mobile design completed and tested on various devices.',
        createdDate: '2024-01-25T13:20:00Z'
      }
    ]
  },
  {
    id: '5',
    key: 'PROJ-105',
    summary: 'Critical security vulnerability in API',
    description: 'Security audit revealed a critical vulnerability that needs immediate attention.',
    status: 'in-progress',
    priority: 'urgent',
    assignee: mockUsers[0],
    reporter: mockUsers[1],
    project: 'PROJECT',
    issueType: 'bug',
    createdDate: '2024-01-26T08:00:00Z',
    updatedDate: '2024-01-26T10:30:00Z',
    comments: [
      {
        id: '5',
        author: mockUsers[0],
        content: 'Investigating the security issue now. Will have a fix ready by EOD.',
        createdDate: '2024-01-26T10:30:00Z'
      }
    ]
  }
];

export const getStatusColor = (status: TicketStatus): string => {
  switch (status) {
    case 'todo':
      return 'bg-muted text-muted-foreground';
    case 'in-progress':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'in-review':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'done':
      return 'bg-success/10 text-success border-success/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getPriorityColor = (priority: TicketPriority): string => {
  switch (priority) {
    case 'low':
      return 'bg-muted text-muted-foreground';
    case 'medium':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'high':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'urgent':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};