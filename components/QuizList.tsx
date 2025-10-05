"use client"; // Bu bileşen interaktif olacak

import { useState } from 'react';
import Link from 'next/link';

// Dışarıdan tüm quizlerin listesini 'prop' olarak alır
export default function QuizList({ quizzes }: { quizzes: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Arama kutusuna yazılan kelimeye göre quizleri filtrele
  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a quiz..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '1rem',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
        }}
      />
      
      {filteredQuizzes.map((quiz: any) => (
        <Link key={quiz.id} href={`/quizzes/${quiz.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div
            style={{
              marginBottom: '15px',
              border: '1px solid #eee',
              padding: '20px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <h2>{quiz.title}</h2>
            {quiz.description && <div dangerouslySetInnerHTML={{ __html: quiz.description }} />}
          </div>
        </Link>
      ))}
    </div>
  );
}