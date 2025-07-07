'use client';

import { useCallback, useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import { fetchRoomData, fetchRoomParticipants } from '@/apis/room';
import { useRoomSubscriber } from '@/hooks/room/useRoomSubscriber';
import { Goal, Participant, RoomInfo } from '@/types/room';

export interface TodoGroup {
  userId: number;
  goals: Todo[];
  resolution: string;
  isMyGoal: boolean;
  isSecret: boolean;
}

export const useRoomContext = (roomId?: string) => {
  const [todoGroups, setTodoGroups] = useState<TodoGroup[]>([]);
  const [notice, setNotice] = useState('');
  const [roomData, setRoomData] = useState<RoomInfo | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [alertInfo, setAlertInfo] = useState<{
    visible: boolean;
    minutesLeft: number;
  }>({ visible: false, minutesLeft: 0 });

  useEffect(() => {
    if (!roomId) return;

    const loadData = async () => {
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
        goals: (u.goals ?? []).map((g) => ({
          goalId: g.goalId,
          content: g.content,
          isCompleted: g.isCompleted,
        })),
        resolution: u.resolution ?? '',
        isMyGoal: u.isMyGoal,
        isSecret: u.isSecret,
      }));
      setTodoGroups(formatted);
    };

    loadData();
  }, [roomId]);

  useRoomSubscriber(roomId && typeof roomId === 'string' ? roomId : null, {
    // 목표 리스트 업데이트
    onListUpdate: (d) => {
      if (!d?.goals || typeof d.userId !== 'number') return;

      setTodoGroups((prev) => {
        const prevGroup = prev.find((g) => g.userId === d.userId);

        const formatted: TodoGroup = {
          userId: d.userId,
          goals: d.goals.map((g: any) => ({
            goalId: g.goalId,
            content: g.content,
            isCompleted: g.isCompleted,
          })),
          resolution: d.resolution ?? '',
          isMyGoal: d.isMyGoal ?? prevGroup?.isMyGoal ?? false,
          isSecret: d.isSecret ?? prevGroup?.isSecret ?? false,
        };

        return prev.some((g) => g.userId === d.userId)
          ? prev.map((g) => (g.userId === d.userId ? formatted : g))
          : [...prev, formatted];
      });
    },

    // 사용자 입장 시 참가자 목록 업데이트
    onUserUpdate: (d) => {
      if (typeof d.userId !== 'number') return;

      const newParticipant: Participant = {
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
        const exists = prev.some((p) => p.userId === newParticipant.userId);
        return exists ? prev : [...prev, newParticipant];
      });

      setTodoGroups((prev) => {
        const exists = prev.some((g) => g.userId === newParticipant.userId);
        if (exists) return prev;

        const newGroup: TodoGroup = {
          userId: newParticipant.userId,
          resolution: newParticipant.resolution ?? '',
          goals: (newParticipant.goals ?? []).map((g: any) => ({
            goalId: g.goalId,
            content: g.content,
            isCompleted: g.isCompleted,
          })),
          isMyGoal: newParticipant.isMyGoal,
          isSecret: newParticipant.isSecret,
        };

        return [...prev, newGroup];
      });
    },

    // 유저 퇴장 시 참가자 목록 업데이트
    onUserLeave: (d) => {
      if (typeof d.userId !== 'number') return;

      setParticipants((prev) => prev.filter((p) => p.userId !== d.userId));
      setTodoGroups((prev) => prev.filter((g) => g.userId !== d.userId));
    },

    // 목표 토글 업데이트
    onCompleteUpdate: (d) => {
      setTodoGroups((prev) =>
        prev.map((g) =>
          g.userId === d.userId
            ? {
                ...g,
                goals: g.goals.map((i) =>
                  i.goalId === d.goalId ? { ...i, isCompleted: d.isCompleted } : i,
                ),
              }
            : g,
        ),
      );
    },

    // 다짐 업데이트
    onResolutionUpdate: (d) => {
      setTodoGroups((prev) =>
        prev.map((g) => (g.userId === d.userId ? { ...g, resolution: d.resolution } : g)),
      );
    },

    // 공지사항 업데이트
    onNoticeUpdate: (d) => {
      if (typeof d.notice === 'string') {
        setNotice(d.notice);
      }
    },

    // 알람 업데이트
    onAlertUpdate: (d) => {
      if (typeof d.minutesLeft !== 'number') return;
      setAlertInfo({
        visible: true,
        minutesLeft: d.minutesLeft,
      });
    },
  });

  const setTodosByUser = useCallback((userId: number, updated: Todo[]) => {
    setTodoGroups((prev) => prev.map((g) => (g.userId === userId ? { ...g, goals: updated } : g)));
  }, []);

  const setAlertVisible = (visible: boolean) => {
    setAlertInfo((prev) => ({ ...prev, visible }));
  };

  return {
    todoGroups,
    setTodosByUser,
    notice,
    setNotice,
    roomData,
    participants,
    alertInfo,
    setAlertVisible,
  };
};
