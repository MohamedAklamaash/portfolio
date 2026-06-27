import Navbar from "@/components/navbar";
import ScrollObserver from "@/lib/scroll-observer";
import { TerminalProvider } from "@/lib/terminal/terminal-context";
import TerminalOverlay from "@/components/terminal/terminal-overlay";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import "prism-themes/themes/prism-night-owl.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Syne, JetBrains_Mono, Instrument_Sans, Outfit, Fraunces } from "next/font/google";
import Lenis from "lenis";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { SEO } from "../../next-seo.config";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Respect users who prefer reduced motion — skip smooth-scroll entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false} enableColorScheme={true}>
      <ScrollObserver>
        <TerminalProvider>
          <main className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable} ${outfit.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${instrumentSans.variable}`}>
            <DefaultSeo {...SEO} />
            <Navbar />
            <Component {...pageProps} />
            <TerminalOverlay />
            <Analytics />
          </main>
        </TerminalProvider>
      </ScrollObserver>
    </ThemeProvider>
  );
}
