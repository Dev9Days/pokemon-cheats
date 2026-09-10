import { FileDown, LoaderCircle } from "lucide-react";

type RomDropOverlayProps = {
  isActive: boolean;
  isChecking: boolean;
};

export function RomDropOverlay({ isActive, isChecking }: RomDropOverlayProps) {
  if (!isActive) return null;

  return (
    <div className="rom-drop-overlay" role="status" aria-live="polite">
      <div>
        {isChecking ? (
          <LoaderCircle className="rom-drop-overlay__spinner" size={44} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <FileDown size={44} strokeWidth={1.5} aria-hidden="true" />
        )}
        <strong>{isChecking ? "버전 확인 중…" : "파일을 여기에 놓으세요"}</strong>
        <span>{isChecking ? "잠시만 기다려 주세요." : "사용 중인 버전을 자동으로 확인합니다."}</span>
      </div>
    </div>
  );
}
