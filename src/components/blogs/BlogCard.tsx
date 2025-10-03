// import Link from "next/link";
// import { Blog } from "../../types/blog";
// import { joinUrl } from "../../lib/joinUrl";
// import { BASE_URL } from "../../lib/api";

// const BlogCard = ({ blog }: { blog: Blog }) => {
//   const excerpt =
//     blog.excerpt ||
//     (blog.content.length > 150
//       ? blog.content.slice(0, 150) + "..."
//       : blog.content);

//   const thumbnailUrl = blog.thumbnail
//     ? joinUrl(BASE_URL, blog.thumbnail)
//     : null;

//   return (
//     <article className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 rounded-2xl shadow-lg flex flex-col transform hover:-translate-y-1 hover:shadow-2xl transition-all overflow-hidden">
//       {/* Floating colorful shape accents */}
//       <div className="absolute -top-6 -left-6 w-20 h-20 bg-pink-300 rounded-full opacity-25 animate-bounce" />
//       <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-300 rounded-full opacity-25 animate-pulse" />

//       {/* Thumbnail */}
//       {thumbnailUrl && (
//         <img
//           src={thumbnailUrl}
//           alt={blog.title}
//           className="w-full h-56 object-cover rounded-xl mb-5 relative z-10 shadow-md"
//         />
//       )}

//       {/* Title */}
//       <h3 className="text-2xl font-bold text-purple-700 mb-2 relative z-10 line-clamp-2">
//         <Link
//           href={`/blogs/${blog.id}`}
//           className="hover:text-purple-900 transition-colors"
//         >
//           {blog.title}
//         </Link>
//       </h3>

//       {/* Excerpt */}
//       <p className="text-base text-gray-700 leading-relaxed relative z-10 line-clamp-3">
//         {excerpt}
//       </p>

//       {/* Published date */}
//       <div className="mt-3 text-sm text-gray-500 relative z-10">
//         📅 Published:{" "}
//         <span className="font-medium">
//           {new Date(blog.createdAt).toLocaleDateString()}
//         </span>
//       </div>

//       {/* Buttons */}
//       <div className="mt-auto pt-5 flex justify-end relative z-10">
//         <Link
//           href={`/blogs/${blog.id}`}
//           className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-transform"
//         >
//           View Details
//         </Link>
//       </div>
//     </article>
//   );
// };

// export default BlogCard;












import Link from "next/link";
import Image from "next/image";
import { Blog } from "../../types/blog";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const excerpt =
    blog.excerpt ||
    (blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content);

  // Only use valid URLs
  const thumbnailUrl = blog.thumbnail && blog.thumbnail.startsWith("http")
    ? blog.thumbnail
    : undefined;

  return (
    <article className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 rounded-2xl shadow-lg flex flex-col transform hover:-translate-y-1 hover:shadow-2xl transition-all overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-pink-300 rounded-full opacity-25 animate-bounce" />
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-300 rounded-full opacity-25 animate-pulse" />

      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="w-full h-56 relative mb-5 z-10 shadow-md rounded-xl overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <h3 className="text-2xl font-bold text-purple-700 mb-2 relative z-10 line-clamp-2">
        <Link href={`/blogs/${blog.id}`} className="hover:text-purple-900 transition-colors">
          {blog.title}
        </Link>
      </h3>

      <p className="text-base text-gray-700 leading-relaxed relative z-10 line-clamp-3">
        {excerpt}
      </p>

      <div className="mt-3 text-sm text-gray-500 relative z-10">
        📅 Published: <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-auto pt-5 flex justify-end relative z-10">
        <Link
          href={`/blogs/${blog.id}`}
          className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-transform"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
