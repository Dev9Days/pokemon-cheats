import { X } from "lucide-react";
import type { SectionNavItem } from "../utils/cheats";
import { SectionNav } from "./SectionNav";

type MobileSectionOverlayProps = {
  activeId: string | null;
  activeTitle: string;
  items: SectionNavItem[];
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export function MobileSectionOverlay({ activeId, activeTitle, items, onClose, onNavigate }: MobileSectionOverlayProps) {
  return (
    <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="검색 및 분류 이동">
      <div className="mobile-overlay__backdrop" onClick={onClose} />
      <div className="mobile-overlay__panel">
        <div className="mobile-overlay__header">
          <strong>{activeTitle}</strong>
          <button type="button" onClick={onClose} aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <SectionNav items={items} activeId={activeId} onNavigate={onNavigate} className="section-nav--overlay" />
      </div>
    </div>
  );
}
