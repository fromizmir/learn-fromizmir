// Dosya Yolu: app/quizzes/[slug]/page.tsx

import QuizPlayer from '@/components/QuizPlayer';

// Fonksiyonu 'slug' ile veri çekecek şekilde güncelledik
async function getQuizData(slug: string) {
  // WordPress'in standart REST API yapısı genellikle slug ile sorgulamaya izin verir.
  // Eklentinizin adres yapısı farklıysa burayı değiştirmemiz gerekebilir.
  const API_ENDPOINT = `https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes?slug=${slug}`;
  const API_KEY = process.env.LOLONOLO_API_KEY;

  if (!API_KEY) { throw new Error('API Key not found.'); }

  const res = await fetch(API_ENDPOINT, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
    cache: 'no-store',
  });

  if (!res.ok) { throw new Error('Failed to fetch quiz data by slug.'); }

  const data = await res.json();
  
  // API genellikle bir dizi içinde tek bir eleman döndürür, bu yüzden ilk elemanı alıyoruz.
  if (data && data.length > 0) {
    return data[0];
  }

  throw new Error('Quiz not found for the given slug.');
}

// 'params.quizId' -> 'params.slug' olarak güncellendi
export default async function SingleQuizPage({ params }: { params: { slug: string } }) {
  const quizData = await getQuizData(params.slug);

  return (
    <main style={{ padding: '20px' }}>
      <QuizPlayer quizData={quizData} />
    </main>
  );
}