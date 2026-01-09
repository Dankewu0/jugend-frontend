"use client";
import SideBar from "@/app/_components/SideBar";
import { Button } from "@/app/_components/ui/button";
import { UpdateUserSchema } from "@/app/_schemas/userSchema";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MeResponse = {
  id: number;
  name: string;
  avatar?: string;
};

export default function Header() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !user) return;
    const file = e.target.files[0];
    try {
      UpdateUserSchema.parse({ avatar: file });
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Ошибка обновления аватара");

      const updated = await res.json();
      setUser(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 text-white">
      <Link href="/">
        <span className="text-2xl font-bold leading-none">Jugend</span>
      </Link>

      <div className="flex flex-wrap justify-center gap-2 my-2 sm:my-0">
        <Link href="/create-post">
          <Button className="bg-gray-700 hover:bg-gray-600 h-10 px-4 text-sm font-medium">
            Создать пост
          </Button>
        </Link>
        <Link href="/forum-themes">
          <Button className="bg-gray-700 hover:bg-gray-600 h-10 px-4 text-sm font-medium">
            Темы на форуме
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {!loading && !user && (
          <Link href="/authorization">
            <Button className="bg-gray-700 hover:bg-gray-600 h-10 px-4 text-sm font-medium flex items-center gap-2">
              <User width={18} height={18} />
              <span>Войти</span>
            </Button>
          </Link>
        )}

        {!loading && user && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative"
            >
              <Image
                src={user.avatar ?? "/default-avatar.png"}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-gray-600"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </button>
            <span className="hidden sm:inline">{user.name}</span>
          </div>
        )}

        <SideBar />
      </div>
    </header>
  );
}
