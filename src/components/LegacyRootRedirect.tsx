export function LegacyRootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/" />
      <main className="app-shell">
        <p>페이지 주소가 변경되었습니다. <a href="/">치트 페이지로 이동</a></p>
      </main>
    </>
  );
}
