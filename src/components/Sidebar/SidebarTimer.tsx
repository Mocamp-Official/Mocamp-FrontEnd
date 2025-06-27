// 사이드바 - 시간, 종료, 남는 시간
import { useEffect, useState } from 'react';
import { formatTime, getRemainingTime, formatRemainingTime } from '@/utils/timeUtils';

interface SidebarTimerProps {
  startTime: string;
  endTime: string;
}
const SidebarTimer = ({ startTime, endTime }: SidebarTimerProps) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const [remainingTime, setRemainingTime] = useState(getRemainingTime(end));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime(end));
    }, 1000);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="relative h-[1080px] w-[200px] bg-white">
      {/* 시작 / 종료 박스 */}
      <div className="absolute top-[70px] left-[25px] flex w-[150px] flex-col gap-[19px] rounded-[10px] border border-[#E8E8E8] bg-white p-[20px] lg:top-[97.5px] xl:top-[130px]">
        <div className="flex items-center gap-[15px]">
          <div className="font-pre text-[18px] font-semibold text-[#27CFA5]">시작</div>
          <div className="font-pre text-[18px] font-medium text-[#555555]">{formatTime(start)}</div>
        </div>
        <div className="h-[1px] w-full bg-[#E8E8E8]" />
        <div className="flex items-center gap-[15px]">
          <div className="font-pre text-[18px] font-semibold text-[#27CFA5]">종료</div>
          <div className="font-pre text-[18px] font-medium text-[#555555]">{formatTime(end)}</div>
        </div>
      </div>

      {/* 남은 시간 박스 */}
      <div className="absolute top-[147px] left-[25px] flex h-[126px] w-[150px] flex-col gap-[19px] rounded-[10px] border border-[#E8E8E8] bg-white p-[20px] lg:top-[207px] xl:top-[276px]">
        <div className="font-pre text-[18px] font-semibold text-[#27CFA5]">남은 시간</div>
        <div className="mx-[2px] h-[1px] w-[110px] bg-[#E8E8E8]" />
        <div className="font-pre text-[18px] font-medium text-[#555555]">
          {remainingTime > 0 ? formatRemainingTime(remainingTime) : '종료'}
        </div>
      </div>
    </div>
  );
};

export default SidebarTimer;
