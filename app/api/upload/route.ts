/**
 * ANDALUSIA MARINE - UPLOAD CORE V1.1 (Debug Mode)
 * EXTENDED ERROR LOGGING FOR PRODUCTION FLIGHT
 */

import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json({ error: 'Filename is Missing' }, { status: 400 })
  }

  try {
    // 🛡 ENSURE WE HAVE THE TOKEN
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
       return NextResponse.json({ error: 'Token missing in Environment' }, { status: 500 })
    }

    const blob = await put(filename, request.body!, {
      access: 'public',
    })

    return NextResponse.json(blob)
  } catch (error: any) {
    // 🛡 SEND REAL ERROR MESSAGE TO ADMIN
    console.error('BLOB_ERROR:', error)
    return NextResponse.json({ 
        error: 'Upload Internal Crash', 
        details: error.message 
    }, { status: 500 })
  }
}
