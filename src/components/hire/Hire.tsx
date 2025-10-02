"use client"; // for client-side interactivity
import React from "react";

const Hire: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-24 px-4">
      {/* Floating shapes for energy */}
      <div className="absolute top-5 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-16 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-lg md:text-xl font-medium text-pink-500 animate-pulse">
          Have an exciting project in mind?
        </h3>
        <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 leading-snug">
          Let&apos;s Bring Your Ideas to Life!
        </h1>
        <p className="text-gray-900 text-sm md:text-base max-w-2xl mx-auto">
          I&apos;m always open to collaboration. Whether it&apos;s a small project or a
          large-scale solution, let&apos;s work together to make it a success. Reach
          out and let&apos;s create something amazing.
        </p>
        <div className="mt-6">
          <a href="#contact">
            <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              Hire Me
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hire;
