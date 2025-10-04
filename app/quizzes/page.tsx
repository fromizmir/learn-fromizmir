// Dosya Yolu: app/quizzes/page.tsx

async function getQuizzes() {
  // Bu fonksiyon aynı kalıyor...
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;

  if (!API_KEY) {
    throw new Error('API Anahtarı (LOLONOLO_API_KEY) Vercel ortam değişkenlerinde bulunamadı.');
  }
  const res = await fetch(API_ENDPOINT, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API Hatası: Sunucudan ${res.status} koduyla yanıt alındı. (${res.statusText})`);
  }
  return res.json();
}

export default async function QuizzesPage() {
  try {
    const quizzes = await getQuizzes();
    if (!Array.isArray(quizzes)) return <p>Veri formatı hatalı.</p>;

    return (
      <main style={{ padding: '40px' }}>
        <h1>Tüm Quizler</h1>
        <p>Aşağıdaki quizlerden birini seçerek başlayın.</p>
        <div style={{ marginTop: '20px' }}>
          {quizzes.map((quiz: any) => (
            <div key={quiz.id} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
              <h2>{quiz.title}</h2>
              {/* --- DEĞİŞİKLİK BURADA --- */}
              {/* Eğer description varsa ve boş değilse, o zaman render et */}
              {quiz.description && (
                <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
              )}
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    // Hata yakalama bloğu aynı kalıyor...
    let errorMessage = 'Bilinmeyen bir hata oluştu.';
    if (error instanceof Error) { errorMessage = error.message; }
    return (
      <main style={{ padding: '40px', color: 'red' }}>
        <h1>Sayfa Yüklenirken Bir Hata Oluştu</h1>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#ffebeb', padding: '10px', borderRadius: '8px' }}>
          {errorMessage}
        </pre>
      </main>
    );
  }
}