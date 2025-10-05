"use client";

import { useState, useEffect } from 'react';
import styles from './QuizPlayer.module.css';

// Bu fonksiyonu dosyanın en üstüne, import'ların altına ekleyin
async function saveQuizResult(quizId: string, score: number, quizTitle: string) {
  try {
    await fetch('/api/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId, score, quizTitle }),
    });
  } catch (error) {
    console.error("Failed to save quiz result:", error);
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
      setScore(prevScore => prevScore + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    } else {
      // --- DEĞİŞİKLİK BURADA ---
      // Sınav bittiğinde skoru kaydet
      saveQuizResult(quizData.id, score, quizData.sinavAdi);
      setIsQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
     window.location.href = '/quizzes';
  }

  // useEffect içinde, sınav bittiğinde skoru kaydetmek için bir başka yöntem
  useEffect(() => {
    if (isQuizFinished) {
        // Skoru ve diğer bilgileri API'ye gönder.
        // handleNextQuestion içinde zaten yaptık ama burada da yapılabilir.
        // Şimdilik ek bir işlem yapmaya gerek yok.
    }
  }, [isQuizFinished, quizData.id, score, quizData.sinavAdi]);


  if (isQuizFinished) {
    return (
      <div className={styles.quizPanel}>
        <div className={styles.questionArea}>
          <h2>Exam Finished!</h2>
          <p className={styles.finalScore}>Your Final Score: {score}</p>
          <p style={{textAlign: 'center', color: '#666'}}>Your result has been saved to your profile.</p>
          <button onClick={handleRestart} className={styles.nextQuestionBtn} style={{display: 'block'}}>
            Choose Another Quiz
          </button>
        </div>
      </div>
    );
  }

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