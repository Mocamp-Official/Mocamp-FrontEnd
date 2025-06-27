// 사이드바 - 인원수 표시
interface SidebarParticipantsProps {
  participants: number;
}

const SidebarParticipants = ({ participants }: SidebarParticipantsProps) => {
  return (
    <div className="absolute left-[25px] flex h-[60px] w-[152px] flex-col justify-center gap-[10px] rounded-[10px] border border-[#E8E8E8] bg-white p-[20px] lg:top-[316.5px] xl:top-[422px]">
      <div className="flex items-center justify-between">
        <span className="font-pre text-[18px] font-semibold text-[#27CFA5]">참여 인원</span>
        <span className="font-pre text-[18px] font-medium text-[#555555]">{participants}</span>
      </div>
    </div>
  );
};
export default SidebarParticipants;
