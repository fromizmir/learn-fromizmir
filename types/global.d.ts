// Bu dosya, TypeScript'e 'ezstandalone' adında bir nesnenin 
// window üzerinde var olacağını ve hangi fonksiyonlara sahip olduğunu söyler.
export {};

declare global {
  interface Window {
    ezstandalone: {
      cmd: any[];
      define: (...args: number[]) => void;
      enable: () => void;
      display: () => void;
      refresh: () => void;
      showAds: (...args: any[]) => void;
    };
  }
}