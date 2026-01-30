import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'
import { TicketStatus } from '~/types';

// Define the path to db.json
const dbPath = path.join(process.cwd(), 'server', 'db.json');

async function getDb() {
  const currentDbRaw = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(currentDbRaw);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Basic validation
  if (!body.title || !body.description || !body.content || !body.priority) {
    event.node.res.statusCode = 400
    return { error: 'Missing required fields' }
  }

  try {
    const currentDb = await getDb();

    const newTicket = {
      id: currentDb.tickets.length > 0 ? Math.max(...currentDb.tickets.map((t: any) => t.id)) + 1 : 1,
      title: body.title,
      description: body.description,
      content: body.content,
      priority: body.priority,
      status: TicketStatus.CREATED,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      closed_at: null,
      assignee: null,
      assigneeId: null,
    }

    // Add the new ticket
    currentDb.tickets.push(newTicket);

    // Write the updated database back to the file
    await fs.writeFile(dbPath, JSON.stringify(currentDb, null, 2));

    event.node.res.statusCode = 201 // Created
    return newTicket;
  } catch (error) {
    console.error('Error updating db.json:', error);
    event.node.res.statusCode = 500
    return { error: 'Internal Server Error' }
  }
})
