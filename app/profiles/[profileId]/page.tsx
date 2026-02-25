import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserSchema, UserInput } from "@/app/_schemas/userSchema";

type Props = { params: { id: string } };

async function fetchUser(userId: string): Promise<UserInput> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const parsed = UserSchema.safeParse(data);

  if (!parsed.success) {
    notFound();
  }

  return parsed.data;
}

export default async function ProfilePage({ params }: Props) {
  const user = await fetchUser(params.id);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        {user.avatar && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`}
            alt={`${user.name} avatar`}
            width={80}
            height={80}
            className="rounded-full object-cover"
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
