import React from 'react';

export default function GoogleLoginButton() {
  return (
    <button className="flex bg-[#FFFFFF] w-[450px] max-w-md h-16 justify-center items-center space-x-4 rounded-[5px] relative border border-[#D4D4D4]">
      <div className="absolute left-[30px] w-6 h-6 bg-[#a3a3a3]">
        {/* 로고로 변경 예정 (네이버) */}
      </div>
      <p className="text-[#4B4B4B] text-lg font-semibold">구글로 시작하기</p>
    </button>
  );
}
