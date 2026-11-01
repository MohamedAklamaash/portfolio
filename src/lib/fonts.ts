import localFont from "next/font/local";

/**
 * Geist (SIL OFL 1.1, see src/fonts/Geist-OFL.txt), subset to Latin plus the
 * few symbols the site uses. 23 KB instead of 58 KB for the full variable font.
 * Regenerate with:
 *   pyftsubset node_modules/geist/dist/fonts/geist-sans/Geist-Variable.ttf \
 *     --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+20B9,U+2122,U+2190-2193,U+2212,U+2215,U+2248,U+2260,U+2264,U+2265,U+03BA" \
 *     --layout-features='kern,liga,calt,ss01,cv11,tnum' --flavor=woff2 \
 *     --output-file=src/fonts/Geist-Variable-latin.woff2
 */
export const geist = localFont({
  src: "../fonts/Geist-Variable-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});
