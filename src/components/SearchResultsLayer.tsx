import { useLayoutEffect, useRef } from "react";
import type { CheatGroup } from "../types/cheat";
import { CheatGroupView } from "./CheatGroupView";

type SearchResultsLayerProps = {
  copyCacheKey?: string;
  getEntryCodeText: (entryId: string) => Promise<string> | string;
  getVariantCodeText: (entryId: string, variantId: string) => Promise<string> | string;
  groups: CheatGroup[];
  hasQuery: boolean;
  isSearching: boolean;
  resetKey: string;
};

export function SearchResultsLayer({
  copyCacheKey,
  getEntryCodeText,
  getVariantCodeText,
  groups,
  hasQuery,
  isSearching,
  resetKey,
}: SearchResultsLayerProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const canRenderResults = hasQuery;

  useLayoutEffect(() => {
    if (!isSearching) return;
    const layer = layerRef.current;
    const scroller = scrollerRef.current;

    if (layer) layer.scrollTop = 0;
    if (scroller) scroller.scrollTop = 0;

    const frameId = window.requestAnimationFrame(() => {
      if (layer) layer.scrollTop = 0;
      if (scroller) scroller.scrollTop = 0;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isSearching, resetKey]);

  return (
    <div
      ref={layerRef}
      className={`search-results-layer${isSearching ? " is-active" : ""}`}
      aria-hidden={!isSearching}
    >
      <div className="search-results-scroller" ref={scrollerRef}>
        <div className="search-results-inner">
          {canRenderResults && groups.length > 0 ? (
            <div className="group-list group-list--search-results">
              {groups.map((group) => (
                <CheatGroupView
                  key={group.id}
                  copyCacheKey={copyCacheKey}
                  group={group}
                  getEntryCodeText={getEntryCodeText}
                  getVariantCodeText={getVariantCodeText}
                />
              ))}
            </div>
          ) : null}
          {canRenderResults && groups.length === 0 ? <p className="empty-state">표시할 치트가 없습니다.</p> : null}
        </div>
      </div>
    </div>
  );
}
