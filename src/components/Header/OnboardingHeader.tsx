import React from 'react';
import { useRouter } from 'next/router';

const OnboardingHeader = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };
  return (
    <header className="h-[100px] w-full min-w-[1024px] bg-white">
      <div className="relative mx-auto h-full w-full min-w-[1024px]">
        {/* 버튼(기존 디자인에서 패딩값, 폰트 크기 차이 존재*/}
        <button
          type="button"
          onClick={handleLoginClick}
          className="font-pre absolute top-[25px] right-[170px] flex h-[51px] w-[190px] cursor-pointer items-center justify-center rounded-[10px] border border-solid border-[#27CFA5] bg-[#27CFA5] px-[20px] py-[10px] text-[17px] leading-[100%] font-semibold tracking-[-0.02em] text-white lg:right-[239.5px] xl:right-80"
        >
          로그인 후 시작하기
        </button>
      </div>
    </header>
  );
};

export default OnboardingHeader;
