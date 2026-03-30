import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/settings?key=admin_password
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    if (!key) return NextResponse.json({ error: 'Key required' }, { status: 400 })

    const result = await prisma.$queryRaw<{ value: string }[]>`
      SELECT value FROM "Settings" WHERE key = ${key} LIMIT 1
    `
    const value = result?.[0]?.value ?? null
    return NextResponse.json({ value })
  } catch (error: any) {
    return NextResponse.json({ error: 'DB Error', details: error.message }, { status: 500 })
  }
}

// POST /api/settings  { key, value }
export async function POST(request: Request) {
  try {
    const { key, value } = await request.json()
    if (!key || !value) return NextResponse.json({ error: 'Key and value required' }, { status: 400 })

    await prisma.$executeRaw`
      INSERT INTO "Settings" (key, value, "updatedAt")
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${value}, "updatedAt" = NOW()
    `
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'DB Error', details: error.message }, { status: 500 })
  }
}
