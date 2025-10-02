"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const skills = [
  { src: "/ts.jpg", name: "TypeScript" },
  { src: "/firebase.png", name: "Firebase" },
  { src: "/tailwind.png", name: "Tailwind CSS" },
  { src: "/bootstrap.png", name: "Bootstrap" },
  { src: "/css3.png", name: "CSS3" },
  { src: "/express.png", name: "Express.js" },
  { src: "/download.png", name: "Node.js" },
  { src: "/html5.png", name: "HTML5" },
  { src: "/mongodb.png", name: "MongoDB" },
  { src: "/vscode.png", name: "VSCode" },
  { src: "/reactquery.png", name: "TanStack Query" },
  { src: "/next.webp", name: "Next.js" },
  { src: "/psql.jpg", name: "PostgreSQL" },
  { src: "/netlify-logo.jpg", name: "Netlify" },
  { src: "/shadcn.png", name: "shadcn/ui" },
];

const Skills: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1200, easing: "ease-in-out" });
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-20 px-6"
    >
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-28 h-28 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          className="text-center mb-8 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 tracking-wide"
          data-aos="fade-down"
        >
          My Skills
        </h2>

        {/* Description */}
        <p
          className="text-center text-gray-800 max-w-4xl mx-auto mb-12 px-3 text-lg md:text-xl leading-relaxed"
          data-aos="fade-up"
        >
          I have hands-on experience with a wide range of technologies to build modern,
          scalable, and user-friendly applications. My expertise includes{" "}
          <span className="font-semibold text-gray-900">
            HTML, CSS, Bootstrap, Tailwind CSS, JavaScript (ES6+), React, Next.js, TypeScript,
            Redux, Firebase, Express.js, Node.js, MongoDB, PostgreSQL, JWT, Git, Netlify,
            Vercel, Google API, Figma, shadcn/ui, and TanStack Query
          </span>
          . I continuously learn and adapt new technologies to deliver high-quality and
          efficient solutions.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/20 backdrop-blur-xl p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer group"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>

                <Image
                  src={skill.src}
                  alt={`${skill.name} Logo`}
                  width={80}
                  height={80}
                  className="object-contain relative z-10"
                />
              </div>
              <span className="text-gray-900 font-semibold text-sm md:text-base text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
