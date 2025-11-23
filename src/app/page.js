"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("my_token");
    if (token) router.push("/sentiment");
    router.push("/auth/login")
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-white bg-sky-900">
      <h1 className="text-3xl font-bold">Welcome</h1>
    </div>
  );
}
