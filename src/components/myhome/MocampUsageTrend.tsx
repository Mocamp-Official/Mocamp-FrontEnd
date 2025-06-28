// MocampUsageTrend.tsx
import { useDropDown } from '@/stores/myhome-store';
import DropDown from './content/DropDown';
import GoalGraph from './content/GoalGraph';
import GoalList from './content/GoalList';
import TimeGraph from './content/TimeGraph';

const MocampUsageTrend = () => {
  const { selectedType } = useDropDown();
  return (
    <div className="flex h-[880px] w-[982px] flex-col rounded-[20px] bg-[#ffffff] p-12.5">
      {/* 드롭다운 : 모캠프 사용 추이 | 목표 달성 수 */}
      <div className="mb-[35px] flex items-center gap-5">
        <p className="cursor-default text-2xl font-semibold text-[#4b4b4b]">모캠프 사용 추이</p>
        <DropDown />
      </div>

      <div className="mb-5">
        <div className="flex h-[50px] w-[882px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-[#27cfa5]">
          {selectedType === '목표 달성 수' ? (
            <p className="text-base text-white">주은님이 그동안 달성한 목표 수는?</p>
          ) : (
            <p className="text-base text-white">주은님이 그동안 집중한 시간은?</p>
          )}
        </div>
        <div className="flex h-[117px] w-[882px] items-center justify-center rounded-br-[10px] rounded-bl-[10px] border border-[#e8e8e8] bg-white">
          {selectedType === '목표 달성 수' ? (
            <p className="text-[28px] font-semibold text-[#555555]">
              그동안 주은님은 123개의 목표를 달성했어요!
            </p>
          ) : (
            <p className="text-[28px] font-semibold text-[#555555]">
              그동안 주은님은 123분 동안 작업했어요!
            </p>
          )}
        </div>
      </div>

      <div className="flex cursor-default flex-row justify-between rounded-[10px] border border-[#e8e8e8] bg-white p-7.5">
        <div className="mt-auto">
          {selectedType === '목표 달성 수' ? <GoalGraph /> : <TimeGraph />}
        </div>
        <GoalList />
      </div>
    </div>
  );
};

export default MocampUsageTrend;
