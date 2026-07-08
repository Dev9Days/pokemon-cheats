import { memo } from "react";
import type { CheatGroup } from "../types/cheat";
import { getCheatCount, isSingleCheatGroup } from "../utils/cheats";
import { CheatCard } from "./CheatCard";

export const CheatGroupView = memo(function CheatGroupView({
  copyCacheKey,
  getEntryCodeText,
  getVariantCodeText,
  group,
  depth = 0,
  disableSectionId = false,
}: {
  copyCacheKey?: string;
  getEntryCodeText: (entryId: string) => Promise<string> | string;
  getVariantCodeText: (entryId: string, variantId: string) => Promise<string> | string;
  group: CheatGroup;
  depth?: number;
  disableSectionId?: boolean;
}) {
  if (depth > 0 && isSingleCheatGroup(group)) {
    return (
      group.cheats?.map((cheat) => (
        <CheatCard
          key={cheat.id}
          copyCacheKey={copyCacheKey}
          cheat={cheat}
          getEntryCodeText={getEntryCodeText}
          getVariantCodeText={getVariantCodeText}
        />
      )) ?? null
    );
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
        {group.cheats?.map((cheat) => (
          <CheatCard
            key={cheat.id}
            copyCacheKey={copyCacheKey}
            cheat={cheat}
            getEntryCodeText={getEntryCodeText}
            getVariantCodeText={getVariantCodeText}
          />
        ))}
        {group.children?.map((child) => (
          <CheatGroupView
            key={child.id}
            copyCacheKey={copyCacheKey}
            group={child}
            depth={depth + 1}
            disableSectionId={disableSectionId}
            getEntryCodeText={getEntryCodeText}
            getVariantCodeText={getVariantCodeText}
          />
        ))}
      </div>
    </section>
  );
});
