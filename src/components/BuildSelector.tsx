import type { CheatBuild, CheatBuildId } from "../types/cheat";

type BuildSelectorProps = {
  builds: CheatBuild[];
  onSelectBuild: (buildId: CheatBuildId) => void;
};

export function BuildSelector({ builds, onSelectBuild }: BuildSelectorProps) {
  return (
    <section className="build-selector" aria-label="치트 버전 선택">
      <p className="build-selector__hint">
        버전을 모르면 GBA 파일 선택을 누르세요. PC에서는 .gba 파일을 이 사이트 화면 위로 끌어와
        놓아도 됩니다. 맞는 버전이 자동으로 선택됩니다.
      </p>
      <p className="build-selector__patch-link">
        한글판 치트는 아래 배포 페이지의 한글패치를 적용한 ROM에서만 사용할 수 있습니다.
        <a
          href="https://blog.naver.com/johyunjun58/222052416818"
          target="_blank"
          rel="noreferrer"
        >
          한글패치 받기
        </a>
      </p>
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
