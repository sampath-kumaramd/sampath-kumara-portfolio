import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayoutType = 'default' | 'vscode' | 'intellij';

interface LayoutState {
  currentLayout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      currentLayout: 'default',
      setLayout: (layout) => set({ currentLayout: layout }),
    }),
    {
      name: 'layout-preference',
    }
  )
);
