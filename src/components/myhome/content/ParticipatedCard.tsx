import MocampIcon from '@/public/svgs/mocamp_gray_icon.svg';

interface ParticipatedCardProps {
  size: 's' | 'm' | 'l'; // 아직 사용되지 않음
  isCompleted: boolean;
  roomName: string;
  createdAt: string;
  time: string;
}

function ParticipatedCard({
  size = 'l',
  isCompleted,
  roomName,
  createdAt,
  time,
}: ParticipatedCardProps) {
  return (
    <>
      <div className="w-[449px] h-[169px] rounded-[0.625rem] bg-white flex items-center px-[1.25rem] py-[2.625rem] border border-[#E8E8E8]">
        {/* 썸네일 */}
        <div className="w-[5.3125rem] h-[5.3125rem] rounded-[0.625rem] bg-[#d9d9d9] mr-[1rem]">
          <MocampIcon />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex relative flex-col justify-center flex-1 space-y-[0.25rem] cursor-default">
          {isCompleted ? (
            <p className="text-xl font-semibold text-[#f00]">종료</p>
          ) : (
            <p className="text-xl font-medium text-[#0096ff]">진행 중</p>
          )}
          <p className="text-xl font-semibold text-[#333]">{roomName}</p>
          <p className="text-xl text-[#c4c4c4]">{`${createdAt}   ${time}`}</p>

          {/* 참여하기 버튼 */}
          {!isCompleted && (
            <button className="absolute top-0 right-0 w-[5.9375rem] h-[2.4375rem] bg-[#f2f2f2] text-base font-semibold text-[#555555] rounded-[0.625rem]">
              참여하기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ParticipatedCard;
