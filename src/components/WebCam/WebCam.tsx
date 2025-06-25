import { useEffect, useRef } from 'react';
import WebcamCamera from '@/public/svgs/webcamcamera.svg';
import VoiceIcon from '@/public/svgs/VoiceIcon.svg';
import { Participant } from '@/types/webCam';

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  opacity: number; //투명도 조절용
  disabled?: boolean; // 버튼 비활성화용
}

const IconButton = ({ onClick, children, opacity, disabled }: IconButtonProps) => (
  <button
    type="button"
    tabIndex={-1}
    onClick={onClick}
    disabled={disabled} 
    className={`ml-2 flex h-[40px] w-[40px] items-center justify-center rounded-[6.957px] border-none bg-[rgba(95,95,95,0.50)] p-0 backdrop-blur-[1.5px] transition-opacity duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-700/80'}`}
    style={{ opacity: disabled ? 0.5 : 1 }} 
  >
    <span className="flex h-full w-full items-center justify-center" style={{ opacity }}>
      {children}
    </span>
  </button>
);

interface WebCamTileProps {
  participant: Participant;
  isLocal?: boolean;
  // onToggleMedia 함수는 여전히 받지만, 여기서는 사용하지 않도록 버튼을 비활성화
  onToggleMedia: (mediaType: 'video' | 'audio', status: boolean) => void;
}

const WebCamTile = ({ participant, isLocal = false, onToggleMedia }: WebCamTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  const displayName = participant.username;

  return (
    <div className="relative flex h-[270px] w-[320px] flex-col justify-end rounded-[20px] bg-[#3D3D3D]">
      {participant.cameraOn && participant.stream ? (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            className="h-full w-full rounded-[20px] object-cover"
          />
        </div>
      ) : (
        <span className="font-pre pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20px] font-semibold tracking-[-0.4px] text-[rgba(255,255,255,0.20)] select-none">
          카메라가 꺼져있습니다
        </span>
      )}

      <div className="absolute bottom-0 left-0 box-border flex w-full items-center px-[20px] pb-[15px]">
        <span className="font-pre flex-shrink-0 text-[16px] font-semibold text-white">
          {displayName}
        </span>

        <div className="ml-auto flex items-center gap-[8px]">
          {participant.isWorking && (
            <span className="font-pre flex h-[30px] w-[80px] items-center justify-center rounded-[5px] bg-[var(--color-primary)] text-[12px] font-semibold text-white">
              작업 중
            </span>
          )}


          <IconButton
            // onClick={() => onToggleMedia('video', !participant.cameraOn)} // 클릭 이벤트 제거
            opacity={participant.cameraOn ? 1 : 0.2}
            disabled={true} 
          >
            <WebcamCamera width={24} height={24} style={{ fill: 'white' }} />
          </IconButton>

          {/* 마이크 아이콘 버튼 - 항상 비활성화 */}
          <IconButton
            // onClick={() => onToggleMedia('audio', !participant.micOn)} // 클릭 이벤트 제거
            opacity={participant.micOn ? 1 : 0.2}
            disabled={true}
          >
            <VoiceIcon
              width={24}
              height={24}
              style={{
                fill: 'white',
                display: 'block',
                margin: 'auto',
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default WebCamTile;
