import type { CheatBuild, CheatBuildId } from "../types/cheat";

type BuildSelectorProps = {
  builds: CheatBuild[];
  onSelectBuild: (buildId: CheatBuildId) => void;
};

export function BuildSelector({ builds, onSelectBuild }: BuildSelectorProps) {
  return (
    <section className="build-selector" aria-label="치트 버전 선택">
      <div className="build-selector__hint">
        <p>
          버전을 모르면 <strong>GBA 파일 선택</strong>을 눌러 게임에 사용하는 <strong>.gba 파일</strong>을 선택하세요.
          <span className="build-selector__result-hint">지원하는 버전이면 자동으로 선택됩니다.</span>
        </p>
        <p className="build-selector__drag-hint">
          <strong>PC에서는</strong> 파일을 이 사이트 화면 어디에나 끌어다 놓을 수 있습니다.
        </p>
      </div>
      <div className="build-selector__patch-link">
        <p>한글판 치트는 아래 목록에 있는 한글패치 버전만 지원합니다.</p>
        <a
          href="https://blog.naver.com/johyunjun58/222052416818"
          target="_blank"
          rel="noreferrer"
        >
          한글패치 받기 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="build-grid">
        {builds.map((item) => (
          <a
            key={item.id}
            data-loading-label={`${item.label} 불러오는 중`}
            href={`/emerald/cheats/${item.id}/`}
            onClick={(event) => {
              event.preventDefault();
              onSelectBuild(item.id);
            }}
          >
            <strong>{item.label}</strong>
            <code>MD5: {item.md5}</code>
          </a>
        ))}
      </div>
    </section>
  );
}
