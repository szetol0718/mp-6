'use client';

import Image from 'next/image';

type UserProps = {
  user: {
    name: string;
    login: string;
    avatar: string;
    bio?: string;
    location?: string;
    blog?: string;
  };
};

export default function UserProfile({ user }: UserProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <Image
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        width={120}
        height={120}
        className="rounded-full"
      />
      <div className="text-center">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">@{user.login}</p>
        {user.bio && (
          <p className="mt-2 text-gray-700 italic">{user.bio}</p>
        )}
        {user.location && (
          <p className="mt-2 text-gray-500">{user.location}</p>
        )}
        {user.blog && (
          <a
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-500 hover:underline block"
          >
            {user.blog}
          </a>
        )}
      </div>
    </div>
  );
}