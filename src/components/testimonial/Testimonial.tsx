"use client";
import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Client {
  img: string;
  name: string;
  country: string;
  review: string;
}

const clients: Client[] = [
  {
    img: "/images (1).jfif",
    name: "Revga Wright",
    country: "United States",
    review:
      "Working with Sazzadur Rahman Sakib was an absolute pleasure. Professional, timely, and high-quality work.",
  },
  {
    img: "/images.jfif",
    name: "Chudyi Lozue",
    country: "United States",
    review:
      "Sakib’s communication and attention to detail are exceptional. Highly recommended for any project.",
  },
  {
    img: "/young-bearded-man-with-striped-shirt_273609-5677.avif",
    name: "Anna Smith",
    country: "United Kingdom",
    review:
      "Outstanding experience! Sakib delivered beyond expectations and maintained great collaboration throughout.",
  },
];

const Testimonial: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <section
      id="testimonial"
      className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-24 px-4"
    >
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 mb-4">
          Testimonials
        </h2>
        <p className="text-gray-800 text-lg md:text-xl mb-12">
          Hear what my clients have to say about my work and professionalism
        </p>

        <Slider {...settings} className="relative">
          {clients.map((client, idx) => (
            <div key={idx} className="px-2 sm:px-3">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[300px] sm:min-h-[320px]">
                <div className="mb-6">
                  <div className="text-pink-500 text-2xl sm:text-3xl mb-3 sm:mb-4">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-gray-900 text-sm sm:text-base">{client.review}</p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <Image
                    src={client.img}
                    alt={client.name}
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-pink-500 shadow-md"
                  />
                  <div className="text-left">
                    <h3 className="text-sm sm:text-lg  font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{client.country}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
