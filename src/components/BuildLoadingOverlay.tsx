type BuildLoadingOverlayProps = {
  isActive: boolean;
  label: string | null;
};

export function BuildLoadingOverlay({ isActive, label }: BuildLoadingOverlayProps) {
  if (!isActive) return null;

  return (
    <div className="build-loading-overlay" role="status" aria-live="polite">
      <div>
        <span className="build-loading-spinner" aria-hidden="true" />
        <strong>{label ?? "치트 목록 불러오는 중"}</strong>
      </div>
    </div>
  );
}
