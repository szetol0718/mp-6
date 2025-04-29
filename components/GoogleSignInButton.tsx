'use client';

export default function GoogleSignInButton() {
  const handleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error('Missing Google OAuth env vars');
      return;
    }

    const scope = encodeURIComponent('openid email profile');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
    <button
      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  );
}