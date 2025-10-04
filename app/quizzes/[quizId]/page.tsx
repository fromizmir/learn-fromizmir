// Dosya Yolu: app/quizzes/[quizId]/page.tsx

import QuizPlayer from '@/components/QuizPlayer'; // Birazdan oluşturacağımız bileşen

async function getQuizData(quizId: string) {
  const API_ENDPOINT = `https://fromizmir.com/wp-json/lolonolo-quiz/v16/quiz/${quizId}`;
  const API_KEY = process.env.LOLONOLO_API_KEY;

  if (!API_KEY) { throw new Error('API Key not found.'); }

  const res = await fetch(API_ENDPOINT, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
    cache: 'no-store',
  });

  if (!res.ok) { throw new Error('Failed to fetch quiz data.'); }
  return res.json();
}


export default async function SingleQuizPage({ params }: { params: { quizId: string } }) {
  const quizData = await getQuizData(params.quizId);

  return (
    <main style={{ padding: '20px' }}>
      {/* Veriyi interaktif oynatıcıya gönderiyoruz */}
      <QuizPlayer quizData={quizData} />
    </main>
  );
}