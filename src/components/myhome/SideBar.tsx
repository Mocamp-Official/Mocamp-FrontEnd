import React from 'react';

const SideBar = () => {
  return (
    <div className="w-72 h-[881px] rounded-[20px] bg-white shadow-md flex flex-col items-center pt-0 relative overflow-hidden">
      {/* 상단 헤더 */}
      <div className="w-full h-[60px] bg-[#27cfa5] rounded-t-[20px] flex items-center justify-center">
        <p className="text-xl font-semibold text-white">마이페이지</p>
      </div>

      {/* 유저 프로필 이미지 */}
      <div className="mt-10 relative w-[200px] h-[197px] flex items-center justify-center">
        <svg
          width={200}
          height={197}
          viewBox="0 0 200 197"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute"
        >
          <path
            d="M100 1C154.69 1 199 44.6664 199 98.5C199 152.334 154.69 196 100 196C45.3095 196 1 152.334 1 98.5C1 44.6664 45.3095 1 100 1Z"
            fill="white"
            stroke="#27CFA5"
            strokeWidth={2}
          />
        </svg>
        <img
          src="ellipse-8438.png"
          alt="User"
          className="w-[120px] h-[120px] object-cover rounded-full z-10"
        />
      </div>

      {/* 유저 이름 */}
      <p className="mt-4 text-[28px] font-semibold text-[#555]">이주은님</p>

      {/* 메뉴 박스 */}
      <div className="mt-6 w-[228px] flex flex-col gap-4 p-5 bg-white border border-[#e8e8e8] rounded-[10px]">
        <p className="text-xl font-semibold text-[#27cfa5]">프로필 설정</p>
        <hr className="border-[#e8e8e8]" />
        <p className="text-xl font-medium text-[#4b4b4b]">참여한 모캠프</p>
        <hr className="border-[#e8e8e8]" />
        <p className="text-xl font-medium text-[#4b4b4b]">모캠프 사용 추이</p>
      </div>

      {/* 로그아웃 버튼 */}
      <button className="mt-6 w-[228px] h-[70px] bg-white border border-[#e8e8e8] rounded-[10px] text-xl font-semibold text-[#555]">
        로그아웃
      </button>
    </div>
  );
};

export default SideBar;
