
import { Project } from "../../types/project";
import Image from "next/image";

const ProjectCard = ({ project }: { project: Project }) => {
  const thumbnailUrl = project.thumbnail
    ? project.thumbnail.startsWith("http")
      ? project.thumbnail
      : `${process.env.NEXT_PUBLIC_API_URL}${project.thumbnail}`
    : null;

  return (
    <article
      className="relative bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl 
      transition-all duration-300 overflow-hidden flex flex-col w-full max-w-sm h-[450px]"
    >
      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="relative w-full h-48">
          <Image
            src={thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5 text-xs">
            {project.features.slice(0, 3).map((f, idx) => (
              <li
                key={idx}
                className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 
                text-indigo-700 font-medium"
              >
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
            {project.techStack.slice(0, 4).map((t, idx) => (
              <li
                key={idx}
                className="px-2.5 py-1 rounded-full bg-gradient-to-r from-green-100 to-green-200 
                text-green-800 font-medium"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="mt-auto pt-4 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold 
              text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 
              transition-transform duration-200"
            >
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold 
              text-white bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 
              transition-transform duration-200"
            >
              Repo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
