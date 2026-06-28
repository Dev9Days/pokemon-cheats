import type { CSSProperties } from "react";
import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { BuildLoadingOverlay } from "./components/BuildLoadingOverlay";
import { BrowserToolbar } from "./components/BrowserToolbar";
import { BuildSelector } from "./components/BuildSelector";
import { CheatGroupView } from "./components/CheatGroupView";
import { CommentsButton } from "./components/CommentsButton";
import { CommentsPanel } from "./components/CommentsPanel";
import { MobileSectionOverlay } from "./components/MobileSectionOverlay";
import { RomDropOverlay } from "./components/RomDropOverlay";
import { SearchResultsLayer } from "./components/SearchResultsLayer";
import { SectionNav } from "./components/SectionNav";
import { builds } from "./data/builds";
import { getCheatsForBuild } from "./data";
import type { CheatBuildId } from "./types/cheat";
import { filterGroups, getSectionNavItems } from "./utils/cheats";
import { detectRomBuild } from "./utils/romBuildDetector";
import { isProgrammaticSectionScroll, scrollToSection } from "./utils/sectionScroll";

const STORAGE_KEY = "pokemon-emerald-cheats:selected-build";

function getInitialBuild(): CheatBuildId | null {
  const saved = localStorage.getItem(STORAGE_KEY) as CheatBuildId | null;
  return saved && builds.some((build) => build.id === saved) ? saved : null;
}

export function App() {
  const [selectedBuild, setSelectedBuild] = useState<CheatBuildId | null>(getInitialBuild);
  const [query, setQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isBuildLoading, setIsBuildLoading] = useState(false);
  const [buildLoadingLabel, setBuildLoadingLabel] = useState<string | null>(null);
  const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false);
  const [isRomDragging, setIsRomDragging] = useState(false);
  const [romStatus, setRomStatus] = useState<string | null>(null);
  const [searchLayerTop, setSearchLayerTop] = useState(0);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [toolbarOffsetTop, setToolbarOffsetTop] = useState(0);
  const buildLoadTokenRef = useRef(0);
  const dragDepthRef = useRef(0);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const build = selectedBuild ? builds.find((item) => item.id === selectedBuild)! : null;
  const groups = useMemo(() => (selectedBuild ? getCheatsForBuild(selectedBuild) : []), [selectedBuild]);
  const normalizedQuery = query.trim().toLowerCase();
  const deferredQuery = useDeferredValue(normalizedQuery);
  const isSearching = deferredQuery.length > 0;
  const filteredGroups = useMemo(() => (isSearching ? filterGroups(groups, deferredQuery) : []), [
    groups,
    deferredQuery,
    isSearching,
  ]);
  const displayedGroups = isSearching ? filteredGroups : groups;
  const sectionNavItems = useMemo(() => getSectionNavItems(displayedGroups), [displayedGroups]);
  const activeSectionTitle =
    sectionNavItems.find((item) => item.id === activeSectionId)?.title ?? sectionNavItems[0]?.title ?? "분류";
  useEffect(() => {
    setActiveSectionId(sectionNavItems[0]?.id ?? null);
  }, [sectionNavItems]);

  useEffect(() => {
    if (sectionNavItems.length === 0) return;

    let frameId = 0;

    function updateActiveSection() {
      frameId = 0;
      if (isProgrammaticSectionScroll()) return;

      const anchorTop = 96;
      let nextActive = sectionNavItems[0]?.id ?? null;

      for (const item of sectionNavItems) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= anchorTop) {
          nextActive = item.id;
        } else {
          break;
        }
      }

      setActiveSectionId((currentId) => (currentId === nextActive ? currentId : nextActive));
    }

    function requestUpdate() {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [sectionNavItems]);

  useLayoutEffect(() => {
    function updateToolbarHeight() {
      setToolbarHeight(toolbarRef.current?.getBoundingClientRect().height ?? 0);
    }

    updateToolbarHeight();
    window.addEventListener("resize", updateToolbarHeight);
    window.visualViewport?.addEventListener("resize", updateToolbarHeight);

    return () => {
      window.removeEventListener("resize", updateToolbarHeight);
      window.visualViewport?.removeEventListener("resize", updateToolbarHeight);
    };
  }, [build]);

  useLayoutEffect(() => {
    if (!isSearching) return;

    const scrollY = window.scrollY;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    function updateSearchLayerTop() {
      const toolbar = toolbarRef.current;
      const toolbarRect = toolbar?.getBoundingClientRect();
      setSearchLayerTop(Math.max(toolbar?.offsetHeight ?? 0, toolbarRect?.bottom ?? 0));
    }

    document.documentElement.classList.add("is-searching");
    updateSearchLayerTop();
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("resize", updateSearchLayerTop);
    window.visualViewport?.addEventListener("resize", updateSearchLayerTop);
    window.visualViewport?.addEventListener("scroll", updateSearchLayerTop);

    return () => {
      window.removeEventListener("resize", updateSearchLayerTop);
      window.visualViewport?.removeEventListener("resize", updateSearchLayerTop);
      window.visualViewport?.removeEventListener("scroll", updateSearchLayerTop);
      document.documentElement.classList.remove("is-searching");
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isSearching]);

  useLayoutEffect(() => {
    if (!isMobileSearchFocused) return;

    function updateToolbarMetrics() {
      const toolbarRect = toolbarRef.current?.getBoundingClientRect();
      setToolbarHeight(toolbarRect?.height ?? 0);
      setToolbarOffsetTop(window.visualViewport?.offsetTop ?? 0);
      if (isSearching) {
        setSearchLayerTop(Math.max(0, toolbarRect?.bottom ?? 0));
      }
    }

    updateToolbarMetrics();
    window.addEventListener("resize", updateToolbarMetrics);
    window.visualViewport?.addEventListener("resize", updateToolbarMetrics);
    window.visualViewport?.addEventListener("scroll", updateToolbarMetrics);

    return () => {
      setToolbarOffsetTop(0);
      window.removeEventListener("resize", updateToolbarMetrics);
      window.visualViewport?.removeEventListener("resize", updateToolbarMetrics);
      window.visualViewport?.removeEventListener("scroll", updateToolbarMetrics);
    };
  }, [isMobileSearchFocused, isSearching]);

  useEffect(() => {
    function hasFiles(event: DragEvent) {
      return Array.from(event.dataTransfer?.types ?? []).includes("Files");
    }

    function handleDragEnter(event: DragEvent) {
      if (!hasFiles(event)) return;
      event.preventDefault();
      dragDepthRef.current += 1;
      setIsRomDragging(true);
    }

    function handleDragOver(event: DragEvent) {
      if (!hasFiles(event)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    }

    function handleDragLeave(event: DragEvent) {
      if (!hasFiles(event)) return;
      event.preventDefault();
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setIsRomDragging(false);
    }

    function handleDrop(event: DragEvent) {
      if (!hasFiles(event)) return;
      event.preventDefault();
      dragDepthRef.current = 0;
      setIsRomDragging(false);

      const file = event.dataTransfer?.files[0];
      if (file) {
        void selectBuildFromRomFile(file);
      }
    }

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  function selectBuild(buildId: CheatBuildId) {
    const nextBuild = builds.find((item) => item.id === buildId);
    const token = buildLoadTokenRef.current + 1;
    buildLoadTokenRef.current = token;
    setBuildLoadingLabel(nextBuild ? `${nextBuild.label} 불러오는 중` : "치트 목록 불러오는 중");
    setIsBuildLoading(true);
    setQuery("");
    setIsMobileOverlayOpen(false);
    setIsMobileSearchFocused(false);

    window.requestAnimationFrame(() => {
      if (buildLoadTokenRef.current !== token) return;

      localStorage.setItem(STORAGE_KEY, buildId);
      setSelectedBuild(buildId);

      window.requestAnimationFrame(() => {
        if (buildLoadTokenRef.current !== token) return;
        setIsBuildLoading(false);
      });
    });
  }

  async function selectBuildFromRomFile(file: File) {
    setRomStatus("ROM 확인 중...");

    try {
      const result = await detectRomBuild(file, builds);

      if (!result.matched) {
        setRomStatus(`지원하지 않는 ROM입니다. MD5: ${result.md5}`);
        return;
      }

      selectBuild(result.build.id);
      setRomStatus(`${result.build.label}로 선택됨`);
    } catch {
      setRomStatus("ROM 파일을 읽지 못했습니다.");
    }
  }

  function navigateToSection(id: string) {
    setIsMobileOverlayOpen(false);
    scrollToSection(id, () => setActiveSectionId(id));
  }

  return (
    <main className="app-shell" style={{ "--toolbar-height": `${toolbarHeight}px` } as CSSProperties}>
      <AppHeader
        build={build}
        builds={builds}
        onSelectBuild={selectBuild}
        onSelectRomFile={(file) => void selectBuildFromRomFile(file)}
        romStatus={romStatus}
      />

      {!build ? (
        <BuildSelector builds={builds} onSelectBuild={selectBuild} />
      ) : (
        <section className="browser-shell" aria-label={`${build.label} 치트 목록`}>
          <BrowserToolbar
            activeSectionTitle={activeSectionTitle}
            isInputFocused={isMobileSearchFocused}
            isSearching={isSearching}
            onClearSearch={() => setQuery("")}
            onOpenComments={() => setIsCommentsOpen(true)}
            onOpenNavigation={() => setIsMobileOverlayOpen(true)}
            onQueryChange={setQuery}
            onSearchBlur={() => setIsMobileSearchFocused(false)}
            onSearchFocus={() => setIsMobileSearchFocused(true)}
            query={query}
            toolbarOffsetTop={toolbarOffsetTop}
            toolbarRef={toolbarRef}
          />
          <div
            className="toolbar-spacer"
            style={{ height: isMobileSearchFocused ? `${toolbarHeight}px` : undefined }}
            aria-hidden="true"
          />

          <div className="browser-layout">
            <div className="group-list">
              {groups.map((group) => (
                <CheatGroupView key={group.id} group={group} />
              ))}
            </div>
            {groups.length > 0 ? (
              <SectionNav items={sectionNavItems} activeId={activeSectionId} onNavigate={navigateToSection} />
            ) : null}
          </div>

          <SearchResultsLayer groups={filteredGroups} isSearching={isSearching} searchLayerTop={searchLayerTop} />

          {isMobileOverlayOpen ? (
            <MobileSectionOverlay
              activeId={activeSectionId}
              activeTitle={activeSectionTitle}
              items={sectionNavItems}
              onClose={() => setIsMobileOverlayOpen(false)}
              onNavigate={navigateToSection}
            />
          ) : null}
          <CommentsButton onClick={() => setIsCommentsOpen(true)} />
          <CommentsPanel isOpen={isCommentsOpen} onClose={() => setIsCommentsOpen(false)} />
        </section>
      )}
      <RomDropOverlay isActive={isRomDragging} />
      <BuildLoadingOverlay isActive={isBuildLoading} label={buildLoadingLabel} />
    </main>
  );
}
