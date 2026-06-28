import type { CheatEntry, CheatGroup } from "../types/cheat";

export type SectionNavItem = {
  id: string;
  title: string;
  depth: number;
};

export function getCheatCount(groups: CheatGroup[]): number {
  return groups.reduce(
    (count, group) => count + (group.cheats?.length ?? 0) + getCheatCount(group.children ?? []),
    0,
  );
}

export function getSectionNavItems(groups: CheatGroup[], depth = 0): SectionNavItem[] {
  return groups.flatMap((group) => {
    const item = depth <= 1 && !isSingleCheatGroup(group) ? [{ id: group.id, title: group.title, depth }] : [];
    return [...item, ...getSectionNavItems(group.children ?? [], depth + 1)];
  });
}

export function isSingleCheatGroup(group: CheatGroup): boolean {
  if ((group.cheats?.length ?? 0) !== 1 || (group.children?.length ?? 0) !== 0) return false;
  return group.cheats?.[0]?.title === group.title;
}

function filterCheat(cheat: CheatEntry, query: string): CheatEntry | null {
  const ownText = [cheat.id, cheat.title, cheat.codeType, cheat.note, ...cheat.codes]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();

  if (ownText.includes(query)) return cheat;

  const variants = cheat.variants?.filter((variant) =>
    [variant.id, variant.title, variant.subtitle, variant.note, ...variant.codes]
      .filter(Boolean)
      .join("\n")
      .toLowerCase()
      .includes(query),
  );

  if (variants?.length) return { ...cheat, variants };

  return null;
}

export function filterGroups(groups: CheatGroup[], query: string): CheatGroup[] {
  if (!query) return groups;

  return groups.reduce<CheatGroup[]>((filtered, group) => {
    const titleMatches = `${group.id} ${group.title}`.toLowerCase().includes(query);
    const cheats = titleMatches
      ? group.cheats
      : group.cheats
          ?.map((cheat) => filterCheat(cheat, query))
          .filter((cheat): cheat is CheatEntry => Boolean(cheat));
    const children = filterGroups(group.children ?? [], query);

    if (titleMatches || (cheats?.length ?? 0) > 0 || children.length > 0) {
      filtered.push({ ...group, cheats, children });
    }

    return filtered;
  }, []);
}
