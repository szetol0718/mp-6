'use client';

import { useEffect, useState, Suspense } from 'react';
import SignInButton from '@/components/SignInButton';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import UserProfile from '@/components/UserProfile';
import { useSearchParams } from 'next/navigation';

type User = {
  name: string;
  login: string;
  avatar: string;
  bio?: string;
  location?: string;
  blog?: string;
};

function HomePageContent() {
  const [user, setUser] = useState<User | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get('name');
    const avatar = searchParams.get('avatar');
    const login = searchParams.get('login');
    const bio = searchParams.get('bio');
    const location = searchParams.get('location');
    const blog = searchParams.get('blog');

    if (name && avatar && login) {
      setUser({
        name,
        avatar,
        login,
        bio: bio || '',
        location: location || '',
        blog: blog || '',
      });
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Welcome to Louis Szeto OAuth Demo</h1>
      {!user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="mb-2 text-center">Choose a login provider to continue:</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SignInButton />
            <GoogleSignInButton />
          </div>
        </div>
      ) : (
        <UserProfile user={user} />
      )}
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}