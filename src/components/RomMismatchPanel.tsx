import { TriangleAlert, X } from "lucide-react";
import { useEffect, useRef } from "react";

type RomMismatchPanelProps = {
  md5: string | null;
  onClose: () => void;
};

export function RomMismatchPanel({ md5, onClose }: RomMismatchPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!md5) return;

    closeButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [md5, onClose]);

  if (!md5) return null;

  return (
    <div className="rom-mismatch-panel" role="dialog" aria-modal="true" aria-labelledby="rom-mismatch-title">
      <div className="rom-mismatch-panel__backdrop" onClick={onClose} />
      <div className="rom-mismatch-panel__body">
        <div className="rom-mismatch-panel__header">
          <div>
            <TriangleAlert size={18} />
            <strong id="rom-mismatch-title">파일에 맞는 버전을 찾지 못했습니다</strong>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="안내 닫기">
            <X size={18} />
          </button>
        </div>
        <div className="rom-mismatch-panel__content">
          <p>이 파일은 사이트에 등록된 어느 버전과도 일치하지 않습니다.</p>
          <div className="rom-mismatch-panel__md5">
            <span>파일 MD5</span>
            <code>{md5}</code>
          </div>
          <div className="rom-mismatch-panel__checklist">
            <strong>이렇게 확인해 보세요</strong>
            <ul>
              <li>에뮬레이터에서 게임을 실행할 때 사용하는 .gba 파일을 선택해 주세요.</li>
              <li>한글판은 아래에서 배포하는 한글패치를 적용한 버전만 지원합니다.</li>
            </ul>
          </div>
          <a
            href="https://blog.naver.com/johyunjun58/222052416818"
            target="_blank"
            rel="noreferrer"
          >
            한글패치 배포 페이지 ↗
          </a>
        </div>
        <div className="rom-mismatch-panel__footer">
          <button type="button" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
