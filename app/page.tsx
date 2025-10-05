import WordLookup from '@/components/WordLookup';

export default function Home() {
  return (
    <main style={{ padding: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
      <h1>Interactive Content Test</h1>
      <p>
        An <WordLookup word="eloquent" /> speaker can captivate an audience.
        Try clicking on other words too, like <WordLookup word="captivate" /> or <WordLookup word="audience" />.
      </p>
    </main>
  );
}