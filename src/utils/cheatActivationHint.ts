import type { CheatBadge } from "../types/cheat";

const activationHints: Record<string, string> = {
  "L+SELECT": "L + SELECT 버튼을 동시에 누르세요.",
  "R+SELECT": "R + SELECT 버튼을 동시에 누르세요.",
  "L+R": "L + R 버튼을 동시에 누르세요.",
  "L+R+UP": "L + R + 방향키 위(↑)를 동시에 누르세요.",
  "L+R+DOWN": "L + R + 방향키 아래(↓)를 동시에 누르세요.",
  "L 유지": "L 버튼을 누른 채로 사용하세요.",
  "대화 중 L": "대화 중에 L 버튼을 누르세요.",
  "대화 중 L 유지 ▶ A": "대화 중에 L 버튼을 누른 상태에서 A 버튼을 누르세요.",
};

export function getCheatActivationHint(
  badges?: CheatBadge[],
  parentBadges?: CheatBadge[],
): string | undefined {
  const ownKeyBadges = badges?.filter((badge) => badge.kind === "key-input");
  const keyBadges = ownKeyBadges?.length
    ? ownKeyBadges
    : parentBadges?.filter((badge) => badge.kind === "key-input");
  if (!keyBadges?.length) return undefined;

  const instructions = keyBadges.map((badge) =>
    activationHints[badge.label] ?? `카드의 ‘${badge.label}’ 조작 안내를 확인하세요.`,
  );
  return `에뮬레이터에서 치트를 켠 뒤, 게임 화면에서 ${instructions.join(" ")}`;
}
