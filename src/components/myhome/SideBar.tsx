import Image from 'next/image';

const SideBar = () => {
  return (
    <div className="w-[18rem] h-[55rem] rounded-[1.25rem] bg-white flex flex-col items-center relative overflow-hidden">
      {/* 사이드바 헤더 */}
      <div className="w-full h-[3.75rem] bg-[#27CFA5] rounded-t-[1.25rem] flex items-center justify-center">
        <p className="text-xl font-semibold text-white">마이페이지</p>
      </div>

      {/* 유저 프로필 이미지 */}
      <div className="mt-[3.125rem] relative w-[12.5rem] h-[12.3125rem] flex items-center justify-center rounded-full border-2 border-[#27CFA5]">
        <Image
          src="/defaultProfile.png"
          width={200}
          height={197}
          alt="프로필 사진"
          className="rounded-full"
        />
      </div>

      {/* 유저 이름 */}
      <p className="mt-[1.875rem] text-[1.75rem] font-semibold text-[#555]">이주은님</p>

      {/* 메뉴 박스 */}
      <div className="mt-[1.875rem] w-[14.25rem] h-[11.75rem] flex flex-col gap-4 p-[1.25rem] bg-white border border-[#e8e8e8] rounded-[0.625rem]">
        <p className="text-xl font-semibold text-[#27cfa5]">프로필 설정</p>
        <hr className="border-[#e8e8e8]" />
        <p className="text-xl font-medium text-[#555555]">참여한 모캠프</p>
        <hr className="border-[#e8e8e8]" />
        <p className="text-xl font-medium text-[#555555]">모캠프 사용 추이</p>
      </div>

      {/* 로그아웃 버튼 */}
      <button className="mt-[10.8125rem] w-[14.25rem] h-[4.375rem] bg-white border border-[#e8e8e8] rounded-[0.625rem] text-xl font-semibold text-[#555555]">
        로그아웃
      </button>
    </div>
  );
};

export default SideBar;
