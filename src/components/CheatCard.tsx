import { Search } from "lucide-react";
import { memo, useMemo, useState } from "react";
import type { CheatEntry, CheatVariant } from "../types/cheat";
import { CopyButton } from "./CopyButton";

const VARIANT_FILTER_THRESHOLD = 20;
const VARIANT_SCROLL_THRESHOLD = 4;

const VariantRow = memo(function VariantRow({ variant }: { variant: CheatVariant }) {
  const codeText = variant.codes.join("\n");

  return (
    <div className="variant-row">
      <div>
        <strong>{variant.title}</strong>
        {variant.subtitle ? <span>{variant.subtitle}</span> : null}
        {variant.note ? <span>{variant.note}</span> : null}
      </div>
      <CopyButton label={variant.title} text={codeText} />
    </div>
  );
});

export const CheatCard = memo(function CheatCard({ cheat }: { cheat: CheatEntry }) {
  const codeText = cheat.codes.join("\n");
  const note = cheat.note?.trim();
  const [variantQuery, setVariantQuery] = useState("");
  const normalizedVariantQuery = variantQuery.trim().toLowerCase();
  const shouldShowVariantFilter = (cheat.variants?.length ?? 0) >= VARIANT_FILTER_THRESHOLD;
  const shouldUseScrollList = (cheat.variants?.length ?? 0) >= VARIANT_SCROLL_THRESHOLD;
  const variants = useMemo(() => {
    if (!cheat.variants || !normalizedVariantQuery) return cheat.variants;

    return cheat.variants.filter((variant) =>
      [variant.id, variant.title, variant.subtitle, variant.note, ...variant.codes]
        .filter(Boolean)
        .join("\n")
        .toLowerCase()
        .includes(normalizedVariantQuery),
    );
  }, [cheat.variants, normalizedVariantQuery]);

  return (
    <article className="cheat-card">
      <div className="cheat-card__header">
        <div>
          <h3>{cheat.title}</h3>
          <div className="cheat-meta">
            <span>{cheat.codeType}</span>
          </div>
        </div>
        {!cheat.variants ? <CopyButton label={cheat.title} text={codeText} /> : null}
      </div>
      {cheat.variants ? (
        <>
          {shouldShowVariantFilter ? (
            <label className="variant-filter">
              <Search size={15} />
              <input
                type="search"
                value={variantQuery}
                onChange={(event) => setVariantQuery(event.target.value)}
                placeholder="이 목록에서 검색"
              />
              <span>
                {(variants?.length ?? 0).toLocaleString()} / {cheat.variants.length.toLocaleString()}
              </span>
            </label>
          ) : null}
          <div
            className={`variant-list${shouldUseScrollList ? " variant-list--scroll" : ""}`}
            role="list"
            aria-label={`${cheat.title} 코드 목록`}
          >
            {variants?.map((variant) => (
              <VariantRow key={variant.id} variant={variant} />
            ))}
            {variants?.length === 0 ? <p className="variant-empty">검색 결과가 없습니다.</p> : null}
          </div>
        </>
      ) : null}
      {note ? <p className="cheat-note">{note}</p> : null}
    </article>
  );
});
