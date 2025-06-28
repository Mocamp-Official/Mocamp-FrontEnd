import { useEffect, useRef, useState } from 'react';
import WebcamCamera from '@/public/svgs/webcamcamera.svg';
import VoiceIcon from '@/public/svgs/VoiceIcon.svg';
import ChiefIcon from '@/public/svgs/chief_fire.svg';
import { Participant } from '@/types/webCam';
import WebCamMedia from '@/components/webcamPreview/WebCamMedia';

interface WebCamTileProps {
  participant: Participant;
  isLocal?: boolean;
  onToggleMedia: (mediaType: 'video' | 'audio', status: boolean) => void;
  adminUsername: string;
  onOpenDelegationModal: () => void;
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

const WebCamTile = ({
  participant,
  isLocal = false,
  onToggleMedia,
  adminUsername,
  onOpenDelegationModal,
}: WebCamTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(participant.cameraOn);
  const [micOn, setMicOn] = useState(participant.micOn);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  useEffect(() => {
    participant.stream?.getVideoTracks().forEach((track) => {
      track.enabled = cameraOn;
    });
  }, [cameraOn, participant.stream]);

  useEffect(() => {
    participant.stream?.getAudioTracks().forEach((track) => {
      track.enabled = micOn;
    });
  }, [micOn, participant.stream]);

  const displayName = participant.username;
  const isAdmin = adminUsername === participant.username;

  const toggleCamera = () => {
    setCameraOn((prev) => {
      onToggleMedia('video', !prev);
      return !prev;
    });
  };

  const toggleMic = () => {
    setMicOn((prev) => {
      onToggleMedia('audio', !prev);
      return !prev;
    });
  };

  return (
    <div className="relative flex h-[270px] w-[480px] flex-col justify-end rounded-[20px] bg-[#3D3D3D]">
      {cameraOn && participant.stream ? (
        <div className="absolute inset-0 z-0" style={{ transform: 'rotateY(180deg)' }}>
          <WebCamMedia stream={participant.stream} />
        </div>
      ) : (
        <span className="font-pre pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20px] font-semibold tracking-[-0.4px] text-[rgba(255,255,255,0.20)] select-none">
          카메라가 꺼져있습니다
        </span>
      )}

      {isAdmin && (
        <div className="absolute top-2 left-2">
          <ChiefIcon width={24} height={24} />
        </div>
      )}

      {isLocal && isAdmin && (
        <button
          onClick={onOpenDelegationModal}
          className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-xs text-gray-700 shadow hover:bg-gray-100"
        >
          방장 위임
        </button>
      )}

      <div className="absolute bottom-0 left-0 box-border flex w-full items-center px-[50px] pb-[33px]">
        <span className="font-pre flex-shrink-0 text-[20px] font-semibold tracking-[-0.4px] text-white">
          {displayName}
        </span>

        <div className="ml-auto flex items-center gap-[8px]">
          {participant.isWorking && (
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

export default WebCamTile;
