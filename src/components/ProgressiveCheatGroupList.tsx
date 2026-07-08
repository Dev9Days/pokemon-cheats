import { useEffect, useState } from "react";
import type { CheatGroup } from "../types/cheat";
import { CheatGroupView } from "./CheatGroupView";

const INITIAL_GROUP_COUNT = 2;
const GROUPS_PER_FRAME = 1;

type ProgressiveCheatGroupListProps = {
  copyCacheKey?: string;
  getEntryCodeText: (entryId: string) => Promise<string> | string;
  getVariantCodeText: (entryId: string, variantId: string) => Promise<string> | string;
  groups: CheatGroup[];
  isProgressive?: boolean;
  onRenderComplete?: () => void;
};

export function ProgressiveCheatGroupList({
  copyCacheKey,
  getEntryCodeText,
  getVariantCodeText,
  groups,
  isProgressive = true,
  onRenderComplete,
}: ProgressiveCheatGroupListProps) {
  const [visibleGroupCount, setVisibleGroupCount] = useState(() =>
    isProgressive ? Math.min(groups.length, INITIAL_GROUP_COUNT) : groups.length,
  );

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    let nextCount = isProgressive ? Math.min(groups.length, INITIAL_GROUP_COUNT) : groups.length;

    setVisibleGroupCount(nextCount);

    if (!isProgressive) return;

    function renderMore() {
      frameId = window.requestAnimationFrame(() => {
        if (cancelled) return;

        nextCount = Math.min(groups.length, nextCount + GROUPS_PER_FRAME);
        setVisibleGroupCount(nextCount);

        if (nextCount < groups.length) renderMore();
      });
    }

    if (nextCount < groups.length) renderMore();

    return () => {
      cancelled = true;
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [groups, isProgressive]);

  useEffect(() => {
    if (!isProgressive) return;
    if (visibleGroupCount < groups.length) return;

    let firstFrameId = 0;
    let secondFrameId = 0;

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        onRenderComplete?.();
      });
    });

    return () => {
      if (firstFrameId) window.cancelAnimationFrame(firstFrameId);
      if (secondFrameId) window.cancelAnimationFrame(secondFrameId);
    };
  }, [groups.length, isProgressive, onRenderComplete, visibleGroupCount]);

  return (
    <>
      {groups.slice(0, visibleGroupCount).map((group) => (
        <CheatGroupView
          key={group.id}
          copyCacheKey={copyCacheKey}
          group={group}
          getEntryCodeText={getEntryCodeText}
          getVariantCodeText={getVariantCodeText}
        />
      ))}
    </>
  );
}
