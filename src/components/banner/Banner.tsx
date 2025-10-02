"use client";

import Image from "next/image";
import { FaDownload, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="max-w-7xl mx-auto md:flex justify-between items-center gap-10 px-6 py-16 md:py-24 relative z-10">
        {/* Left Content */}
        <div className="space-y-6 md:w-1/2">
          {/* Small Heading */}
          <h2 className="text-lg font-semibold tracking-wide text-purple-700">
            <span className="text-pink-500">--</span> Hello
          </h2>

          {/* Typing Animation */}
          <TypeAnimation
            sequence={[
              "I am",
              800,
              "Sazzadur Rahman",
              1200,
              "Sazzadur Rahman Sakib",
              1500,
              "Full Stack Developer",
              1500,
              "UI/UX Designer",
              1500,
              "",
              500,
            ]}
            speed={40}
            repeat={Infinity}
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent"
          />

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl text-justify [text-wrap:balance]">
            This is <span className="font-bold text-purple-800">Sazzadur Rahman Sakib</span>, a passionate{" "}
            <span className="font-bold text-pink-700">Full Stack Developer (MERN)</span> and{" "}
            <span className="font-bold text-yellow-800">UI/UX Designer</span> from Bangladesh.  
            I build scalable, user-friendly web applications blending{" "}
            <span className="text-pink-400 font-semibold">clean code</span> with{" "}
            <span className="text-purple-500 font-semibold">intuitive design</span>. Always eager to collaborate and deliver innovative solutions.
          </p>

          {/* Download Resume Button */}
          <a
            href="/Sazzadur Rahman Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-6 flex items-center gap-3 px-7 py-3 rounded-xl text-lg font-semibold 
              bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 
              shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300">
              <FaDownload className="w-5 h-5 text-white" />
              <span>Download Resume</span>
            </button>
          </a>

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            <a
              href="https://github.com/sakibbiswas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 text-gray-800 hover:text-pink-500"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100089945906008"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 text-blue-700 hover:text-blue-500"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/sazzadur-rahman-sakib-3ab995280/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 text-blue-800 hover:text-blue-400"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            src="/pic (1).jpg"
            alt="Sazzadur Rahman Sakib"
            width={420}
            height={420}
            className="rounded-full border-4 border-pink-400 shadow-xl shadow-pink-300/40 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
