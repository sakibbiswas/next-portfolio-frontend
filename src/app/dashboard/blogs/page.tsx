"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "../../../lib/api";
import { Blog } from "../../../types/blog";
import BlogCard from "../../../components/blogs/BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/blogs", { method: "GET" });
        setBlogs(res.blogs ?? []);
      } catch {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      setBlogs((s) => s.filter((b) => b.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );

  return (
    <section className="relative min-h-screen py-10 px-4 sm:py-16 sm:px-6 overflow-hidden">
      {/* Floating colorful shapes */}
      <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-400 rounded-full opacity-30 blur-2xl animate-pulse -z-10"></div>
      <div className="absolute top-1/2 -right-12 w-40 h-40 sm:w-52 sm:h-52 bg-blue-400 rounded-full opacity-30 blur-2xl animate-bounce -z-10"></div>
      <div className="absolute bottom-10 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-green-400 rounded-full opacity-30 blur-2xl animate-spin-slow -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-10 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-center sm:text-left">
            Manage Blogs
          </h1>
          <Link
            href="/dashboard/blogs/create"
            className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-sm sm:text-base text-center"
          >
            + Create New
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogs.length === 0 && (
            <div className="bg-gradient-to-r from-pink-200 via-yellow-200 to-orange-200 p-4 sm:p-6 rounded-2xl shadow-md text-center font-medium text-gray-900 col-span-full">
              No blogs found
            </div>
          )}

          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-gradient-to-tr from-indigo-100 via-pink-100 to-purple-100 p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
            >
              {/* Blog card */}
              <BlogCard blog={b} />

              {/* Actions */}
              <div className="flex gap-3 sm:gap-4 mt-4 justify-center sm:justify-end flex-wrap">
                <Link
                  href={`/dashboard/blogs/${b.id}/edit`}
                  className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  Edit
                </Link>
                <button
                  onClick={() => remove(b.id)}
                  className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
