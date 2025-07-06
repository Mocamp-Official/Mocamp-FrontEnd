import { create } from 'zustand';
import { Participant } from '@/types/room';

interface GroupCallState {
  participants: Participant[];
  adminUsername: string;
  setParticipants: (list: Participant[]) => void;
  setAdminUsername: (name: string) => void;
  updateParticipant: (userId: number, patch: Partial<Participant>) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (userId: number) => void;
}

export const useGroupCallStore = create<GroupCallState>((set) => ({
  participants: [],
  adminUsername: '',
  setParticipants: (list) => set({ participants: list }),
  setAdminUsername: (name) => set({ adminUsername: name }),

  updateParticipant: (userId, patch) =>
    set((state) => ({
      participants: state.participants.map((p) => (p.userId === userId ? { ...p, ...patch } : p)),
    })),

  addParticipant: (participant) =>
  set((state) => {
    const participants = Array.isArray(state.participants) ? state.participants : []; // ✅ 안정성 보장
    const exists = participants.some((p) => p.userId === participant.userId);
    return exists ? {} : { participants: [...participants, participant] };
  }),

  removeParticipant: (userId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.userId !== userId),
    })),
}));
