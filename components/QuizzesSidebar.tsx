"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // URL'i okumak için
import styles from '@/app/quizzes/layout.module.css'; // Ortak stil dosyasını kullanıyoruz

export default function QuizzesSidebar({ categories }: { categories: string[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  return (
    <>
      <button className={styles.hamburgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarMobileOpen : ''}`}>
        <h2 className={styles.categoryTitle}>Categories</h2>
        <div className={styles.categoryList}>
          {categories.map(category => (
            <Link
              key={category}
              href={category === 'All' ? '/quizzes' : `/quizzes?category=${category}`}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ''}`}
              onClick={() => setIsMenuOpen(false)} // Mobilde linke tıklayınca menüyü kapat
            >
              {category}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}