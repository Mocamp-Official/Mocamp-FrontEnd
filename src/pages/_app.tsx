import localFont from 'next/font/local';
import Script from 'next/script';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.woff2',
      style: 'normal',
    },
  ],
});

declare global {
  interface Window {
    Kakao: any;
    kakaoSdkLoaded: boolean;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const handleKakaoScriptLoad = () => {
    if (typeof window !== 'undefined') {
      window.kakaoSdkLoaded = true;
      console.log('Kakao SDK 스크립트 로드 완료!');
    }
  };

  return (
    <main className={pretendard.className}>
      <Component {...pageProps} />
      <SpeedInsights />

      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={handleKakaoScriptLoad} 
      />
    </main>
  );
}

