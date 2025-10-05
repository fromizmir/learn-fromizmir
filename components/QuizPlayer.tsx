"use client";

import { useState, useEffect, useRef } from 'react'; // useRef'i import ediyoruz
import styles from './QuizPlayer.module.css';

async function saveQuizResult(quizId: string, score: number, quizTitle: string) {
  // Bu fonksiyon aynı kalıyor...
  try {
    await fetch('/api/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, score, quizTitle }),
    });
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
  
  // --- YENİ EKLENEN STATE'LER ---
  const [showAdScreen, setShowAdScreen] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  
  // Otomatik kaydırma için referanslar
  const explanationRef = useRef<HTMLDivElement>(null);
  const adScreenRef = useRef<HTMLDivElement>(null);

  const question = quizData.sorular[currentQuestionIndex];
  const totalQuestions = quizData.sorular.length;

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswerIndex(selectedIndex);
    setIsAnswered(true);

    if (selectedIndex === question.dogruCevapIndex) {
      setScore(prevScore => prevScore + 10);
    }
    
    // --- YENİ EKLENEN KISIM: OTOMATİK KAYDIRMA ---
    // Cevap verildikten kısa bir süre sonra açıklama/sonraki buton alanına kaydır
    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleNextQuestion = () => {
    // --- YENİ EKLENEN KISIM: REKLAM KONTROLÜ ---
    const nextIndex = currentQuestionIndex + 1;
    // Eğer 5. 10. 15. vb. soruya geçiyorsak ve bu son soru değilse reklam göster
    if (nextIndex % 5 === 0 && nextIndex < totalQuestions) {
      setShowAdScreen(true);
      return; // Normal soruya geçme, reklam ekranında kal
    }

    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    } else {
      const finalScore = selectedAnswerIndex === question.dogruCevapIndex ? score : score;
      saveQuizResult(quizData.id, finalScore, quizData.sinavAdi);
      setIsQuizFinished(true);
    }
  };
  
  const proceedAfterAd = () => {
    setShowAdScreen(false); // Reklam ekranını kapat
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex); // Bir sonraki soruya geç
      setIsAnswered(false);
      setSelectedAnswerIndex(null);
    }
  }

  // Reklam ekranı gösterildiğinde 5 saniyelik geri sayımı başlatan useEffect
  useEffect(() => {
    if (showAdScreen) {
      setAdCountdown(5); // Geri sayımı sıfırla
      const timer = setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Reklam ekranına otomatik kaydır
      setTimeout(() => {
        adScreenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [showAdScreen]);
  
  const handleRestart = () => {
     window.location.href = '/quizzes';
  }

  // --- YENİ EKLENEN KISIM: REKLAM EKRANI ---
  if (showAdScreen) {
    return (
      <div className={styles.quizPanel} ref={adScreenRef}>
        <div className={styles.adScreen}>
          <h3>Advertisement</h3>
          {/* EZOIC REKLAM ALANI */}
          {/* ÖNEMLİ: Bu ID'yi Ezoic panelinizde oluşturduğunuz yeni reklam birimi ID'si ile değiştirin */}
          <div id="ezoic-pub-ad-placeholder-651" style={{minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc'}}>
             Ad will be displayed here.
          </div>
          
          <button onClick={proceedAfterAd} className={styles.nextQuestionBtn} disabled={adCountdown > 0}>
            {adCountdown > 0 ? `Please wait... (${adCountdown})` : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  if (isQuizFinished) {
    // Final skoru ekranı aynı kalıyor...
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
        
        {/* 'ref' özelliğini buraya ekliyoruz */}
        <div ref={explanationRef}>
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
    </div>
  );
}