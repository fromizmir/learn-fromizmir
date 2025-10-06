"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './QuizPlayer.module.css';

export default function QuizPlayer({ quizData }: { quizData: any }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showAdScreen, setShowAdScreen] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);

  const explanationRef = useRef<HTMLDivElement>(null);
  const adScreenRef = useRef<HTMLDivElement>(null);

  if (!quizData || !quizData.sorular || quizData.sorular.length === 0) {
    return <div>Quiz data is not available. Please go back and select another quiz.</div>;
  }

  const question = quizData.sorular[currentQuestionIndex];
  const totalQuestions = quizData.sorular.length;

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(selectedIndex);
    setIsAnswered(true);
    if (selectedIndex === question.dogruCevapIndex) {
      setScore(prevScore => prevScore + 10);
    }
    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex % 5 === 0 && nextIndex < totalQuestions) {
      setShowAdScreen(true);
      return;
    }
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    } else {
      setIsQuizFinished(true);
    }
  };
  
  const proceedAfterAd = () => {
    // Ezoic'in eklediği içeriği manuel olarak temizle
    const adPlaceholder = document.getElementById('ezoic-pub-ad-placeholder-651');
    if (adPlaceholder) {
      adPlaceholder.innerHTML = '';
    }
    
    setShowAdScreen(false); // Reklam ekranını gizle
    
    // Bir sonraki soruya geç
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    }
  };

  useEffect(() => {
    if (showAdScreen) {
      // --- DEĞİŞİKLİK BURADA ---
      // Ezoic'in yeni reklam alanını her seferinde görmesini ve yenilemesini sağla
      if (typeof window.ezstandalone !== 'undefined') {
        console.log('Ezoic ad refresh triggered for placeholder 651');
        window.ezstandalone.cmd.push(function() {
          window.ezstandalone.define(651);
          window.ezstandalone.enable();
          window.ezstandalone.display(); // 'refresh' yerine 'display' daha garantili olabilir
        });
      }
      setAdCountdown(5);
      const timer = setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimeout(() => {
        adScreenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showAdScreen]);
  
  const handleRestart = () => {
     window.location.href = '/quizzes';
  };

  if (showAdScreen) {
    return (
      <div className={styles.quizPanel} ref={adScreenRef}>
        <div className={styles.adScreen}>
          <h3>Advertisement</h3>
          <div id="ezoic-pub-ad-placeholder-651" style={{minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc'}}>
          </div>
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