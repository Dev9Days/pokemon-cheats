# pokemon-emerald-cheats

포켓몬스터 에메랄드 영문판/한글패치 버전별 치트 정적 페이지.

## 목표

- 동일 UI에 버전별 데이터만 갈아끼우는 구조
- 영문판, 한글패치 20240611, 한글패치 20240611 모던폰트, 한글패치 20260613 지원
- 선택 버전은 localStorage에 저장
- 치트 검색, 코드 복사, GitHub Discussions 댓글 지원

## 댓글 설정

댓글은 Giscus를 통해 GitHub Discussions에 저장합니다. `.env.example`을 기준으로 `.env.local` 또는 배포 환경변수를 설정하세요.

- `VITE_GISCUS_REPO`: `Dev9Days/pokemon-emerald-cheats`
- `VITE_GISCUS_REPO_ID`: GitHub 저장소 node ID
- `VITE_GISCUS_BUG_CATEGORY`: 치트 오류 제보용 Discussion 카테고리명
- `VITE_GISCUS_BUG_CATEGORY_ID`: 치트 오류 제보용 Discussion 카테고리 node ID
- `VITE_GISCUS_REQUEST_CATEGORY`: 치트 요청용 Discussion 카테고리명
- `VITE_GISCUS_REQUEST_CATEGORY_ID`: 치트 요청용 Discussion 카테고리 node ID

