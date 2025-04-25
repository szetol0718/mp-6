'use client';

import { useEffect, useState } from 'react';
import SignInButton from '../components/SignInButton';
import UserProfile from '@/components/UserProfile';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
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
        <SignInButton setUser={setUser} />
      ) : (
        <UserProfile user={user} />
      )}
    </main>
  );
}