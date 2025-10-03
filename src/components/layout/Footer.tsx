// src/components/footer/Footer.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const Footer: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const sendingToast = toast.loading("Subscribing...");

    emailjs
      .sendForm(
        "service_ykqjfoy", // Replace with your EmailJS Service ID
        "template_hcrpgi7", // Replace with your EmailJS Template ID
        formRef.current,
        "h1NvnufJ-KM-DrLRN" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          toast.dismiss(sendingToast);
          toast.success("Subscribed successfully! ✅", { duration: 4000 });
          formRef.current?.reset();
        },
        (error) => {
          toast.dismiss(sendingToast);
          console.error(error);
          toast.error("Failed to subscribe. ❌ Please try again.", {
            duration: 4000,
          });
        }
      );
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Decorative Gradient Blurs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section: Social + Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-6">
            {[
              { href: "https://github.com/sakibbiswas", icon: <FaGithub />, label: "GitHub" },
              { href: "https://www.facebook.com/profile.php?id=100089945906008", icon: <FaFacebook />, label: "Facebook" },
              { href: "https://www.linkedin.com/in/sazzadur-rahman-sakib-3ab995280/", icon: <FaLinkedin />, label: "LinkedIn" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-3 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <div className="w-6 h-6">{item.icon}</div>
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm md:text-base">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "/projects", label: "Projects" },
              { href: "/blogs", label: "Blogs" },
            
              { href: "#contact", label: "Contact" },
              
            ].map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-pink-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex justify-center md:justify-end">
            <form
              ref={formRef}
              onSubmit={handleSubscribe}
              className="flex w-full max-w-sm bg-white/5 rounded-full overflow-hidden border border-white/10"
            >
              <input
                type="email"
                name="email"
                placeholder="Subscribe with email"
                className="flex-1 px-4 py-2 bg-transparent text-sm text-gray-300 placeholder-gray-400 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium hover:from-pink-600 hover:to-red-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Copyright */}
          <p className="text-gray-400 text-sm md:text-base">
            © {new Date().getFullYear()} - All rights reserved by{" "}
            <span className="font-semibold text-white">Sazzadur Rahman Sakib</span>
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-gray-400 text-sm">
            <a href="mailto:sakibsakib99880@gmail.com" className="hover:text-pink-400 transition-colors">
              📧 sakibsakib99880@gmail.com
            </a>
            <span>📍 Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-6 text-center text-gray-500 text-xs md:text-sm">
          Designed & Developed with ❤️ by <span className="text-pink-400">Sazzadur Rahman Sakib</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
