"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateThreadSchema } from "@/app/_schemas/ThreadSchema";

type CreateThreadInput = z.infer<typeof CreateThreadSchema>;

type Category = {
  id: number;
  title: string;
};

export default function CreatePost() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateThreadInput>({
    resolver: zodResolver(CreateThreadSchema),
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const onSubmit = async (data: CreateThreadInput) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Create thread failed");
    }

    const thread = await res.json();
    router.push(`/threads/${thread.id}`);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 rounded-2xl border-2 border-gray-900 flex flex-col p-8 gap-4 w-full max-w-md"
      >
        <input
          {...register("title")}
          placeholder="Тема поста"
          className="bg-gray-700 text-white p-3 rounded-lg"
        />
        <p className="text-red-400">{errors.title?.message}</p>

        <textarea
          {...register("body")}
          placeholder="Текст поста"
          className="bg-gray-700 text-white p-3 rounded-lg min-h-[120px]"
        />
        <p className="text-red-400">{errors.body?.message}</p>

        <select
          {...register("category_id", { valueAsNumber: true })}
          className="bg-gray-700 text-white p-3 rounded-lg"
        >
          <option value="">Выбери категорию</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <p className="text-red-400">{errors.category_id?.message}</p>

        <button
          disabled={isSubmitting}
          className="bg-gray-700 text-white hover:bg-gray-600 p-3 rounded-lg"
        >
          Создать пост
        </button>
      </form>
    </div>
  );
}
