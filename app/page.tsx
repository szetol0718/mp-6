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

  return (
    <main className="min-h-screen bg-gray-100 px-4">
      <header className="bg-white shadow-md py-4 mb-8">
        <h1 className="text-center text-2xl font-bold text-gray-800">Louis Szeto OAuth Demo</h1>
      </header>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          {session ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {session.user?.name}</h2>
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="rounded-full mx-auto mb-4"
                />
              )}
              <p className="text-gray-600 mb-6">{session.user?.email}</p>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
              <p className="text-gray-600 mb-4">Choose a provider to sign in:</p>
              <div className="flex flex-col gap-4">
                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => signIn('github')}
                >
                  Sign in with GitHub
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => signIn('google')}
                >
                  Sign in with Google
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}