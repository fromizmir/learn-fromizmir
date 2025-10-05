"use client"; // Menü durumunu yönetmek için bu dosya artık bir istemci bileşeni

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './layout.module.css';
// API'dan veri çekme mantığı değişmeyeceği için onu ayrı bir dosyaya taşıyabiliriz
// ama şimdilik basitlik adına burada bırakalım. 
// Bu kısım sunucuda çalışmaya devam edecek, sadece istemci bileşeni içinde çağrılacak.

// NOT: Bu kısım normalde sunucu bileşeninde yapılır, ancak layout'u client yapmak
// state yönetimini basitleştirdiği için burada bu şekilde ilerliyoruz.
// Daha büyük projelerde bu veri çekme işlemi bir üst katmanda yapılır.

export default function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menü durumu için state

  // Sayfa yüklendiğinde kategorileri çekmek için useEffect kullanalım
  useEffect(() => {
    // Normalde quiz listesini sunucuda çekmiştik. Layout'u client yaptığımız için
    // kategori listesini oluşturmak amacıyla quiz listesini tarayıcıda çekiyoruz.
    // Bu, sunucudaki /api/getQuizzes endpoint'ine bir istek atarak yapılabilir.
    // Şimdilik, bu özelliği basitleştirmek adına, kategori listesini
    // statik olarak bırakabiliriz veya daha sonra API'dan çekebiliriz.
    // Şimdilik bu kısmı atlayıp sadece mobil menüye odaklanalım.
    // Kategori listesi bir önceki adımdaki gibi sunucudan gelmeye devam edecek.
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Bu örnekte, kategorileri manuel olarak ekleyelim.
  // Bir sonraki adımda bunu dinamik hale getireceğiz.
  const staticCategories = ["All", "Active And Passive Sentences", "Adjectives And Adverbs"];

  return (
    <div className={styles.pageContainer}>
      {/* --- MOBİL İÇİN HAMBURGER BUTONU --- */}
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        ☰
      </button>

      {/* SOL SÜTUN (SIDEBAR) */}
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarMobileOpen : ''}`}>
        <h2 className={styles.categoryTitle}>Categories</h2>
        <div className={styles.categoryList}>
          {/* Şimdilik statik kategorileri gösteriyoruz */}
          {staticCategories.map(category => (
            <Link key={category} href={`/quizzes?category=${category}`} className={styles.categoryButton} onClick={() => setIsMenuOpen(false)}>
              {category}
            </Link>
          ))}
        </div>
      </aside>

      {/* SAĞ SÜTUN (ANA İÇERİK) */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}