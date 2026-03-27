/**
 * ANDALUSIA MARINE - PROJECTS API V2.2 (DELETE Support)
 * Added DELETE handler for projects CRUD.
 */

import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

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

// 🛡 NEW: DELETE HANDLER
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        
        await prisma.project.delete({
            where: { id: Number(id) }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Delete Failed' }, { status: 500 })
    }
}
