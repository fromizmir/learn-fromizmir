// Dosya Yolu: app/quizzes/layout.tsx
import styles from './layout.module.css';
import QuizzesSidebar from '@/components/QuizzesSidebar';

async function getQuizzes() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;
  if (!API_KEY) { return []; }
  
  try {
    const res = await fetch(API_ENDPOINT, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
      cache: 'no-store',
    });
    if (!res.ok) { return []; }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch quizzes for layout:", error);
    return [];
  }
}

export default async function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quizzes = await getQuizzes();
  
  const categorySet = new Set<string>();
  if (Array.isArray(quizzes)) {
    quizzes.forEach(quiz => {
      const title = quiz.title || '';
      const exerciseIndex = title.toLowerCase().indexOf(' exercise');
      if (exerciseIndex > 0) {
        categorySet.add(title.substring(0, exerciseIndex).trim());
      }
    });
  }
  const categories = ['All', ...Array.from(categorySet).sort()];

  return (
    // Reklam sütunları olmadan, doğrudan ana konteyneri kullanıyoruz
    <div className={styles.pageContainer}>
      <QuizzesSidebar categories={categories} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}