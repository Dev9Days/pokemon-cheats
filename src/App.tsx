"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { BuildLoadingOverlay } from "./components/BuildLoadingOverlay";
import { BuildSelector } from "./components/BuildSelector";
import { CheatBrowser } from "./components/CheatBrowser";
import { RomDropOverlay } from "./components/RomDropOverlay";
import { Toast } from "./components/Toast";
import { builds } from "./data/builds";
import {
  getCheatStructure,
  getEntryCodesForBuild,
  getVariantCodesForBuild,
  preloadCheatStructure,
} from "./data";
import { useActiveSection } from "./hooks/useActiveSection";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { useSubmittedSearch } from "./hooks/useSubmittedSearch";
import type { CheatBuildId, CheatGroup } from "./types/cheat";
import {
  getBuildRoute,
  getInitialBuild,
  safeRemoveStoredBuild,
  safeSetStoredBuild,
  type HydrationAwareWindow,
} from "./utils/buildSelection";
import { filterGroups, getSectionNavItems } from "./utils/cheats";
import { installCloudflareAnalytics } from "./utils/cloudflareAnalytics";
import { normalizeAppRoute } from "./utils/routing";

const BUILD_LOADING_OVERLAY_DELAY_MS = 150;
const SEARCH_RESULTS_CLEANUP_DELAY_MS = 180;

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

export function App({
  initialBuild = null,
  initialGroups = [],
}: {
  initialBuild?: CheatBuildId | null;
  initialGroups?: CheatGroup[];
}) {
  const initialBuildRef = useRef<CheatBuildId | null>(null);
  const [selectedBuild, setSelectedBuild] = useState<CheatBuildId | null>(initialBuild);
  const [groups, setGroups] = useState<CheatGroup[]>(initialBuild ? initialGroups : []);
  const [warmedBuildId, setWarmedBuildId] = useState<CheatBuildId | null>(
    !initialBuild && initialGroups.length > 0 ? builds[0].id : null,
  );
  const [warmedGroups, setWarmedGroups] = useState<CheatGroup[]>(initialBuild ? [] : initialGroups);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isBuildPending, setIsBuildPending] = useState(false);
  const [isBuildLoading, setIsBuildLoading] = useState(false);
  const [buildLoadingLabel, setBuildLoadingLabel] = useState<string | null>(null);
  const [isInitialBuildLoading, setIsInitialBuildLoading] = useState(false);
  const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false);
  const [isRomDragging, setIsRomDragging] = useState(false);
  const [romStatus, setRomStatus] = useState<string | null>(null);
  const [searchLockScrollY, setSearchLockScrollY] = useState<number | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const buildLoadTokenRef = useRef(0);
  const pendingBuildRenderTokenRef = useRef<number | null>(null);
  const currentBuildIdRef = useRef<CheatBuildId | null>(initialBuild);
  const dragDepthRef = useRef(0);
  const isBuildLoadingActiveRef = useRef(false);
  const loadingOverlayTimerRef = useRef<number | null>(null);
  const warmRenderTokenRef = useRef(0);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const warmToolbarRef = useRef<HTMLDivElement | null>(null);
  const isMobileSearchFocusedRef = useRef(false);
  const lastUnlockedScrollYRef = useRef(0);
  const mobileSearchFocusScrollYRef = useRef(0);
  const unlockedScrollHistoryRef = useRef<{ time: number; y: number }[]>([]);
  const {
    hasFilterQuery,
    isSearchActive,
    normalizedFilterQuery,
    query,
    resetSearch,
    submitSearch,
  } = useSubmittedSearch(SEARCH_RESULTS_CLEANUP_DELAY_MS);

  const build = selectedBuild ? builds.find((item) => item.id === selectedBuild)! : null;
  const warmedBuild = warmedBuildId ? builds.find((item) => item.id === warmedBuildId)! : null;
  const filteredGroups = useMemo(() => (hasFilterQuery ? filterGroups(groups, normalizedFilterQuery) : []), [
    hasFilterQuery,
    groups,
    normalizedFilterQuery,
  ]);
  const sectionNavItems = useMemo(() => getSectionNavItems(groups), [groups]);
  const warmedSectionNavItems = useMemo(() => getSectionNavItems(warmedGroups), [warmedGroups]);
  const { activeSectionId, navigateToSection: scrollToActiveSection } = useActiveSection(sectionNavItems);
  const activeSectionTitle =
    sectionNavItems.find((item) => item.id === activeSectionId)?.title ?? sectionNavItems[0]?.title ?? "분류";

  const getEntryCodeText = useCallback(async (entryId: string) => {
    const buildId = currentBuildIdRef.current;
    if (!buildId) return "";
    return (await getEntryCodesForBuild(buildId, entryId)).join("\n");
  }, []);

  const getVariantCodeText = useCallback(async (entryId: string, variantId: string) => {
    const buildId = currentBuildIdRef.current;
    if (!buildId) return "";
    return (await getVariantCodesForBuild(buildId, entryId, variantId)).join("\n");
  }, []);

  useEffect(() => {
    (window as HydrationAwareWindow).__pokemonEmeraldCheatsHydrated = true;
    normalizeAppRoute();
    installCloudflareAnalytics();
  }, []);

  useEffect(() => {
    if (initialBuild) {
      safeSetStoredBuild(initialBuild);
      return;
    }

    initialBuildRef.current = getInitialBuild();
    const storedInitialBuild = initialBuildRef.current;
    initialBuildRef.current = null;
    if (storedInitialBuild) {
      window.location.replace(getBuildRoute(storedInitialBuild));
    }
  }, []);

  useEffect(() => {
    let frameId = 0;

    function updateLastUnlockedScrollY() {
      if (isSearchActive) return;

      const now = window.performance.now();
      lastUnlockedScrollYRef.current = window.scrollY;
      unlockedScrollHistoryRef.current = [
        ...unlockedScrollHistoryRef.current.filter((item) => now - item.time <= 1000),
        { time: now, y: window.scrollY },
      ];
    }

    function trackLastUnlockedScrollY() {
      updateLastUnlockedScrollY();
      frameId = window.requestAnimationFrame(trackLastUnlockedScrollY);
    }

    updateLastUnlockedScrollY();
    frameId = window.requestAnimationFrame(trackLastUnlockedScrollY);
    window.addEventListener("scroll", updateLastUnlockedScrollY, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateLastUnlockedScrollY);
    };
  }, [isSearchActive]);

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
    if (!isMobileSearchFocused) return;

    function updateToolbarMetrics() {
      const toolbarRect = toolbarRef.current?.getBoundingClientRect();
      setToolbarHeight(toolbarRect?.height ?? 0);
    }

    updateToolbarMetrics();
    window.addEventListener("resize", updateToolbarMetrics);
    window.visualViewport?.addEventListener("resize", updateToolbarMetrics);
    window.visualViewport?.addEventListener("scroll", updateToolbarMetrics);

    return () => {
      window.removeEventListener("resize", updateToolbarMetrics);
      window.visualViewport?.removeEventListener("resize", updateToolbarMetrics);
      window.visualViewport?.removeEventListener("scroll", updateToolbarMetrics);
    };
  }, [isMobileSearchFocused, isSearchActive]);

  useBodyScrollLock(isSearchActive, searchLockScrollY);

  useEffect(() => {
    return () => {
      if (loadingOverlayTimerRef.current !== null) window.clearTimeout(loadingOverlayTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
    const isSlowConnection = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    if (selectedBuild || isSlowConnection) return;

    let cancelled = false;
    void nextPaint().then(() => {
      if (!cancelled) void warmRenderBuild(builds[0].id);
    });

    return () => {
      cancelled = true;
    };
  }, [selectedBuild]);

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
    if (selectedBuild === buildId) {
      const target = getBuildRoute(buildId);
      if (window.location.pathname !== target) {
        window.history.replaceState(null, "", target);
      }
      return;
    }

    void loadBuild(buildId, { persist: true, resetView: true, showOverlay: true, immediateOverlay: !selectedBuild });
  }

  async function loadBuild(
    buildId: CheatBuildId,
    options: { persist: boolean; resetView: boolean; showOverlay: boolean; immediateOverlay?: boolean },
  ) {
    const nextBuild = builds.find((item) => item.id === buildId);
    const token = buildLoadTokenRef.current + 1;
    buildLoadTokenRef.current = token;
    const label = nextBuild ? `${nextBuild.label} 불러오는 중` : "치트 목록 불러오는 중";
    setBuildLoadingLabel(label);
    setIsBuildPending(true);
    setIsInitialBuildLoading(!options.showOverlay);
    if (options.showOverlay) showBuildLoading(label, options.immediateOverlay);

    if (options.resetView) {
      resetSearch();
      setIsMobileOverlayOpen(false);
      setIsMobileSearchFocused(false);
    }

    await nextPaint();
    if (buildLoadTokenRef.current !== token) return;

    try {
      const nextGroups = warmedGroups.length > 0 ? warmedGroups : await getCheatStructure();
      if (buildLoadTokenRef.current !== token) return;

      currentBuildIdRef.current = buildId;
      pendingBuildRenderTokenRef.current = !options.showOverlay && nextGroups.length > 0 ? token : null;
      setGroups(nextGroups);
      setSelectedBuild(buildId);
      if (options.persist) safeSetStoredBuild(buildId);
      if (window.location.pathname !== getBuildRoute(buildId)) {
        window.history.replaceState(null, "", getBuildRoute(buildId));
      }
      await nextPaint();
    } catch {
      if (buildLoadTokenRef.current === token) {
        pendingBuildRenderTokenRef.current = null;
        currentBuildIdRef.current = null;
        setGroups([]);
        setSelectedBuild(null);
        if (options.persist) safeRemoveStoredBuild();
      }
    } finally {
      if (buildLoadTokenRef.current === token) {
        if (pendingBuildRenderTokenRef.current === null) setIsBuildPending(false);
        setIsInitialBuildLoading(false);
        stopBuildLoading();
      }
    }
  }

  async function selectBuildFromRomFile(file: File) {
    setRomStatus("ROM 확인 중...");

    try {
      const { detectRomBuild } = await import("./utils/romBuildDetector");
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
    scrollToActiveSection(id);
  }

  function showBuildLoading(label: string, immediate = false) {
    setBuildLoadingLabel(label);
    if (isBuildLoadingActiveRef.current) return;

    if (loadingOverlayTimerRef.current !== null) window.clearTimeout(loadingOverlayTimerRef.current);
    if (immediate) {
      loadingOverlayTimerRef.current = null;
      isBuildLoadingActiveRef.current = true;
      setIsBuildLoading(true);
      return;
    }

    loadingOverlayTimerRef.current = window.setTimeout(() => {
      loadingOverlayTimerRef.current = null;
      isBuildLoadingActiveRef.current = true;
      setIsBuildLoading(true);
    }, BUILD_LOADING_OVERLAY_DELAY_MS);
  }

  function stopBuildLoading() {
    if (loadingOverlayTimerRef.current !== null) {
      window.clearTimeout(loadingOverlayTimerRef.current);
      loadingOverlayTimerRef.current = null;
    }

    if (!isBuildLoadingActiveRef.current) {
      setIsBuildLoading(false);
      return;
    }

    isBuildLoadingActiveRef.current = false;
    setIsBuildLoading(false);
  }

  const handleBuildRenderComplete = useCallback(() => {
    if (pendingBuildRenderTokenRef.current !== buildLoadTokenRef.current) return;

    pendingBuildRenderTokenRef.current = null;
    setIsBuildPending(false);
  }, []);

  async function warmRenderBuild(buildId: CheatBuildId) {
    if (selectedBuild || (warmedBuildId === buildId && warmedGroups.length > 0)) return;

    const token = warmRenderTokenRef.current + 1;
    warmRenderTokenRef.current = token;
    await preloadCheatStructure();
    const nextGroups = await getCheatStructure();
    await nextPaint();
    if (warmRenderTokenRef.current !== token || selectedBuild) return;

    setWarmedGroups(nextGroups);
    setWarmedBuildId(buildId);
  }

  function nextPaint() {
    return new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => resolve());
      });
    });
  }

  function handleSearchSubmit(nextQuery: string) {
    const shouldUseMobileScrollLock =
      nextQuery.trim().length > 0 &&
      (isMobileSearchFocusedRef.current || window.matchMedia("(max-width: 899px)").matches);
    const recentScrollY = unlockedScrollHistoryRef.current.reduce((maxScrollY, item) => Math.max(maxScrollY, item.y), 0);
    const nextSearchLockScrollY = Math.max(
      mobileSearchFocusScrollYRef.current,
      lastUnlockedScrollYRef.current,
      recentScrollY,
      shouldUseMobileScrollLock ? window.scrollY : 0,
    );

    setSearchLockScrollY(shouldUseMobileScrollLock ? nextSearchLockScrollY : null);
    submitSearch(nextQuery);
    if (nextQuery.trim().length === 0) {
      isMobileSearchFocusedRef.current = false;
      setIsMobileSearchFocused(false);
    }
  }

  const browserBuild = build ?? warmedBuild;
  const browserGroups = build ? groups : warmedGroups;
  const browserSectionNavItems = build ? sectionNavItems : warmedSectionNavItems;
  const browserActiveSectionTitle = build ? activeSectionTitle : (warmedSectionNavItems[0]?.title ?? "분류");
  const isBrowserVisible = Boolean(build);

  return (
    <main className="app-shell" style={{ "--toolbar-height": `${toolbarHeight}px` } as CSSProperties}>
      <AppHeader
        build={build}
        builds={builds}
        isBuildLoading={isBuildPending}
        onSelectBuild={selectBuild}
        onSelectRomFile={(file) => void selectBuildFromRomFile(file)}
        romStatus={romStatus}
      />

      {!build ? (
        <BuildSelector builds={builds} onSelectBuild={selectBuild} />
      ) : null}

      {browserBuild ? (
        <CheatBrowser
          activeSectionId={activeSectionId}
          activeSectionTitle={browserActiveSectionTitle}
          build={browserBuild}
          filteredGroups={filteredGroups}
          getEntryCodeText={getEntryCodeText}
          getVariantCodeText={getVariantCodeText}
          groups={browserGroups}
          hasFilterQuery={hasFilterQuery}
          isBrowserVisible={isBrowserVisible}
          isCommentsOpen={isCommentsOpen}
          isInitialBuildLoading={isInitialBuildLoading}
          isMobileOverlayOpen={isMobileOverlayOpen}
          isMobileSearchFocused={isMobileSearchFocused}
          isProgressive={pendingBuildRenderTokenRef.current !== null}
          isSearchActive={isSearchActive}
          loadingLabel={buildLoadingLabel}
          normalizedFilterQuery={normalizedFilterQuery}
          onClearSearch={resetSearch}
          onCloseComments={() => setIsCommentsOpen(false)}
          onCloseNavigation={() => setIsMobileOverlayOpen(false)}
          onNavigateSection={navigateToSection}
          onOpenComments={() => setIsCommentsOpen(true)}
          onOpenNavigation={() => setIsMobileOverlayOpen(true)}
          onRenderComplete={handleBuildRenderComplete}
          onSearch={handleSearchSubmit}
          onSearchBlur={() => {
            isMobileSearchFocusedRef.current = false;
            setIsMobileSearchFocused(false);
          }}
          onSearchFocus={() => {
            mobileSearchFocusScrollYRef.current = lastUnlockedScrollYRef.current;
            isMobileSearchFocusedRef.current = true;
            setIsMobileSearchFocused(true);
          }}
          onSearchPointerDown={() => {
            mobileSearchFocusScrollYRef.current = window.scrollY;
            lastUnlockedScrollYRef.current = window.scrollY;
          }}
          query={query}
          sectionNavItems={browserSectionNavItems}
          toolbarHeight={toolbarHeight}
          toolbarRef={isBrowserVisible ? toolbarRef : warmToolbarRef}
        />
      ) : null}
      <RomDropOverlay isActive={isRomDragging} />
      <BuildLoadingOverlay isActive={isBuildLoading} label={buildLoadingLabel} />
      <Toast />
    </main>
  );
}
