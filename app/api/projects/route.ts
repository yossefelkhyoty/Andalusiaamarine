/**
 * ANDALUSIA MARINE - PROJECTS API V2.3 (SAFE SYNC)
 * CLEAN DATA BINDING + DETAILED ERROR REPORTING
 */

import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
        orderBy: [{ isHidden: 'asc' }, { createdAt: 'desc' }]
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Database Connection Lost' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // 🛡 SAFE DATA EXTRACTION (MANDATORY FIELDS)
    const project = await prisma.project.create({ 
        data: {
          category: data.category || 'ships',
          title_en: data.title_en,
          title_ar: data.title_ar,
          orange_label_en: data.orange_label_en || '',
          orange_label_ar: data.orange_label_ar || '',
          desc_en: data.desc_en || '',
          desc_ar: data.desc_ar || '',
          media_path: data.media_path,
          media_type: data.media_type || 'image',
          isHidden: false
        } 
    })
    return NextResponse.json(project)
  } catch (error: any) {
    console.error('DB_POST_ERROR:', error)
    return NextResponse.json({ 
        error: 'Entry Failed', 
        details: error.message 
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
    try {
      const data = await request.json()
      const { id, ...updateData } = data
      
      // Clean update object
      const cleanData: any = {}
      if (updateData.category) cleanData.category = updateData.category
      if (updateData.title_en) cleanData.title_en = updateData.title_en
      if (updateData.title_ar) cleanData.title_ar = updateData.title_ar
      if (updateData.media_path) cleanData.media_path = updateData.media_path
      if (updateData.media_type) cleanData.media_type = updateData.media_type
      if (updateData.orange_label_en !== undefined) cleanData.orange_label_en = updateData.orange_label_en
      if (updateData.orange_label_ar !== undefined) cleanData.orange_label_ar = updateData.orange_label_ar
      if (updateData.desc_en !== undefined) cleanData.desc_en = updateData.desc_en
      if (updateData.desc_ar !== undefined) cleanData.desc_ar = updateData.desc_ar
      if (updateData.isHidden !== undefined) cleanData.isHidden = updateData.isHidden

      const project = await prisma.project.update({
          where: { id: Number(id) },
          data: cleanData
      })
      return NextResponse.json(project)
    } catch (error: any) {
      return NextResponse.json({ error: 'Update Failed', details: error.message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        
        await prisma.project.delete({
            where: { id: Number(id) }
        })
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: 'Delete Failed', details: error.message }, { status: 500 })
    }
}
