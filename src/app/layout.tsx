import type { Metadata, Viewport } from "next";
import { ViewTransition, type ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainMotion } from "@/components/motion/MainMotion";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const defaultTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
  // Google Search Console ownership: rendered as <meta name="google-site-verification"> in every page's <head>.
  verification: { google: "akop3DfBKfiyyxHZbUpmptj8KOx9JfnljrZpqdMatR0" },
  // Stable root-relative paths in /public (Google favicon guidelines: square, crawlable, multiples of 48px).
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/** Flags JS availability before first paint so reveal animations never flash. */
// Also marks in-site navigation, so opening bars only ever play on a direct load or refresh.
const jsFlag =
  "document.documentElement.classList.add('js');var r=function(){document.documentElement.setAttribute('data-routed','')};document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('a[href]'))r()},true);addEventListener('popstate',r);";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body suppressHydrationWarning>
        <div id="top" />
        <a
          href="#main"
          className="sr-only fixed top-3 left-3 z-[60] rounded-sm bg-obsidian px-4 py-3 text-sm font-medium text-white focus:not-sr-only"
        >
          Skip to content
        </a>
        <Header />
        {/* Page transitions (see globals.css): the content cross-fades while the floating header stays put. */}
        <ViewTransition default="page">
          <div>
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </div>
        </ViewTransition>
        <MainMotion />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
