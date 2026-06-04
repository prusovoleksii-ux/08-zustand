import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: `NoteHub`,
  description: "Hub to Store Notes",
  openGraph: {
    title: `NoteHub`,
    description: "Hub to Store Notes",
    url: `https://notehub.com/`,
    siteName: 'NoteHub',
    images: [{
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },],
      type: 'article',
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
