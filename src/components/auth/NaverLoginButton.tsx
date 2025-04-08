import React from 'react';

export default function NaverLoginButton() {
  return (
    <button className="flex bg-[#05C050] w-[450px] max-w-md h-16 justify-center items-center space-x-4 rounded-[5px] relative">
      <div className="absolute left-[30px] w-6 h-6 bg-[#a3a3a3]">
        {/* 로고로 변경 예정 (네이버) */}
      </div>
      <p className="text-white text-lg font-semibold">네이버로 시작하기</p>
    </button>
  );
}
