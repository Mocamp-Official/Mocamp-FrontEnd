'use client';

import { useRouter } from 'next/router';

import TodoSection from '@/components/todo/TodoSection';
import WorkspaceHeader from '@/components/Header/WorkSpaceHeader';
import Sidebar from '@/components/Sidebar/Sidebar';

import { leaveRoom } from '@/apis/room';
import { useRoomContext } from '@/hooks/room/useRoomContext';

const RoomPage = () => {
  const router = useRouter();
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

  const { todoGroups, setTodosByUser, notice, roomData, participants } = useRoomContext(roomId);

  if (!roomId || !roomData) return null;

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
      <WorkspaceHeader roomName={roomData.roomName} initialNotice={notice} />
      <Sidebar
        startTime={roomData.startedAt}
        endTime={roomData.endedAt}
        participants={participants.length}
        onLeaveRoom={handleLeaveRoom}
      />
      {todoGroups.map((g) => (
        <TodoSection
          key={g.id}
          resolution={g.resolution}
          roomId={String(roomId)}
          todos={g.items}
          setTodos={(updated) => setTodosByUser(g.id, updated)}
        />
=======
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Todo } from '@/types/todo';
import TodoSection from '@/components/todo/TodoSection';
import { fetchRoomParticipants } from '@/apis/room';

const RoomPage = () => {
  const router = useRouter();
  const { id: roomId } = router.query;

  const [todoGroups, setTodoGroups] = useState<{ id: string; items: Todo[] }[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const loadData = async () => {
      const participants = await fetchRoomParticipants(roomId as string);
      if (!participants) return;

      const formatted = participants.map((user) => ({
        id: String(user.userId),
        items: Array.isArray(user.goalList)
          ? user.goalList.map((text, idx) => ({
              id: `${user.userId}-${idx}`,
              text,
              done: false,
            }))
          : [],
      }));

      setTodoGroups(formatted);
      console.log(todoGroups);
    };

    loadData();
  }, [roomId]);

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
      {todoGroups.map((group) => (
        <TodoSection key={group.id} todos={group.items} />
      ))}
    </div>
  );
};

export default RoomPage;
