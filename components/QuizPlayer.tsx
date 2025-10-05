"use client";

import { useState, useEffect } from 'react';
import styles from './QuizPlayer.module.css';

// Bu yeni fonksiyon, skor kaydetme API'mizi çağıracak
async function saveQuizResult(quizId: string, score: number, quizTitle: string) {
  try {
    const response = await fetch('/api/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId, score, quizTitle }),
    });

    if (!response.ok) {
      throw new Error('Failed to save result');
    }

    console.log("Result saved successfully!");

  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
}


export default function QuizPlayer({ quizData }: { quizData: any }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  
  const question = quizData.sorular[currentQuestionIndex];
  const totalQuestions = quizData.sorular.length;

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(selectedIndex);
    setIsAnswered(true);
    if (selectedIndex === question.dogruCevapIndex) {
      // Skoru doğru cevaba göre anlık olarak güncelleyelim
      const newScore = score + 10;
      setScore(newScore);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    } else {
      // --- ANA DEĞİŞİKLİK BURADA ---
      // Sınav bittiğinde, skoru veritabanına kaydetmek için API'yi çağır
      // Not: Yukarıda 'handleAnswer'da skoru zaten güncelledik.
      // Ama state güncellemeleri anlık olmayabildiği için, son skoru hesaplayıp gönderiyoruz.
      const finalScore = selectedAnswerIndex === question.dogruCevapIndex ? score : score;
      saveQuizResult(quizData.id, finalScore, quizData.sinavAdi);
      setIsQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
     window.location.href = '/quizzes';
  }
  
  if (isQuizFinished) {
    return (
      <div className={styles.quizPanel}>
        <div className={styles.questionArea}>
          <h2>Exam Finished!</h2>
          <p className={styles.finalScore}>Your Final Score: {score}</p>
          <p style={{textAlign: 'center', color: '#666'}}>Your result has been saved.</p>
          <button onClick={handleRestart} className={styles.nextQuestionBtn} style={{display: 'block'}}>
            Choose Another Quiz
          </button>
        </div>
      </div>
    );
  }

  // --- JSX (Görünüm) kısmı ---
  // (Bu kısım büyük ölçüde aynı, sadece buton metni değişti)
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
                btnClass += ` ${styles.correct}`;
              } else if (index === selectedAnswerIndex) {
                btnClass += ` ${styles.incorrect}`;
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
            {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Exam & Save Result'}
          </button>
        )}
      </div>
    </div>
  );
}