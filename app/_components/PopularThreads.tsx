"use client";

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PopularThreadsSkeleton from "./PopularThreadsSkeleton";

type PopularThread = {
  id: number;
  title: string;
  slug: string;
  comments_count: number;
};

export default function PopularThreads() {
  const [threads, setThreads] = useState<PopularThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    apiFetch<PopularThread[]>("/threads/popular")
      .then((data) => {
        setThreads(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading || error) return <PopularThreadsSkeleton />;

  return (
    <div
      className="grid gap-2 w-full"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      }}
    >
      {threads.map((t) => (
        <div
          key={t.id}
          onClick={() => router.push(`/threads/${t.slug}`)}
          className="cursor-pointer bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-white font-medium text-sm h-[60px] px-2 truncate hover:bg-gray-700 transition"
        >
          {t.title}
        </div>
      ))}
    </div>
  );
}
