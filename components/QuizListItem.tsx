"use client";
import Link from 'next/link';
import styles from './QuizListItem.module.css';

export default function QuizListItem({ quiz }: { quiz: any }) {
  const quizUrl = `/quizzes/${quiz.id}`;
  return (
    <Link href={quizUrl} className={styles.quizLink}>
      <div className={styles.quizCard}>
        <h2 className={styles.quizTitle}>{quiz.title}</h2>
        {quiz.description && 
          <div className={styles.quizDescription} dangerouslySetInnerHTML={{ __html: quiz.description }} />}
      </div>
    </Link>
  );
}