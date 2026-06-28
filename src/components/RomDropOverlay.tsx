type RomDropOverlayProps = {
  isActive: boolean;
};

export function RomDropOverlay({ isActive }: RomDropOverlayProps) {
  if (!isActive) return null;

  return (
    <div className="rom-drop-overlay" aria-hidden="true">
      <div>
        <strong>GBA 파일 놓기</strong>
        <span>ROM MD5를 확인해서 치트 버전을 자동으로 선택합니다.</span>
      </div>
    </div>
  );
}
