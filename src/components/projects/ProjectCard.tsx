import { Project } from "../../types/project";

const ProjectCard = ({ project }: { project: Project }) => {
  const thumbnailUrl = project.thumbnail
    ? project.thumbnail.startsWith("http")
      ? project.thumbnail
      : `${process.env.NEXT_PUBLIC_API_URL}${project.thumbnail}`
    : null;

  return (
    <article className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-5 rounded-2xl shadow-lg flex flex-col transform hover:-translate-y-1 hover:shadow-2xl transition-all overflow-hidden">
      {/* Floating colorful shape accents */}
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-300 rounded-full opacity-30 animate-pulse" />

      {/* Thumbnail */}
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={project.title}
          className="w-full h-48 object-cover rounded-xl mb-4 relative z-10"
        />
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-indigo-700 relative z-10">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-2 relative z-10">
        {project.description}
      </p>

      {/* Features badges */}
      {project.features && project.features.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2 text-xs relative z-10">
          {project.features.map((f, idx) => (
            <li
              key={idx}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-400 text-purple-800 font-medium shadow-sm"
            >
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Tech Stack badges */}
      {project.techStack && project.techStack.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2 text-xs relative z-10">
          {project.techStack.map((t, idx) => (
            <li
              key={idx}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-medium shadow-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* Links */}
      <div className="mt-auto pt-4 flex gap-3 relative z-10">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition-all"
          >
            Live
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-md hover:scale-105 transition-all"
          >
            Repo
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
