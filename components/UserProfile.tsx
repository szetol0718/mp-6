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
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto border border-gray-200">
      <Image
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        width={120}
        height={120}
        className="rounded-full border"
      />
      <div className="text-center space-y-3 w-full">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">@{user.login}</p>
        </div>
        {user.bio && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Bio</h3>
            <p className="text-gray-700 italic">{user.bio}</p>
          </div>
        )}
        {user.location && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Location</h3>
            <p className="text-gray-700">{user.location}</p>
          </div>
        )}
        {user.blog && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Website</h3>
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user.blog}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}