import Link from 'next/link'; // Link bileşenini import ediyoruz

async function getQuizzes() {
  // Bu fonksiyon aynı kalıyor...
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
          // Her bir quiz'i bir Link bileşeni ile sarmalıyoruz
          <Link key={quiz.id} href={`/quizzes/${quiz.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ marginBottom: '15px', border: '1px solid #eee', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }} 
                 onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                 onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <h2>{quiz.title}</h2>
              {quiz.description && <div dangerouslySetInnerHTML={{ __html: quiz.description }} />}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}