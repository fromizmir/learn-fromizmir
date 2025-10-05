// Dosya Yolu: app/quizzes/page.tsx

// Veriyi sunucuda çekip, interaktifliği istemci bileşenine devrediyoruz.
import QuizPageClient from '@/components/QuizPageClient';

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

export default async function QuizzesPage() {
  const quizzes = await getQuizzes();

  return (
    // Tek görevi, veriyi çekip Client Component'e aktarmak.
    <QuizPageClient quizzes={quizzes} />
  );
}