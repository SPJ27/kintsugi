import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import NoteBookLines from "./components/background/NotebookLines";
import Background from "./components/background/Background";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`relative flex flex-col min-h-screen antialiased nb  `}

      >
        <Background />
              <Navbar />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
