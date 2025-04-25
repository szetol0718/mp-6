'use client';

type UserProps = {
  user: {
    name: string;
    login: string;
    avatar: string;
  };
};

export default function UserProfile({ user }: UserProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <img
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className="w-24 h-24 rounded-full"
      />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">@{user.login}</p>
    </div>
  );
}