//마이 홈 헤더
import { enterRoom } from '@/apis/room';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchRoomDataBySeq } from '@/apis/room';
import JoinRoomModal from './modal/Join';
import Portal from '../common/modal/Portal';
//생성 & 링크 붙여넣기 모달 개발 후 import

const CreateJoinHeader = () => {
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const router = useRouter();

  const handleJoinClick = () => setJoinModalOpen(true);

  const closeModals = () => {
    setJoinModalOpen(false);
  };

  const handleJoinRoom = async (roomSeq: string) => {
    try {
      // roomSeq -> roomId 변환
      const roomInfo = await fetchRoomDataBySeq(roomSeq);
      const roomId = roomInfo.roomId;

      //  방 입장 API 호출
      await enterRoom(roomId.toString(), {
        micTurnedOn: false,
        camTurnedOn: false,
      });

      router.push(`/preview/${roomId}`);
      closeModals();
    } catch (error) {
      console.error('방 입장 실패:', error);
      alert('방 입장에 실패했습니다.');
    }
  };

  const handleCreateClick = () => {
    router.push('/create');
  };

  return (
    <header className="sticky top-0 left-0 h-[53.333px] w-screen bg-white lg:h-[75px] xl:h-[100px]">
      <div className="relative mx-auto h-full w-full">
        <img
          src="/svgs/MocampIcon.svg"
          alt="모캠프 로고"
          className="absolute top-[13.67px] left-[170.67px] h-[25.83px] w-16 lg:top-[19.5px] lg:left-60 lg:h-[36.32px] lg:w-[90px] xl:top-[26px] xl:left-[320px] xl:h-[48.46px] xl:w-[120px]"
        />

        <button
          type="button"
          onClick={handleJoinClick}
          className="font-pre absolute top-[13.33px] right-[266.4px] flex h-[27px] w-[92px] items-center justify-center rounded-[5.333px] bg-gray-100 px-4 py-2 text-[9.6px] leading-[100%] font-semibold tracking-[-0.02em] text-[#555555] hover:bg-gray-200 lg:top-[18.75px] lg:right-[376px] lg:h-[38.5px] lg:w-[128px] lg:rounded-[7.5px] lg:px-[22.5px] lg:py-[11.25px] lg:text-[13.5px] xl:top-[25px] xl:right-[501px] xl:h-[51px] xl:w-[171px] xl:rounded-[10px] xl:px-[20px] xl:py-[10px] xl:text-[18px]"
        >
          모캠프 참여하기
        </button>

        <button
          type="button"
          onClick={handleCreateClick}
          className="font-pre absolute top-[13.33px] right-[169.87px] flex h-[27px] w-[92px] items-center justify-center rounded-[5.333px] bg-[#27CFA5] px-4 py-2 text-[9.6px] leading-[100%] font-semibold tracking-[-0.02em] text-white hover:bg-teal-500 lg:top-[18.75px] lg:right-[240.25px] lg:h-[38.5px] lg:w-[128px] lg:rounded-[7.5px] lg:px-[22.5px] lg:py-[11.25px] lg:text-[13.5px] xl:top-[25px] xl:right-80 xl:h-[51px] xl:w-[171px] xl:rounded-[10px] xl:px-[20px] xl:py-[10px] xl:text-[18px]"
        >
          모캠프 생성하기
        </button>
      </div>

      {isJoinModalOpen && (
        <Portal>
          <JoinRoomModal onClose={closeModals} onJoin={handleJoinRoom} />
        </Portal>
      )}
    </header>
  );
};

export default CreateJoinHeader;
