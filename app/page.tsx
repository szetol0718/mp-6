'use client';

import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function HomePage() {
  return (
    <SessionProvider>
      <HomePageContent />
    </SessionProvider>
  );
}

function HomePageContent() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Welcome, {session.user?.name}</h2>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full mt-4"
          />
        )}
        <p className="text-gray-600">{session.user?.email}</p>
        <button className="mt-6 bg-red-500 px-4 py-2 text-white rounded" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <div className="flex gap-4">
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => signIn('github')}>
          Sign in with GitHub
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => signIn('google')}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}