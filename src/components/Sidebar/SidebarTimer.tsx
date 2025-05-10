import React, { useEffect, useState } from 'react';
import { formatTime, getRemainingTime, formatRemainingTime } from '@/utils/timeUtils';

interface SidebarTimerProps {
    startTime: Date;
    endTime: Date;
}

const SidebarTimer: React.FC<SidebarTimerProps> = ({
    startTime,
    endTime,
}) => {
    const [remainingTime, setRemainingTime] = useState(getRemainingTime(endTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(getRemainingTime(endTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div className="w-[200px] h-[1080px] bg-white relative">
            <div className="w-[150px] h-[126px] absolute top-[130px] left-[25px] right-[1745px] bottom-[824[px]] rounded-[10px] border border-[#E8E8E8] bg-white flex flex-col gap-[19px] p-[20px]">
                
                {/* 시작 */}
                <div className="flex items-center gap-[15px]">
                    <div className="w-[35px] h-[24px] flex items-center justify-center font-pre font-semibold text-[18px] leading-[1] tracking-[-0.02em] text-[#27CFA5] bg-transparent rounded ">
                        시작
                    </div>
                    <div className="w-[51px] h-[24px] flex items-center justify-center font-pre font-medium text-[18px] leading-[1] tracking-[-0.02em] text-[#555555] bg-transparent rounded b">
                        {formatTime(startTime)}
                    </div>
            </div>

                <div className="w-[110px] h-[1px] bg-[#E8E8E8] mx-[2px]" />


                {/* 종료 */}
                <div className="flex items-center gap-[15px]">
                    <div className="w-[35px] h-[24px] flex items-center justify-center font-pre font-semibold text-[18px] leading-[1] tracking-[-0.02em] text-[#27CFA5] bg-transparent rounded ">
                        종료
                    </div>
                    <div className="w-[50.5px] h-[24px] flex items-center justify-center font-pre font-medium text-[18px] leading-[1] tracking-[-0.02em] text-[#555555] bg-transparent rounded ">
                        {formatTime(endTime)}
                    </div>
                </div>
            </div>


            <div className="w-[150px] h-[126px] absolute top-[276px] left-[25px] rounded-[10px] bg-white flex flex-col gap-[19px] p-[20px]">
                {/* 남은 시간 */}
                <div className="w-[73px] h-[24px] flex items-center justify-center font-pre font-semibold text-[18x] leading-[1] tracking-[-0.02em] text-[#27CFA5] bg-transparent rounded ">
                    남은 시간
                </div>

                <div className="w-[110px] h-[1px] bg-[#E8E8E8] mx-[2px]" />
                
                {/* 남은 시간 표시 */}
                <div className="w-[110px] h-[24px] flex items-center justify-center font-pre font-medium text-[18px] leading-[1] tracking-[-0.02em] text-[#555555] bg-transparent rounded">
                    {remainingTime > 0 ? formatRemainingTime(remainingTime) : '종료'}
                </div>
            </div>


        </div>
    );
};


export default SidebarTimer;
