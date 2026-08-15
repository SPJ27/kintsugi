import "./globals.css";
import Background from "./components/background/Background";
import { Toaster } from "sonner";

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
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
