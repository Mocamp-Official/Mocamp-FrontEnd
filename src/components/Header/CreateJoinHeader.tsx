import React from 'react';

const CreateJoinHeader = () => {
return (
    <header className="w-full bg-white h-[100px] min-w-[1920px]">
    <div className="relative w-[1920px] h-full mx-auto">
        <img
        src="/mocamp_logo.svg"
        alt="모캠프 로고"
        className="absolute top-[26px] left-[320px] w-[120px] h-[48.46px]"
        />

        {/* 버튼(기존 디자인에서 패딩값, 폰트 크기 차이 존재*/}
        <button
        type="button"
        className="
        absolute top-[25px] left-[1248px]
        w-[171px] h-[51px]
        rounded-[10px]
        px-[20px] py-[10px]
        font-pre font-semibold
        text-[17px] leading-[100%] tracking-[-0.02em] 
        text-[#555555]
        bg-gray-100
        hover:bg-gray-200
        flex items-center justify-center"
        >
        모캠프 참여하기
        </button>


        <button
        type="button"
        className="
        absolute top-[25px] left-[1429px]
        w-[171px] h-[51px]
        rounded-[10px]
        px-[20px] py-[10px]
        font-pre font-semibold
        text-[17px] leading-[100%] tracking-[-0.02em]
        text-white
        bg-[#27CFA5]
        hover:bg-teal-500
        flex items-center justify-center"
        >
        모캠프 생성하기
        </button>
    </div>
    </header>
);
};

export default CreateJoinHeader;
