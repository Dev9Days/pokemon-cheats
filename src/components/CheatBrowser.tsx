import type { RefObject } from "react";
import type { CheatBuild, CheatGroup } from "../types/cheat";
import type { SectionNavItem } from "../utils/cheats";
import { BrowserToolbar } from "./BrowserToolbar";
import { CommentsButton } from "./CommentsButton";
import { CommentsPanel } from "./CommentsPanel";
import { MobileSectionOverlay } from "./MobileSectionOverlay";
import { ProgressiveCheatGroupList } from "./ProgressiveCheatGroupList";
import { SearchResultsLayer } from "./SearchResultsLayer";
import { SectionNav } from "./SectionNav";

type CheatBrowserProps = {
  activeSectionId: string | null;
  activeSectionTitle: string;
  build: CheatBuild;
  filteredGroups: CheatGroup[];
  getEntryCodeText: (entryId: string) => Promise<string> | string;
  getVariantCodeText: (entryId: string, variantId: string) => Promise<string> | string;
  groups: CheatGroup[];
  hasFilterQuery: boolean;
  isBrowserVisible: boolean;
  isCommentsOpen: boolean;
  isInitialBuildLoading: boolean;
  isMobileOverlayOpen: boolean;
  isMobileSearchFocused: boolean;
  isProgressive: boolean;
  isSearchActive: boolean;
  loadingLabel: string | null;
  normalizedFilterQuery: string;
  onClearSearch: () => void;
  onCloseComments: () => void;
  onCloseNavigation: () => void;
  onNavigateSection: (id: string) => void;
  onOpenComments: () => void;
  onOpenNavigation: () => void;
  onRenderComplete?: () => void;
  onSearch: (query: string) => void;
  onSearchBlur: () => void;
  onSearchFocus: () => void;
  onSearchPointerDown: () => void;
  query: string;
  sectionNavItems: SectionNavItem[];
  toolbarHeight: number;
  toolbarRef: RefObject<HTMLDivElement | null>;
};

export function CheatBrowser({
  activeSectionId,
  activeSectionTitle,
  build,
  filteredGroups,
  getEntryCodeText,
  getVariantCodeText,
  groups,
  hasFilterQuery,
  isBrowserVisible,
  isCommentsOpen,
  isInitialBuildLoading,
  isMobileOverlayOpen,
  isMobileSearchFocused,
  isProgressive,
  isSearchActive,
  loadingLabel,
  normalizedFilterQuery,
  onClearSearch,
  onCloseComments,
  onCloseNavigation,
  onNavigateSection,
  onOpenComments,
  onOpenNavigation,
  onRenderComplete,
  onSearch,
  onSearchBlur,
  onSearchFocus,
  onSearchPointerDown,
  query,
  sectionNavItems,
  toolbarHeight,
  toolbarRef,
}: CheatBrowserProps) {
  return (
    <section
      className={`browser-shell${isBrowserVisible ? "" : " browser-shell--prewarm"}`}
      aria-hidden={!isBrowserVisible}
      aria-label={`${build.label} 치트 목록`}
    >
      <BrowserToolbar
        activeSectionTitle={activeSectionTitle}
        isInputFocused={isMobileSearchFocused}
        isSearching={isSearchActive}
        onClearSearch={onClearSearch}
        onOpenComments={onOpenComments}
        onOpenNavigation={onOpenNavigation}
        onSearchBlur={onSearchBlur}
        onSearchFocus={onSearchFocus}
        onSearchPointerDown={onSearchPointerDown}
        onSearch={onSearch}
        query={query}
        toolbarRef={toolbarRef}
      />
      <div className="toolbar-spacer" style={{ height: isSearchActive ? `${toolbarHeight}px` : undefined }} aria-hidden="true" />

      <div className="browser-layout">
        <div className="group-list">
          {isInitialBuildLoading && groups.length === 0 ? (
            <p className="empty-state">{loadingLabel ?? "치트 목록 불러오는 중"}</p>
          ) : (
            <ProgressiveCheatGroupList
              copyCacheKey={build.id}
              groups={groups}
              isProgressive={isProgressive}
              getEntryCodeText={getEntryCodeText}
              getVariantCodeText={getVariantCodeText}
              onRenderComplete={isBrowserVisible ? onRenderComplete : undefined}
            />
          )}
        </div>
        {groups.length > 0 ? <SectionNav items={sectionNavItems} activeId={activeSectionId} onNavigate={onNavigateSection} /> : null}
      </div>

      <SearchResultsLayer
        copyCacheKey={build.id}
        groups={filteredGroups}
        getEntryCodeText={getEntryCodeText}
        getVariantCodeText={getVariantCodeText}
        hasQuery={hasFilterQuery}
        isSearching={isSearchActive}
        resetKey={normalizedFilterQuery}
      />

      {isMobileOverlayOpen ? (
        <MobileSectionOverlay
          activeId={activeSectionId}
          activeTitle={activeSectionTitle}
          items={sectionNavItems}
          onClose={onCloseNavigation}
          onNavigate={onNavigateSection}
        />
      ) : null}
      <CommentsButton onClick={onOpenComments} />
      <CommentsPanel isOpen={isCommentsOpen} onClose={onCloseComments} />
    </section>
  );
}
