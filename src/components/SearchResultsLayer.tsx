import type { CSSProperties } from "react";
import type { CheatGroup } from "../types/cheat";
import { CheatGroupView } from "./CheatGroupView";

type SearchResultsLayerProps = {
  groups: CheatGroup[];
  isSearching: boolean;
  searchLayerTop: number;
};

export function SearchResultsLayer({ groups, isSearching, searchLayerTop }: SearchResultsLayerProps) {
  return (
    <div
      className={`search-results-layer${isSearching ? " is-active" : ""}`}
      style={{ "--search-layer-top": `${searchLayerTop}px` } as CSSProperties}
      aria-hidden={!isSearching}
    >
      <div className="search-results-inner">
        {isSearching && groups.length > 0 ? (
          <div className="group-list group-list--search-results">
            {groups.map((group) => (
              <CheatGroupView key={group.id} group={group} />
            ))}
          </div>
        ) : null}
        {isSearching && groups.length === 0 ? <p className="empty-state">표시할 치트가 없습니다.</p> : null}
      </div>
    </div>
  );
}
