import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    // Exchange code for token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) return NextResponse.redirect(new URL('/', req.url));

    // Get user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userData = await userRes.json();

    const redirectUrl = new URL('/', req.url);
    redirectUrl.searchParams.set('name', userData.name);
    redirectUrl.searchParams.set('avatar', userData.picture);
    redirectUrl.searchParams.set('login', userData.email);
    redirectUrl.searchParams.set('bio', userData.given_name);
    redirectUrl.searchParams.set('location', userData.locale);

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('Google OAuth error:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}