/**
 * ANDALUSIA MARINE - PROJECTS API V2
 * Optimized with Prisma Singleton & Improved Response Handling
 */

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Database Connection Lost' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const project = await prisma.project.create({ 
        data: {
          ...data,
          isHidden: false,
          media_type: data.media_type || 'image'
        } 
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
    try {
      const data = await request.json()
      const { id, ...updateData } = data
      const project = await prisma.project.update({
          where: { id: Number(id) },
          data: updateData
      })
      return NextResponse.json(project)
    } catch (error) {
      return NextResponse.json({ error: 'Update Failed' }, { status: 500 })
    }
}
