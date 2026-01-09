"use client";

import {
  ForumThreadArraySchema,
  ForumThreadSchema,
} from "@/app/_schemas/ForumThreadSchema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";

type ForumThread = z.infer<typeof ForumThreadSchema>;

export default function ForumThemesPage() {
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/threads`);
    if (selectedCategory)
      url.searchParams.set("category_id", String(selectedCategory));

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        const parsed = ForumThreadArraySchema.safeParse(data);
        if (parsed.success) setThreads(parsed.data);
      });
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white mb-4">Темы на форуме</h1>

      <div className="flex gap-2 flex-wrap mb-4">
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value ? Number(e.target.value) : "")
          }
          className="h-10 px-3 rounded-lg bg-gray-700 text-white shadow-lg shadow-gray-900"
        >
          <option value="">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {threads.length === 0 && (
          <p className="text-gray-400">Нет тем для отображения</p>
        )}

        {threads.map((thread) => (
          <Link
            key={thread.id}
            href={`/threads/${thread.slug}`}
            className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-900 transition-colors"
          >
            <h2 className="text-lg font-semibold">{thread.title}</h2>
            <p className="text-sm text-gray-300 truncate">{thread.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
