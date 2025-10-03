import { ClerkProvider } from '@clerk/nextjs' // Bunu import edin
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn From Izmir',
  description: 'Harika bir öğrenme platformu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider> etiketini buraya ekleyin
    <ClerkProvider>
      <html lang="tr">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
