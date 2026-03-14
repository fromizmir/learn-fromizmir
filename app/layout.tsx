import type { Metadata } from "next";
import Header from '@/components/Header';
import Script from "next/script";
import './globals.css';

export const metadata: Metadata = {
  title: "Learn English Quizzes | From Izmir",
  description: "Your free AI-powered TOEFL & English learning assistant!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="ezoic-cmp" src="https://the.gatekeeperconsent.com/cmp.min.js" strategy="beforeInteractive" />
        <Script id="ezoic-sa" src="//www.ezojs.com/ezoic/sa.min.js" strategy="beforeInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QKYBK4YQ1T');
        `}</Script>
        <Script id="ezstandalone-init" strategy="afterInteractive">{`
          window.ezstandalone = window.ezstandalone || {};
          ezstandalone.cmd = ezstandalone.cmd || [];
        `}</Script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
