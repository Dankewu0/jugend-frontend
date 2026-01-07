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
        class: "bg-gray-700 text-white p-3 rounded-lg min-h-[300px]",
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

  return (
    <div className="w-screen h-screen flex items-start justify-center p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 rounded-2xl border-2 border-gray-900 flex flex-col gap-4 w-full max-w-5xl p-6 overflow-y-auto"
      >
        <div className="flex gap-4 items-start">
          <input
            {...register("title")}
            placeholder="Тема поста"
            className="flex-1 bg-gray-700 text-white p-3 rounded-lg"
          />
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
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="bg-gray-700 text-white p-2 rounded-lg"
          />
          <button
            disabled={isSubmitting}
            className="bg-gray-700 text-white hover:bg-gray-600 p-3 rounded-lg"
          >
            Создать пост
          </button>
        </div>

        <EditorContent editor={editor} className="mt-4" />
        <p className="text-red-400">{errors.body?.message}</p>
      </form>
    </div>
  );
}
