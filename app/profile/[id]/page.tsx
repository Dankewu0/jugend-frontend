"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Thread = {
  id: number;
  title: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  threads: Thread[];
};

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;
  if (!user)
    return <div className="p-8 text-white">Пользователь не найден</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        {user.avatar && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Посты пользователя</h2>
        {user.threads.length === 0 && <p>Нет постов</p>}
        <ul className="flex flex-col gap-2">
          {user.threads.map((thread) => (
            <li key={thread.id}>
              <Link
                href={`/threads/${thread.id}`}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 block"
              >
                {thread.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
