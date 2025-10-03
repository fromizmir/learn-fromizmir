import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next';
import Header from '@/components/Header'; // Header'ı import edin

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
    <ClerkProvider>
      <html lang="tr">
        <body>
          <Header /> {/* Header'ı buraya ekleyin */}
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}