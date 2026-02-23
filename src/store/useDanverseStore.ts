import { create } from 'zustand';

type CursorVariant = 'default' | 'hover' | 'magnetic' | 'video' | 'drag' | 'cta' | 'disabled';

interface DanverseState {
  // Cursor
  cursorVariant: CursorVariant;
  setCursorVariant: (v: CursorVariant) => void;

  // Navigation
  activeSection: string;
  setActiveSection: (s: string) => void;
  isNavVisible: boolean;
  setNavVisible: (v: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;

  // UI
  isLoading: boolean;
  setLoading: (v: boolean) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  locale: 'en' | 'ar';
  setLocale: (l: 'en' | 'ar') => void;

  // Works
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  selectedWork: string | null;
  setSelectedWork: (id: string | null) => void;
}

export const useDanverseStore = create<DanverseState>((set) => ({
  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),

  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),
  isNavVisible: false,
  setNavVisible: (v) => set({ isNavVisible: v }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (v) => set({ isMobileMenuOpen: v }),

  isLoading: true,
  setLoading: (v) => set({ isLoading: v }),
  isSoundEnabled: false,
  toggleSound: () => set((s) => ({ isSoundEnabled: !s.isSoundEnabled })),
  locale: 'en',
  setLocale: (l) => set({ locale: l }),

  activeFilter: 'all',
  setActiveFilter: (f) => set({ activeFilter: f }),
  selectedWork: null,
  setSelectedWork: (id) => set({ selectedWork: id }),
}));
