
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, clearAuth } from "../../lib/auth";
import Image from "next/image";
import {
  HiHome,
  HiBookOpen,
  HiFolder,
  HiOutlineMenu,
  HiX,
  HiUserCircle,
  HiLogout,
} from "react-icons/hi";

const links = [
  { name: "Home", href: "/", icon: <HiHome className="w-5 h-5" /> },
  { name: "Projects", href: "/projects", icon: <HiFolder className="w-5 h-5" /> },
  { name: "Blogs", href: "/blogs", icon: <HiBookOpen className="w-5 h-5" /> },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUser());

    const handleUserChange = () => {
      setUser(getUser());
    };
    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="fixed w-full z-50 bg-white/40 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          MyPortfolio
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}

          {/* Auth buttons */}
          {mounted &&
            (user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === "/dashboard"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
                  }`}
                >
                  <HiUserCircle className="w-5 h-5" />
                  Dashboard
                </Link>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
                  <Image
                    src={user?.avatarUrl || "/sakib.jpg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 bg-white/40 hover:bg-red-100 hover:text-red-600 border border-gray-200 transition-all duration-300"
                >
                  <HiLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 ${
                  pathname === "/login" ? "ring-2 ring-purple-400" : ""
                }`}
              >
                Login
              </Link>
            ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX className="w-7 h-7" /> : <HiOutlineMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 shadow-lg flex flex-col items-center gap-4 py-6 border-b border-gray-200">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}

          {mounted &&
            (user ? (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === "/dashboard"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
                  }`}
                >
                  <HiUserCircle className="w-5 h-5" />
                  Dashboard
                </Link>

                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
                  <Image
                    src={user?.avatarUrl || "/sakib.jpg"}
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 bg-white/40 hover:bg-red-100 hover:text-red-600 border border-gray-200 transition-all duration-300"
                >
                  <HiLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
              >
                Login
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

