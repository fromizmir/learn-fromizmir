"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './QuizPlayer.module.css';

export default function QuizPlayer({ quizData }: { quizData: any }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  
  // --- YENİ REKLAM MANTIĞI ---
  // Artık sadece boolean değil, hangi reklam ID'sinin gösterileceğini tutuyoruz
  const [adToShow, setAdToShow] = useState<string | null>(null);
  const [adCountdown, setAdCountdown] = useState(5);

  const explanationRef = useRef<HTMLDivElement>(null);
  // ... (diğer değişkenler aynı)

  if (!quizData || !quizData.sorular || quizData.sorular.length === 0) {
    return <div>Quiz data is not available. Please go back and select another quiz.</div>;
  }
  const question = quizData.sorular[currentQuestionIndex];
  const totalQuestions = quizData.sorular.length;

  const handleAnswer = (selectedIndex: number) => { /* ...değişiklik yok... */ };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    // --- YENİ REKLAM MANTIĞI ---
    // Her aralık için farklı bir reklam ID'si belirle
    if (nextIndex === 5) { setAdToShow('649'); return; }
    if (nextIndex === 10) { setAdToShow('650'); return; }
    if (nextIndex === 15) { setAdToShow('651'); return; }
    if (nextIndex === 20) { setAdToShow('652'); return; }

    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    } else {
      setIsQuizFinished(true);
    }
  };
  
  const proceedAfterAd = () => {
    const adPlaceholder = document.getElementById(`ezoic-pub-ad-placeholder-${adToShow}`);
    if (adPlaceholder) { adPlaceholder.innerHTML = ''; }
    
    setAdToShow(null); // Reklam ekranını gizle
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    }
  };

  useEffect(() => {
    if (adToShow) { // 'showAdScreen' yerine 'adToShow' kontrolü
      if (typeof window.ezstandalone !== 'undefined') {
        const adId = parseInt(adToShow);
        if (!isNaN(adId)) {
          window.ezstandalone.cmd.push(function() {
            window.ezstandalone.define(adId);
            window.ezstandalone.enable();
            window.ezstandalone.display();
          });
        }
      }
      setAdCountdown(5);
      const timer = setInterval(() => { /* ... geri kalanı aynı ... */ });
      return () => clearInterval(timer);
    }
  }, [adToShow]);
  
  const handleRestart = () => { window.location.href = '/quizzes'; };

  if (adToShow) {
    return (
      <div className={styles.quizPanel}>
        <div className={styles.adScreen}>
          <h3>Advertisement</h3>
          {/* Reklam ID'sini dinamik olarak ata */}
          <div id={`ezoic-pub-ad-placeholder-${adToShow}`} style={{minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc'}}></div>
          <button onClick={proceedAfterAd} className={styles.nextQuestionBtn} disabled={adCountdown > 0}>
            {adCountdown > 0 ? `Please wait... (${adCountdown})` : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

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
        <div ref={explanationRef}>
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
    </div>
  );
}