import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationStore {
  isAuthenticated: boolean;
  openModal: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  setOpenModal: (open: boolean) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      isAuthenticated: false, 
      openModal: false, 
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setOpenModal: (open) => set({ openModal: open }),
    }),
    {
      name: 'location-store',
    }
  )
);