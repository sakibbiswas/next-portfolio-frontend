// import { notFound } from "next/navigation";
// import { Blog } from "../../../types/blog";
// import { BASE_URL } from "../../../lib/api";
// import { joinUrl } from "../../../lib/joinUrl";
// import Link from "next/link";

// interface BlogPageProps {
//   params: { id: string };
// }

// export const revalidate = 60; // ISR

// async function fetchBlog(id: string): Promise<Blog | null> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) return null;

//   const data = await res.json();
//   return data.blog as Blog;
// }

// export default async function BlogDetailsPage({ params }: BlogPageProps) {
//   const blog = await fetchBlog(params.id);

//   if (!blog) {
//     notFound();
//   }

//   const thumbnailUrl = blog.thumbnail ? joinUrl(BASE_URL, blog.thumbnail) : null;

//   return (
//     <section className="relative pt-25 min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 px-6 py-12 overflow-hidden">
//       {/* Floating background shapes */}
//       <div className="absolute top-16 left-10 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-bounce" />
//       <div className="absolute bottom-24 right-20 w-48 h-48 bg-purple-300 rounded-full opacity-30 animate-pulse" />
//       <div className="absolute top-1/2 -left-20 w-60 h-60 bg-yellow-200 rounded-full opacity-20 animate-spin-slow" />

//       <div className="relative max-w-4xl mx-auto z-10">
//         {/* Back Button */}
//         <div className="mb-8">
//           <Link
//             href="/blogs"
//             className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md hover:scale-105 transition-transform"
//           >
//             ← Back to Blogs
//           </Link>
//         </div>

//         {/* Blog Card */}
//         <article className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all">
//           {thumbnailUrl && (
//             <img
//               src={thumbnailUrl}
//               alt={blog.title}
//               className="w-full h-96 object-cover"
//             />
//           )}

//           <div className="p-10 flex flex-col gap-6 relative">
//             {/* Floating accents */}
//             <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-300 rounded-full opacity-25 animate-pulse" />
//             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300 rounded-full opacity-25 animate-bounce" />

//             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-sm">
//               {blog.title}
//             </h1>

//             <div className="flex items-center text-gray-600 text-sm gap-2">
//               <span>📅 Published on</span>
//               <time dateTime={blog.createdAt} className="font-medium text-indigo-600">
//                 {new Date(blog.createdAt).toLocaleDateString(undefined, {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </time>
//             </div>

//             {/* Blog Content */}
//             <div className="prose prose-lg prose-pink max-w-full mt-4 text-gray-800">
//               <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//             </div>
//           </div>
//         </article>
//       </div>
//     </section>
//   );
// }














import { notFound } from "next/navigation";
import { Blog } from "../../../types/blog";
import { BASE_URL } from "../../../lib/api";
import { joinUrl } from "../../../lib/joinUrl";
import Link from "next/link";
import Image from "next/image";

interface BlogPageProps {
  params: { id: string };
}

export const revalidate = 60; // ISR

async function fetchBlog(id: string): Promise<Blog | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.blog as Blog;
}

export default async function BlogDetailsPage({ params }: BlogPageProps) {
  const blog = await fetchBlog(params.id);

  if (!blog) {
    notFound();
  }

  const thumbnailUrl = blog.thumbnail ? joinUrl(BASE_URL, blog.thumbnail) : null;

  return (
    <section className="relative pt-25 min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 px-6 py-12 overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute top-16 left-10 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute bottom-24 right-20 w-48 h-48 bg-purple-300 rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-yellow-200 rounded-full opacity-20 animate-spin-slow" />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md hover:scale-105 transition-transform"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* Blog Card */}
        <article className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all">
          {thumbnailUrl && (
            <div className="relative w-full h-96">
              <Image
                src={thumbnailUrl}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-10 flex flex-col gap-6 relative">
            {/* Floating accents */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-300 rounded-full opacity-25 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300 rounded-full opacity-25 animate-bounce" />

            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-sm">
              {blog.title}
            </h1>

            <div className="flex items-center text-gray-600 text-sm gap-2">
              <span>📅 Published on</span>
              <time dateTime={blog.createdAt} className="font-medium text-indigo-600">
                {new Date(blog.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg prose-pink max-w-full mt-4 text-gray-800">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
