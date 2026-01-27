import { TicketPriority } from '~/types'

const statusNames: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: 'Baixa',
  [TicketPriority.MEDIUM]: 'Média',
  [TicketPriority.HIGH]: 'Alta'
}

export const getPriorityName = (priority: TicketPriority) => {
  return statusNames[priority]
}
