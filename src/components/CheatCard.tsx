import { Search } from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { CheatEntry, CheatVariant } from "../types/cheat";
import { CopyButton } from "./CopyButton";

const VARIANT_FILTER_THRESHOLD = 20;
const VARIANT_SCROLL_THRESHOLD = 4;
const PROGRESSIVE_VARIANT_THRESHOLD = 40;
const INITIAL_VARIANT_COUNT = 12;
const VARIANTS_PER_PAGE = 36;
const VARIANT_SENTINEL_MARGIN = "120px";

function CheatBadges({ badges }: { badges?: CheatEntry["badges"] }) {
  if (!badges?.length) return null;

  return (
    <>
      {badges.map((badge) => (
        <span
          key={`${badge.kind}:${badge.label}`}
          className={`cheat-badge cheat-badge--${badge.kind}`}
          title={badge.description}
        >
          {badge.label}
        </span>
      ))}
    </>
  );
}

type CheatCardProps = {
  copyCacheKey?: string;
  cheat: CheatEntry;
  getEntryCodeText: (entryId: string) => Promise<string> | string;
  getVariantCodeText: (entryId: string, variantId: string) => Promise<string> | string;
};

const VariantRow = memo(function VariantRow({
  copyCacheKey,
  entryId,
  getVariantCodeText,
  variant,
}: {
  copyCacheKey?: string;
  entryId: string;
  getVariantCodeText: (entryId: string, variantId: string) => Promise<string> | string;
  variant: CheatVariant;
}) {
  return (
    <div className="variant-row" role="listitem">
      <div>
        <strong>{variant.title}</strong>
        {variant.badges?.length ? (
          <div className="cheat-meta cheat-meta--variant">
            <CheatBadges badges={variant.badges} />
          </div>
        ) : null}
        {variant.subtitle ? <span>{variant.subtitle}</span> : null}
        {variant.note ? <span>{variant.note}</span> : null}
      </div>
      <CopyButton
        cacheKey={copyCacheKey}
        label={variant.title}
        getText={() => getVariantCodeText(entryId, variant.id)}
      />
    </div>
  );
});

export const CheatCard = memo(function CheatCard({
  copyCacheKey,
  cheat,
  getEntryCodeText,
  getVariantCodeText,
}: CheatCardProps) {
  const note = cheat.note?.trim();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [variantQuery, setVariantQuery] = useState("");
  const normalizedVariantQuery = variantQuery.trim().toLowerCase();
  const shouldShowVariantFilter = (cheat.variants?.length ?? 0) >= VARIANT_FILTER_THRESHOLD;
  const shouldUseScrollList = (cheat.variants?.length ?? 0) >= VARIANT_SCROLL_THRESHOLD;
  const variants = useMemo(() => {
    if (!cheat.variants || !normalizedVariantQuery) return cheat.variants;

    return cheat.variants.filter((variant) =>
      [variant.id, variant.title, variant.subtitle, variant.note]
        .filter(Boolean)
        .join("\n")
        .toLowerCase()
        .includes(normalizedVariantQuery),
    );
  }, [cheat.variants, normalizedVariantQuery]);
  const [visibleVariantCount, setVisibleVariantCount] = useState(() =>
    Math.min(variants?.length ?? 0, INITIAL_VARIANT_COUNT),
  );
  const shouldRenderVariantsProgressively = (variants?.length ?? 0) >= PROGRESSIVE_VARIANT_THRESHOLD;
  const visibleVariants = shouldRenderVariantsProgressively
    ? variants?.slice(0, visibleVariantCount)
    : variants;
  const hiddenVariantCount = Math.max(0, (variants?.length ?? 0) - (visibleVariants?.length ?? 0));

  useEffect(() => {
    const totalCount = variants?.length ?? 0;

    if (!shouldRenderVariantsProgressively) {
      setVisibleVariantCount(totalCount);
      return;
    }

    setVisibleVariantCount(Math.min(totalCount, INITIAL_VARIANT_COUNT));
  }, [shouldRenderVariantsProgressively, variants]);

  function showMoreVariants() {
    setVisibleVariantCount((currentCount) =>
      Math.min(variants?.length ?? 0, currentCount + VARIANTS_PER_PAGE),
    );
  }

  useEffect(() => {
    if (!shouldRenderVariantsProgressively || hiddenVariantCount === 0) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) showMoreVariants();
      },
      { rootMargin: VARIANT_SENTINEL_MARGIN },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hiddenVariantCount, shouldRenderVariantsProgressively, variants?.length]);

  return (
    <article className="cheat-card">
      <div className="cheat-card__header">
        <div>
          <h3>{cheat.title}</h3>
          <div className="cheat-meta">
            <span>{cheat.codeType}</span>
            <CheatBadges badges={cheat.badges} />
          </div>
        </div>
        {!cheat.variants ? (
          <CopyButton
            cacheKey={copyCacheKey}
            label={cheat.title}
            getText={() => getEntryCodeText(cheat.id)}
          />
        ) : null}
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
            {visibleVariants?.map((variant) => (
              <VariantRow
                key={variant.id}
                copyCacheKey={copyCacheKey}
                entryId={cheat.id}
                getVariantCodeText={getVariantCodeText}
                variant={variant}
              />
            ))}
            {hiddenVariantCount > 0 ? (
              <div ref={sentinelRef} className="variant-sentinel" role="listitem" aria-hidden="true" />
            ) : null}
            {variants?.length === 0 ? <p className="variant-empty">검색 결과가 없습니다.</p> : null}
          </div>
        </>
      ) : null}
      {note ? <p className="cheat-note">{note}</p> : null}
    </article>
  );
});
