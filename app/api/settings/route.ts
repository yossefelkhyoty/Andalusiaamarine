import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/settings?key=admin_password
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    if (!key) return NextResponse.json({ error: 'Key required' }, { status: 400 })
    
    const setting = await prisma.settings.findUnique({ where: { key } })
    return NextResponse.json({ value: setting?.value ?? null })
  } catch (error: any) {
    return NextResponse.json({ error: 'DB Error', details: error.message }, { status: 500 })
  }
}

// POST /api/settings  { key, value }
export async function POST(request: Request) {
  try {
    const { key, value } = await request.json()
    if (!key || !value) return NextResponse.json({ error: 'Key and value required' }, { status: 400 })

    const setting = await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })
    return NextResponse.json({ success: true, setting })
  } catch (error: any) {
    return NextResponse.json({ error: 'DB Error', details: error.message }, { status: 500 })
  }
}
