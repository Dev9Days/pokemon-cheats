import { useEffect, useState } from "react";
import type { SectionNavItem } from "../utils/cheats";
import { isProgrammaticSectionScroll, scrollToSection } from "../utils/sectionScroll";

export function useActiveSection(sectionNavItems: SectionNavItem[]) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    setActiveSectionId(sectionNavItems[0]?.id ?? null);
  }, [sectionNavItems]);

  useEffect(() => {
    if (sectionNavItems.length === 0) return;

    let frameId = 0;

    function updateActiveSection() {
      frameId = 0;
      if (isProgrammaticSectionScroll()) return;

      const anchorTop = 96;
      let nextActive = sectionNavItems[0]?.id ?? null;

      for (const item of sectionNavItems) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= anchorTop) {
          nextActive = item.id;
        } else {
          break;
        }
      }

      setActiveSectionId((currentId) => (currentId === nextActive ? currentId : nextActive));
    }

    function requestUpdate() {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [sectionNavItems]);

  function navigateToSection(id: string) {
    scrollToSection(id, () => setActiveSectionId(id));
  }

  return { activeSectionId, navigateToSection };
}
