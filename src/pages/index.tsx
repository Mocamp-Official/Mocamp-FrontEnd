'use client';

import React from 'react';
import { useRouter } from 'next/router';
import MocampIcon from '@/public/svgs/MocampIcon.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SlideCard1 from '@/components/onBoarding/SlideCard1';
// import SlideCard2 from '@/components/onBoarding/SlideCard2';
// import SlideCard3 from '@/components/onBoarding/SlideCard3';

const OnBoarding = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const slides = [<SlideCard1 />, <SlideCard1 />, <SlideCard1 />];

  return (
    <div className="flex flex-col bg-gray1 w-screen h-screen relative">
      <button
        onClick={handleLogin}
        className="absolute top-[25px] h-[51px] w-[190px] shrink-0 right-[320px] text-gray1 flex items-center text-body2 !font-semibold bg-primary justify-center border border-primary rounded-[10px] px-[30px] py-[15px]"
      >
        로그인 후 시작하기
      </button>

      <div className="h-full mx-auto justify-center items-center flex flex-col">
        <MocampIcon className="w-[250px] h-[100px] mb-[50.05px]" />
        <p className="text-gray9 text-title2 !font-medium mb-[49px]">
          함께 모여 캠키고 성취하는&nbsp;
          <span className="text-[#27CFA5] font-semibold">우리만의 공간</span>
        </p>

        <div className="w-full max-w-[900px]">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 10000000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
            loop
            className="w-full"
          >
            {slides.map((Component, idx) => (
              <SwiperSlide key={idx}>{Component}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-custom-pagination flex justify-center mt-[25px] gap-5" />
      </div>
    </div>
  );
};

export default OnBoarding;
