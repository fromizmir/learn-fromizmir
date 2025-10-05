// Dosya Yolu: app/quizzes/layout.tsx

import styles from './layout.module.css';
import QuizzesSidebar from '@/components/QuizzesSidebar';

// Bu fonksiyon aynı kalıyor...
async function getQuizzes() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;
  if (!API_KEY) { return []; }
  try {
    const res = await fetch(API_ENDPOINT, { headers: { 'Authorization': `Bearer ${API_KEY}` }, cache: 'no-store' });
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
    <div className={styles.pageContainerWithAds}> {/* Yeni bir class adı kullanabiliriz */}
      {/* --- SOL REKLAM ALANI --- */}
      <div className={styles.adSidebar}>
        {/* Ezoic - quiz.fromizmir.com_left - sidebar_middle */}
        <div id="ezoic-pub-ad-placeholder-648"></div>
      </div>
      
      {/* ORTA İÇERİK ALANI */}
      <div className={styles.contentWithSidebar}>
        <QuizzesSidebar categories={categories} />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>

      {/* --- SAĞ REKLAM ALANI --- */}
      <div className={styles.adSidebar}>
        {/* Ezoic - quiz.fromizmir.com_right - sidebar_middle */}
        <div id="ezoic-pub-ad-placeholder-647"></div>
      </div>
    </div>
  );
}