"use client"; // Bu, bileşenin interaktif olabileceğini belirtir

import Link from 'next/link';

// Dışarıdan tek bir quiz'in bilgisini 'prop' olarak alır
export default function QuizListItem({ quiz }: { quiz: any }) {
  return (
    <Link href={`/quizzes/${quiz.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        style={{ 
          marginBottom: '15px', 
          border: '1px solid #eee', 
          padding: '20px', 
          borderRadius: '8px', 
          cursor: 'pointer', 
          transition: 'background-color 0.2s' 
        }}
        // Fare hareketleri artık bu istemci bileşeninin içinde
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <h2>{quiz.title}</h2>
        {quiz.description && <div dangerouslySetInnerHTML={{ __html: quiz.description }} />}
      </div>
    </Link>
  );
}