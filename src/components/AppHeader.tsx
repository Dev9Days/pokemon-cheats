import type { CheatBuild, CheatBuildId } from "../types/cheat";

type AppHeaderProps = {
  build: CheatBuild | null;
  builds: CheatBuild[];
  isBuildLoading: boolean;
  onSelectBuild: (buildId: CheatBuildId) => void;
  onSelectRomFile: (file: File) => void;
  romMismatchFileName: string | null;
  romMismatchMd5: string | null;
  romStatus: string | null;
};

export function AppHeader({
  build,
  builds,
  isBuildLoading,
  onSelectBuild,
  onSelectRomFile,
  romMismatchFileName,
  romMismatchMd5,
  romStatus,
}: AppHeaderProps) {
  function handleBuildChange(value: string) {
    onSelectBuild(value as CheatBuildId);
  }

  return (
    <header className="app-header">
      <div>
        <h1>포켓몬스터 에메랄드 치트</h1>
      </div>
      <div className="build-tools">
        {build ? (
          <label className="build-select">
            <span className="build-select__label">
              <span>버전</span>
              <span
                className={`build-select__indicator${isBuildLoading ? " is-loading" : ""}`}
                aria-label={isBuildLoading ? "버전 변경 중" : "버전 선택됨"}
                role="status"
              />
            </span>
            <select
              data-build-select="true"
              value={build.id}
              onChange={(event) => handleBuildChange(event.currentTarget.value)}
            >
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
        {!build && romMismatchFileName && romMismatchMd5 ? (
          <p className="rom-status">
            <strong>{romMismatchFileName}</strong> MD5: <code>{romMismatchMd5}</code>
          </p>
        ) : romStatus ? (
          <p className="rom-status">{romStatus}</p>
        ) : null}
      </div>
    </header>
  );
}
