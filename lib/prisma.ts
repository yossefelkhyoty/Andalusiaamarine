/**
 * ANDALUSIA MARINE - PRISMA GLOBAL SINGLETON V2
 * Resolves 'Cannot redeclare' and 'Property not found' errors.
 */

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

// EXTEND GLOBAL TYPE DEFINITION correctly for TypeScript
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
