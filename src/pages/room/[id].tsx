'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import TodoSection from '@/components/todo/TodoSection';
import WorkspaceHeader from '@/components/Header/WorkSpaceHeader';
import Sidebar from '@/components/Sidebar/Sidebar';

import { fetchRoomData, fetchRoomParticipants } from '@/apis/room';
import { useRoomTodos } from '@/hooks/room/useRoomTodos';

import type { RoomInfo, Participant } from '@/types/room';

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id;

  const { todoGroups, setTodosByUser } = useRoomTodos(roomId);

  const [roomData, setRoomData] = useState<RoomInfo | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      const [room, users] = await Promise.all([
        fetchRoomData(roomId),
        fetchRoomParticipants(roomId),
      ]);

      setRoomData(room);
      setParticipants(users);
    };

    fetchData();
  }, [roomId]);

  if (!roomId || !roomData) return null;

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
      <WorkspaceHeader roomName={roomData.roomName} initialNotice={roomData.notice} />
      <Sidebar
        startTime={roomData.startedAt}
        endTime={roomData.endedAt}
        participants={participants.length}
      />
      {todoGroups.map((g) => (
        <TodoSection
          key={g.id}
          resolution={g.resolution}
          roomId={String(roomId)}
          todos={g.items}
          setTodos={(updated) => setTodosByUser(g.id, updated)}
        />
      ))}
    </div>
  );
};

export default RoomPage;
