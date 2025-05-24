import { useState } from 'react';
import ParticipatedCard from './content/ParticipatedCard';
import ArrowDownIcon from '@/public/svgs/arrow_down_icon.svg';
import GoalAchievement from './content/GoalAchievement';
import GoalGraph from './content/GoalGraph';
import TimeGraph from './content/TimeGraph';
import { ChartType } from '@/types/myhome';
import TimeAchievement from './content/TimeAchievement';

const Total = () => {
  const [selectedType, setSelectedType] = useState<ChartType>('목표 달성 수');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const isCompleted: boolean = false;
  const roomName: string = '은학샘과 아이들';
  const createdAt: string = '2025.04.27';
  const time: string = '3h 30m';

  const handleDropdownToggle = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: ChartType): void => {
    setSelectedType(option);
    setIsDropdownOpen(false);
  };

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
          />
          <ParticipatedCard
            size={'l'}
            isCompleted={true}
            roomName={roomName}
            createdAt={createdAt}
            time={time}
          />
        </div>
      </div>

      {/* 모캠프 사용 추이 & 목표 달성 수 */}
      <div className="flex items-center gap-5 mb-[35px]">
        <p className="text-2xl font-semibold text-[#4b4b4b] cursor-default">모캠프 사용 추이</p>
        <div className="relative">
          <div
            onClick={handleDropdownToggle}
            className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-white border border-[#e8e8e8] cursor-pointer"
          >
            <p className="text-base font-semibold text-[#555]">{selectedType}</p>
            <ArrowDownIcon
              className={`w-4 h-3 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#e8e8e8] rounded-[10px] shadow-lg z-10">
              <div
                onClick={() => handleOptionSelect('목표 달성 수')}
                className="p-2.5 cursor-pointer hover:bg-gray-50 text-base font-semibold text-[#555] border-b border-[#e8e8e8] last:border-b-0"
              >
                목표 달성 수
              </div>
              <div
                onClick={() => handleOptionSelect('사용시간')}
                className="p-2.5 cursor-pointer hover:bg-gray-50 text-base font-semibold text-[#555]"
              >
                사용시간
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 목표 달성 요약 & 그래프 */}
      <div className="flex flex-col gap-4 bg-white border border-[#e8e8e8] rounded-[10px] p-6 cursor-default">
        <div className="flex gap-[65px] items-start">
          {selectedType === '목표 달성 수' ? (
            <>
              <GoalAchievement />
              <GoalGraph />
            </>
          ) : (
            <>
              <TimeAchievement />
              <TimeGraph />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Total;
