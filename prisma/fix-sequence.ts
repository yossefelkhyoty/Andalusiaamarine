/**
 * ANDALUSIA MARINE - DB DOCTOR V1.0
 * FIXES POSTGRES ID SEQUENCES AFTER MANUAL SEEDING
 */

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('💊 DB DOCTOR: Syncing ID sequences...')
  
  // 🛡 SQL COMMAND TO RESET THE COUNTER TO THE REAL MAX(ID)
  await prisma.$executeRawUnsafe(`
    SELECT setval('"Project_id_seq"', (SELECT MAX(id) FROM "Project"))
  `)
  
  console.log('✅ SEQUENCE FIXED - YOU CAN NOW ADD NEW PROJECTS!')
}

main()
  .catch(e => console.error('FAILED TO FIX:', e))
  .finally(async () => await prisma.$disconnect())
