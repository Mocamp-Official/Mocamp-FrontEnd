import { ReactNode } from 'react';

const goalDataList = [
  '나의 목표1',
  '나의 목표2',
  '나의 목표3',
  '나의 목표4',
  '나의 목표5',
  '나의 목표6',
  '나의 목표7',
  '나의 목표7',
  '나의 목표7',
  '나의 목표7',
  '나의 목표7',
];

const GoalList = () => {
  return (
    <div className="border-gray4 h-[468px] w-[248px] rounded-[10px] border p-5">
      <p className="text-body1 text-gray9 mt-2.5 mb-1.25">4월 27일</p>
      <p className="text-gray7 mb-6.25">목표 달성 수 14개</p>
      <div className="scrollbar-hide max-h-[340px] overflow-y-auto">
        {goalDataList.map((goal, index) => {
          return <GoalItem key={index}>{goal}</GoalItem>;
        })}
      </div>
    </div>
  );
};

const GoalItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-gray4 mb-4 flex h-[59px] w-[198px] items-center justify-start rounded-[6px] border pl-5 last:mb-0">
      <p className="text-gray9 text-base">{children}</p>
    </div>
  );
};

export default GoalList;
