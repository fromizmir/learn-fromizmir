
export const dynamic = 'force-dynamic';
import Link from 'next/link';

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
      <Link href="/quizzes" style={{
        padding: '15px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
      }}
       onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
       onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Start Practicing Now
      </Link>
    </main>
  );
}