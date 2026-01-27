export enum UserRole {
  GLOBAL_ADMIN = 1,
  ADMIN,
  USER
}

export enum TicketStatus {
  CREATED = 1,
  ASSIGNED,
  IN_PROGRESS,
  RESOLVED,
  CLOSED
}

export enum TicketPriority {
  LOW = 1,
  MEDIUM,
  HIGH
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}

export interface Ticket {
  id: string //
  title: string //
  description: string //
  content: string // X
  status: TicketStatus //
  priority: TicketPriority //
  createdAt: Date //
  updatedAt: Date //
  assignee: User //
  assigneeId: string // X
}
