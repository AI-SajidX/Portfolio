import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata = {
  title: "SajidX | Ahmed Ibrahim Sajid — Developer Portfolio",
  description:
    "Portfolio of Ahmed Ibrahim Sajid (SajidX), a Computer Science & Engineering undergraduate at IIUC and aspiring Full-Stack Developer building modern web experiences.",
  keywords: [
    "Ahmed Ibrahim Sajid",
    "SajidX",
    "Developer Portfolio",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "IIUC",
    "CSE Undergraduate",
  ],
  authors: [{ name: "Ahmed Ibrahim Sajid", url: "https://github.com/AI-SajidX" }],
  creator: "Ahmed Ibrahim Sajid",
  openGraph: {
    title: "SajidX | Ahmed Ibrahim Sajid — Developer Portfolio",
    description:
      "CSE Undergraduate at IIUC & Aspiring Full-Stack Developer crafting modern, responsive, and user-friendly web applications.",
    type: "website",
    locale: "en_US",
    siteName: "SajidX Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "SajidX | Ahmed Ibrahim Sajid — Developer Portfolio",
    description:
      "CSE Undergraduate at IIUC & Aspiring Full-Stack Developer crafting modern web experiences.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#080B12] text-slate-50 antialiased selection:bg-[#3264FF]/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
