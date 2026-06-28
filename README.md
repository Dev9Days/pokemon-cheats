# Pokemon Emerald Cheats

포켓몬스터 에메랄드 치트 코드를 버전별로 찾아보고 복사할 수 있는 웹 페이지입니다.

## Link

https://dev9days.github.io/pokemon-emerald-cheats/

## Features

- 영문판, 한글패치 20240611, 한글패치 20240611 모던폰트, 한글패치 20260613 지원
- 치트명, 코드, 비고 검색
- 치트 코드 복사
- `.gba` 파일 드래그 앤 드롭을 통한 ROM MD5 확인 및 버전 자동 선택
- GitHub Discussions 기반 댓글 지원

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run validate:data
npm run build
```

## Environment Variables

댓글 기능은 Giscus를 사용합니다. 필요한 경우 `.env.example`을 참고해서 로컬 `.env.local` 또는 GitHub Actions variables에 값을 설정하세요.

```txt
VITE_GISCUS_REPO=
VITE_GISCUS_REPO_ID=
VITE_GISCUS_BUG_CATEGORY=
VITE_GISCUS_BUG_CATEGORY_ID=
VITE_GISCUS_REQUEST_CATEGORY=
VITE_GISCUS_REQUEST_CATEGORY_ID=
```

## License

Personal project.
