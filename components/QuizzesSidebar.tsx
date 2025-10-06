"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/quizzes/layout.module.css';

export default function QuizzesSidebar({ categories }: { categories: string[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category') || 'All';

    return (
        <>
            <button className={styles.hamburgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
            <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarMobileOpen : ''}`}>
                <h2 className={styles.categoryTitle}>Categories</h2>
                <div className={styles.categoryList}>
                    {categories.map(category => (
                        <Link
                            key={category}
                            href={category === 'All' ? '/quizzes' : `/quizzes?category=${category}`}
                            className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {category}
                        </Link>
                    ))}
                </div>
                {/* Menünün altındaki reklam alanı */}
                <div style={{ marginTop: '20px' }}>
                    <div id="ezoic-pub-ad-placeholder-652"></div>
                </div>
            </aside>
        </>
    );
}