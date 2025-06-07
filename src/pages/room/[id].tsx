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

  const [todoGroups, setTodoGroups] = useState<{ id: number; items: Todo[]; resolution: string }[]>(
    [],
  );

  useRoomSubscriber(String(roomId), {
    onListUpdate: (data) => {
      if (!data?.goals || typeof data.userId !== 'number') return;

      const formatted = {
        id: data.userId,
        items: data.goals.map((goal: any) => ({
          goalId: goal.goalId,
          content: goal.content,
          isCompleted: goal.isCompleted,
        })),
        resolution: data.resolution ?? '',
      };

      // 해당 유저만 업데이트
      setTodoGroups((prev) => {
        const exists = prev.some((group) => group.id === data.userId);
        if (exists) {
          return prev.map((group) => (group.id === data.userId ? formatted : group));
        } else {
          return [...prev, formatted];
        }
      });
    },
    onCompleteUpdate: (data) => {
      const { userId, goalId, isCompleted } = data;
      setTodoGroups((prev) =>
        prev.map((group) =>
          group.id === userId
            ? {
                ...group,
                items: group.items.map((item) =>
                  item.goalId === goalId ? { ...item, isCompleted } : item,
                ),
              }
            : group,
        ),
      );
    },
    onResolutionUpdate: (data) => {
      setTodoGroups((prev) =>
        prev.map((group) =>
          group.id === data.userId ? { ...group, resolution: data.resolution } : group,
        ),
      );
    },
  });

  useEffect(() => {
    if (!roomId) return;

    const loadData = async () => {
      const participants = await fetchRoomParticipants(roomId);
      if (!participants) return;

      const formatted = participants.map((user) => ({
        id: user.userId,
        items: Array.isArray(user.goals)
          ? user.goals.map((goal) => ({
              goalId: goal.goalId,
              content: goal.content,
              isCompleted: goal.isCompleted,
            }))
          : [],
        resolution: user.resolution ?? '',
      }));

      setTodoGroups(formatted);
    };

    loadData();
  }, [roomId]);

  if (!roomId) return null;

  const updateTodosByUser = (userId: number, updatedTodos: Todo[]) => {
    setTodoGroups((prev) =>
      prev.map((group) => (group.id === userId ? { ...group, items: updatedTodos } : group)),
    );
  };

  return (
    <div className="bg-gray3 flex h-screen w-screen items-center gap-5 pl-[320px]">
      {todoGroups.map((group) => (
        <TodoSection
          key={group.id}
          resolution={group.resolution}
          roomId={String(roomId)}
          todos={group.items}
          setTodos={(updated) => updateTodosByUser(group.id, updated)}
        />
      ))}
    </div>
  );
};

export default RoomPage;
