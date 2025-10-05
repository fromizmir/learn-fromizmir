"use client";

import { useState, useMemo } from 'react';
import QuizListItem from '@/components/QuizListItem';
import styles from '@/app/quizzes/QuizzesPage.module.css'; // Yeni stil dosyamız

export default function QuizPageClient({ quizzes }: { quizzes: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    quizzes.forEach(quiz => {
      const title = quiz.title || '';
      const exerciseIndex = title.toLowerCase().indexOf(' exercise');
      if (exerciseIndex > 0) {
        categorySet.add(title.substring(0, exerciseIndex).trim());
      }
    });
    return ['All', ...Array.from(categorySet).sort()];
  }, [quizzes]);

  const filteredQuizzes = quizzes.filter(quiz => {
    const title = quiz.title || '';
    const titleMatchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    
    let categoryMatches = false;
    if (selectedCategory === 'All') {
      categoryMatches = true;
    } else {
      const exerciseIndex = title.toLowerCase().indexOf(' exercise');
      const categoryOfQuiz = exerciseIndex > 0 ? title.substring(0, exerciseIndex).trim() : '';
      if (categoryOfQuiz === selectedCategory) {
        categoryMatches = true;
      }
    }
    return titleMatchesSearch && categoryMatches;
  });

  return (
    <div className={styles.pageContainer}>
      {/* SOL SÜTUN (SIDEBAR) */}
      <aside className={styles.sidebar}>
        <h2 className={styles.categoryTitle}>Categories</h2>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            // Seçili butona farklı bir stil uygulamak için
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ''}`}
          >
            {category}
          </button>
        ))}
      </aside>

      {/* SAĞ SÜTUN (ANA İÇERİK) */}
      <div className={styles.mainContent}>
        <input
          type="text"
          placeholder="Search within selected category..."
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
    </div>
  );
}