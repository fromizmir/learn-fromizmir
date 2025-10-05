"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function QuizList({ quizzes }: { quizzes: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // useMemo kullanarak, quiz listesi değişmediği sürece kategori listesini yeniden hesaplamayı önlüyoruz (performans artışı).
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    quizzes.forEach(quiz => {
      const title = quiz.title || '';
      // Başlıktaki " Exercise" kelimesinin pozisyonunu bul
      const exerciseIndex = title.toLowerCase().indexOf(' exercise');
      if (exerciseIndex > 0) {
        // Kelimenin öncesindeki kısmı alıp kategori olarak ekle
        categorySet.add(title.substring(0, exerciseIndex).trim());
      }
    });
    // Set'i bir diziye çevir, "All" seçeneğini ekle ve alfabetik sırala
    return ['All', ...Array.from(categorySet).sort()];
  }, [quizzes]);

  // Filtreleme mantığını hem kategori hem de arama için güncelleyelim
  const filteredQuizzes = quizzes.filter(quiz => {
    const title = quiz.title || '';
    
    // Arama terimiyle eşleşme kontrolü
    const titleMatchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());

    // Kategori eşleşme kontrolü
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
    <div>
      {/* Kategori Butonları */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {categories.map(category => (
          <button 
            key={category} 
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              backgroundColor: selectedCategory === category ? '#007bff' : '#f8f9fa',
              color: selectedCategory === category ? 'white' : '#333',
              fontWeight: '600'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Arama Kutusu */}
      <input
        type="text"
        placeholder="Search within selected category..."
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
      
      {/* Filtrelenmiş Quiz Listesi */}
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