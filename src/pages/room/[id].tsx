'use client';

import { useRouter } from 'next/router';

import TodoSection from '@/components/todo/TodoSection';
import WorkspaceHeader from '@/components/Header/WorkSpaceHeader';
import Sidebar from '@/components/Sidebar/Sidebar';

import { leaveRoom } from '@/apis/room';
import { useRoomContext } from '@/hooks/room/useRoomContext';

const RoomPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id;

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom(roomId as string);
      router.push('/myhome');
    } catch (e) {
      alert('방 퇴장 실패');
    }
  };

  const { todoGroups, setTodosByUser, notice, roomData, participants, alertInfo, setAlertVisible } =
    useRoomContext(roomId);

  if (!roomId || !roomData) return null;

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
      <WorkspaceHeader roomName={roomData.roomName} initialNotice={notice} />
      <Sidebar
        startTime={roomData.startedAt}
        endTime={roomData.endedAt}
        participants={participants.length}
        onLeaveRoom={handleLeaveRoom}
        alertInfo={alertInfo}
        onCloseAlert={() => setAlertVisible(false)}
      />
      {todoGroups.map((g) => (
        <TodoSection
          key={g.id}
          resolution={g.resolution}
          isMyGoal={g.isMyGoal}
          isSecret={g.isSecret}
          roomId={String(roomId)}
          todos={g.items}
          setTodos={(updated) => setTodosByUser(g.id, updated)}
        />
      ))}
    </div>
  );
};

export default RoomPage;
