// Veriyi sunucuda çekip, interaktifliği istemci bileşenine devrediyoruz.
import QuizPageClient from '@/components/QuizPageClient';

async function getQuizzes() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;
  if (!API_KEY) { throw new Error('API Key not found.'); }
  const res = await fetch(API_E