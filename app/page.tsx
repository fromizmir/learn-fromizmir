export default function Home() {
  const toeflQuestions = [
    "What is the correct form of the verb in 'She ___ to school yesterday'?",
    "Choose the correct article: ___ apple a day keeps the doctor away.",
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h1>TOEFL Practice</h1>
      <ul>
        {toeflQuestions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
// Bu, yeni bir dağıtımı tetiklemek için eklenmiş bir test yorumudur.
