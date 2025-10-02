// lib/validators.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name required").max(100).optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export const blogCreateSchema = z.object({
  title: z.string().min(3, "Title too short"),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1, "Content required"),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export const projectCreateSchema = z.object({
  title: z.string().min(3),
  shortDescription: z.string().min(10),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  techStack: z.array(z.string()).optional(),
});

export const resumeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  summary: z.string().optional(),
  experience: z.array(
    z.object({
      role: z.string().optional(),
      company: z.string().optional(),
      from: z.string().optional(),
      to: z.string().optional(),
      description: z.string().optional(),
    })
  ).optional(),
  education: z.array(
    z.object({
      degree: z.string().optional(),
      institution: z.string().optional(),
      from: z.string().optional(),
      to: z.string().optional(),
    })
  ).optional(),
  skills: z.array(z.string()).optional(),
});
