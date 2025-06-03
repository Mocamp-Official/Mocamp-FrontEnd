import ModalLayout from './ModalLayout';
import CloseButton from '@/public/svgs/CloseButton.svg';
import RoomInfoSection from './RoomInfo';
import WebCamSection from './Cam';
import ActionButtons from './Buttons';
import { RoomInfo, UserInfo } from '../../types/preview';

interface WebCamPreviewModalProps {
  onClose: () => void;
  room: RoomInfo;
  user: UserInfo;
  isHost: boolean;
  onEditRoom: () => void;
  onEnterRoom: () => void;
}

const WebCamPreviewModal = ({
  onClose,
  room,
  user,
  isHost,
  onEditRoom,
  onEnterRoom,
}: WebCamPreviewModalProps) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#F8F8F8]">
      <ModalLayout onClose={onClose} width="660px" height="880px">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[50px] right-[50px] h-[25px] w-[25px] cursor-pointer text-[#d9d9d9]"
        >
          <CloseButton />
        </button>

        {/* 소제목 */}
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2">
          <span className="font-pre inline-flex flex-row items-center justify-center gap-[10px] rounded-full border border-[var(--color-primary)] bg-[var(--color-gray1)] px-[20px] py-[10px] text-[16px] font-semibold tracking-[-0.32px] text-[var(--color-primary)]">
            Web Cam Preview
          </span>
        </div>

        {/* 안내 문구 */}
        <div className="font-pre absolute top-[119px] left-1/2 w-[336px] -translate-x-1/2 text-center text-[24px] leading-[160%] font-semibold tracking-[-0.48px] text-[var(--color-gray9)]">
          입장할 방의 정보와 카메라 환경이
          <br />
          올바르게 세팅되었는지 확인해주세요
        </div>

        {/* 프레임 (방 정보 + 웹캠) */}
        <div className="absolute top-[225px] left-[50px] flex h-[481px] w-[560px] flex-col items-center rounded-[10px] border border-[var(--color-gray4)] bg-[var(--color-gray1)] p-0">
          <RoomInfoSection room={room} />
          <div className="absolute top-[170px] left-0 h-[1px] w-full bg-[var(--color-gray4)]" />
          <div className="absolute top-[190px] left-1/2 -translate-x-1/2">
            <WebCamSection user={user} />
          </div>
        </div>

        {/* 버튼 */}
        <div
          className={`absolute right-[50px] bottom-[50px] left-[50px] flex w-[560px] ${isHost ? 'justify-start gap-[16px]' : 'justify-center gap-0'} `}
        >
          <ActionButtons
            isHost={isHost}
            roomName={room.name}
            onEditRoom={onEditRoom}
            onEnterRoom={onEnterRoom}
          />
        </div>
      </ModalLayout>
    </div>
  );
};

export default WebCamPreviewModal;
