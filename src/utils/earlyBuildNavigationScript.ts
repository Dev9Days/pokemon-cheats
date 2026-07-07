export const earlyBuildNavigationScript = `
(() => {
  const key = "emerald:selected-build";
  const legacyKeys = ["pokemon-cheats:selected-build", "pokemon-emerald-cheats:selected-build"];
  const hydratedKey = "__pokemonEmeraldCheatsHydrated";
  const loadingDelayMs = 150;
  const allowed = new Set(["en", "kr-20240611", "kr-20240611-modern", "kr-20260613"]);
  let loadingTimer = 0;

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function getBuildFromHref(href) {
    try {
      const url = new URL(href, window.location.href);
      const parts = url.pathname.split("/").filter(Boolean);
      return parts[2] || null;
    } catch {
      return null;
    }
  }

  function getBuildRoute(build) {
    return "/emerald/cheats/" + build + "/";
  }

  function showBuildLoading(label) {
    if (document.querySelector(".build-loading-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "build-loading-overlay";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML =
      '<div><span class="build-loading-spinner" aria-hidden="true"></span><strong>' +
      escapeHtml(label) +
      "</strong></div>";
    document.body.appendChild(overlay);
  }

  function scheduleBuildLoading(label) {
    if (loadingTimer) window.clearTimeout(loadingTimer);
    loadingTimer = window.setTimeout(() => {
      loadingTimer = 0;
      showBuildLoading(label);
    }, loadingDelayMs);
  }

  function removeBuildLoading() {
    if (loadingTimer) {
      window.clearTimeout(loadingTimer);
      loadingTimer = 0;
    }
    document.querySelector(".build-loading-overlay")?.remove();
  }

  function persistBuild(build) {
    try {
      window.localStorage.setItem(key, build);
      for (const legacyKey of legacyKeys) {
        window.localStorage.removeItem(legacyKey);
      }
    } catch {
    }
  }

  function getStoredBuild() {
    try {
      const build = window.localStorage.getItem(key);
      if (build) return build;

      for (const legacyKey of legacyKeys) {
        const legacyBuild = window.localStorage.getItem(legacyKey);
        if (legacyBuild) {
          persistBuild(legacyBuild);
          return legacyBuild;
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  function redirectToStoredBuild() {
    try {
      const build = getStoredBuild();
      if (build && allowed.has(build)) {
        const target = getBuildRoute(build) + window.location.search + window.location.hash;
        if (window.location.pathname === "/emerald/cheats/" || window.location.pathname === "/emerald/cheats") {
          window.location.replace(target);
          return true;
        }
      }
    } catch {
    }

    return false;
  }

  function navigateToBuild(build, label) {
    if (!build || !allowed.has(build)) return;
    if (window[hydratedKey]) return;

    persistBuild(build);
    const target = getBuildRoute(build);
    if (window.location.pathname === target) return;

    scheduleBuildLoading(label || "치트 목록 불러오는 중");
    window.location.replace(target);
  }

  redirectToStoredBuild();

  window.addEventListener("pageshow", () => {
    removeBuildLoading();
    redirectToStoredBuild();
  });

  document.addEventListener(
    "click",
    (event) => {
      if (window[hydratedKey]) return;

      const link = event.target instanceof Element ? event.target.closest(".build-grid a") : null;
      if (!(link instanceof HTMLAnchorElement)) return;

      const build = getBuildFromHref(link.href);
      if (!build || !allowed.has(build)) return;

      event.preventDefault();
      event.stopPropagation();
      navigateToBuild(build, link.dataset.loadingLabel || "치트 목록 불러오는 중");
    },
    true,
  );

  function handleBuildSelect(event) {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement) || select.dataset.buildSelect !== "true") return;
    if (window[hydratedKey]) return;

    const option = select.selectedOptions && select.selectedOptions[0];
    const label = option ? option.textContent + " 불러오는 중" : "치트 목록 불러오는 중";
    navigateToBuild(select.value, label);
  }

  document.addEventListener("input", handleBuildSelect, true);
  document.addEventListener("change", handleBuildSelect, true);
  document.addEventListener("blur", handleBuildSelect, true);
})();
`;
