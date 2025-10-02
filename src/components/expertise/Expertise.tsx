"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const expertiseData = [
  {
    logo: "/a1.png",
    title: "Web Development",
    description:
      "I am a full stack web developer (MERN) with extensive experience in building modern, responsive, and scalable web applications. I love coding and turning ideas into reality.",
  },
  {
    logo: "/a2.png",
    title: "UI/UX Design",
    description:
      "I have worked on UI/UX design, ensuring user-friendly interfaces. Share your idea, and I can help design an intuitive and engaging experience for your project.",
  },
  {
    logo: "/a3.png",
    title: "React Development",
    description:
      "React is my specialty. I can build complex, dynamic, and high-performing websites and applications using React and related modern libraries.",
  },
];

const Expertise: React.FC = () => {
  return (
    <section
      id="expertise"
      className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-20 px-6"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      {/* Heading */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 mb-3">
          Expertise Areas
        </h2>
        <p className="text-gray-800 text-lg md:text-xl max-w-2xl mx-auto">
          Some of my main expertise areas where I can add value to your project.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 md:gap-8 lg:gap-12 relative z-10">
        {expertiseData.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex-1 backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center
              hover:shadow-2xl hover:-translate-y-2 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-32 h-32 mb-5 relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 opacity-20 blur-xl transition duration-500"></div>
              
              <Image
                src={item.logo}
                alt={item.title}
                width={128}
                height={128}
                className="relative w-32 h-32 object-contain z-10 rounded-xl"
              />
            </div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-800 text-lg leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Expertise;
