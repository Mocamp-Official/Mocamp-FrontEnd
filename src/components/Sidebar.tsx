import React from 'react';
import SidebarTimer from '../components/Sidebar/SidebarTimer'; 
import SidebarParticipants from '../components/Sidebar/SidebarParticipants'
import SidebarExit from '../components/Sidebar/SidebarExitButton';
import { formatTime } from '@/utils/timeUtils';



interface SidebarProps {
    startTime: Date;
    endTime: Date;
    participants: number;
}

const Sidebar: React.FC<SidebarProps> = ({
    startTime,
    endTime,
    participants
}) => {
    return (
        <aside className="w-[200px] h-[1080px] bg-white flex flex-col justify-between">
            <SidebarTimer startTime={startTime} endTime={endTime} />
            <SidebarParticipants participants={6} />
            <SidebarExit />
        </aside>
    );
};

export default Sidebar;
