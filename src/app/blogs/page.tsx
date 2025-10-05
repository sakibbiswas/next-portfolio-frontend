
// src/app/blogs/page.tsx
import { Blog } from "../../types/blog";
import BlogCard from "../../components/blogs/BlogCard";

export const revalidate = 60; // ISR: revalidate every 60s

async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.blogs as Blog[];
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <section className="relative pt-25 min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 px-6 py-12 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-purple-300 rounded-full opacity-30 animate-pulse" />

      <div className="relative max-w-6xl mx-auto space-y-8 z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-md">
          Blogs
        </h1>

        {blogs.length === 0 && (
          <div className="bg-white/70 p-6 rounded-2xl shadow text-center text-gray-600">
            No blogs found
          </div>
        )}

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <BlogCard key={b.id} blog={b} />
          ))}
        </div>
      </div>
    </section>
  );
}




