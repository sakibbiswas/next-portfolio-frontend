"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { apiFetch } from "../../lib/api";
import { setAccessToken, setUser } from "../../lib/auth";

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatarUrl?: string;
  };
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const fillAdmin = () => {
    setEmail("admin@gmail.com");
    setPassword("admin123");
    toast.success("Admin credentials filled!", { duration: 1200 });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setShake(true);
      toast.error("Both email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res: LoginResponse = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAccessToken(res.accessToken);
      setUser(res.user);

      toast.success(`Welcome back, ${res.user.name || "User"}!`);
      router.push("/dashboard");
    } catch (err: any) {
      setShake(true);
      console.error("Login error:", err);
      toast.error(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shake) {
      const timeout = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [shake]);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-pink-100 to-yellow-100 overflow-hidden px-3 sm:px-6">
      {/* Floating colorful shapes */}
      <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-pink-300 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute top-10 right-10 w-52 h-52 sm:w-72 sm:h-72 bg-yellow-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 -right-10 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-300 rounded-full opacity-30 animate-blob animation-delay-4000"></div>

      <section
        className={`relative z-10 w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-transform duration-500 ${
          shake ? "animate-shake" : ""
        } hover:-translate-y-1`}
      >
        {/* Image block */}
        <div className="relative w-full h-40 sm:h-56 md:h-auto">
          <Image
            src="/download (1).png"
            alt="Login illustration"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Right form */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-indigo-700 animate-fade-in text-center md:text-left">
            Owner Login
          </h1>

          <form onSubmit={submit} className="space-y-6">
            {/* Email */}
            <label className="block relative">
              <span className="text-sm font-semibold text-indigo-600">Email</span>
              <div className="mt-2 relative">
                <FiMail className="absolute left-3 top-3 text-pink-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition hover:shadow-lg"
                />
              </div>
            </label>

            {/* Password */}
            <label className="block relative">
              <span className="text-sm font-semibold text-indigo-600">Password</span>
              <div className="mt-2 relative">
                <FiLock className="absolute left-3 top-3 text-yellow-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full pl-10 pr-10 p-3 border border-gray-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition hover:shadow-lg"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-indigo-500 hover:text-indigo-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </label>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={fillAdmin}
                className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-indigo-400 text-white text-sm sm:text-base font-semibold rounded-xl hover:scale-105 transform transition shadow-md"
              >
                Use admin creds
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 text-white text-sm sm:text-base font-bold rounded-xl disabled:opacity-60 hover:scale-105 transform transition shadow-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-xs sm:text-sm text-center md:text-left text-indigo-500">
            Tip: Click <span className="font-medium">Use admin creds</span> to auto-fill the
            admin account (admin@gmail.com / admin123).
          </p>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.5s; }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -10px) scale(1.1); }
          66% { transform: translate(-20px, 10px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s ease forwards; }
      `}</style>
    </main>
  );
}
