"use client";

import { useState } from 'react';
import styles from './WordLookup.module.css'; // Birazdan oluşturacağız

// Dışarıdan 'word' adında bir prop (kelime) alır
export default function WordLookup({ word }: { word: string }) {
  const [definition, setDefinition] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDefinition = async () => {
    if (definition) { // Eğer tanım zaten varsa, tekrar çekme
      setDefinition(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Definition not found.');
      }
      const data = await response.json();
      
      // API'den gelen ilk anlamı alıyoruz
      const firstMeaning = data[0]?.meanings[0]?.definitions[0]?.definition;
      setDefinition(firstMeaning || 'No definition available.');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className={styles.container}>
      <span onClick={fetchDefinition} className={styles.word}>
        {word}
      </span>
      {isLoading && <span className={styles.loading}> Loading...</span>}
      {error && <span className={styles.error}> ({error})</span>}
      {definition && (
        <span className={styles.definitionBox}>
          {definition}
        </span>
      )}
    </span>
  );
}