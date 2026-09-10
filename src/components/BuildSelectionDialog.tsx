import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { CheatBuild, CheatBuildId } from "../types/cheat";
import { BuildSelector } from "./BuildSelector";

type BuildSelectionDialogProps = {
  builds: CheatBuild[];
  isSuspended: boolean;
  onClose: () => void;
  onSelectBuild: (buildId: CheatBuildId) => void;
  onSelectRomFile: (file: File) => void;
  romMismatchFileName: string | null;
  romMismatchMd5: string | null;
  romStatus: string | null;
};

export function BuildSelectionDialog({
  builds,
  isSuspended,
  onClose,
  onSelectBuild,
  onSelectRomFile,
  romMismatchFileName,
  romMismatchMd5,
  romStatus,
}: BuildSelectionDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (isSuspended) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])',
      ));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isSuspended]);

  return (
    <div className="build-selection-dialog">
      <div className="guide-panel__backdrop" onClick={onClose} />
      <div
        className="guide-panel__body build-selection-dialog__body"
        ref={dialogRef}
        role="dialog"
        aria-modal={!isSuspended}
        aria-labelledby="build-selection-title"
        tabIndex={-1}
      >
        <div className="guide-panel__header">
          <strong id="build-selection-title">사용 중인 게임 버전을 선택하세요</strong>
          <button type="button" onClick={onClose} aria-label="버전 선택 닫기">
            <X size={18} />
          </button>
        </div>
        <div className="build-selection-dialog__content">
          <label className="rom-file-picker">
            <input
              type="file"
              accept=".gba"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                event.currentTarget.value = "";
                if (file) onSelectRomFile(file);
              }}
            />
            <span>GBA 파일 선택</span>
          </label>
          {romStatus ? <p className="rom-status" role="status">{romStatus}</p> : null}
          {romMismatchFileName && romMismatchMd5 ? (
            <p className="rom-status">
              <strong>{romMismatchFileName}</strong> MD5: <code>{romMismatchMd5}</code>
            </p>
          ) : null}
          <BuildSelector builds={builds} onSelectBuild={onSelectBuild} />
        </div>
      </div>
    </div>
  );
}
