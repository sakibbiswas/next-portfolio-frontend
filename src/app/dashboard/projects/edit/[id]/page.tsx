"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch, BASE_URL } from "../../../../../lib/api";

export default function ProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params as any)?.id;

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
        const p = res.project;
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
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      if (liveUrl) fd.append("liveUrl", liveUrl);
      if (repoUrl) fd.append("repoUrl", repoUrl);
      if (features)
        fd.append("features", JSON.stringify(features.split(",").map((f) => f.trim())));
      if (techStack)
        fd.append("techStack", JSON.stringify(techStack.split(",").map((t) => t.trim())));
      if (thumbnail) fd.append("thumbnail", thumbnail);

      await apiFetch(`/api/projects/${id}`, {
        method: "PUT",
        body: fd,
        isForm: true,
      });

      toast.success("Project updated");
      router.push("/dashboard/projects");
    } catch (err: any) {
      toast.error(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading project...</div>;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 pt-24 px-4 sm:px-6 pb-12 overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute top-20 right-6 sm:right-10 w-40 h-40 sm:w-60 sm:h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-spin-slow"></div>
      <div className="absolute bottom-10 left-10 sm:left-20 w-36 h-36 sm:w-44 sm:h-44 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-bounce"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          ✨ Edit Project
        </h1>

        <form onSubmit={submit} className="space-y-4 sm:space-y-5" encType="multipart/form-data">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 sm:h-64 object-cover rounded-lg shadow mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title *"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Project Description *"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="Live URL"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Repository URL"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <input
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Features (comma separated)"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Tech Stack (comma separated)"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              disabled={saving}
              type="submit"
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2 font-semibold rounded-lg text-white text-sm sm:text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2 font-semibold rounded-lg border border-gray-300 bg-white text-sm sm:text-base hover:bg-gray-100 shadow hover:-translate-y-1 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
