// src/app/page.tsx
import About from "@/components/about/About";
import Banner from "@/components/banner/Banner";
import Contact from "@/components/contact/Contact";
import Education from "@/components/education/Education";
import Expertise from "@/components/expertise/Expertise";
import Hire from "@/components/hire/Hire";
import Skills from "@/components/skils/Skils";

import Link from "next/link";

export default function Home() {
  return (
<section>
  {/* Main Sections */}
  <Banner />
  <Education />
  <About />
  <Expertise />
  <Skills />
 



  {/* Full-width Projects Section */}
  <div className="w-full bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 py-20">
    <div className="max-w-7xl mx-auto text-center px-4">
      <h2
        className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 leading-snug"
        style={{ backgroundImage: "linear-gradient(90deg, #6ee7b7, #3b82f6)" }}
      >
        My Projects
      </h2>
      <p className="text-gray-900 text-base md:text-lg mb-6">
        Showcase My recent projects here. Highlight your skills and work
        experience through these examples.
      </p>
      <Link href="/projects">
        <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
          View All Projects
        </button>
      </Link>
    </div>
  </div>



  

{/* Full-width Latest Blog Section */}
      <div className="w-full bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 py-20">
        <div className="max-w-7xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent mb-4 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-500">
            Latest Blog
          </h2>
          <p className="text-gray-900 text-base md:text-lg mb-6">
            Highlight my latest posts here and link to the full blog list. Stay
            updated with the latest insights and articles.
          </p>
          <Link href="/blogs">
            <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              View All Blogs
            </button>
          </Link>
        </div>
      </div>
<Hire />
  <Contact />
</section>



  );
}
