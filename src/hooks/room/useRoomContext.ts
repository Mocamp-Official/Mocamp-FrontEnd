'use client';

import { useCallback, useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import { fetchRoomData, fetchRoomParticipants } from '@/apis/room';
import { useRoomSubscriber } from '@/hooks/room/useRoomSubscriber';
import { Participant, RoomInfo } from '@/types/room';

export interface TodoGroup {
  id: number;
  items: Todo[];
  resolution: string;
}
export const useRoomContext = (roomId?: string) => {
  const [todoGroups, setTodoGroups] = useState<TodoGroup[]>([]);
  const [notice, setNotice] = useState('');
  const [roomData, setRoomData] = useState<RoomInfo | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const loadData = async () => {
      const [users, room] = await Promise.all([
        fetchRoomParticipants(roomId),
        fetchRoomData(roomId),
      ]);
      if (!users) return;

      setParticipants(users);
      setRoomData(room);
      setNotice(room.notice);

      const formatted = users.map((u) => ({
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

    onNoticeUpdate: (d) => {
      if (typeof d.notice === 'string') {
        setNotice(d.notice);
      }
    },
  });

  const setTodosByUser = useCallback((userId: number, updated: Todo[]) => {
    setTodoGroups((prev) => prev.map((g) => (g.id === userId ? { ...g, items: updated } : g)));
  }, []);

  return {
    todoGroups,
    setTodosByUser,
    notice,
    roomData,
    participants,
  };
};
