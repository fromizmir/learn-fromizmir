// Bu satır, sayfa başlığı gibi meta verileri tanımlamanızı sağlar
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn From Izmir',
  description: 'Harika bir öğrenme platformu',
};

// Bu fonksiyon ana şablonunuzdur
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {/* children, page.tsx gibi diğer sayfalarınızın içeriğidir */}
        {children}
      </body>
    </html>
  );
}
