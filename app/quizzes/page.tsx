import QuizPageClient from '@/components/QuizPageClient';

// --- BİRİNCİ VERİ KAYNAĞI ---
async function getMyQuizzes() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;
  if (!API_KEY) { throw new Error('LOLONOLO_API_KEY not found.'); }
  
  const res = await fetch(API_ENDPOINT, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
    cache: 'no-store',
  });
  if (!res.ok) { return []; } // Hata olursa boş bir dizi döndür
  
  const data = await res.json();
  // Kendi quizlerimizi standart bir formata dönüştürelim
  return data.map((quiz: any) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    source: 'fromizmir' // Kaynağını belirtelim
  }));
}

// --- İKİNCİ VERİ KAYNAĞI ---
async function getTriviaCategories() {
  // Bu API, mevcut tüm kategorileri ve içlerindeki soru sayılarını verir.
  const API_ENDPOINT = 'https://the-trivia-api.com/v2/metadata';
  const API_KEY = process.env.TRIVIA_API_KEY;

  // Not: Dökümantasyona göre bu endpoint için API key zorunlu olmayabilir,
  // ama gelecekteki istekler için eklemek iyi bir pratik.
  const res = await fetch(`${API_ENDPOINT}?apiKey=${API_KEY}`, { cache: 'no-store' });
  if (!res.ok) { return []; }

  const data = await res.json();
  
  // Gelen veriyi bizim standart formatımıza dönüştürelim
  // "byCategory" objesini bir diziye çeviriyoruz
  return Object.entries(data.byCategory).map(([categoryName, questionCount]) => ({
    id: `trivia_${categoryName}`, // Benzersiz bir ID oluşturalım
    title: `${categoryName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Questions`, // Örn: 'film_and_tv' -> 'Film And Tv Questions'
    description: `A set of ${questionCount} questions from The Trivia API.`,
    source: 'trivia', // Kaynağını belirtelim
    category: categoryName // Daha sonra filtreleme için kategori adını saklayalım
  }));
}


// --- ANA SAYFA BİLEŞENİ ---
export default async function QuizzesPage() {
  // İki API'yi aynı anda, paralel olarak çağıralım
  const [myQuizzes, triviaQuizzes] = await Promise.all([
    getMyQuizzes(),
    getTriviaCategories()
  ]);

  // İki listeden gelen sonuçları birleştirelim
  const allQuizzes = [...myQuizzes, ...triviaQuizzes];

  return (
    <main style={{ padding: '0' }}>
      {/* Birleştirilmiş listeyi interaktif bileşenimize gönderiyoruz */}
      <QuizPageClient quizzes={allQuizzes} />
    </main>
  );
}