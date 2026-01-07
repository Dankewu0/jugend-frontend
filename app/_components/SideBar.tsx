"use client";

import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <Menu />
      </Button>

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-56 bg-gray-800 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4 border-b border-gray-700">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <Menu />
          </Button>
        </div>

        <nav className="flex flex-col gap-2 p-4 font-bold text-white">
          <Link
            href="create-post"
            className="rounded-md px-3 py-2 hover:bg-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Создать пост
          </Link>

          <Link
            href="forum-themes"
            className="rounded-md px-3 py-2 hover:bg-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Темы на форуме
          </Link>
        </nav>
      </aside>
    </>
  );
}
