// Dosya Yolu: app/quizzes/page.tsx

// Bu bir "Server Component" olduğu için, bu dosyadaki kodlar
// sadece sunucuda çalışır. API anahtarınız asla tarayıcıya gitmez.
async function getQuizzes() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;

  if (!API_KEY) {
    throw new Error('API Anahtarı bulunamadı.');
  }

  // 'no-store' Vercel'in veriyi önbelleğe almasını engeller, her zaman taze veri çekeriz.
  const res = await fetch(API_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('API Hatası: Quizler alınamadı.');
  }
  
  return res.json();
}

// Bu, sayfanın kendisini oluşturan ana bileşendir.
export default async function QuizzesPage() {
  // Yukarıdaki fonksiyonu çağırıp quiz verilerini alıyoruz.
  const quizzes = await getQuizzes();

  return (
    <main style={{ padding: '40px' }}>
      <h1>Tüm Quizler</h1>
      <p>Aşağıdaki quizlerden birini seçerek başlayın.</p>
      
      <div style={{ marginTop: '20px' }}>
        {quizzes.map((quiz: any) => (
          <div key={quiz.id} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
            {/* Şimdilik sadece listeliyoruz. Sonraki adımda bunlara link vereceğiz. */}
            <h2>{quiz.title}</h2>
            {/* WordPress'ten gelen HTML içeriğini güvenli bir şekilde göstermek için */}
            <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
          </div>
        ))}
      </div>
    </main>
  );
}