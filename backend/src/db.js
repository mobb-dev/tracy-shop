import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbFile = path.join(__dirname, '../../db.json')

const defaultData = {
  users: [],
  categories: [],
  products: [],
  orders: [],
}

const adapter = new JSONFile(dbFile)
export const db = new Low(adapter, defaultData)

// Initialize — read existing data or write defaults
export async function initDb() {
  await db.read()
  db.data ??= defaultData
  await db.write()
}
