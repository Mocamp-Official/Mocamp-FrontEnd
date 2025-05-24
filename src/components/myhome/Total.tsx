import ParticipatedCard from './content/ParticipatedCard';
import ArrowIcon from '@/public/svgs/arrow_icon.svg';
import ArrowDownIcon from '@/public/svgs/arrow_down_icon.svg';
import GoalAchievement from './content/GoalAchievement';
import GoalGraph from './content/GoalGraph';

const Total = () => {
  const isCompleted = false;
  const roomName = '은학샘과 아이들';
  const createdAt = '2025.04.27';
  const time = '3h 30m';

  return (
    <div className="w-[982px] h-[880px] rounded-[20px] bg-[#ffffff] p-8 flex flex-col">
      <div className="mb-[30px]">
        <p className="text-2xl font-semibold text-[#4b4b4b] mb-[30px]">참여한 모캠프</p>
        <div className="flex gap-5 items-center">
          <ParticipatedCard
            size={'l'}
            isCompleted={isCompleted}
            roomName={roomName}
            createdAt={createdAt}
            time={time}
          ></ParticipatedCard>
          <ParticipatedCard
            size={'l'}
            isCompleted={true}
            roomName={roomName}
            createdAt={createdAt}
            time={time}
          ></ParticipatedCard>
        </div>
      </div>

      {/* 모캠프 사용 추이 & 목표 달성 수 */}
      <div className="flex items-center gap-5 mb-[35px]">
        <p className="text-2xl font-semibold text-[#4b4b4b] cursor-default">모캠프 사용 추이</p>
        <div className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-white border border-[#e8e8e8] cursor-pointer">
          <p className="text-base font-semibold text-[#555]">목표 달성 수</p>
          <ArrowDownIcon className="w-4 h-3" />
        </div>
      </div>

      {/* 목표 달성 요약 & 그래프 */}
      <div className="flex flex-col gap-4 bg-white border border-[#e8e8e8] rounded-[10px] p-6 cursor-default">
        <div className="flex gap-[65px] items-start">
          <GoalAchievement />
          <GoalGraph />
        </div>
      </div>
    </div>
  );
};

export default Total;
