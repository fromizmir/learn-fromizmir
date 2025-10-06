import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import Script from "next/script";
import './globals.css'; // Global stil dosyasını import ediyoruz

export const metadata: Metadata = {
  title: "Learn English Quizzes | From Izmir",
  description: "Your free AI-powered TOEFL & English learning assistant! Interactive quizzes for grammar, vocabulary, and reading practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Ezoic'in istediği kesin sıra: cmp.min.js, sa.min.js'den önce */}
          <Script id="ezoic-cmp" src="https://the.gatekeeperconsent.com/cmp.min.js" strategy="beforeInteractive" />
          <Script id="ezoic-sa" src="//www.ezojs.com/ezoic/sa.min.js" strategy="beforeInteractive" />
          
          <Script src="https://the.gatekeeperconsent.com/ccpa/v2/standalone.js" strategy="lazyOnload" />
          <Script src="https://fundingchoicesmessages.google.com/i/pub-6517205438926212?ers=1" strategy="lazyOnload" />
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QKYBK4YQ1T" />
          
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QKYBK4YQ1T');
            `}
          </Script>
          <Script id="ezstandalone-init" strategy="afterInteractive">
            {`
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `}
          </Script>
        </head>
        
        <body>
          <Header />
          <main>
            {children}
          </main>

          <Script id="ezoic-display" strategy="lazyOnload">
            {`
              if (typeof window.ezstandalone !== 'undefined') {
                window.ezstandalone.cmd.push(function() {
                 window.ezstandalone.define(647, 648, 649, 650, 651, 652, 653, );
                });
                window.ezstandalone.cmd.push(function() {
                  window.ezstandalone.enable();
                  window.ezstandalone.display();
                });
              }
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}