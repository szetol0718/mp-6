'use client';

import { useEffect, useState, Suspense } from 'react';
import SignInButton from '@/components/SignInButton';
import UserProfile from '@/components/UserProfile';
import { useSearchParams } from 'next/navigation';

type User = {
  name: string;
  login: string;
  avatar: string;
};

function HomePageContent() {
  const [user, setUser] = useState<User | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get('name');
    const avatar = searchParams.get('avatar');
    const login = searchParams.get('login');

    if (name && avatar && login) {
      setUser({ name, avatar, login });
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {!user ? (
        <SignInButton />
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