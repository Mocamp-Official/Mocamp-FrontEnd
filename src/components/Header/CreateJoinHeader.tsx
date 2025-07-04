// 마이 홈 헤더
import { MYHOME_PATH, ROOM_CREATE_PATH } from '@/constants/routes';
import { enterRoom } from '@/apis/room';
import { useRouter } from 'next/router'; 
import { useState } from 'react';
import { fetchRoomDataBySeq } from '@/apis/room';
import JoinRoomModal from './modal/Join';
import Portal from '../common/modal/Portal';

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

  const handleLogoClick = () => {
    router.asPath === MYHOME_PATH ? router.reload() : router.push(MYHOME_PATH);
  };

  return (
    <header className="h-[100px] justify-center bg-white">
      <div className="mx-auto flex h-full max-w-[1280px] justify-between">
        <img
          src="/svgs/MocampIcon.svg"
          alt="모캠프 로고"
          className="my-auto h-[48.46px] w-[120px] cursor-pointer"
          onClick={handleLogoClick}
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
