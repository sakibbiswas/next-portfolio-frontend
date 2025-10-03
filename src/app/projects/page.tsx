
// // app/projects/page.tsx
// import Link from "next/link";
// import { Project } from "../../types/project";
// import { apiFetch, BASE_URL } from "../../lib/api";

// export const revalidate = 60; // ISR: revalidate every 60s

// async function fetchProjects(): Promise<Project[]> {
//   const data = await apiFetch("/api/projects");
//   return data.projects as Project[];
// }

// export default async function ProjectsPage() {
//   const projects = await fetchProjects();

//   return (
//     <section className="relative pt-25 min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-6 py-12 overflow-hidden">
//       {/* Floating shapes */}
//       <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-bounce" />
//       <div className="absolute bottom-20 right-20 w-36 h-36 bg-blue-300 rounded-full opacity-30 animate-pulse" />

//       <div className="relative max-w-6xl mx-auto space-y-8 z-10">
//         <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-md">
//           Projects
//         </h1>

//         {projects.length === 0 && (
//           <div className="bg-white/70 p-6 rounded-2xl shadow text-center text-gray-600">
//             No projects found
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((p) => {
//             const thumbnailUrl = p.thumbnail
//               ? p.thumbnail.startsWith("http")
//                 ? p.thumbnail
//                 : `${BASE_URL}${p.thumbnail}`
//               : null;

//             return (
//               <article
//                 key={p.id}
//                 className="relative bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 p-5 rounded-2xl shadow-lg flex flex-col transform hover:-translate-y-1 hover:shadow-2xl transition-all overflow-hidden"
//               >
//                 {/* Floating accents */}
//                 <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-300 rounded-full opacity-30 animate-bounce" />
//                 <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-300 rounded-full opacity-30 animate-pulse" />

//                 {/* Thumbnail */}
//                 {thumbnailUrl && (
//                   <img
//                     src={thumbnailUrl}
//                     alt={p.title}
//                     className="w-full h-48 object-cover rounded-xl mb-4 relative z-10"
//                   />
//                 )}

//                 {/* Title */}
//                 <h3 className="text-xl font-bold text-indigo-700 relative z-10">
//                   {p.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-sm text-gray-700 mt-2 relative z-10 line-clamp-3">
//                   {p.description}
//                 </p>

//                 {/* Features badges */}
//                 {p.features && p.features.length > 0 && (
//                   <ul className="mt-3 flex flex-wrap gap-2 text-xs relative z-10">
//                     {p.features.map((f, idx) => (
//                       <li
//                         key={idx}
//                         className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-400 text-purple-800 font-medium shadow-sm"
//                       >
//                         {f}
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {/* Tech Stack badges */}
//                 {p.techStack && p.techStack.length > 0 && (
//                   <ul className="mt-3 flex flex-wrap gap-2 text-xs relative z-10">
//                     {p.techStack.map((t, idx) => (
//                       <li
//                         key={idx}
//                         className="px-3 py-1 rounded-full bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-medium shadow-sm"
//                       >
//                         {t}
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {/* Buttons */}
//                 <div className="mt-auto pt-4 flex justify-between items-center relative z-10">
//                   <div className="flex gap-3">
//                     {p.liveUrl && (
//                       <a
//                         href={p.liveUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition-all"
//                       >
//                         Live
//                       </a>
//                     )}
//                     {p.repoUrl && (
//                       <a
//                         href={p.repoUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-md hover:scale-105 transition-all"
//                       >
//                         Repo
//                       </a>
//                     )}
//                   </div>

//                   <Link
//                     href={`/projects/${p.id}`}
//                     className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-all"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
























"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../../types/project";
import { apiFetch, BASE_URL } from "../../lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch("/api/projects");
        setProjects(data.projects as Project[]);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="relative pt-25 min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-6 py-12 overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-blue-300 rounded-full opacity-30 animate-pulse" />

      <div className="relative max-w-6xl mx-auto space-y-8 z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-md">
          Projects
        </h1>

        {projects.length === 0 && (
          <div className="bg-white/70 p-6 rounded-2xl shadow text-center text-gray-600">
            No projects found
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const thumbnailUrl = p.thumbnail
              ? p.thumbnail.startsWith("http")
                ? p.thumbnail
                : `${BASE_URL}${p.thumbnail}`
              : undefined;

            return (
              <article
                key={p.id}
                className="relative bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 p-5 rounded-2xl shadow-lg flex flex-col transform hover:-translate-y-1 hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Thumbnail */}
                {thumbnailUrl && (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 z-10 shadow-md">
                    <Image
                      src={thumbnailUrl}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                )}

                <h3 className="text-xl font-bold text-indigo-700 relative z-10">{p.title}</h3>
                <p className="text-sm text-gray-700 mt-2 relative z-10 line-clamp-3">{p.description}</p>

                {p.features?.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs relative z-10">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-400 text-purple-800 font-medium shadow-sm">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {p.techStack?.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs relative z-10">
                    {p.techStack.map((t, idx) => (
                      <li key={idx} className="px-3 py-1 rounded-full bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-medium shadow-sm">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-4 flex justify-between items-center relative z-10">
                  <div className="flex gap-3">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition-all">
                        Live
                      </a>
                    )}
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-md hover:scale-105 transition-all">
                        Repo
                      </a>
                    )}
                  </div>

                  <Link href={`/projects/${p.id}`} className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-all">
                    View Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
