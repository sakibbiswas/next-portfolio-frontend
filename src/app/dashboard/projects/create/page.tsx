"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "../../../../lib/api";

export default function ProjectCreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [features, setFeatures] = useState("");
  const [techStack, setTechStack] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description required");
      return;
    }
    setLoading(true);
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

      await apiFetch("/api/projects", { method: "POST", body: fd, isForm: true });

      toast.success("Project created");
      router.push("/dashboard/projects");
    } catch (err: any) {
      toast.error(err?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 pt-20 sm:pt-24 px-3 sm:px-6 pb-12 overflow-hidden">
      {/* Floating colorful blobs */}
      <div className="absolute -top-10 -left-10 w-28 h-28 sm:w-40 sm:h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute top-20 right-6 sm:right-10 w-40 h-40 sm:w-56 sm:h-56 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-spin-slow"></div>
      <div className="absolute bottom-10 left-8 sm:left-20 w-36 h-36 sm:w-48 sm:h-48 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-bounce"></div>

      {/* Form card */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-5 sm:p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          🚀 Create New Project
        </h1>

        <form
          onSubmit={submit}
          className="space-y-4 sm:space-y-5"
          encType="multipart/form-data"
        >
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 sm:h-60 object-cover rounded-lg shadow mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Project Description"
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="Live URL"
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Repository URL"
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <input
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Features (comma separated)"
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Tech Stack (comma separated)"
            className="w-full p-2.5 sm:p-3 border rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              disabled={loading}
              type="submit"
              className="flex-1 px-5 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-sm sm:text-base"
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-5 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-100 shadow hover:-translate-y-1 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
