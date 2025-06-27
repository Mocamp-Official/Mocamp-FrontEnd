//사이드바
import Timer from '@/components/Sidebar/SidebarTimer';
import Participants from '@/components/Sidebar/SidebarParticipants';
import Exit from '@/components/Sidebar/SidebarExitButton';

interface SidebarProps {
  startTime: string;
  endTime: string;
  participants: number;
  onLeaveRoom: () => void; 
}

const Sidebar = ({ startTime, endTime, participants, onLeaveRoom }: SidebarProps) => {

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-[200px] flex-col items-center justify-between border-r border-solid border-[#E6E6E6] bg-white">
      <Timer startTime={startTime} endTime={endTime} />
      <Participants participants={participants} />
      <Exit onLeaveRoom={onLeaveRoom} />
    </aside>
  );
};

export default Sidebar;

