import { Search } from "lucide-react";

export function SearchBox({
  query,
  onBlur,
  onFocus,
  onQueryChange,
}: {
  query: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onQueryChange: (query: string) => void;
}) {
  return (
    <label className="search-box">
      <Search size={18} />
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="치트명, 코드, 비고 검색"
      />
    </label>
  );
}
