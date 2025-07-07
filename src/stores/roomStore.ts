import { create } from 'zustand';

interface RoomStore {
  myUserId: number | null;
  adminUsername: string | null;
  isAdmin: boolean;
  isHost: boolean;
  setMyUserId: (id: number) => void;
  setAdminUsername: (name: string) => void;
  setIsHost: (isHost: boolean) => void;
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  myUserId: null,
  adminUsername: null,
  isAdmin: false,
  isHost: false,
  setMyUserId: (id) => {
  const adminUsername = get().adminUsername;
  const isAdmin = get().adminUsername !== null && get().myUserId === id;
  set({ myUserId: id, isAdmin });
},

setAdminUsername: (name) => {
  const myUserId = get().myUserId;
  const currentUsername = get().adminUsername;
  set({
    adminUsername: name,
    isAdmin: myUserId !== null && name === currentUsername,
  });
},

  setIsHost: (isHost) => set({ isHost }),
}));

