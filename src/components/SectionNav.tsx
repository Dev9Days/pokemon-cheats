import type { SectionNavItem } from "../utils/cheats";

export function SectionNav({
  items,
  activeId,
  onNavigate,
  className = "",
}: {
  items: SectionNavItem[];
  activeId: string | null;
  onNavigate: (id: string) => void;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav className={`section-nav ${className}`.trim()} aria-label="치트 분류 바로가기">
      <div>
        {items.map((item) => (
          <button
            key={item.id}
            className={`section-nav__link depth-${item.depth}${activeId === item.id ? " is-active" : ""}`}
            type="button"
            onClick={(event) => {
              event.currentTarget.blur();
              onNavigate(item.id);
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
