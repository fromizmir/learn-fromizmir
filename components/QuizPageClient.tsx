"use client";

import { useState } from 'react';
import QuizListItem from '@/components/QuizListItem';

export default function QuizPageClient({ quizzes }: { quizzes: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <input
          type="text"
          placeholder="Search in all quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', padding: '12px', fontSize: '1rem',
            marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd',
          }}
        />
        <div>
          {filteredQuizzes.map((quiz: any) => (
            <QuizListItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
    </div>
  );
}