"use client";

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PopularThread = {
  id: number;
  title: string;
  slug: string;
  comments_count: number;
};

export default function PopularThreads() {
  const [threads, setThreads] = useState<PopularThread[]>([]);
  const router = useRouter();
  useEffect(() => {
    apiFetch<PopularThread[]>("/threads/popular")
      .then(setThreads)
      .catch(console.error);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {threads.map((t) => (
        <div
          key={t.id}
          onClick={() => router.push(`/threads/${t.slug}`)}
          className="cursor-pointer bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-700 transition"
        >
          <h2 className="text-lg text-white font-semibold">{t.title}</h2>
        </div>
      ))}
    </div>
  );
}
