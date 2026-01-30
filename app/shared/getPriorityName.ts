import { TicketPriority } from '~/types'

export const priorityOptions = [
  { label: 'Baixa', value: TicketPriority.LOW },
  { label: 'Média', value: TicketPriority.MEDIUM },
  { label: 'Alta', value: TicketPriority.HIGH }
]

const statusNames: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: 'Baixa',
  [TicketPriority.MEDIUM]: 'Média',
  [TicketPriority.HIGH]: 'Alta'
}

export const getPriorityName = (priority: TicketPriority) => {
  return statusNames[priority]
}
