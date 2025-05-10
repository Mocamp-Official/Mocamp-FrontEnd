import React from 'react';
import SidebarTimer from '../components/Sidebar/SidebarTimer'; 
import SidebarParticipants from '../components/Sidebar/SidebarParticipants'
import SidebarExit from '../components/Sidebar/SidebarExitButton';

interface SidebarProps {
    startTime: Date;
    endTime: Date;
    participants: number;
}

const Sidebar: React.FC<SidebarProps> = ({
    startTime,
    endTime,
    participants,
}) => {
    return (
        <aside className="w-[200px] h-[1080px] bg-white flex flex-col justify-between border-r border-solid border-[#E6E6E6] relative">
            <SidebarTimer startTime={startTime} endTime={endTime} />
            <SidebarParticipants participants={participants} />
            <SidebarExit />
        </aside>
    );
};

export default Sidebar;

