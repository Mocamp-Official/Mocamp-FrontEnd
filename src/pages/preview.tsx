import React from 'react';
import WebCamPreviewModal from '@/components/webcamPreview/WebCamPreview';
import { RoomInfo, UserInfo } from '@/types/preview';

// (목업)
const roomData: RoomInfo = {
  imageUrl: '',
  status: '진행 전',
  name: '은학샘과 아이들',
  date: '2025. 06. 03',
  duration: '3h 30m',
};

const userData: UserInfo = {
  nickname: '이수민',
  isWorking: true,
  cameraOn: false,
  micOn: true,
};

const WebCamPreviewPage = () => {
  const handleClose = () => {};
  const handleEditRoom = () => {};
  const handleEnterRoom = () => {};

  const isHost = true; //방장여부

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
      <WebCamPreviewModal
        room={roomData}
        user={userData}
        isHost={isHost}
        onClose={handleClose}
        onEditRoom={handleEditRoom}
        onEnterRoom={handleEnterRoom}
      />
    </div>
  );
};

export default WebCamPreviewPage;
