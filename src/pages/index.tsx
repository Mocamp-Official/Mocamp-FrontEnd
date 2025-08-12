// pages/index.tsx
import Head from 'next/head';
import MocampIcon from '@/public/svgs/MocampIcon.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CreateRoomCard from '@/components/onBoarding/cards/CreateRoomCard';
import AchievementCard from '@/components/onBoarding/cards/AchievementCard';
import GoalManagementCard from '@/components/onBoarding/cards/GoalManagementCard';
import OnboardingHeader from '@/components/Header/OnboardingHeader';
import Footer from '@/components/Footer/Footer';

const slides = [CreateRoomCard, AchievementCard, GoalManagementCard];

const OnBoarding = () => {
  return (
    <>
      <Head>
        <title>모캠프 - 함께 모여 캠핑하고 성취하는 공간</title>
        <meta name="description" content="모여서 캠키고 프로젝트" />
        <meta
          name="keywords"
          content="모캠프, 모여서, 캠키고, 프로젝트, 모여서 캠키고 프로젝트, 캠, 프로젝트, 목표관리, 스터디모임, 스터디, 모임"
        />
        <meta property="og:title" content="모캠프 메인" />
        <meta
          property="og:description"
          content="대학생과 청년이 함께 캠핑하고 목표를 성취하는 모임 플랫폼, 모캠프"
        />
        <meta property="og:image" content="https://mocamp-front-end.vercel.app/svgs/MocampIcon" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://mocamp-front-end.vercel.app" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex min-h-screen w-screen flex-col">
        <div className="flex h-screen flex-col">
          <OnboardingHeader />
          <div className="relative flex flex-col items-center justify-center pt-[39.67px] pb-20 lg:pt-[50.25px] lg:pb-[112.5px] xl:pt-[74px] xl:pb-[150px]">
            <MocampIcon className="mb-[26.72px] h-[54px] w-[133px] object-contain lg:mb-[37.58px] lg:h-[75.7px] lg:w-[187.5px] xl:mb-[50.1px] xl:h-[100px] xl:w-[250px]" />
            <p className="text-gray9 xl:text-title2 mb-[26.13px] text-[15px] leading-[160%] font-medium lg:mb-[36.5px] lg:text-[21px] xl:mb-[49px]">
              함께 모여 캠핑하고 성취하는&nbsp;
              <span className="text-primary font-semibold">우리만의 공간</span>
            </p>

            <div className="w-full max-w-[480px] lg:max-w-[675px] xl:max-w-[900px]">
              <Swiper
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
                loop
                className="w-full"
              >
                {slides.map((Slide, idx) => (
                  <SwiperSlide key={idx}>
                    <Slide />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="swiper-custom-pagination mt-[13.3px] flex justify-center gap-[10px] lg:mt-[18.75px] lg:gap-[15px] xl:mt-[25px] xl:gap-5" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OnBoarding;
