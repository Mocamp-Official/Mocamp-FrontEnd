import React from 'react';

const SlideCard1 = () => {
  return (
    // 전체 카드 컨테이너
    <div className="bg-gray2 border-gray4 flex h-[267px] w-[480px] shrink-0 gap-[28px] rounded-[20px] border px-[26.67px] pt-[36.27px] pb-[34.75px] lg:h-[375px] lg:w-[675px] lg:gap-10 lg:px-[37.5px] lg:pt-[51px] lg:pb-[48.87px] xl:h-[500px] xl:w-[900px] xl:gap-[54px] xl:px-[50px] xl:pt-[70px] xl:pb-[71.15px]">
      {/* 왼쪽 텍스트 블럭 (제목 + 설명) */}
      <div className="flex w-full min-w-[142px] flex-col gap-5 lg:max-w-50 xl:max-w-[266px]">
        {/* 슬로건 제목 */}
        <span className="text-primary xl:text-title2 flex h-6 items-center text-[15px] font-semibold tracking-[-0.02em] lg:h-[34px] lg:text-[21px] xl:h-[45px]">
          누구나 쉬운 목표 관리
        </span>

        {/* 설명 문구 */}
        <span className="text-gray9 xl:text-title3 flex h-10 flex-col items-center text-[12.8px] leading-[160%] font-medium tracking-[-0.02em] lg:h-[58px] lg:text-lg xl:h-[76px]">
          오늘 수행할 목표를 작성하고,
          <br />
          체크박스를 눌러 게이지 UP!
        </span>
      </div>

      {/* 오른쪽 카드 콘텐츠 (진행도 + 투두리스트) */}
      <div className="flex h-fit min-w-64 flex-col justify-center gap-[9.8px] lg:gap-[13.25px] xl:gap-[18px]">
        {/* 진행도 박스 */}
        <div className="bg-gray1 border-gray4 flex flex-col gap-[10.67px] rounded-[10.67px] border p-4 lg:gap-[15px] lg:rounded-[15px] lg:p-[22.5px] xl:gap-5 xl:rounded-[20px] xl:p-[30px]">
          <div className="flex items-center gap-[10.37px] lg:gap-[15.06px] xl:gap-[20.38px]">
            {/* 진행 상태 뱃지 */}
            <span className="text-blue border-blue rounded-4xl border bg-[#D7F0FF] px-4 py-[5.33px] text-[9.6px] font-medium lg:px-[22.5px] lg:py-[7.5px] lg:text-[13.5px] xl:px-[30px] xl:py-[10px] xl:text-lg">
              1/2
            </span>

            {/* 진행 설명 */}
            <span className="text-gray9 xl:text-body1 text-[10.67px] font-medium lg:text-[15px]">
              목표 두 개 꼭 완수하기!
            </span>
          </div>

          {/* 게이지 바 */}
          <div className="bg-gray3 relative h-[14.85px] w-[222.75px] rounded-[10.67px] lg:h-[20.88px] lg:w-[313.25px] lg:rounded-[15px] xl:h-[27.84px] xl:w-[417.7px] xl:rounded-[20px]">
            <div className="bg-primary absolute top-0 left-0 h-full w-[111px] rounded-[10.67px] lg:w-[156.37px] lg:rounded-[15px] xl:w-[208.5px] xl:rounded-[20px]" />
          </div>
        </div>

        {/* 투두 리스트 박스 */}
        <div className="border-gray4 flex flex-col gap-[10.67px] rounded-[10.67px] border bg-white p-[26.67px] lg:gap-[15px] lg:rounded-[15px] lg:p-[37.5px] xl:gap-5 xl:rounded-[20px] xl:p-[50px]">
          {/* 투두 항목 1 (완료) */}
          <div className="l flex items-center gap-[10.67px] lg:gap-[15px] xl:gap-5">
            <div className="border-primary h-[21.33px] w-[21.33px] rounded-[5.3px] border bg-[#BEF1E4] lg:h-[30px] lg:w-[30px] lg:rounded-[7.5px] xl:h-10 xl:w-10 xl:rounded-[10px]" />
            <span className="text-gray6 xl:text-body1 text-[10.67px] font-medium line-through lg:text-[15px]">
              디자인 가이드라인 설정하기
            </span>
          </div>

          {/* 투두 항목 2 (미완료) */}
          <div className="flex items-center gap-[10.67px] lg:gap-[15px] xl:gap-5">
            <div className="border-gray4 bg-gray1 h-[21.33px] w-[21.33px] rounded-[5.3px] border lg:h-[30px] lg:w-[30px] lg:rounded-[7.5px] xl:h-10 xl:w-10 xl:rounded-[10px]" />
            <span className="xl:text-body1 text-gray9 text-[10.67px] font-medium lg:text-[15px]">
              중충실도 와이어프레임 설계하기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCard1;
