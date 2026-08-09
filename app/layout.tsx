import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import Background from "./components/background/Background";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`relative flex flex-col min-h-screen antialiased nb  `}>
        <Background />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
