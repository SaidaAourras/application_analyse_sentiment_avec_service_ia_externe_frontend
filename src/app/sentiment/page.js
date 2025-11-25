"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogout } from "../auth/logout/page";

export default function Predict() {
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [result, setresult] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const sentiment = {
    1: "negative",
    2: "negative",
    3: "neutre",
    4: "positive",
    5: "positive",
  };

  // Vérification du token au chargement
  useEffect(() => {
    const token = localStorage.getItem("my_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const get_predict = async (comment, token) => {
    const response = await fetch("http://127.0.0.1:8000/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
      throw new Error(data.detail || `Response status: ${response.status}`);
    }

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("my_token");

      if (!token) {
        setLoading(false);
        router.push("/auth/login");
        return;
      }

      const result = await get_predict(comment, token);
      setresult(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="w-full bg-sky-800 text-sky-50 py-4 fixed top-0 left-0 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo / Titre */}
          <a
            href="/"
            className="text-xl font-bold hover:text-sky-300 transition"
          >
            SentimentAI
          </a>

          {/* Menu */}
          <div className="relative group">
            <button className="px-3 py-2 bg-sky-700 rounded-md hover:bg-sky-600 transition">
               ▼
            </button>

            <div className="absolute hidden group-hover:block right-0 mt-2 bg-white text-gray-700 rounded-md shadow-lg min-w-[150px] overflow-hidden">
              {/* <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Profil
              </a> */}
              {/* <a
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Paramètres
              </a> */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen bg-sky-900 p-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-sky-50 mb-8">
            Sentiment Analysis
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="comment"
              className="block text-sky-100 font-medium mb-2 text-md"
            >
              Enter your comment
            </label>

            <div className="flex gap-4 items-stretch">
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={1}
                className="flex-1 text-white px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
                placeholder="Type your comment here..."
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-sky-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Loading ..." : "Analyse"}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-5 p-3 rounded-2xl shadow-xl">
              <h2 className="text-lg font-bold text-sky-50 mb-4 border-b pb-2">
                Result
              </h2>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-sm">
                  <span className="text-gray-700 font-semibold text-sm">
                    Score :
                  </span>
                  <span className="text-md font-bold text-sky-700 capitalize">
                    {result.predict_rate}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-sm">
                  <span className="text-gray-700 font-semibold text-sm">
                    Sentiment :
                  </span>
                  <span className="text-md font-bold text-sky-700 capitalize">
                    {sentiment[result.predict_rate]}
                  </span>
                </div>

                <div className="p-2 bg-gray-50 rounded-sm border-l-4 border-sky-500">
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Your comment:
                  </p>
                  <p className="text-md text-gray-800 italic">"{comment}"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
