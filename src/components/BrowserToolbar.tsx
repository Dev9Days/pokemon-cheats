import { MessageCircle, X } from "lucide-react";
import type { RefObject } from "react";
import { SearchBox } from "./SearchBox";

type BrowserToolbarProps = {
  activeSectionTitle: string;
  isInputFocused: boolean;
  isSearching: boolean;
  onClearSearch: () => void;
  onOpenComments: () => void;
  onOpenNavigation: () => void;
  onSearchBlur: () => void;
  onSearchFocus: () => void;
  onSearchPointerDown: () => void;
  onSearch: (query: string) => void;
  query: string;
  toolbarRef: RefObject<HTMLDivElement | null>;
};

export function BrowserToolbar({
  activeSectionTitle,
  isInputFocused,
  isSearching,
  onClearSearch,
  onOpenComments,
  onOpenNavigation,
  onSearchBlur,
  onSearchFocus,
  onSearchPointerDown,
  onSearch,
  query,
  toolbarRef,
}: BrowserToolbarProps) {
  return (
    <div
      ref={toolbarRef}
      className={`toolbar${isInputFocused ? " is-input-focused" : ""}${isSearching ? " is-searching" : ""}`}
    >
      <div className="desktop-search">
        <SearchBox query={query} onSearch={onSearch} />
        {isSearching ? (
          <button className="desktop-search__clear" type="button" onClick={onClearSearch} aria-label="검색 초기화">
            <X size={18} />
          </button>
        ) : null}
      </div>
      <div className="mobile-controls">
        <div className="mobile-search-row">
          <SearchBox
            query={query}
            onBlur={onSearchBlur}
            onFocus={onSearchFocus}
            onPointerDown={onSearchPointerDown}
            onSearch={onSearch}
          />
          <button className="mobile-comment-button" type="button" onClick={onOpenComments} aria-label="댓글 열기">
            <MessageCircle size={17} />
          </button>
        </div>
        {isSearching ? (
          <button className="mobile-overlay-trigger mobile-overlay-trigger--clear" type="button" onClick={onClearSearch}>
            <span className="mobile-overlay-trigger__current">
              <span>검색 결과</span>
            </span>
            <span className="mobile-overlay-trigger__hint">검색 초기화</span>
          </button>
        ) : (
          <button className="mobile-overlay-trigger" type="button" onClick={onOpenNavigation}>
            <span className="mobile-overlay-trigger__current">
              <span>{activeSectionTitle}</span>
            </span>
            <span className="mobile-overlay-trigger__hint">목록 열기</span>
          </button>
        )}
      </div>
    </div>
  );
}
