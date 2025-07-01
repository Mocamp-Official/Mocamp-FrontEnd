import { useState, useEffect } from 'react';
import WebCamMedia from './WebCamMedia';
import WebcamCamera from '@/public/svgs/webcamcamera.svg';
import VoiceIcon from '@/public/svgs/VoiceIcon.svg';
import { UserInfo } from '../../types/preview';

interface CamProps {
  user: UserInfo;
  stream: MediaStream | null;
  error?: string | null;
  roomId: number;
}

const IconButton = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    tabIndex={-1}
    onClick={onClick}
    className="ml-2 flex h-[40px] w-[40px] items-center justify-center rounded-[6.957px] border-none bg-[rgba(95,95,95,0.50)] p-0 backdrop-blur-[1.5px]"
  >
    <span className="flex h-full w-full items-center justify-center">{children}</span>
  </button>
);


const WebCamSection = ({ user, stream, roomId }: CamProps) => {
  const [cameraOn, setCameraOn] = useState(user.cameraOn ?? true);
  const [micOn, setMicOn] = useState(user.micOn ?? true);

  useEffect(() => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = cameraOn;
    });
  }, [stream, cameraOn]);

  useEffect(() => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = micOn;
    });
  }, [stream, micOn]);


const toggleCamera = () => {
  setCameraOn((prev) => !prev);
};

const toggleMic = () => {
  setMicOn((prev) => !prev);
};


  return (
    <div
  className="
    relative flex flex-col justify-end rounded-[20px] bg-[#3D3D3D] w-[277.333px] h-[144px] lg:w-[390px] lg:h-[202.5px] xl:w-[520px] xl:h-[270px]">
      {cameraOn && stream && (
        <div className="absolute inset-0 z-0">
          <WebCamMedia stream={stream} />
        </div>
      )}
      {!cameraOn && (
        <span className="font-pre pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20px] font-semibold tracking-[-0.4px] text-[rgba(255,255,255,0.20)] select-none">
          카메라가 꺼져있습니다
        </span>
      )}
      <div className="absolute bottom-0 left-0 box-border flex w-full items-center px-[50px] pb-[33px]">
        <span className="font-pre flex-shrink-0 text-[20px] font-semibold tracking-[-0.4px] text-white">
          {user.nickname}
        </span>
        <div className="ml-auto flex items-center gap-[8px]">
          {user.isWorking && (
            <span className="font-pre flex h-[40px] w-[107px] items-center justify-center rounded-[5px] bg-[var(--color-primary)] p-[10px_20px] text-[16px] font-semibold tracking-[-0.32px] text-white">
              작업 중
            </span>
          )}
          <IconButton onClick={toggleCamera}>
            <WebcamCamera width={24} height={24} style={{ opacity: cameraOn ? 1 : 0.2 }} />
          </IconButton>
          <IconButton onClick={toggleMic}>
            <VoiceIcon
              width={24}
              height={24}
              style={{
                opacity: micOn ? 1 : 0.2,
                display: 'block',
                margin: 'auto',
                transform: 'translate(4px, 2px)',
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default WebCamSection;
