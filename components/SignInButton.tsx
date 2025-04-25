'use client';

import React from 'react';

type Props = {
  setUser: (user: any) => void;
};

export default function SignInButton({ setUser }: Props) {
  const handleSignIn = async () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI ?? 'http://127.0.0.1:3000/api/auth/callback';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;

    window.location.href = githubAuthUrl;
  };

  return (
    <button
      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      onClick={handleSignIn}
    >
      Sign in with GitHub
    </button>
  );
}