import axios from 'axios';
import React from 'react';
import { platformType } from 'src/pages/login';

interface NaverLoginButtonProps {
  platform: platformType;
}

const NaverLoginButton: React.FC<NaverLoginButtonProps> = ({ platform }) => {
  const handleNaverLogin = async () => {
    try {
      localStorage.setItem('platform', 'naver');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/naver/page`);
      const data = res.data;
      console.log(data);
      // window.location.href = data;
    } catch (err) {
      console.error('err');
    }
  };

  return (
    <button
      onClick={() => {
        handleNaverLogin();
      }}
      className="flex bg-[#05C050] w-full h-[6.25rem] justify-center items-center relative border border-gray-300 rounded-[0.3125rem] group"
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-[0.3125rem] pointer-events-none transition-opacity duration-200"></div>
      {/* <div className="absolute left-8 w-6 h-6 bg-gray-400">로고로 변경 예정 (구글)</div> */}
      <p className="text-[#ffffff] text-[1.75rem] font-semibold">네이버 계정으로 시작하기</p>
      <div
        className={`absolute right-[0.9375rem] top-[-1.625rem] items-center justify-center px-5 py-2.5 rounded-tl-[0.625rem] rounded-tr-[0.625rem] rounded-br-[0.625rem] bg-white border border-[#00af83] ${
          platform === 'naver' ? 'flex' : 'hidden'
        }`}
      >
        <p className="flex w-24 h-8 text-xl justify-center items-center font-semibold text-[#00af83] text-center">
          최근 로그인
        </p>
      </div>
    </button>
  );
};

export default NaverLoginButton;
