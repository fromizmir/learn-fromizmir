import Link from 'next/link';
import WelcomeButton from '@/components/WelcomeButton'; // Yeni butonumuzu import ediyoruz

export default function HomePage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '80vh',
      padding: '40px',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Welcome to Learn From Izmir
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', marginBottom: '40px' }}>
        Your free, interactive platform for TOEFL and English language practice. Enhance your skills with a rich library of quizzes from various sources.
      </p>
      
      {/* Artık interaktif link yerine, kendi bileşenimizi kullanıyoruz */}
      <WelcomeButton />
    </main>
  );
}