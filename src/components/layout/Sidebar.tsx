"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX, HiHome, HiDocumentText, HiFolder } from "react-icons/hi";

const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <HiHome size={20} /> },
    { href: "/dashboard/blogs", label: "Blogs", icon: <HiDocumentText size={20} /> },
    { href: "/dashboard/projects", label: "Projects", icon: <HiFolder size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-indigo-600 text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-100 p-6 z-40
          w-64 md:w-60
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="font-bold pt-25 text-xl mb-6">Owner Panel</h2>
        <ul className="space-y-2">
          {links.map((l) => {
            const isActive = mounted && pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded ${
                    isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setIsOpen(false)} // Close sidebar on mobile click
                >
                  {l.icon}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
