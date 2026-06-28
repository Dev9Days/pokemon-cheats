import { memo } from "react";
import type { CheatGroup } from "../types/cheat";
import { getCheatCount, isSingleCheatGroup } from "../utils/cheats";
import { CheatCard } from "./CheatCard";

export const CheatGroupView = memo(function CheatGroupView({
  group,
  depth = 0,
  disableSectionId = false,
}: {
  group: CheatGroup;
  depth?: number;
  disableSectionId?: boolean;
}) {
  if (depth > 0 && isSingleCheatGroup(group)) {
    return group.cheats?.map((cheat) => <CheatCard key={cheat.id} cheat={cheat} />) ?? null;
  }

  const cheatCount = getCheatCount([group]);
  const Heading = `h${Math.min(depth + 2, 5)}` as "h2" | "h3" | "h4" | "h5";

  return (
    <section className="cheat-section" data-depth={depth} id={disableSectionId ? undefined : group.id}>
      <Heading className="section-heading">
        <span>{group.title}</span>
        <span className="group-count">{cheatCount}</span>
      </Heading>
      <div className="group-body">
        {group.cheats?.map((cheat) => <CheatCard key={cheat.id} cheat={cheat} />)}
        {group.children?.map((child) => (
          <CheatGroupView key={child.id} group={child} depth={depth + 1} disableSectionId={disableSectionId} />
        ))}
      </div>
    </section>
  );
});
