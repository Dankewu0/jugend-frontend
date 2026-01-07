"use client";
import SideBar from "@/app/_components/SideBar";
import { Button } from "@/app/_components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-2 text-white font-bold flex items-center justify-center gap-64">
      <Link href="/">
        <span className="text-3xl">Jugend</span>
      </Link>

      <div className="hidden md:flex gap-2">
        <Button className="bg-gray-700 hover:bg-gray-600">Создать пост</Button>
        <Button className="bg-gray-700  hover:bg-gray-600">
          Темы на форуме
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Link href="authorization">
          <Button className="bg-gray-700 hover:bg-gray-600 flex items-center gap-2">
            <User width={24} height={24} />
            <span className="text-xl">Войти</span>
          </Button>
        </Link>

        <div className="md:hidden">
          <SideBar />
        </div>
      </div>
    </header>
  );
}
