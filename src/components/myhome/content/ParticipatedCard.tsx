interface ParticipatedCardProps {
  size: 's' | 'm' | 'l'; // 아직 사용되지 않음
  isCompleted: boolean;
  roomName: string;
  createdAt: string;
  time: string;
}

function ParticipatedCard({ isCompleted, roomName, createdAt, time }: ParticipatedCardProps) {
  return (
    <>
      <div className="w-[400px] h-[169px] rounded-[10px] bg-white flex items-center px-5 py-[42px] border border-[#E8E8E8]">
        {/* 썸네일 */}
        <div className="w-[85px] h-[85px] rounded-[10px] bg-[#d9d9d9] mr-4" />

        {/* 텍스트 정보 */}
        <div className="flex relative flex-col justify-center flex-1 space-y-1">
          {isCompleted ? (
            <p className="text-xl font-semibold text-[#f00]">종료</p>
          ) : (
            <p className="text-xl font-medium text-[#0096ff]">진행 중</p>
          )}
          <p className="text-xl font-semibold text-[#333]">{roomName}</p>
          <p className="text-xl text-[#c4c4c4]">{`${createdAt}   ${time}`}</p>
          {/* 참여하기 버튼 */}
          {!isCompleted && (
            <button className="absolute top-0 right-0 w-[95px] h-[39px] bg-[#f2f2f2] text-base font-semibold text-[#555555] rounded-[10px]">
              참여하기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ParticipatedCard;
