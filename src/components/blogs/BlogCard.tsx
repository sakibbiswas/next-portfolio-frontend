
import Link from "next/link";
import Image from "next/image";
import { Blog } from "../../types/blog";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const excerpt =
    blog.excerpt ||
    (blog.content.length > 150
      ? blog.content.slice(0, 150) + "..."
      : blog.content);

  // Thumbnail URL check
  const thumbnailUrl =
    blog.thumbnail && blog.thumbnail.startsWith("http")
      ? blog.thumbnail
      : undefined;

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
            alt={blog.title}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          <Link
            href={`/blogs/${blog.id}`}
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Publish date */}
        <div className="mt-3 text-xs text-gray-500">
          📅{" "}
          <span className="font-medium">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Button */}
        <div className="mt-auto pt-4 flex justify-end">
          <Link
            href={`/blogs/${blog.id}`}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white 
            bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 
            transition-transform duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
