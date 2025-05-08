import React from 'react';

const KakaoLoginButton = () => {
  return (
    <button className="flex bg-[#FEE500] w-full h-16 justify-center items-center relative border border-gray-300 rounded-[5px] group ">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-[5px] pointer-events-none transition-opacity duration-200"></div>
      {/* <div className="absolute left-8 w-6 h-6 bg-gray-400">로고로 변경 예정 (구글)</div> */}
      <p className="text-[#3C1E1E] text-lg font-semibold">
        카카오톡 계정으로 시작하기
      </p>
      <div className="absolute right-[75px] top-[-26px] items-center justify-center px-5 py-2.5 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] bg-white border border-[#00af83]">
        <p className="flex w-22.5 h-8 text-xl justify-center items-center font-semibold text-[#00af83] text-center">
          최근 로그인
        </p>
      </div>
    </button>
  );
};

export default KakaoLoginButton;
