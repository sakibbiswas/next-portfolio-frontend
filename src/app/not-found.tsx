
// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Page not found.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
