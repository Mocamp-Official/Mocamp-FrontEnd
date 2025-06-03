//카메라가 켜졌을 경우 RTC연결
//마이크 아이콘 정렬.. 다시 생각
import WebcamCamera from '@/public/svgs/webcamcamera.svg';
import VoiceIcon from '@/public/svgs/VoiceIcon.svg';
import { UserInfo } from '../../types/preview';

const IconButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    tabIndex={-1}
    aria-hidden="true"
    className="ml-2 flex h-[40px] w-[40px] items-center justify-center rounded-[6.957px] border-none bg-[rgba(95,95,95,0.50)] p-0 backdrop-blur-[1.5px]"
  >
    <span className="flex h-full w-full items-center justify-center">{children}</span>
  </button>
);

const WebCamSection = ({ user }: { user: UserInfo }) => (
  <div className="relative flex h-[270px] w-[520px] flex-col justify-end rounded-[20px] bg-[#3D3D3D]">
    {/* 카메라 꺼짐 */}
    {!user.cameraOn && (
      <span className="font-pre pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20px] font-semibold tracking-[-0.4px] text-[rgba(255,255,255,0.20)] select-none">
        카메라가 꺼져있습니다
      </span>
    )}
    {/* 정보 필드 */}
    <div className="absolute bottom-0 left-0 box-border flex w-full items-center px-[50px] pb-[33px]">
      {/* 닉네임 */}
      <span className="font-pre flex-shrink-0 text-[20px] font-semibold tracking-[-0.4px] text-white">
        {user.nickname}
      </span>
      {/* 작업중/카메라/마이크 */}
      <div className="ml-auto flex items-center gap-[8px]">
        {user.isWorking && (
          <span className="font-pre flex h-[40px] w-[107px] items-center justify-center rounded-[5px] bg-[var(--color-primary)] p-[10px_20px] text-[16px] font-semibold tracking-[-0.32px] text-white">
            작업 중
          </span>
        )}
        <IconButton>
          <WebcamCamera width={24} height={24} style={{ opacity: user.cameraOn ? 1 : 0.2 }} />
        </IconButton>
        <IconButton>
          <VoiceIcon
            width={24}
            height={24}
            style={{
              opacity: user.micOn ? 1 : 0.2,
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

export default WebCamSection;
