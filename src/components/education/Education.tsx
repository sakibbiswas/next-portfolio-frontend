"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Education: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1200, easing: "ease-in-out" });
  }, []);

  const educationData = [
    {
      title: "Bachelor’s in CSE",
      institution: "Uttara University",
      department: "Computer Science & Engineering",
      duration: "2021 - Present",
    },
    {
      title: "HSC (Science)",
      institution: "Netrakona Govt College",
      year: "2018",
      gpa: "4.75",
    },
  ];

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-24 px-6"
    >
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <h2 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent">
          Education
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Gradient Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full -translate-x-1/2 bg-gradient-to-b from-pink-500 via-yellow-400 to-purple-500 opacity-30 rounded"></div>

          {/* Timeline Items */}
          {educationData.map((edu, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative mb-20 md:flex md:justify-between md:items-center ${
                  !isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Card Content */}
                <div
                  data-aos={isLeft ? "fade-right" : "fade-left"}
                  className={`backdrop-blur-xl bg-white/20 p-10 rounded-3xl shadow-2xl border border-white/10
                    transform transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-pink-400/30
                    md:w-1/2 ${!isLeft ? "md:text-left md:pl-8" : "md:text-right md:pr-8"}`}
                >
                  <h3 className="text-3xl font-bold text-pink-500 mb-4">
                    {edu.title}
                  </h3>
                  <p className="text-gray-800 mb-2">
                    <span className="font-semibold text-purple-700">Institution:</span>{" "}
                    {edu.institution}
                  </p>
                  {edu.department && (
                    <p className="text-gray-800 mb-2">
                      <span className="font-semibold text-purple-700">Department:</span>{" "}
                      {edu.department}
                    </p>
                  )}
                  {edu.duration && (
                    <p className="text-gray-800 mb-2">
                      <span className="font-semibold text-purple-700">Duration:</span>{" "}
                      {edu.duration}
                    </p>
                  )}
                  {edu.year && (
                    <p className="text-gray-800 mb-2">
                      <span className="font-semibold text-purple-700">Year:</span> {edu.year}
                    </p>
                  )}
                  {edu.gpa && (
                    <p className="text-gray-800">
                      <span className="font-semibold text-purple-700">GPA:</span> {edu.gpa}
                    </p>
                  )}
                </div>

                {/* Timeline Dot */}
                <div className="flex justify-center items-center md:w-1/2 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow-lg animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
