import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "A blog about Legal Tech and Software Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <NavBar />
      <body className={inter.className}>{children}</body>
      <footer className="flex justify-center items-center h-24 bg-gray-200"> 
        <p className="text-gray-600">© 2024 - My Blog</p>
      </footer>
    </html>
  );
}
