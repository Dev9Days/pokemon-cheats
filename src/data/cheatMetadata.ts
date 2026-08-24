import type { CheatBadge, CheatCodeType } from "../types/cheat";

type CheatMetadataInput = {
  id: string;
  title: string;
  codeType: CheatCodeType;
};

const pokemonMasterBadge: CheatBadge = {
  kind: "master-code",
  label: "마스터 코드 필요",
  description: "포켓몬 관련 마스터 코드를 먼저 적용하세요.",
};

const systemMasterBadge: CheatBadge = {
  kind: "master-code",
  label: "마스터 코드 필요",
  description: "시스템/기타 마스터 코드를 먼저 적용하세요.",
};

function keyInputBadge(label: string): CheatBadge[] {
  return [{
    kind: "key-input",
    label,
    description: `치트를 켠 뒤 게임 화면에서 표시된 조작(${label})을 하세요. 키보드·패드 키는 에뮬레이터 설정에서 확인하세요.`,
  }];
}

const keyInputBadgesByEntryId: Record<string, CheatBadge[]> = {
  "items.shop.count-99": keyInputBadge("L 유지"),
  "상대방-포켓몬-잡기": keyInputBadge("L+R"),
  "pokemon.starter.extra": keyInputBadge("L+R+UP"),
  "pokemon.starter.gen2.required": keyInputBadge("L+R+DOWN"),
  "pokemon.legendary.generated": keyInputBadge("L+SELECT"),
  "서핑-뱃지x": keyInputBadge("R+SELECT"),
  "어디서든-공중-날기-뱃지x": keyInputBadge("L+R"),
  "포켓몬-회복-원격-센터": keyInputBadge("L+SELECT"),
  "pc-접근": keyInputBadge("L+SELECT"),
  "기술-지우기": keyInputBadge("L+SELECT"),
  "remote.shop.generated": keyInputBadge("L+SELECT"),
  "system.badges.generated": keyInputBadge("L+SELECT"),
  "트레이너-amp-관장과-재-전투": keyInputBadge("대화 중 L"),
  "시간-재-설정": keyInputBadge("L+SELECT"),
  "배틀-프론티어-배틀-포인트": keyInputBadge("대화 중 L 유지 ▶ A"),
  "이상한-소포-활성화-mystery-gift": keyInputBadge("L+SELECT"),
  "system.dex-event.mystery-gift-ticket": keyInputBadge("L+SELECT"),
  "전국-도감-활성화": keyInputBadge("L+SELECT"),
};

const masterBadgesByEntryId: Record<string, CheatBadge[]> = {
  // "pokemon.wild.level.generated": [pokemonMasterBadge],
};


export function mergeCheatBadges(...badgeGroups: Array<CheatBadge[] | undefined>): CheatBadge[] | undefined {
  const badges = badgeGroups.flatMap((group) => group ?? []);
  if (badges.length === 0) return undefined;

  const seen = new Set<string>();
  return badges.filter((badge) => {
    const key = `${badge.kind}:${badge.label}:${badge.description ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getEntryBadges(entry: CheatMetadataInput, rootGroupId: string) {
  return mergeCheatBadges(
    masterBadgesByEntryId[entry.id],
    keyInputBadgesByEntryId[entry.id],
  );
}
