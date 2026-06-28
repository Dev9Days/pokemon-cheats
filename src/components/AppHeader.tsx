import type { CheatBuild, CheatBuildId } from "../types/cheat";

type AppHeaderProps = {
  build: CheatBuild | null;
  builds: CheatBuild[];
  onSelectBuild: (buildId: CheatBuildId) => void;
  onSelectRomFile: (file: File) => void;
  romStatus: string | null;
};

export function AppHeader({ build, builds, onSelectBuild, onSelectRomFile, romStatus }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div>
        <h1>포켓몬스터 에메랄드 치트</h1>
      </div>
      <div className="build-tools">
        {build ? (
          <label className="build-select">
            <span>버전</span>
            <select value={build.id} onChange={(event) => onSelectBuild(event.target.value as CheatBuildId)}>
              {builds.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="rom-file-picker">
          <input
            type="file"
            accept=".gba"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) onSelectRomFile(file);
            }}
          />
          <span>GBA 파일 선택</span>
        </label>
        {romStatus ? (
          <p className="rom-status">{romStatus}</p>
        ) : build ? (
          <p className="rom-drop-hint">.gba 파일을 끌어놓으면 MD5로 버전을 확인합니다.</p>
        ) : null}
      </div>
    </header>
  );
}
