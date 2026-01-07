"use client";
import { registerSchema, type RegisterInput } from "@/app/_schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function Registration() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterInput) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Register failed");

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
          {...register("name")}
          placeholder="Введите логин"
          className="bg-gray-700 text-white p-3 rounded-lg"
        />
        <p className="text-red-500">{errors.name?.message}</p>
        <input
          {...register("email")}
          placeholder="Введите email"
          className="bg-gray-700 text-white p-3 rounded-lg"
        />
        <p className="text-red-500">{errors.email?.message}</p>
        <input
          {...register("password")}
          placeholder="Введите пароль"
          className="bg-gray-700 text-white p-3 rounded-lg"
        />
        <p className="text-red-500">{errors.password?.message}</p>
        <button className="bg-gray-700 text-white hover:bg-gray-600 p-3 rounded-lg">
          Зарегистрироваться
        </button>
        <Link href="authorization" className="text-white text-center">
          Есть аккаунт?
        </Link>
      </form>
    </div>
  );
}
