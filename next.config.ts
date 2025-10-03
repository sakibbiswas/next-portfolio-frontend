// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




//kaj kore just vercel diye blog a error ase 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost', '127.0.0.1'], // allow local API images
//   },
// };

// module.exports = nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "4000",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "4000",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "prisma-backend-portfolio.vercel.app",
//         pathname: "/uploads/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;









/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Local dev backend
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },
      // Production backend on Vercel
      {
        protocol: "https",
        hostname: "prisma-backend-portfolio.vercel.app",
        pathname: "/uploads/**",
      },
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
