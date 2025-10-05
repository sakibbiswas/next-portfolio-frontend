

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { apiFetch, BASE_URL } from "../../../../../lib/api";

interface Project {
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  features?: string[];
  techStack?: string[];
  thumbnail?: string;
}

export default function ProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [features, setFeatures] = useState("");
  const [techStack, setTechStack] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await apiFetch(`/api/projects/${id}`);
        const p: Project = res.project;
        setTitle(p.title || "");
        setDescription(p.description || "");
        setLiveUrl(p.liveUrl || "");
        setRepoUrl(p.repoUrl || "");
        setFeatures((p.features ?? []).join(", "));
        setTechStack((p.techStack ?? []).join(", "));
        if (p.thumbnail) {
          const url = p.thumbnail.startsWith("http")
            ? p.thumbnail
            : `${BASE_URL}${p.thumbnail}`;
          setPreview(url);
        }
      } catch {
        toast.error("Failed to load project");
        router.push("/dashboard/projects");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setThumbnail(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description required");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      if (liveUrl) fd.append("liveUrl", liveUrl);
      if (repoUrl) fd.append("repoUrl", repoUrl);
      if (features)
        fd.append(
          "features",
          JSON.stringify(features.split(",").map((f) => f.trim()))
        );
      if (techStack)
        fd.append(
          "techStack",
          JSON.stringify(techStack.split(",").map((t) => t.trim()))
        );
      if (thumbnail) fd.append("thumbnail", thumbnail);

      await apiFetch(`/api/projects/${id}`, {
        method: "PUT",
        body: fd,
        isForm: true,
      });

      toast.success("✅ Project updated successfully!");
      router.push("/dashboard/projects");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="pt-24 text-center text-lg font-semibold text-gray-700">
        Loading project...
      </div>
    );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 pt-20 sm:pt-24 px-4 sm:px-6 pb-16 overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute -top-16 -left-12 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute top-20 right-10 w-44 h-44 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-spin-slow"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-bounce"></div>

      {/* Card */}
      <div className="relative z-10 max-w-2xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/30 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          ✨ Edit Project
        </h1>

        <form
          onSubmit={submit}
          className="space-y-4 sm:space-y-5"
          encType="multipart/form-data"
        >
          {preview && (
            <div className="relative w-full h-52 sm:h-60 mb-3">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-xl shadow-md"
                sizes="(max-width: 640px) 100vw, 640px"
                priority
              />
            </div>
          )}

          {/* Thumbnail */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Project Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter project description"
              className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base resize-none"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Live URL
              </label>
              <input
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://yourproject.live"
                className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Repository URL
              </label>
              <input
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/your-repo"
                className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Features (comma separated)
            </label>
            <input
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Authentication, Dashboard, Blog System"
              className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="Next.js, Express.js, Prisma, PostgreSQL"
              className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5">
            <button
              disabled={saving}
              type="submit"
              className="flex-1 px-5 py-2.5 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-sm sm:text-base"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-5 py-2.5 font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-100 shadow hover:-translate-y-1 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


