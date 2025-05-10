//인원수 표시
import React from 'react';

interface SidebarParticipantsProps {
    participants: number;
}

const SidebarParticipants: React.FC<SidebarParticipantsProps> = ({ participants }) => {
    return (
    <div className="w-[200px] h-[1080px] bg-white flex items-center justify-center">
        <div className="w-[151px] h-[64px] absolute top-[450px] rounded-[7.5px] border border-[#E8E8E8] bg-white flex flex-row items-center justify-between px-[15px] py-[10px] gap-[10px]">
            <span className="font-pre font-semibold text-[18px] leading-[1] tracking-[-0.02em] text-[#27CFA5]">
                참여 인원
            </span>
            <span className="font-pre font-medium text-[18px] leading-[1] tracking-[-0.02em] text-[#555555]">
                {participants}
            </span>
        </div>
    </div>
    );
};
export default  SidebarParticipants;