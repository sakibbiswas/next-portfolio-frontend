import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me - My Portfolio",
  description: "Learn more about me, my skills, and experience",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-2">Hi, I'm Sazzadur Rahman Sakib, a full-stack developer...</p>
      <p className="mb-2">Skills: Next.js, React, TypeScript, Node.js, Prisma, Tailwind CSS</p>
      <p>Experience: 3+ years in full-stack development, building scalable web apps.</p>
    </div>
  );
}
