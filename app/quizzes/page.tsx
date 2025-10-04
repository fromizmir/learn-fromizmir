import QuizListItem from '@/components/QuizListItem'; // Yeni bileşenimizi import ediyoruz

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
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>All Quizzes</h1>
      <p>Start by selecting one of the quizzes below.</p>
      <div style={{ marginTop: '20px' }}>
        {Array.isArray(quizzes) && quizzes.map((quiz: any) => (
          // Her bir quiz için yeni interaktif bileşenimizi kullanıyoruz
          <QuizListItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </main>
  );
}