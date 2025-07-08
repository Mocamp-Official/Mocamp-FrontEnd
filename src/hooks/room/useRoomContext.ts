// `useRoomContext.ts` 파일 수정
'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchRoomData, fetchRoomParticipants } from '@/apis/room';
import { useRoomSubscriber } from '@/hooks/room/useRoomSubscriber';
import type { Goal, Participant, RoomInfo } from '@/types/room';

export interface TodoGroup {
  userId: number;
  goals: Goal[];
  resolution: string;
  isMyGoal: boolean;
  isSecret: boolean;
}

export const useRoomContext = (roomId?: string) => {
  const [todoGroups, setTodoGroups] = useState<TodoGroup[]>([]);
  const [notice, setNotice] = useState('');
  const [roomData, setRoomData] = useState<RoomInfo | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [alertInfo, setAlertInfo] = useState({ visible: false, minutesLeft: 0 });

  useEffect(() => {
    // roomId가 없을 경우, 데이터 로딩 로직을 실행하지 않지만,
    // useEffect 훅 자체는 항상 호출됩니다.
    if (!roomId) {
      // roomId가 유효하지 않을 때 이전 상태를 초기화할 필요가 있다면 여기서 수행합니다.
      // 예: setRoomData(null); setParticipants([]); setTodoGroups([]); 등
      return; // 데이터 로딩만 스킵하고 Hook은 계속 진행됩니다.
    }

    const load = async () => {
      const [users, room] = await Promise.all([
        fetchRoomParticipants(roomId),
        fetchRoomData(roomId),
      ]);
      if (!users || !room) return;

      setParticipants(users);
      setRoomData(room);
      setNotice(room.notice ?? '');

      const formatted = users.map((u) => ({
        userId: u.userId,
        goals: u.goals ?? [],
        resolution: u.resolution ?? '',
        isMyGoal: u.isMyGoal,
        isSecret: u.isSecret,
      }));
      setTodoGroups(formatted);
    };

    load();
  }, [roomId]); // roomId가 변경될 때마다 실행

  // useRoomSubscriber는 roomId가 null이 아닐 때만 유효하게 동작하도록 이미 처리되어 있으므로
  // 이곳의 호출 순서에는 영향을 미 미칠 것으로 보입니다.
  useRoomSubscriber(roomId ?? null, {
    onListUpdate: (d) => {
      if (!d?.goals || typeof d.userId !== 'number') return;

      setTodoGroups((prev) => {
        const updated = {
          userId: d.userId,
          goals: d.goals,
          resolution: d.resolution ?? '',
          isMyGoal: d.isMyGoal ?? false,
          isSecret: d.isSecret ?? false,
        };
        const exists = prev.some((g) => g.userId === d.userId);
        return exists ? prev.map((g) => (g.userId === d.userId ? updated : g)) : [...prev, updated];
      });
    },

    onUserUpdate: (d) => {
      if (typeof d.userId !== 'number') return;

      const newUser: Participant = {
        userId: d.userId,
        username: d.username,
        goals: d.goals ?? [],
        resolution: d.resolution ?? '',
        isMyGoal: d.isMyGoal,
        isSecret: d.isSecret,
        isAdmin: false,
        camStatus: false,
        micStatus: false,
        isWorking: false,
      };

      setParticipants((prev) => {
        const exists = prev.some((p) => p.userId === newUser.userId);
        return exists ? prev : [...prev, newUser];
      });

      setTodoGroups((prev) => {
        const exists = prev.some((g) => g.userId === newUser.userId);
        if (exists) return prev;
        return [
          ...prev,
          {
            userId: newUser.userId,
            resolution: newUser.resolution,
            goals: newUser.goals,
            isMyGoal: newUser.isMyGoal,
            isSecret: newUser.isSecret,
          },
        ];
      });
    },

    onUserLeave: (d) => {
      if (typeof d.userId !== 'number') return;
      setParticipants((prev) => prev.filter((p) => p.userId !== d.userId));
      setTodoGroups((prev) => prev.filter((g) => g.userId !== d.userId));
    },

    onCompleteUpdate: (d) => {
      setTodoGroups((prev) =>
        prev.map((g) => {
          if (g.userId !== d.userId) return g;
          return {
            ...g,
            goals: g.goals.map((goal) =>
              goal.goalId === d.goalId ? { ...goal, isCompleted: d.isCompleted } : goal,
            ),
          };
        }),
      );
    },

    onResolutionUpdate: (d) => {
      setTodoGroups((prev) =>
        prev.map((g) => (g.userId === d.userId ? { ...g, resolution: d.resolution } : g)),
      );
    },

    onNoticeUpdate: (d) => {
      if (typeof d.notice === 'string') {
        setNotice(d.notice);
      }
    },

    onAlertUpdate: (d) => {
      if (typeof d.minutesLeft !== 'number') return;
      setAlertInfo({ visible: true, minutesLeft: d.minutesLeft });
    },
  });

  const setTodosByUser = useCallback((userId: number, updated: Goal[]) => {
    setTodoGroups((prev) => prev.map((g) => (g.userId === userId ? { ...g, goals: updated } : g)));
  }, []);

  const setAlertVisible = (visible: boolean) => {
    setAlertInfo((prev) => ({ ...prev, visible }));
  };

  return {
    todoGroups,
    setTodosByUser,
    roomData,
    participants,
    alertInfo,
    setAlertVisible,
    notice,
    setNotice,
  };
};
