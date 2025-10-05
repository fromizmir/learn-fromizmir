// Dosya Yolu: app/api/save-result/route.ts

import { sql } from '@neondatabase/serverless';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Bu fonksiyon sadece POST isteklerini kabul edecek
export async function POST(request: Request) {
  // Clerk'ten o an giriş yapmış olan kullanıcının kimliğini al
  const { userId } = auth();
  
  // Eğer kullanıcı giriş yapmamışsa, yetkisiz hatası döndür
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Tarayıcıdan gönderilen verileri (quizId, score, quizTitle) al
    const { quizId, score, quizTitle } = await request.json();

    // Verilerin eksik olup olmadığını kontrol et
    if (!quizId || !score || !quizTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Neon veritabanına yeni sonucu SQL komutuyla ekle
    await sql`
      INSERT INTO quiz_results (user_id, quiz_id, score, quiz_title)
      VALUES (${userId}, ${String(quizId)}, ${score}, ${quizTitle});
    `;
    
    // Başarılı olursa, bir onay mesajı döndür
    return NextResponse.json({ message: 'Result saved successfully' }, { status: 200 });

  } catch (error) {
    // Bir hata olursa, hatayı logla ve 500 durum koduyla hata mesajı döndür
    console.error('Failed to save quiz result:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}