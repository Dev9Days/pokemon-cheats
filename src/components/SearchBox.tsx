import { Search } from "lucide-react";
import type { MouseEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

export function SearchBox({
  query,
  onBlur,
  onFocus,
  onPointerDown,
  onSearch,
}: {
  query: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onPointerDown?: () => void;
  onSearch: (query: string) => void;
}) {
  const [draftQuery, setDraftQuery] = useState(query);
  const isComposingRef = useRef(false);

  function capturePointerFocus(event: PointerEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) {
    onPointerDown?.();
    if (!onPointerDown) return;

    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
  }

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  return (
    <form
      className="search-box"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (isComposingRef.current) return;
        onSearch(draftQuery);
      }}
    >
      <input
        value={draftQuery}
        onChange={(event) => setDraftQuery(event.target.value)}
        onBlur={onBlur}
        onMouseDown={capturePointerFocus}
        onPointerDown={capturePointerFocus}
        onTouchStart={onPointerDown}
        onKeyDown={(event) => {
          if (event.key !== "Enter" || isComposingRef.current) return;
          event.preventDefault();
          onSearch(draftQuery);
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
        }}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onFocus={onFocus}
        placeholder="치트명, 비고 검색"
      />
      <button type="submit" aria-label="검색">
        <Search size={17} />
      </button>
    </form>
  );
}
