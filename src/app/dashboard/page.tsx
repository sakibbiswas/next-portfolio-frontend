"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiFetch } from "../../lib/api";
import BlogCard from "../../components/blogs/BlogCard";
import ProjectCard from "../../components/projects/ProjectCard";
import { Blog } from "../../types/blog";
import { Project } from "../../types/project";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const blogRes = await apiFetch("/api/blogs", { method: "GET" });
        setBlogs(blogRes.blogs ?? []);

        const projectRes = await apiFetch("/api/projects", { method: "GET" });
        setProjects(projectRes.projects ?? []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);

  const removeBlog = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
      toast.success("Blog deleted");
      setBlogs((s) => s.filter((b) => b.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const removeProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await apiFetch(`/api/projects/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
      setProjects((s) => s.filter((p) => p.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4 sm:p-6">
      {/* Floating Shapes */}
      <div className="absolute top-8 left-6 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-pink-400 rounded-full opacity-30 animate-bounce" />
      <div className="absolute bottom-16 right-6 sm:bottom-20 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 bg-blue-400 rounded-full opacity-30 animate-pulse" />

      <div className="relative container mx-auto space-y-10 sm:space-y-12 z-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-md text-center sm:text-left">
          Owner Dashboard
        </h1>

        {/* Blogs Section */}
        <div className="p-4 sm:p-6 rounded-2xl shadow-xl bg-gradient-to-r from-yellow-200 via-pink-100 to-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700">
              Manage Blogs
            </h2>
            <Link
              href="/dashboard/blogs/create"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md transform hover:scale-105 transition-all text-center"
            >
              + Create Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {blogs.length === 0 ? (
              <div className="bg-white/70 p-4 rounded shadow-sm text-center text-gray-600 col-span-full">
                No blogs found
              </div>
            ) : (
              blogs.map((b) => (
                <div
                  key={b.id}
                  className="relative bg-white p-4 sm:p-5 rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition-all"
                >
                  <BlogCard blog={b} />
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-end border-t pt-3">
                    <Link
                      href={`/blogs/${b.id}`}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-all"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/blogs/${b.id}/edit`}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:scale-105 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removeBlog(b.id)}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-md hover:scale-105 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="p-4 sm:p-6 rounded-2xl shadow-xl bg-gradient-to-r from-blue-100 via-cyan-100 to-green-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">
              Manage Projects
            </h2>
            <Link
              href="/dashboard/projects/create"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md transform hover:scale-105 transition-all text-center"
            >
              + Create Project
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {projects.length === 0 ? (
              <div className="bg-white/70 p-4 rounded shadow-sm text-center text-gray-600 col-span-full">
                No projects found
              </div>
            ) : (
              projects.map((p) => (
                <div
                  key={p.id}
                  className="relative bg-white p-4 sm:p-5 rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition-all"
                >
                  <ProjectCard project={p} />
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-end border-t pt-3">
                    <Link
                      href={`/projects/${p.id}`}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-all"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/projects/edit/${p.id}`}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:scale-105 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removeProject(p.id)}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-md hover:scale-105 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
