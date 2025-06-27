'use client';

import { useCallback, useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import { fetchRoomParticipants } from '@/apis/room';
import { useRoomSubscriber } from '@/hooks/room/useRoomSubscriber';

export interface TodoGroup {
  id: number;
  items: Todo[];
  resolution: string;
}

export const useRoomTodos = (roomId?: string) => {
  const [todoGroups, setTodoGroups] = useState<TodoGroup[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const loadData = async () => {
      const participants = await fetchRoomParticipants(roomId);
      if (!participants) return;

      const formatted = participants.map((u) => ({
        id: u.userId,
        items: (u.goals ?? []).map((g) => ({
          goalId: g.goalId,
          content: g.content,
          isCompleted: g.isCompleted,
        })),
        resolution: u.resolution ?? '',
      }));
      setTodoGroups(formatted);
    };

    loadData();
  }, [roomId]);

  useRoomSubscriber(String(roomId), {
    onListUpdate: (d) => {
      if (!d?.goals || typeof d.userId !== 'number') return;

      const formatted: TodoGroup = {
        id: d.userId,
        items: d.goals.map((g: any) => ({
          goalId: g.goalId,
          content: g.content,
          isCompleted: g.isCompleted,
        })),
        resolution: d.resolution ?? '',
      };

      setTodoGroups((prev) =>
        prev.some((g) => g.id === d.userId)
          ? prev.map((g) => (g.id === d.userId ? formatted : g))
          : [...prev, formatted],
      );
    },

    onCompleteUpdate: (d) => {
      setTodoGroups((prev) =>
        prev.map((g) =>
          g.id === d.userId
            ? {
                ...g,
                items: g.items.map((i) =>
                  i.goalId === d.goalId ? { ...i, isCompleted: d.isCompleted } : i,
                ),
              }
            : g,
        ),
      );
    },

    onResolutionUpdate: (d) => {
      setTodoGroups((prev) =>
        prev.map((g) => (g.id === d.userId ? { ...g, resolution: d.resolution } : g)),
      );
    },
  });

  const setTodosByUser = useCallback((userId: number, updated: Todo[]) => {
    setTodoGroups((prev) => prev.map((g) => (g.id === userId ? { ...g, items: updated } : g)));
  }, []);

  return { todoGroups, setTodosByUser };
};
