import Image from 'next/image';

const SideBar = () => {
  return (
    <div className="w-72 h-[880px] rounded-[20px] bg-white flex flex-col items-center relative overflow-hidden">
      {/* 사이드바 헤더 */}
      <div className="w-full h-[60px] bg-[#27CFA5] rounded-t-[20px] flex items-center justify-center">
        <p className="text-xl font-semibold text-white">마이페이지</p>
      </div>

      {/* 유저 프로필 이미지 */}
      <div className="mt-[50px] relative w-[200px] h-[197px] flex items-center justify-center rounded-full border-2 border-[#27CFA5]">
        <Image
          src="/defaultProfile.png"
          width={200}
          height={197}
          alt="프로필 사진"
          className="rounded-full"
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
