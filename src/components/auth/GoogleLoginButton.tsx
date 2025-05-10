import React from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/google/page`);
      const data = res.data;
      window.location.href = data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={() => {
        handleGoogleLogin();
      }}
      className="flex bg-white w-full h-[100px] justify-center items-center relative border border-gray-300 group"
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded pointer-events-none transition-opacity duration-200"></div>
      {/* <div className="absolute left-8 w-6 h-6 bg-gray-400">로고로 변경 예정 (구글)</div> */}
      <p className="text-gray-700 text-[28px] font-semibold">구글 계정으로 시작하기</p>
      <div className="absolute right-[15px] top-[-26px] items-center justify-center px-5 py-2.5 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] bg-white border border-[#00af83]">
        <p className="flex w-22.5 h-8 text-xl justify-center items-center font-semibold text-[#00af83] text-center">
          최근 로그인
        </p>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
