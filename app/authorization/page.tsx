"use client";
import { loginSchema, type LoginInput } from "@/app/_schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function Authorization() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    await res.json();

    router.push("/user-page");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 rounded-2xl border-2 border-gray-900 flex flex-col p-8 gap-4 w-full max-w-md"
      >
        <input
          {...register("login")}
          placeholder="Логин или email"
          className="bg-gray-700 text-white p-3 rounded-lg"
        />
        <p className="text-red-500">{errors.login?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Пароль"
          className="bg-gray-700 text-white p-3 rounded-lg"
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <button className="bg-gray-700 text-white hover:bg-gray-600 p-3 rounded-lg">
          Войти
        </button>
        <Link href="registration" className="text-white text-center">
          Нет аккаунта?
        </Link>
      </form>
    </div>
  );
}
