import "../styles/globals.css";
import { ReactNode } from "react";
import Providers from "../components/Providers";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "Personal Portfolio Website",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
