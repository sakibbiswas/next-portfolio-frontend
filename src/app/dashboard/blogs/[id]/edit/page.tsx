
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "../../../../../lib/api";
import { getAccessToken } from "../../../../../lib/auth";
import { Blog } from "../../../../../types/blog";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!getAccessToken()) {
      toast.error("You must be logged in to edit a blog");
      router.push("/login");
      return;
    }

    const fetchBlog = async () => {
      try {
        const data = await apiFetch(`/api/blogs/${id}`);
        const blog: Blog = data.blog;
        setTitle(blog.title);
        setSlug(blog.slug || "");
        setExcerpt(blog.excerpt || "");
        setContent(blog.content);
        setPublished(blog.published);
      } catch {
        toast.error("Failed to load blog");
        router.push("/dashboard/blogs");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id, router]);

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
    formData.append("published", String(published));
    if (thumbnail) formData.append("thumbnail", thumbnail);

    setLoading(true);
    try {
      await apiFetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: formData,
        isForm: true,
      });
      toast.success("Blog updated successfully");
      router.push("/dashboard/blogs");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <p className="text-center mt-12 text-gray-700 animate-pulse">
        Loading blog details...
      </p>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute top-24 right-12 w-44 h-44 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-spin-slow"></div>
      <div className="absolute bottom-16 left-24 w-36 h-36 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-bounce"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          📝 Edit Blog
        </h1>

        <form onSubmit={submit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full p-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Slug & Excerpt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug (optional)
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g., my-updated-blog"
                className="w-full p-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <input
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short description..."
                className="w-full p-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Update your blog content here..."
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition resize-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Published checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-400"
            />
            Publish now
          </label>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-2.5 font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-100 shadow-sm hover:-translate-y-0.5 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
