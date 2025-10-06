"use client";

import { useEffect } from 'react';

export default function AdPlaceholder({ adId }: { adId: string }) {
  
  useEffect(() => {
    console.log(`AdPlaceholder mounting for adId: ${adId}`);
    if (typeof window.ezstandalone !== 'undefined') {
      const numericAdId = parseInt(adId);
      if (!isNaN(numericAdId)) {
        window.ezstandalone.cmd.push(function() {
          console.log(`Ezoic: Defining and displaying ad unit ${numericAdId}`);
          window.ezstandalone.define(numericAdId);
          window.ezstandalone.enable();
          window.ezstandalone.display();
        });
      }
    }
  }, [adId]);

  return (
    <div 
      id={`ezoic-pub-ad-placeholder-${adId}`} 
      style={{
        minHeight: '250px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        border: '1px dashed #ccc',
        width: '100%'
      }}
    >
      {/* Bu div'i Ezoic dolduracak */}
    </div>
  );
}