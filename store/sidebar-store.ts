import { create } from "zustand"

interface SidebarState {
  isOpen: boolean
  activeItem: string
  toggle: () => void
  setActiveItem: (item: string) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  activeItem: "dashboard",
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveItem: (item) => set({ activeItem: item }),
}))
