import { MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const baseGiscusConfig = {
  repo: import.meta.env.VITE_GISCUS_REPO,
  repoId: import.meta.env.VITE_GISCUS_REPO_ID,
};

const giscusCategories = [
  {
    id: "bug",
    label: "안 돼요",
    category: import.meta.env.VITE_GISCUS_BUG_CATEGORY,
    categoryId: import.meta.env.VITE_GISCUS_BUG_CATEGORY_ID,
  },
  {
    id: "request",
    label: "만들어주세요",
    category: import.meta.env.VITE_GISCUS_REQUEST_CATEGORY,
    categoryId: import.meta.env.VITE_GISCUS_REQUEST_CATEGORY_ID,
  },
] as const;

type GiscusCategory = (typeof giscusCategories)[number];

export function CommentsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<GiscusCategory["id"]>("bug");
  const giscusContainerRef = useRef<HTMLDivElement | null>(null);
  const configuredCategories = useMemo(
    () => giscusCategories.filter((category) => category.category && category.categoryId),
    [],
  );
  const selectedCategory =
    configuredCategories.find((category) => category.id === selectedCategoryId) ?? configuredCategories[0] ?? null;
  const isGiscusConfigured = Boolean(baseGiscusConfig.repo && baseGiscusConfig.repoId && selectedCategory);

  useEffect(() => {
    if (!isOpen || !isGiscusConfigured || !giscusContainerRef.current || !selectedCategory) return;

    giscusContainerRef.current.replaceChildren();
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", baseGiscusConfig.repo);
    script.setAttribute("data-repo-id", baseGiscusConfig.repoId);
    script.setAttribute("data-category", selectedCategory.category);
    script.setAttribute("data-category-id", selectedCategory.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ko");
    giscusContainerRef.current.append(script);
  }, [isOpen, isGiscusConfigured, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="comments-panel" role="dialog" aria-modal="true" aria-label="댓글">
      <div className="comments-panel__backdrop" onClick={onClose} />
      <div className="comments-panel__body">
        <div className="comments-panel__header">
          <div>
            <MessageCircle size={18} />
            <strong>댓글</strong>
          </div>
          <button type="button" onClick={onClose} aria-label="댓글 닫기">
            <X size={18} />
          </button>
        </div>
        {isGiscusConfigured ? (
          <div className="comments-panel__content">
            <div className="comments-panel__tabs" role="tablist" aria-label="댓글 종류">
              {configuredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory?.id === category.id}
                  className={selectedCategory?.id === category.id ? "is-active" : ""}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div ref={giscusContainerRef} className="comments-panel__giscus" />
          </div>
        ) : (
          <div className="comments-panel__empty">
            <strong>댓글 설정 필요</strong>
            <p>GitHub Discussions와 Giscus 설정값을 환경변수로 추가하면 댓글을 사용할 수 있습니다.</p>
            <code>VITE_GISCUS_REPO</code>
            <code>VITE_GISCUS_REPO_ID</code>
            <code>VITE_GISCUS_BUG_CATEGORY</code>
            <code>VITE_GISCUS_BUG_CATEGORY_ID</code>
            <code>VITE_GISCUS_REQUEST_CATEGORY</code>
            <code>VITE_GISCUS_REQUEST_CATEGORY_ID</code>
          </div>
        )}
      </div>
    </div>
  );
}
