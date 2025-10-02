"use client";

import React, { useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import "aos/dist/aos.css";
import AOS from "aos";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const sendingToast = toast.loading("Sending message...");

    emailjs
      .sendForm(
        "service_ykqjfoy",
        "template_hcrpgi7",
        formRef.current,
        "h1NvnufJ-KM-DrLRN"
      )
      .then(
        () => {
          toast.dismiss(sendingToast);
          toast.success("Message sent successfully! ✅", { duration: 4000 });
          formRef.current?.reset();
        },
        (error) => {
          toast.dismiss(sendingToast);
          console.error(error);
          toast.error("Failed to send message. ❌ Please try again.", {
            duration: 4000,
          });
        }
      );
  };

  const inputFields = [
    { name: "name", label: "Your Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
  ];

  const contactInfos = [
    { Icon: Phone, title: "Phone / WhatsApp", text: "+8801631479509" },
    { Icon: Mail, title: "Email", text: "sakibsakib99880@gmail.com" },
    { Icon: MapPin, title: "Location", text: "Netrakona, Dhaka" },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-24 px-6"
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-spin-slow"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 mb-3">
            Let’s Work Together
          </h2>
          <p
            className="text-gray-800 text-lg md:text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            Drop a line and I’ll get back to you as soon as possible. Let’s
            create something amazing together.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Illustration */}
          <div
            data-aos="zoom-in"
            data-aos-delay={100}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src="/contact.png"
              alt="Contact Illustration"
              width={500}
              height={450}
              className="w-full max-h-[450px] object-contain rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:rotate-1"
            />
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-6 border border-white/10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
            data-aos="fade-left"
            data-aos-delay={200}
          >
            {inputFields.map((field, idx) => (
              <div
                key={idx}
                className="flex flex-col space-y-2"
                data-aos="fade-up"
                data-aos-delay={300 + idx * 100}
              >
                <label className="text-gray-800 text-sm">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.label}
                  className="w-full bg-white/30 text-gray-900 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 focus:ring-offset-yellow-200 transition duration-300 placeholder-gray-500"
                />
              </div>
            ))}

            {/* Message */}
            <div
              className="flex flex-col space-y-2"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <label className="text-gray-800 text-sm">Project Description</label>
              <textarea
                name="message"
                placeholder="Write your project details..."
                className="w-full h-32 bg-white/30 text-gray-900 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 focus:ring-offset-yellow-200 transition duration-300 placeholder-gray-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 text-white font-semibold rounded-xl shadow-lg py-3 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              data-aos="zoom-in"
              data-aos-delay={600}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-20 grid sm:grid-cols-3 gap-8 text-center relative z-10">
          {contactInfos.map((info, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={200 + idx * 150}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-pink-500/20 rounded-full mb-3 transition-all duration-500 hover:bg-pink-500/40">
                <info.Icon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">{info.title}</h3>
              <p className="text-gray-700 text-sm mt-1">{info.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
