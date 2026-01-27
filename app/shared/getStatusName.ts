import { TicketStatus } from '~/types'

const statusNames: Record<TicketStatus, string> = {
  [TicketStatus.CREATED]: 'Criado',
  [TicketStatus.ASSIGNED]: 'Atribuído',
  [TicketStatus.IN_PROGRESS]: 'Em Progresso',
  [TicketStatus.RESOLVED]: 'Resolvido',
  [TicketStatus.CLOSED]: 'Fechado'
}

export const getStatusName = (status: TicketStatus) => {
  return statusNames[status]
}
