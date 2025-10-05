// Dosya Yolu: app/api/save-result/route.ts

import { neon } from '@neondatabase/serverless'; // 'sql' yerine 'neon' import edildi
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Veritabanı bağlantısını Vercel'in sağladığı ortam değişkeniyle yapılandır.
// '!' işareti TypeScript'e "bu değişkenin var olduğundan eminim" der.
const sql = neon(process.env.POSTGRES_URL!);

export async function POST(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { quizId, score, quizTitle } = await request.json();

    if (!quizId || score === undefined || !quizTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Artık doğru yapılandırılmış 'sql' fonksiyonunu kullanarak veriyi ekliyoruz.
    await sql`
      INSERT INTO quiz_results (user_id, quiz_id, score, quiz_title)
      VALUES (${userId}, ${String(quizId)}, ${score}, ${quizTitle});
    `;
    
    return NextResponse.json({ message: 'Result saved successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}