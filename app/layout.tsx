import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anyph34.github.io/new-respiratory/"),
  title: "Anyph Kipngetich | Developer Portfolio",
  description:
    "Software developer and IT specialist building practical business software, clean database architectures, and responsive web applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anyph Kipngetich | Developer Portfolio",
    description:
      "Full-stack software developer and IT specialist building business systems, web applications, and reliable database-backed products.",
    url: "https://anyph34.github.io/new-respiratory/",
    siteName: "Anyph Kipngetich Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anyph Kipngetich | Developer Portfolio",
    description:
      "Business software, web applications, and systems design from a full-stack developer in Kenya.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
