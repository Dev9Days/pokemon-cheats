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
            <strong id="rom-mismatch-title">버전을 확인할 수 없습니다</strong>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="안내 닫기">
            <X size={18} />
          </button>
        </div>
        <div className="rom-mismatch-panel__content">
          <p>선택한 .gba 파일의 MD5가 이 사이트에 등록된 버전과 일치하지 않습니다.</p>
          <div className="rom-mismatch-panel__md5">
            <span>확인된 MD5</span>
            <code>{md5}</code>
          </div>
          <div className="rom-mismatch-panel__checklist">
            <strong>다음을 확인하세요.</strong>
            <ul>
              <li>에뮬레이터에서 실제로 실행하는 .gba 파일을 선택했나요?</li>
              <li>한글판이라면 이 사이트에서 지원하는 한글패치를 사용했나요?</li>
            </ul>
          </div>
          <a
            href="https://blog.naver.com/johyunjun58/222052416818"
            target="_blank"
            rel="noreferrer"
          >
            지원 한글패치 받기
          </a>
        </div>
        <div className="rom-mismatch-panel__footer">
          <button type="button" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
