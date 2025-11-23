"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Envoi au backend
  const post_data = async (credentials) => {
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
      setError(data.detail);
      return null;
    }

    return data;
  };

  const submit_form = async (e) => {
    e.preventDefault();
    setError("");
    
    if (username && password) {
      const data = await post_data({ username, password });
      if (data) {
        router.push("/auth/login");
      }
      setPassword("");
      setUserName("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-950">
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-3">
          Sign Up
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit_form}>
          <div className="relative mb-6">
            <label htmlFor="username" className="ml-2 text-gray-700">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
              placeholder="username"
            />
          </div>

          <div className="relative mb-6">
            <label htmlFor="password" className="ml-3 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-sm font-medium hover:bg-sky-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
