"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateThreadSchema } from "@/app/_schemas/ThreadSchema";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type CreateThreadInput = z.infer<typeof CreateThreadSchema>;

type Category = {
  id: number;
  title: string;
};

export default function CreatePost() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [editorMounted, setEditorMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CreateThreadInput>({
    resolver: zodResolver(CreateThreadSchema),
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "w-full px-6 py-4 text-white text-base leading-relaxed focus:outline-none",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => setValue("body", editor.getHTML()),
  });

  useEffect(() => setEditorMounted(true), []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const onSubmit = async (data: CreateThreadInput) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("category_id", String(data.category_id));
    files.forEach((file) => formData.append("files", file));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error("Create thread failed");

    const thread = await res.json();
    router.push(`/threads/${thread.id}`);
  };

  if (!editorMounted) return null;

  const controlClass =
    "h-11 px-4 text-sm rounded-lg bg-gray-700 text-white shadow-lg shadow-gray-900 flex items-center";

  return (
    <div className="w-screen h-screen flex items-start justify-center p-4 sm:p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full max-w-5xl flex-col gap-4 p-4 sm:p-6"
      >
        {/* Верхний блок: на мобилке колонка, на ПК ряд */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-start">
          <input
            {...register("title")}
            placeholder="Тема поста"
            className={`${controlClass} w-full sm:flex-1`}
          />

          <select
            {...register("category_id", { valueAsNumber: true })}
            className={`${controlClass} w-full sm:flex-1`}
          >
            <option value="">Выбери категорию</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <label
            className={`${controlClass} cursor-pointer w-full sm:flex-1 text-center`}
          >
            Обзор
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="hidden"
            />
          </label>

          <button
            disabled={isSubmitting}
            className={`${controlClass} hover:bg-gray-600 w-full sm:flex-1`}
          >
            Опубликовать
          </button>
        </div>

        {/* Редактор */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="flex-1 rounded-lg border border-gray-600 bg-gray-700 shadow-lg shadow-gray-900 overflow-y-auto min-h-[300px]">
            <EditorContent
              editor={editor}
              className="p-2 min-h-[300px]"
              placeholder="Текст поста"
            />
          </div>
        </div>

        <p className="text-red-400">{errors.body?.message}</p>
      </form>
    </div>
  );
}
