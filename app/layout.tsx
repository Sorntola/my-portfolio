import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import { LanguageProvider } from "@/app/context/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";
import BinaryBackground from "@/components/BinaryBackground";
import "./globals.css";

const kantumruy = Kantumruy_Pro({
  subsets: ["latin", "khmer"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tola Portfolio",
  description: "Personal portfolio website of Tola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kh" suppressHydrationWarning>
      <body
        className={`${kantumruy.className} min-h-screen overflow-x-hidden bg-slate-950 text-white antialiased`}
      >
        <BinaryBackground />

        <LanguageProvider>
          <LoadingScreen />

          <main className="relative z-10 min-h-screen">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}