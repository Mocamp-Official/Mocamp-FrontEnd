//마이 홈 헤더
import { enterRoom } from '@/apis/room';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
//생성 & 링크 붙여넣기 모달 개발 후 import

const CreateJoinHeader = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const router = useRouter();
  //모달 열기
  const handleCreateClick = () => setCreateModalOpen(true);

  const handleJoinClick = async () => {
    try {
      await enterRoom('37', {
        micTurnedOn: false,
        camTurnedOn: false,
      });

      router.push('/room/37');
      setJoinModalOpen(true);
    } catch (error) {
      console.error('방 입장 실패:', error);
      alert('방 입장에 실패했습니다.');
    }
  };

  //모달 닫기
  const closeModals = () => {
    setCreateModalOpen(false);
    setJoinModalOpen(false);
  };

  return (
    <header className="h-[100px] w-full min-w-[1920px] bg-white">
      <div className="relative mx-auto h-full w-[1920px]">
        <img
          src="/svgs/MocampIcon.svg"
          alt="모캠프 로고"
          className="absolute top-[26px] left-[320px] h-[48.46px] w-[120px]"
        />

        <button
          type="button"
          onClick={handleJoinClick}
          className="font-pre absolute top-[25px] left-[1248px] flex h-[51px] w-[171px] items-center justify-center rounded-[10px] bg-gray-100 px-[20px] py-[10px] text-[18px] leading-[100%] font-semibold tracking-[-0.02em] text-[#555555] hover:bg-gray-200"
        >
          모캠프 참여하기
        </button>

        <button
          type="button"
          // onClick={handleCreateClick}
          className="font-pre absolute top-[25px] left-[1429px] flex h-[51px] w-[171px] items-center justify-center rounded-[10px] bg-[#27CFA5] px-[20px] py-[10px] text-[18px] leading-[100%] font-semibold tracking-[-0.02em] text-white hover:bg-teal-500"
        >
          모캠프 생성하기
        </button>
      </div>
      {/* 추 후 추가 */}
      {/* {/*<Modal isOpen={isJoinModalOpen} onClose={closeModals} title="모캠프 참여하기">
        <p>링크 붙여넣기 모달창</p></Modal> */}

      {/* <Modal isOpen={isCreateModalOpen} onClose={closeModals} title="모캠프 생성하기기">
        <p>방 생성 모달달</p> </Modal> */}
    </header>
  );
};

export default CreateJoinHeader;
