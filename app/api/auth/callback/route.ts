import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // 2. Use access token to get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
      },
    });

    const userData = await userResponse.json();

    // 3. Redirect back to homepage with user data in query string
    const redirectUrl = new URL('/', req.url);
    redirectUrl.searchParams.set('name', userData.name || userData.login);
    redirectUrl.searchParams.set('avatar', userData.avatar_url);
    redirectUrl.searchParams.set('login', userData.login);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}