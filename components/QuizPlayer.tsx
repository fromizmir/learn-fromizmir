"use client"; // Bu bileşen tarayıcıda çalışacak

import { useState } from 'react';
import styles from './QuizPlayer.module.css'; // Stil dosyamız

export default function QuizPlayer({ quizData }: { quizData: any }) {
  // Değişken durumları takip etmek için 'useState' kullanıyoruz:
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  
  // Mevcut soru ve toplam soru sayısı gibi bilgileri alalım
  const question = quizData.sorular[currentQuestionIndex];
  const totalQuestions = quizData.sorular.length;

  // Bir şıkka tıklandığında çalışacak fonksiyon
  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return; // Eğer zaten cevaplanmışsa bir şey yapma

    setSelectedAnswerIndex(selectedIndex);
    setIsAnswered(true);

    // Eğer doğru cevap ise skoru artır
    if (selectedIndex === question.dogruCevapIndex) {
      setScore(prevScore => prevScore + 10);
    }
  };

  // "Next Question" butonuna tıklandığında çalışacak fonksiyon
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // Sonraki soruya geç
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      // Durumları sıfırla
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    } else {
      // Eğer son soru ise sınavı bitir
      setIsQuizFinished(true);
    }
  };
  
  // "Choose Another Quiz" butonuna tıklandığında çalışacak fonksiyon
  const handleRestart = () => {
     window.location.href = '/quizzes';
  }

  // Eğer sınav bittiyse, final skor ekranını göster
  if (isQuizFinished) {
    return (
      <div className={styles.quizPanel}>
        <div className={styles.questionArea}>
          <h2>Exam Finished!</h2>
          <p className={styles.finalScore}>Your Final Score: {score}</p>
          <button onClick={handleRestart} className={styles.nextQuestionBtn} style={{display: 'block'}}>
            Choose Another Quiz
          </button>
        </div>
      </div>
    );
  }

  // Sınav devam ediyorsa, mevcut soruyu göster
  return (
    <div className={styles.quizPanel}>
      <div className={styles.quizHeader}>
        <h1 className={styles.quizTitle}>{quizData.sinavAdi}</h1>
        <div>Score: <span style={{fontWeight: 'bold'}}>{score}</span></div>
      </div>
      <div className={styles.questionArea}>
        <div className={styles.questionCounter}>Question {currentQuestionIndex + 1} / {totalQuestions}</div>
        <h3 className={styles.questionText} dangerouslySetInnerHTML={{ __html: question.soruMetni }} />
        <div className={styles.optionsGrid}>
          {question.secenekler.map((option: string, index: number) => {
            let btnClass = styles.optionBtn;
            if (isAnswered) {
              if (index === question.dogruCevapIndex) {
                btnClass += ` ${styles.correct}`; // Doğru şıkkı yeşil yap
              } else if (index === selectedAnswerIndex) {
                btnClass += ` ${styles.incorrect}`; // Seçilen yanlış şıkkı kırmızı yap
              }
            }
            return (
              <button key={index} onClick={() => handleAnswer(index)} className={btnClass} disabled={isAnswered}>
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </button>
            );
          })}
        </div>

        {isAnswered && question.aciklama && (
          <div className={styles.explanationArea} dangerouslySetInnerHTML={{ __html: question.aciklama }} />
        )}

        {isAnswered && (
          <button onClick={handleNextQuestion} className={styles.nextQuestionBtn}>
            {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Exam'}
          </button>
        )}
      </div>
    </div>
  );
}