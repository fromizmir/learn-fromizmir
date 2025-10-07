// Dosya: app/ad-test/page.tsx
"use client";

import { useState, useEffect } from "react";

// Test etmek için kullanacağımız reklam ID'leri
const adIds = ["649", "650", "651", "652"];

export default function AdTestPage() {
  const [clickCount, setClickCount] = useState(0);
  const [currentAdId, setCurrentAdId] = useState<string | null>(null);

  const showNextAd = () => {
    // Sıradaki reklam ID'sini seç ve state'i güncelle
    const nextAdId = adIds[clickCount % adIds.length];
    setCurrentAdId(nextAdId);
    setClickCount(clickCount + 1);
  };

  // currentAdId her değiştiğinde bu blok çalışır
  useEffect(() => {
    if (currentAdId) {
      console.log(`Attempting to show and refresh ad unit: ${currentAdId}`);
      if (typeof window.ezstandalone !== 'undefined') {
        const numericAdId = parseInt(currentAdId);
        if (!isNaN(numericAdId)) {
          // Ezoic'e bu yeni alanı tanımlamasını ve yenilemesini söylüyoruz
          window.ezstandalone.cmd.push(function() {
            window.ezstandalone.define(numericAdId);
            window.ezstandalone.enable();
            window.ezstandalone.display();
          });
        }
      }
    }
  }, [currentAdId]);

  return (
    <main style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Ezoic Ad Test Page</h1>
      <p>Bu buton, her tıklandığında farklı bir reklam alanı göstermeyi deneyecek.</p>
      
      <button 
        onClick={showNextAd} 
        style={{ padding: "10px 20px", fontSize: "1rem", marginBottom: "30px", cursor: 'pointer' }}
      >
        Show Next Ad (Clicked {clickCount} times)
      </button>

      {/* Reklam alanı sadece currentAdId dolu olduğunda gösterilir */}
      {currentAdId && (
        // 'key' prop'u, React'in bu bölümü her seferinde sıfırdan oluşturmasını sağlar
        <div key={currentAdId}>
          <h3>Now Showing Ad Unit: {currentAdId}</h3>
          <div 
            id={`ezoic-pub-ad-placeholder-${currentAdId}`} 
            style={{ 
              minHeight: "250px", 
              border: "1px dashed grey", 
              marginTop: "20px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Ad placeholder for {currentAdId}
          </div>
        </div>
      )}
    </main>
  );
}