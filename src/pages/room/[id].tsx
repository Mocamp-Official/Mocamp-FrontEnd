import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Todo } from '@/types/todo';
import TodoSection from '@/components/todo/TodoSection';
import { fetchRoomParticipants } from '@/apis/room';
import { useRoomSubscriber } from '@/hooks/useRoomSubscriber';

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id;

  const [todoGroups, setTodoGroups] = useState<{ id: string; items: Todo[] }[]>([]);

  useRoomSubscriber(roomId || '', (data) => {
    const formatted = data.todosByUser.map((user: any) => ({
      id: String(user.userId),
      items: user.goalList.map((goal: any) => ({
        id: String(goal.goalId),
        text: goal.content,
        done: goal.completed,
      })),
    }));
    setTodoGroups(formatted);
  });

  useEffect(() => {
    if (!roomId) return;

    const loadData = async () => {
      const participants = await fetchRoomParticipants(roomId);
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
    };

    loadData();
  }, [roomId]);

  if (!roomId) return null;

  const updateTodosByUser = (userId: string, updatedTodos: Todo[]) => {
    setTodoGroups((prev) =>
      prev.map((group) => (group.id === userId ? { ...group, items: updatedTodos } : group)),
    );
  };

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
      {todoGroups.map((group) => (
        <TodoSection
          key={group.id}
          roomId={roomId}
          todos={group.items}
          setTodos={(updated) => updateTodosByUser(group.id, updated)}
        />
      ))}
    </div>
  );
};

export default RoomPage;
