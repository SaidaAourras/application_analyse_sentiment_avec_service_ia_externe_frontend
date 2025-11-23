"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Connexion au backend
  const post_data = async (credentials) => {
    const response = await fetch("http://127.0.0.1:8000/login", {
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

    localStorage.setItem("my_token", data.access_token);
    return data;
  };

  
  // Comment Form
  const submit_from = async (e) => {
    e.preventDefault();
    setError("");

    if (username && password) {
      const data = await post_data({ username, password });

      if (data) {
        router.push("/sentiment"); 
      }

      setPassword("");
      setUserName("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-950">
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-3">
          Login
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit_from}>
          <div className="relative mb-6">
            <label htmlFor="username" className="ml-2 text-gray-700">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md"
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
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-sm font-medium hover:bg-sky-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
