//인원수 표시
import React from 'react';

interface SidebarParticipantsProps {
    participants: number;
}

const SidebarParticipants: React.FC<SidebarParticipantsProps> = ({ participants }) => {
    return (
        <div className="w-[200px] h-[1080px] bg-white relative">
            <div className="w-[150px] h-[126px] absolute top-[130px] left-[25px] rounded-[10px] border border-[#E8E8E8] bg-white flex flex-col gap-[19px] p-[20px]">
                <div className="w-[73px] h-[24px] flex items-center justify-center font-pre font-semibold text-[18x] leading-[1] tracking-[-0.02em] text-[#27CFA5] bg-transparent rounded ">
                    참여 인원
                </div>
                <div className="w-[110px] h-[1px] bg-[#E8E8E8] mx-[2px]" />
                <div className="w-[110px] h-[24px] flex items-center justify-center font-pre font-medium text-[18px] leading-[1] tracking-[-0.02em] text-[#555555] bg-transparent rounded">
                    {participants}명
                </div>
            </div>
        </div>
    );
};
export default  SidebarParticipants;