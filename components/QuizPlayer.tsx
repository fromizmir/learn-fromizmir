"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './QuizPlayer.module.css';
import AdPlaceholder from './AdPlaceholder';

export default function QuizPlayer({ quizData }: { quizData: any }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [adUnitIdToShow, setAdUnitIdToShow] = useState<string | null>(null);
  const [adCountdown, setAdCountdown] = useState(5);
  const explanationRef = useRef<HTMLDivElement>(null);

  if (!quizData || !quizData.sorular || quizData.sorular.length === 0) {
    return <div>Quiz data not available. Please go back and select another quiz.</div>;
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
    
    // Sınavın bitip bitmediğini reklam kontrolünden önce yap
    if (nextIndex >= totalQuestions) {
      setIsQuizFinished(true);
      return;
    }

    // Reklam aralıklarını kontrol et
    if (nextIndex === 5) { setAdUnitIdToShow('649'); return; }
    if (nextIndex === 10) { setAdUnitIdToShow('650'); return; }
    if (nextIndex === 15) { setAdUnitIdToShow('651'); return; }
    if (nextIndex === 20) { setAdUnitIdToShow('652'); return; }

    // Normal bir şekilde sonraki soruya geç
    setCurrentQuestionIndex(nextIndex);
    setIsAnswered(false);
    setSelectedAnswerIndex(null);
  };
  
  const proceedAfterAd = () => {
    setAdUnitIdToShow(null);
    const nextIndex = currentQuestionIndex + 1;

    // Reklamdan sonra sınavın bitip bitmediğini tekrar kontrol et
    if (nextIndex >= totalQuestions) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    }
  };

  useEffect(() => {
    if (adUnitIdToShow) {
      setAdCountdown(5);
      const timer = setInterval(() => {
        setAdCountdown(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [adUnitIdToShow]);
  
  const handleRestart = () => { window.location.href = '/quizzes'; };

  if (adUnitIdToShow) {
    return (
      <div className={styles.quizPanel}>
        <div className={styles.adScreen}>
          <h3>Advertisement</h3>
          <AdPlaceholder key={adUnitIdToShow} adId={adUnitIdToShow} />
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
              if (index === question.dogruCevapIndex) { btnClass += ` ${styles.correct}`; }
              else if (index === selectedAnswerIndex) { btnClass += ` ${styles.incorrect}`; }
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