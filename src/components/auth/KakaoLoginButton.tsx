import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { platformType } from 'src/pages/login';

interface KakaoLoginButtonProps {
  platform: platformType;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ platform }) => {
  const router = useRouter();

  const handleKakaoLogin = async () => {
    const rest_api_key = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirect_url = 'http://localhost:3000/login';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`;
    localStorage.setItem('platform', 'kakao');
    window.location.href = kakaoURL;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex bg-[#FEE500] w-full h-[6.25rem] justify-center items-center relative border border-gray-300 rounded-[0.3125rem] group"
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-[0.3125rem] pointer-events-none transition-opacity duration-200"></div>
      <p className="text-[#3C1E1E] text-[1.75rem] font-semibold">카카오톡 계정으로 시작하기</p>
      <div
        className={`absolute right-[0.9375rem] top-[-1.625rem] items-center justify-center px-5 py-2.5 rounded-tl-[0.625rem] rounded-tr-[0.625rem] rounded-br-[0.625rem] bg-white border border-[#00af83] ${
          platform === 'kakao' ? 'flex' : 'hidden'
        }`}
      >
        <p className="flex w-24 h-8 text-xl justify-center items-center font-semibold text-[#00af83] text-center">
          최근 로그인
        </p>
      </div>
    </button>
  );
};

export default KakaoLoginButton;
