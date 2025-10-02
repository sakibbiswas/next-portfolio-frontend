export type Blog = {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  thumbnail?: string;
  authorId: string;
  author?: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
  published: boolean; // ✅ add this
};
