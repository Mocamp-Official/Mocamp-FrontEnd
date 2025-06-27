'use client';

import { useRouter } from 'next/router';
import TodoSection from '@/components/todo/TodoSection';
import { useRoomTodos } from '@/hooks/room/useRoomTodos';

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id;

  const { todoGroups, setTodosByUser } = useRoomTodos(roomId);

  if (!roomId) return null;

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
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
