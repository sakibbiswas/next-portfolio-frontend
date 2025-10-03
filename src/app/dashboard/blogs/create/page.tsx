
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "../../../../lib/api";
import { getAccessToken } from "../../../../lib/auth";

export default function BlogCreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      toast.error("You must be logged in to create a blog");
      router.push("/login");
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (slug) formData.append("slug", slug);
    if (excerpt) formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("published", published ? "true" : "false");
    if (thumbnail) formData.append("thumbnail", thumbnail);

    setLoading(true);
    try {
      await apiFetch("/api/blogs", {
        method: "POST",
        body: formData,
        isForm: true,
      });

      toast.success("Blog created successfully");
      router.push("/dashboard/blogs");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Create failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 overflow-hidden">
      {/* Floating colorful shapes */}
      <div className="absolute -top-10 -left-10 w-28 h-28 sm:w-40 sm:h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute top-20 right-10 w-44 h-44 sm:w-60 sm:h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-spin-slow"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 sm:w-44 sm:h-44 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-bounce"></div>

      <div className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          ✨ Create a New Blog
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (optional)"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Excerpt"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your blog content here..."
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded-lg shadow-sm bg-white"
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
            />
            Publish now
          </label>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full sm:w-auto px-6 py-2 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-center"
            >
              {loading ? "Saving..." : "Save Blog"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-2 font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-100 shadow hover:-translate-y-1 transition-all text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
