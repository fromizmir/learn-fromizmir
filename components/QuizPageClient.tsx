"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './QuizzesPage.module.css'; // Yeni stil dosyamız

export default function QuizPageClient({ quizzes }: { quizzes: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobil menü durumu

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
      <button className={styles.hamburgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarMobileOpen : ''}`}>
        <h2 className={styles.categoryTitle}>Categories</h2>
        <div className={styles.categoryList}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setIsMenuOpen(false); // Kategori seçince menüyü kapat
              }}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </aside>

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
            <Link key={quiz.id} href={`/quizzes/${quiz.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div 
                    style={{ 
                    marginBottom: '15px', border: '1px solid #eee', padding: '20px', 
                    borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' 
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
      </div>
    </div>
  );
}