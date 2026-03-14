export async function GET() {
  const API_ENDPOINT = 'https://fromizmir.com/wp-json/lolonolo-quiz/v16/quizzes';
  const API_KEY = process.env.LOLONOLO_API_KEY;
  
  try {
    const res = await fetch(API_ENDPOINT, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
      cache: 'no-store',
    });
    
    const text = await res.text();
    
    return Response.json({
      status: res.status,
      statusText: res.statusText,
      keyLength: API_KEY?.length,
      keyStart: API_KEY?.substring(0, 5),
      body: text.substring(0, 200)
    });
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
```

Commit'le, sonra tarayıcıda şunu aç:
```
https://quiz.fromizmir.com/api/test
