import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 카카오 SDK 스크립트 */}
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
