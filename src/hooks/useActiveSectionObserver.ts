import { useEffect, useRef, useCallback } from 'react';
import { useDanverseStore } from '@/store/useDanverseStore';

export function useActiveSectionObserver() {
  const setActiveSection = useDanverseStore((s) => s.setActiveSection);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (!el || !observerRef.current) return;
    el.setAttribute('data-section-id', id);
    observerRef.current.observe(el);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const id = visible.target.getAttribute('data-section-id');
          if (id) setActiveSection(id);
        }
      },
      { threshold: 0.3 }
    );

    return () => observerRef.current?.disconnect();
  }, [setActiveSection]);

  return { registerSection };
}
