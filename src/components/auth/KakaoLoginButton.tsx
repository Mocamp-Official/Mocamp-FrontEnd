import React from 'react';

export default function KakaoLoginButton() {
  return (
    <button className="flex bg-[#FEE500] w-full max-w-md h-16 justify-center items-center relative border border-gray-300 rounded-[5px] group ">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-[5px] pointer-events-none transition-opacity duration-200"></div>
      <div className="absolute left-8 w-6 h-6 bg-gray-400">
        {/* 로고로 변경 예정 (구글) */}
      </div>
      <p className="text-gray-700 text-lg font-semibold">카카오로 시작하기</p>
    </button>
  );
}
