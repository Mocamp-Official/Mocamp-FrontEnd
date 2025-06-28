import { signalingSocket } from '@/libs/socket';

export const useRoomPublisher = (roomId: string) => {
  const safeSend = (destination: string, body: any) => {
    if (!signalingSocket.isConnected) {
      console.warn('❗ STOMP 연결이 아직 준비되지 않았습니다.');
      return;
    }
    signalingSocket.send(destination, body);
  };

  const toggleTodo = (goalId: number, isCompleted: boolean) => {
    safeSend(`/pub/data/goal/complete/${roomId}`, {
      goalId: Number(goalId),
      isCompleted: !!isCompleted,
    });
  };

  const updateGoals = (createGoals: { content: string }[], deleteGoals: number[]) => {
    safeSend(`/pub/data/goal/manage/${roomId}`, {
      createGoals,
      deleteGoals,
    });
  };

  const updateNotice = (notice: string) => {
    safeSend(`/pub/data/notice/${roomId}`, { notice });
  };

  const updateResolution = (resolution: string) => {
    safeSend(`/pub/data/resolution/${roomId}`, { resolution });
  };

  return { toggleTodo, updateGoals, updateNotice, updateResolution };
};
