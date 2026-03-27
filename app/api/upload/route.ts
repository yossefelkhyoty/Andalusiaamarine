/**
 * ANDALUSIA MARINE - UPLOAD CORE V1.2 (Smart Filenames)
 * ADDS RANDOM SUFFIX TO PREVENT OVERWRITE ERRORS
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
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
       return NextResponse.json({ error: 'Token missing in Environment' }, { status: 500 })
    }

    // 🛡 ADD RANDOM SUFFIX TO PREVENT DUPLICATES
    const blob = await put(filename, request.body!, {
      access: 'public',
      addRandomSuffix: true, // 💊 THIS IS THE MEDICINE!
    })

    return NextResponse.json(blob)
  } catch (error: any) {
    console.error('BLOB_ERROR:', error)
    return NextResponse.json({ 
        error: 'Upload Internal Crash', 
        details: error.message 
    }, { status: 500 })
  }
}
