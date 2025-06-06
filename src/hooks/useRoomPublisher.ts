import { useEffect, useRef } from 'react';
import { getStompClient } from '@/libs/socket';

export const useRoomPublisher = (roomId: string) => {
  const clientRef = useRef<ReturnType<typeof getStompClient> | null>(null);

  useEffect(() => {
    const client = getStompClient();
    if (!client) return;

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const toggleTodo = (goalId: string, isCompleted: boolean) => {
    clientRef.current?.publish({
      destination: `/pub/data/goal/complete/${roomId}`,
      body: JSON.stringify({ goalId, isCompleted }),
    });
  };

  const updateGoals = (createGoals: { content: string }[], deleteGoals: number[]) => {
    console.log('목표 업데이트 pub 전송', {
      destination: `/pub/data/goal/manage/${roomId}`,
      createGoals,
      deleteGoals,
    });
    clientRef.current?.publish({
      destination: `/pub/data/goal/manage/${roomId}`,
      body: JSON.stringify({ createGoals, deleteGoals }),
    });
  };

  const updateNotice = (notice: string) => {
    clientRef.current?.publish({
      destination: `/pub/data/notice/${roomId}`,
      body: JSON.stringify({ notice }),
    });
  };

  return { toggleTodo, updateGoals, updateNotice };
};
