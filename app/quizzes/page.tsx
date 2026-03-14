import { Suspense } from 'react';
import QuizListItem from '@/components/QuizListItem';
import SearchBar from '@/components/SearchBar';

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

export default async function QuizzesPage({ searchParams }: { searchParams?: { category?: string; search?: string } }) {
  const allQuizzes = await getQuizzes();
  const currentCategory = searchParams?.category || 'All';
  const searchTerm = searchParams?.search || '';

  const filteredQuizzes = Array.isArray(allQuizzes) ? allQuizzes.filter(quiz => {
    const title = quiz.title || '';
    const titleMatchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    if (currentCategory === 'All') return titleMatchesSearch;
    const exerciseIndex = title.toLowerCase().indexOf(' exercise');
    const categoryOfQuiz = exerciseIndex > 0 ? title.substring(0, exerciseIndex).trim() : '';
    return categoryOfQuiz === currentCategory && titleMatchesSearch;
  }) : [];

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
      <div style={{ marginTop: '20px' }}>
        {filteredQuizzes.map((quiz: any) => (
          <QuizListItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
