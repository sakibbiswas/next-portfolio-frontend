export type Project = {
  id: string;
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  ownerId: string;
 techStack: string[];
  features: string[]; // <-- change string to string[]
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};
