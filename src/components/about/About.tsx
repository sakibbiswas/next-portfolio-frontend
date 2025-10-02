"use client";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-20 px-6"
    >
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="max-w-7xl mx-auto md:grid grid-cols-2 items-center gap-16 relative z-10">
        {/* Profile Picture */}
        <div className="flex justify-center mb-12 md:mb-0 relative">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-red-500 blur-2xl opacity-40 group-hover:opacity-70 transition duration-500"></div>
            
            <Image
              src="/pic2.jpg"
              alt="Sazzadur Rahman Sakib"
              width={420}
              height={420}
              className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border-4 border-pink-400 shadow-xl shadow-pink-300/40 object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* About Content */}
        <div className="backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/10 hover:-translate-y-2 hover:shadow-2xl hover:border-pink-400/30 transition-transform duration-500">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-lg text-gray-800 leading-relaxed text-justify [text-wrap:balance]">
            Hello, I am{" "}
            <span className="font-bold text-purple-800">Sazzadur Rahman Sakib</span>, a{" "}
            <span className="font-bold text-pink-600">Full Stack Web Developer</span> with
            expertise in building{" "}
            <span className="text-red-500 font-semibold">modern, responsive, and scalable</span>{" "}
            web applications. <br /> <br />
            My technical skills include{" "}
            <span className="text-gray-700">
              HTML, CSS, Bootstrap, Tailwind CSS, JavaScript (ES6+), React, Next.js,
              TypeScript, Redux, Firebase, Express.js, Node.js, MongoDB, PostgreSQL, JWT,
              Git, Netlify, Vercel, Google API, Figma, shadcn/ui, TanStack Query
            </span>
            . <br /> <br />
            I am passionate about creating{" "}
            <span className="text-pink-500 font-semibold">efficient, user-friendly solutions</span>{" "}
            and continuously learning new technologies to deliver{" "}
            <span className="text-purple-500 font-semibold">high-quality applications</span>.
            <br /> <br />
            Thank you for taking the time to read this. I look forward to connecting with
            you if you have any exciting opportunities.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300"
            >
              ✉️ Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
