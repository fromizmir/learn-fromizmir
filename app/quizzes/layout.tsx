import Link from 'next/link';
import styles from './layout.module.css'; // Birazdan oluşturacağımız stil dosyası

// Bu fonksiyonu buraya taşıyoruz, çünkü kategori menüsü için quiz listesine ihtiyacımız var.
async function getQuizzes() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;
  if (!API_KEY) { throw new Error('API Key not found.'); }
  const res = await fetch(API_ENDPOINT, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
    cache: 'no-store',
  });
  if (!res.ok) { throw new Error('Failed to fetch quizzes.'); }
  return res.json();
}

export default async function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quizzes = await getQuizzes();
  
  // Kategori listesini burada oluşturuyoruz
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
    <div className={styles.pageContainer}>
      {/* SOL SÜTUN (SIDEBAR) - Artık tüm quiz sayfalarında görünecek */}
      <aside className={styles.sidebar}>
        <h2 className={styles.categoryTitle}>Categories</h2>
        <div className={styles.categoryList}>
          {categories.map(category => (
            // NOT: Buton yerine Link kullanıyoruz, çünkü artık filtreleme işlemini
            // sayfa URL'i üzerinden yapacağız. Bu bir sonraki adımımız olacak.
            // Şimdilik sadece görünümü oluşturuyoruz.
            <Link key={category} href={`/quizzes?category=${category}`} className={styles.categoryButton}>
              {category}
            </Link>
          ))}
        </div>
      </aside>

      {/* SAĞ SÜTUN (ANA İÇERİK) */}
      {/* 'children' prop'u, o anki sayfanın içeriğidir. */}
      {/* Yani /quizzes'deyken quiz listesi, /quizzes/123'teyken quiz oynatıcısı. */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}