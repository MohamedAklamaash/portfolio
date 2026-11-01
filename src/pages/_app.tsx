import Footer from "@/components/footer";
import Header from "@/components/header";
import { geist } from "@/lib/fonts";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${geist.variable} flex min-h-screen flex-col font-sans`}>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-fg px-3 py-2 text-[14px] font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <Header profile={pageProps.profile} />
        <main id="main" className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      {/* Set NEXT_PUBLIC_DISABLE_ANALYTICS=1 for local production builds (e.g. Lighthouse runs). */}
      {process.env.NEXT_PUBLIC_DISABLE_ANALYTICS !== "1" && <Analytics />}
    </>
  );
}
