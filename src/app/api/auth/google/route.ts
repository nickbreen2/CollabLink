import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

export async function GET(request: NextRequest) {
  // Use environment variable if set, otherwise fall back to request origin
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || request.nextUrl.origin
  const origin = baseUrl.replace(/\/+$/, '')
  const redirectUri = `${origin}/api/auth/google/callback`
  
  // Log the redirect URI for debugging
  console.log('🔵 OAuth redirect URI being sent to Google:', redirectUri)
  
  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  )

  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    prompt: 'consent',
  })

  return NextResponse.redirect(url)
}

