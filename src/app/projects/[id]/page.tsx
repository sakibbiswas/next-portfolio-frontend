
// src/app/projects/[id]/page.tsx
import { Project } from "../../../types/project";
import { apiFetch, BASE_URL } from "../../../lib/api";
import Link from "next/link";
import Image from "next/image";

interface ProjectPageProps {
  params: { id: string };
}

export const revalidate = 60;

async function fetchProject(id: string): Promise<Project | null> {
  try {
    const data = await apiFetch(`/api/projects/${id}`);
    return data.project as Project;
  } catch {
    return null;
  }
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const project = await fetchProject(params.id);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600 font-semibold">Project not found.</p>
      </div>
    );
  }

  // ✅ Ensure the URL is absolute for Next.js Image component
  const thumbnailUrl = project.thumbnail
    ? project.thumbnail.startsWith("http")
      ? project.thumbnail
      : `${process.env.NEXT_PUBLIC_API_URL || BASE_URL}${project.thumbnail}`
    : undefined;

  return (
    <section className="relative min-h-screen pt-25 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-6 py-12 overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-blue-300 rounded-full opacity-30 animate-pulse" />

      <div className="relative max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col space-y-6 z-10 transform hover:-translate-y-1 hover:shadow-2xl transition-all">
        {/* Thumbnail */}
        {thumbnailUrl && (
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image
              src={thumbnailUrl}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}

        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          {project.title}
        </h1>

        <p className="text-gray-700">{project.description}</p>

        {project.features?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2 text-indigo-700">Features:</h2>
            <ul className="flex flex-wrap gap-2">
              {project.features.map((f, idx) => (
                <li
                  key={idx}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-400 text-purple-800 font-medium shadow-sm"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.techStack?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2 text-green-700">Tech Stack:</h2>
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((t, idx) => (
                <li
                  key={idx}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-medium shadow-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition-all"
            >
              View Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-red-500 shadow-md hover:scale-105 transition-all"
            >
              View Repo
            </a>
          )}
        </div>

        <Link
          href="/projects"
          className="self-start mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-all"
        >
          Back to Projects
        </Link>
      </div>
    </section>
  );
}
