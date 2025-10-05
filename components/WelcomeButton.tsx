"use client"; // Bu, bileşenin interaktif olacağını belirtir

import Link from 'next/link';

export default function WelcomeButton() {
  return (
    <Link 
      href="/quizzes" 
      style={{
        padding: '15px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
      }}
      // Fare hareketleri artık bu istemci bileşeninin içinde
      onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
    >
      Start Practicing Now
    </Link>
  );
}