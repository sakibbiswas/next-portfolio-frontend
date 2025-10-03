
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
      const res = (await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })) as LoginResponse;

      setAccessToken(res.accessToken);
      setUser(res.user);

      toast.success(`Welcome back, ${res.user.name || "User"}!`);
      router.push("/dashboard");
    } catch (err: unknown) {
      setShake(true);
      console.error("Login error:", err);
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      toast.error(message);
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
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-pink-100 to-yellow-100 px-4 sm:px-6 overflow-hidden">
      {/* Floating colorful blobs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-pink-300 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute top-10 right-10 w-52 h-52 sm:w-72 sm:h-72 bg-yellow-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 -right-10 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-300 rounded-full opacity-30 animate-blob animation-delay-4000"></div>

      <div
        className={`relative z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 transition-transform ${
          shake ? "animate-shake" : ""
        } hover:-translate-y-1`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/download (1).png" alt="Logo" width={100} height={100} />
        </div>


        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Owner Login
        </h1>

        <form onSubmit={submit} className="space-y-5">
          {/* Email input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-pink-500" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition hover:shadow-md text-sm sm:text-base"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-yellow-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition hover:shadow-md text-sm sm:text-base"
            />
            <button
              type="button"
              className="absolute top-3 right-3 text-indigo-500 hover:text-indigo-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

      {/* Admin fill shortcut */}
        <button
          onClick={fillAdmin}
          type="button"
          className="mt-4 w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
        >
          Fill Admin Credentials
        </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 text-white font-bold rounded-xl hover:scale-105 transform transition shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

  

 
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.5s; }

        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-10px) scale(1.1); }
          66% { transform: translate(-20px,10px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </main>
  );
}
