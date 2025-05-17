import React from 'react';

const SlideCard1 = () => {
  return (
    // 전체 카드 컨테이너
    <div className="flex w-[900px] h-[500px] shrink-0 bg-gray2 rounded-[20px] border border-gray4 px-[50px] gap-[54px]">
      {/* 왼쪽 텍스트 블럭 (제목 + 설명) */}
      <div className="flex w-full gap-5 flex-col">
        {/* 슬로건 제목 */}
        <span className="text-primary flex items-center h-[45px] text-title2 mt-[68px]">
          누구나 쉬운 목표 관리
        </span>

        {/* 설명 문구 */}
        <span className="text-gray9 flex items-center h-[76px] text-title3 !font-medium">
          오늘 수행할 목표를 작성하고, <br />
          체크박스를 눌러 게이지 UP!
        </span>
      </div>

      {/* 오른쪽 카드 콘텐츠 (진행도 + 투두리스트) */}
      <div className="flex flex-col gap-[18px] justify-center">
        {/* 진행도 박스 */}
        <div className="flex flex-col rounded-[20px] p-[30px] mt-[3px] bg-gray1 border border-gray4 gap-5">
          <div className="flex items-center gap-[20.38px]">
            {/* 진행 상태 뱃지 */}
            <span className="px-[30px] py-[10px] text-lg font-medium rounded-4xl bg-[#D7F0FF] text-blue border border-blue">
              1/2
            </span>

            {/* 진행 설명 */}
            <span className="text-gray9 text-body1">
              목표 두 개 꼭 완수하기!
            </span>
          </div>

          {/* 게이지 바 */}
          <div className="relative bg-gray3 w-[417.7px] h-[27.84px] rounded-[20px]">
            <div className="absolute top-0 left-0 rounded-[20px] h-full w-[208.5px] bg-primary" />
          </div>
        </div>

        {/* 투두 리스트 박스 */}
        <div className="flex flex-col rounded-[20px] p-[50px] bg-white border border-gray4 gap-5">
          {/* 투두 항목 1 (완료) */}
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 border rounded-[10px] border-primary bg-[#BEF1E4]" />
            <span className="line-through text-gray6 text-body1">
              디자인 가이드라인 설정하기
            </span>
          </div>

          {/* 투두 항목 2 (미완료) */}
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 border rounded-[10px] border-gray4 bg-gray1" />
            <span className="text-body1 text-gray9">
              중충실도 와이어프레임 설계하기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCard1;
