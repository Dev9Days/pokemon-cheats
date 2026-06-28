import type { CheatBuild, CheatBuildId } from "../types/cheat";

type BuildSelectorProps = {
  builds: CheatBuild[];
  onSelectBuild: (buildId: CheatBuildId) => void;
};

export function BuildSelector({ builds, onSelectBuild }: BuildSelectorProps) {
  return (
    <section className="build-selector" aria-label="치트 버전 선택">
      <p className="build-selector__hint">
        .gba 파일을 이 창에 끌어놓으면 MD5를 확인해서 맞는 버전을 자동으로 고릅니다.
      </p>
      <div className="build-grid">
        {builds.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelectBuild(item.id)}>
            <strong>{item.label}</strong>
            <code>MD5: {item.md5}</code>
          </button>
        ))}
      </div>
    </section>
  );
}
