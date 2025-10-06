// Dosya Yolu: app/layout.tsx

import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import Script from "next/script";

// --- OLMASI GEREKEN DOĞRU METADATA KISMI ---
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
          {/* Ezoic uyarısına göre sıralama düzenlendi */}
          <Script src="https://the.gatekeeperconsent.com/cmp.min.js" strategy="beforeInteractive" />
          <Script src="//www.ezojs.com/ezoic/sa.min.js" strategy="beforeInteractive" />
          
          <Script src="https://the.gatekeeperconsent.com/ccpa/v2/standalone.js" async />
          <Script async src="https://fundingchoicesmessages.google.com/i/pub-6517205438926212?ers=1" />
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
          <Script id="googlefc-signal" strategy="afterInteractive">
            {`
              function signalGooglefcPresent() {
                if (!window.frames['googlefcPresent']) {
                  if (document.body) {
                    const iframe = document.createElement('iframe');
                    iframe.name = 'googlefcPresent';
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 0);
                  }
                }
              }
              signalGooglefcPresent();
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
                  window.ezstandalone.define(648, 647, 652, 651);
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