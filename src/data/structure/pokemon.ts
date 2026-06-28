import type { CheatGroup } from "../../types/cheat";
import {
  createMoveStructureVariants,
  createNatureStructureVariants,
  createStarterPokemonStructureVariants,
  createWildPokemonStructureVariants,
} from "../structureVariantGenerators";

export const pokemonGroup: CheatGroup = {
  id: "pokemon",
  title: "포켓몬",
  cheats: [
    {
      id: "pokemon.master-code",
      title: "포켓몬 관련 마스터 코드",
      codeType: "Action Replay MAX",
      codes: [],
      note: "포켓몬 관련 코드를 사용하려면 먼저 적용하세요."
    }
  ],
  children: [
    {
      id: "pokemon.battle",
      title: "전투 관련",
      cheats: [
        {
          id: "무한-pp",
          title: "무한 PP",
          codeType: "Action Replay MAX",
          codes: [],
          note: "기술 사용 횟수 무제한"
        },
        {
          id: "상대방-포켓몬-잡기",
          title: "상대방 포켓몬 잡기",
          codeType: "Action Replay MAX",
          codes: [],
          note: "L+R 버튼을 동시에 누른 상태로 몬스터볼을 던지세요. 던지자 마자 떼도 괜찮습니다."
        }
      ]
    },
    {
      id: "pokemon.move-edit",
      title: "기술 편집",
      cheats: [
        {
          id: "기술-비전머신-아무거나-교체하기-마스터-코드",
          title: "기술/비전머신 아무거나 교체하기: 마스터 코드",
          codeType: "Action Replay MAX",
          codes: []
        },
        {
          id: "비전기술-덮어쓰기",
          title: "비전기술 덮어쓰기",
          codeType: "Action Replay MAX",
          codes: []
        },
        {
          id: "move.edit.generated",
          title: "교체할 기술 선택(마스터 코드 필요)",
          codeType: "Codebreaker",
          codes: [],
          variants: createMoveStructureVariants(),
          note: "기술을 4개 배운 포켓몬에게 남는 기술/비전머신을 사용한 뒤, 변경할 기술을 선택하고 교체하세요.\n기술 이름이 바로 바뀌지 않아도 정상입니다."
        }
      ]
    },
    {
      id: "pokemon.party-stats",
      title: "현재 파티 스탯",
      cheats: [
        {
          id: "1번-포켓몬-스탯-최대",
          title: "1번 포켓몬 스탯 최대",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "1번-포켓몬-스탯-최대.all",
              title: "전체 스탯 최대",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.0",
              title: "현재 HP",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.1",
              title: "최대 HP",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.2",
              title: "공격",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.3",
              title: "방어",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.4",
              title: "특수 공격",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.5",
              title: "특수 방어",
              codes: []
            },
            {
              id: "1번-포켓몬-스탯-최대.stat.6",
              title: "스피드",
              codes: []
            }
          ]
        },
        {
          id: "2번-포켓몬-스탯-최대",
          title: "2번 포켓몬 스탯 최대",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "2번-포켓몬-스탯-최대.all",
              title: "전체 스탯 최대",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.0",
              title: "현재 HP",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.1",
              title: "최대 HP",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.2",
              title: "공격",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.3",
              title: "방어",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.4",
              title: "특수 공격",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.5",
              title: "특수 방어",
              codes: []
            },
            {
              id: "2번-포켓몬-스탯-최대.stat.6",
              title: "스피드",
              codes: []
            }
          ]
        },
        {
          id: "3번-포켓몬-스탯-최대",
          title: "3번 포켓몬 스탯 최대",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "3번-포켓몬-스탯-최대.all",
              title: "전체 스탯 최대",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.0",
              title: "현재 HP",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.1",
              title: "최대 HP",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.2",
              title: "공격",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.3",
              title: "방어",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.4",
              title: "특수 공격",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.5",
              title: "특수 방어",
              codes: []
            },
            {
              id: "3번-포켓몬-스탯-최대.stat.6",
              title: "스피드",
              codes: []
            }
          ]
        },
        {
          id: "4번-포켓몬-스탯-최대",
          title: "4번 포켓몬 스탯 최대",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "4번-포켓몬-스탯-최대.all",
              title: "전체 스탯 최대",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.0",
              title: "현재 HP",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.1",
              title: "최대 HP",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.2",
              title: "공격",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.3",
              title: "방어",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.4",
              title: "특수 공격",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.5",
              title: "특수 방어",
              codes: []
            },
            {
              id: "4번-포켓몬-스탯-최대.stat.6",
              title: "스피드",
              codes: []
            }
          ]
        },
        {
          id: "5번-포켓몬-스탯-최대",
          title: "5번 포켓몬 스탯 최대",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "5번-포켓몬-스탯-최대.all",
              title: "전체 스탯 최대",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.0",
              title: "현재 HP",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.1",
              title: "최대 HP",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.2",
              title: "공격",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.3",
              title: "방어",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.4",
              title: "특수 공격",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.5",
              title: "특수 방어",
              codes: []
            },
            {
              id: "5번-포켓몬-스탯-최대.stat.6",
              title: "스피드",
              codes: []
            }
          ]
        },
        {
          id: "6번-포켓몬-스탯-최대",
          title: "6번 포켓몬 스탯 최대",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "6번-포켓몬-스탯-최대.all",
              title: "전체 스탯 최대",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.0",
              title: "현재 HP",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.1",
              title: "최대 HP",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.2",
              title: "공격",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.3",
              title: "방어",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.4",
              title: "특수 공격",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.5",
              title: "특수 방어",
              codes: []
            },
            {
              id: "6번-포켓몬-스탯-최대.stat.6",
              title: "스피드",
              codes: []
            }
          ]
        }
      ]
    },
    {
      id: "pokemon.starter",
      title: "스타팅 포켓몬",
      children: [
        {
          id: "pokemon.starter.extra",
          title: "스타팅 포켓몬 추가 획득",
          cheats: [
            {
              id: "pokemon.starter.extra",
              title: "스타팅 포켓몬 추가 획득",
              codeType: "Action Replay MAX",
              codes: [],
              note: "L+R+UP버튼을 동시에 누르세요.\n화면이 바뀌지 않는다면 A키를 누르세요.\n\"스타팅 포켓몬 변경\" 치트와 함께 사용하세요.\n뮤와 테오키스는 전투에서 사용할 수 없습니다."
            }
          ]
        },
        {
          id: "pokemon.starter.change",
          title: "스타팅 포켓몬 변경",
          cheats: [
            {
              id: "pokemon.starter.change.slot1.generated",
              title: "1번 포켓몬 변경",
              codeType: "Action Replay MAX",
              codes: [],
              variants: createStarterPokemonStructureVariants("slot1"),
              note: "원하는 포켓몬을 복사해 적용하면 해당 슬롯의 스타팅 포켓몬 변경 코드로 사용할 수 있습니다."
            },
            {
              id: "pokemon.starter.change.slot2.generated",
              title: "2번 포켓몬 변경",
              codeType: "Action Replay MAX",
              codes: [],
              variants: createStarterPokemonStructureVariants("slot2"),
              note: "원하는 포켓몬을 복사해 적용하면 해당 슬롯의 스타팅 포켓몬 변경 코드로 사용할 수 있습니다."
            },
            {
              id: "pokemon.starter.change.slot3.generated",
              title: "3번 포켓몬 변경",
              codeType: "Action Replay MAX",
              codes: [],
              variants: createStarterPokemonStructureVariants("slot3"),
              note: "원하는 포켓몬을 복사해 적용하면 해당 슬롯의 스타팅 포켓몬 변경 코드로 사용할 수 있습니다."
            }
          ]
        },
        {
          id: "pokemon.starter.gen2",
          title: "2세대 스타팅 추가 획득",
          cheats: [
            {
              id: "pokemon.starter.gen2.required",
              title: "이 코드 먼저 추가하세요",
              codeType: "Action Replay MAX",
              codes: [],
              note: "선택을 위한 필수 코드입니다.\n아래 포켓몬을 추가하고 L+R+Down 키를 동시에 누르세요."
            },
            {
              id: "pokemon.starter.gen2.totodile",
              title: "리아코",
              codeType: "Action Replay MAX",
              codes: []
            },
            {
              id: "pokemon.starter.gen2.cyndaquil",
              title: "브케인",
              codeType: "Action Replay MAX",
              codes: []
            },
            {
              id: "pokemon.starter.gen2.chikorita",
              title: "치코리타",
              codeType: "Action Replay MAX",
              codes: []
            }
          ]
        }
      ]
    },
    {
      id: "pokemon.legendary",
      title: "전설 포켓몬",
      cheats: [
        {
          id: "pokemon.legendary.generated",
          title: "전설 포켓몬 전투",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "pokemon.legendary.generated.테오키스-deoxys",
              title: "테오키스(Deoxys)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.뮤-mew",
              title: "뮤(Mew)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.루기아-lugia",
              title: "루기아(Lugia)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.칠색조-ho-oh",
              title: "칠색조(HO-OH)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.라티오스-라티아스-선택-latios-latias-필수",
              title: "라티오스/라티아스 선택 / (Latios/Latias)",
              note: "필수 코드. 선택한 것의 반대가 출현합니다.",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.라티오스-라티아스-잡기-latios-latias",
              title: "라티오스/라티아스 잡기 / (Latios/Latias)",
              note: "선택한 것의 반대가 출현합니다.",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.레지락-regirock",
              title: "레지락(Regirock)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.레지아이스-regice",
              title: "레지아이스(Regice)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.레지스틸-registeel",
              title: "레지스틸(Registeel)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.그란돈-groundon",
              title: "그란돈(Groundon)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.가이오가-kyogre",
              title: "가이오가(Kyogre)",
              codes: []
            },
            {
              id: "pokemon.legendary.generated.레쿠쟈-rayquaza",
              title: "레쿠쟈(Rayquaza)",
              codes: []
            }
          ],
          note: "L+SELECT를 동시에 누르세요. 등록된 편의 도구를 해제한 다음 실행하세요. 뮤와 테오키스는 야생 포켓몬 지정 출현으로 잡으면 사용할 수 없으므로 이 목록의 전투 전용 코드를 사용하세요."
        }
      ]
    },
    {
      id: "pokemon.wild",
      title: "야생 포켓몬",
      children: [
        {
          id: "pokemon.wild.encounter",
          title: "출현 제어",
          cheats: [
            {
              id: "야생-포켓몬을-만나지-않음",
              title: "야생 포켓몬을 만나지 않음",
              codeType: "Action Replay MAX",
              codes: [],
              note: "스프레이는 걸음 수 동안 나보다 레벨이 낮은 몬스터를 만나지 않게 되지만 이 코드는 아예 나오지 않게 됩니다"
            }
          ]
        },
        {
          id: "pokemon.wild.nature",
          title: "성격 변경",
          cheats: [
            {
              id: "pokemon.wild.nature.reset",
              title: "성격 변경 초기화",
              codeType: "Action Replay MAX",
              codes: [],
              note: "성격 변경 치트의 흔적이 남아 있으면 이 코드를 사용하세요."
            },
            {
              id: "pokemon.wild.nature.generated",
              title: "원하는 성격 선택",
              codeType: "Action Replay MAX",
              codes: [],
              variants: createNatureStructureVariants(),
              note: "각 성격을 바로 복사해 사용합니다. 흔적이 남으면 위 초기화 코드를 사용하세요."
            }
          ]
        },
        {
          id: "pokemon.wild.special",
          title: "개체값/이로치/포케러스",
          cheats: [
            {
              id: "pokemon.wild.iv31",
              title: "야생 포켓몬 IV31",
              codeType: "Action Replay MAX",
              codes: []
            },
            {
              id: "이로치",
              title: "이로치",
              codeType: "Action Replay MAX",
              codes: [],
              note: "에뮬레이터에 따라 흔적이 남을 수 있습니다. 비활성화 해도 계속 치트가 적용되고 있다면 초기화 코드를 사용해 주세요",
              variants: [
                {
                  title: "켜기",
                  codes: [],
                  id: "이로치.on"
                },
                {
                  title: "초기화",
                  codes: [],
                  id: "이로치.reset"
                }
              ]
            },
            {
              id: "포케러스",
              title: "포케러스",
              codeType: "Action Replay MAX",
              codes: [],
              note: "에뮬레이터에 따라 흔적이 남을 수 있습니다. 비활성화 해도 계속 치트가 적용되고 있다면 초기화 코드를 사용해 주세요",
              variants: [
                {
                  title: "켜기",
                  codes: [],
                  id: "포케러스.on"
                },
                {
                  title: "초기화",
                  codes: [],
                  id: "포케러스.reset"
                }
              ]
            }
          ]
        },
        {
          id: "pokemon.wild.capture",
          title: "포획 관련",
          cheats: [
            {
              id: "야생-포켓몬-성별",
              title: "야생 포켓몬 성별",
              codeType: "Action Replay MAX",
              codes: [],
              note: "에뮬레이터에 따라 흔적이 남을 수 있습니다. 비활성화 해도 계속 치트가 적용되고 있다면 초기화 코드를 사용해 주세요",
              variants: [
                {
                  title: "암컷",
                  codes: [],
                  id: "야생-포켓몬-성별.female"
                },
                {
                  title: "수컷",
                  codes: [],
                  id: "야생-포켓몬-성별.male"
                },
                {
                  title: "초기화",
                  codes: [],
                  id: "야생-포켓몬-성별.reset"
                }
              ]
            },
            {
              id: "pokemon.wild.level.generated",
              title: "야생 포켓몬 레벨 선택 (마스터 코드 필요)",
              codeType: "Codebreaker",
              codes: [],
              note: "원하는 레벨을 복사해 적용하세요. 특정 레벨은 1~100 중에서 선택할 수 있습니다.",
              variants: [
                {
                  id: "wild-level.1",
                  title: "1레벨",
                  codes: []
                },
                {
                  id: "wild-level.2",
                  title: "2레벨",
                  codes: []
                },
                {
                  id: "wild-level.3",
                  title: "3레벨",
                  codes: []
                },
                {
                  id: "wild-level.4",
                  title: "4레벨",
                  codes: []
                },
                {
                  id: "wild-level.5",
                  title: "5레벨",
                  codes: []
                },
                {
                  id: "wild-level.6",
                  title: "6레벨",
                  codes: []
                },
                {
                  id: "wild-level.7",
                  title: "7레벨",
                  codes: []
                },
                {
                  id: "wild-level.8",
                  title: "8레벨",
                  codes: []
                },
                {
                  id: "wild-level.9",
                  title: "9레벨",
                  codes: []
                },
                {
                  id: "wild-level.10",
                  title: "10레벨",
                  codes: []
                },
                {
                  id: "wild-level.11",
                  title: "11레벨",
                  codes: []
                },
                {
                  id: "wild-level.12",
                  title: "12레벨",
                  codes: []
                },
                {
                  id: "wild-level.13",
                  title: "13레벨",
                  codes: []
                },
                {
                  id: "wild-level.14",
                  title: "14레벨",
                  codes: []
                },
                {
                  id: "wild-level.15",
                  title: "15레벨",
                  codes: []
                },
                {
                  id: "wild-level.16",
                  title: "16레벨",
                  codes: []
                },
                {
                  id: "wild-level.17",
                  title: "17레벨",
                  codes: []
                },
                {
                  id: "wild-level.18",
                  title: "18레벨",
                  codes: []
                },
                {
                  id: "wild-level.19",
                  title: "19레벨",
                  codes: []
                },
                {
                  id: "wild-level.20",
                  title: "20레벨",
                  codes: []
                },
                {
                  id: "wild-level.21",
                  title: "21레벨",
                  codes: []
                },
                {
                  id: "wild-level.22",
                  title: "22레벨",
                  codes: []
                },
                {
                  id: "wild-level.23",
                  title: "23레벨",
                  codes: []
                },
                {
                  id: "wild-level.24",
                  title: "24레벨",
                  codes: []
                },
                {
                  id: "wild-level.25",
                  title: "25레벨",
                  codes: []
                },
                {
                  id: "wild-level.26",
                  title: "26레벨",
                  codes: []
                },
                {
                  id: "wild-level.27",
                  title: "27레벨",
                  codes: []
                },
                {
                  id: "wild-level.28",
                  title: "28레벨",
                  codes: []
                },
                {
                  id: "wild-level.29",
                  title: "29레벨",
                  codes: []
                },
                {
                  id: "wild-level.30",
                  title: "30레벨",
                  codes: []
                },
                {
                  id: "wild-level.31",
                  title: "31레벨",
                  codes: []
                },
                {
                  id: "wild-level.32",
                  title: "32레벨",
                  codes: []
                },
                {
                  id: "wild-level.33",
                  title: "33레벨",
                  codes: []
                },
                {
                  id: "wild-level.34",
                  title: "34레벨",
                  codes: []
                },
                {
                  id: "wild-level.35",
                  title: "35레벨",
                  codes: []
                },
                {
                  id: "wild-level.36",
                  title: "36레벨",
                  codes: []
                },
                {
                  id: "wild-level.37",
                  title: "37레벨",
                  codes: []
                },
                {
                  id: "wild-level.38",
                  title: "38레벨",
                  codes: []
                },
                {
                  id: "wild-level.39",
                  title: "39레벨",
                  codes: []
                },
                {
                  id: "wild-level.40",
                  title: "40레벨",
                  codes: []
                },
                {
                  id: "wild-level.41",
                  title: "41레벨",
                  codes: []
                },
                {
                  id: "wild-level.42",
                  title: "42레벨",
                  codes: []
                },
                {
                  id: "wild-level.43",
                  title: "43레벨",
                  codes: []
                },
                {
                  id: "wild-level.44",
                  title: "44레벨",
                  codes: []
                },
                {
                  id: "wild-level.45",
                  title: "45레벨",
                  codes: []
                },
                {
                  id: "wild-level.46",
                  title: "46레벨",
                  codes: []
                },
                {
                  id: "wild-level.47",
                  title: "47레벨",
                  codes: []
                },
                {
                  id: "wild-level.48",
                  title: "48레벨",
                  codes: []
                },
                {
                  id: "wild-level.49",
                  title: "49레벨",
                  codes: []
                },
                {
                  id: "wild-level.50",
                  title: "50레벨",
                  codes: []
                },
                {
                  id: "wild-level.51",
                  title: "51레벨",
                  codes: []
                },
                {
                  id: "wild-level.52",
                  title: "52레벨",
                  codes: []
                },
                {
                  id: "wild-level.53",
                  title: "53레벨",
                  codes: []
                },
                {
                  id: "wild-level.54",
                  title: "54레벨",
                  codes: []
                },
                {
                  id: "wild-level.55",
                  title: "55레벨",
                  codes: []
                },
                {
                  id: "wild-level.56",
                  title: "56레벨",
                  codes: []
                },
                {
                  id: "wild-level.57",
                  title: "57레벨",
                  codes: []
                },
                {
                  id: "wild-level.58",
                  title: "58레벨",
                  codes: []
                },
                {
                  id: "wild-level.59",
                  title: "59레벨",
                  codes: []
                },
                {
                  id: "wild-level.60",
                  title: "60레벨",
                  codes: []
                },
                {
                  id: "wild-level.61",
                  title: "61레벨",
                  codes: []
                },
                {
                  id: "wild-level.62",
                  title: "62레벨",
                  codes: []
                },
                {
                  id: "wild-level.63",
                  title: "63레벨",
                  codes: []
                },
                {
                  id: "wild-level.64",
                  title: "64레벨",
                  codes: []
                },
                {
                  id: "wild-level.65",
                  title: "65레벨",
                  codes: []
                },
                {
                  id: "wild-level.66",
                  title: "66레벨",
                  codes: []
                },
                {
                  id: "wild-level.67",
                  title: "67레벨",
                  codes: []
                },
                {
                  id: "wild-level.68",
                  title: "68레벨",
                  codes: []
                },
                {
                  id: "wild-level.69",
                  title: "69레벨",
                  codes: []
                },
                {
                  id: "wild-level.70",
                  title: "70레벨",
                  codes: []
                },
                {
                  id: "wild-level.71",
                  title: "71레벨",
                  codes: []
                },
                {
                  id: "wild-level.72",
                  title: "72레벨",
                  codes: []
                },
                {
                  id: "wild-level.73",
                  title: "73레벨",
                  codes: []
                },
                {
                  id: "wild-level.74",
                  title: "74레벨",
                  codes: []
                },
                {
                  id: "wild-level.75",
                  title: "75레벨",
                  codes: []
                },
                {
                  id: "wild-level.76",
                  title: "76레벨",
                  codes: []
                },
                {
                  id: "wild-level.77",
                  title: "77레벨",
                  codes: []
                },
                {
                  id: "wild-level.78",
                  title: "78레벨",
                  codes: []
                },
                {
                  id: "wild-level.79",
                  title: "79레벨",
                  codes: []
                },
                {
                  id: "wild-level.80",
                  title: "80레벨",
                  codes: []
                },
                {
                  id: "wild-level.81",
                  title: "81레벨",
                  codes: []
                },
                {
                  id: "wild-level.82",
                  title: "82레벨",
                  codes: []
                },
                {
                  id: "wild-level.83",
                  title: "83레벨",
                  codes: []
                },
                {
                  id: "wild-level.84",
                  title: "84레벨",
                  codes: []
                },
                {
                  id: "wild-level.85",
                  title: "85레벨",
                  codes: []
                },
                {
                  id: "wild-level.86",
                  title: "86레벨",
                  codes: []
                },
                {
                  id: "wild-level.87",
                  title: "87레벨",
                  codes: []
                },
                {
                  id: "wild-level.88",
                  title: "88레벨",
                  codes: []
                },
                {
                  id: "wild-level.89",
                  title: "89레벨",
                  codes: []
                },
                {
                  id: "wild-level.90",
                  title: "90레벨",
                  codes: []
                },
                {
                  id: "wild-level.91",
                  title: "91레벨",
                  codes: []
                },
                {
                  id: "wild-level.92",
                  title: "92레벨",
                  codes: []
                },
                {
                  id: "wild-level.93",
                  title: "93레벨",
                  codes: []
                },
                {
                  id: "wild-level.94",
                  title: "94레벨",
                  codes: []
                },
                {
                  id: "wild-level.95",
                  title: "95레벨",
                  codes: []
                },
                {
                  id: "wild-level.96",
                  title: "96레벨",
                  codes: []
                },
                {
                  id: "wild-level.97",
                  title: "97레벨",
                  codes: []
                },
                {
                  id: "wild-level.98",
                  title: "98레벨",
                  codes: []
                },
                {
                  id: "wild-level.99",
                  title: "99레벨",
                  codes: []
                },
                {
                  id: "wild-level.100",
                  title: "100레벨",
                  codes: []
                }
              ]
            },
            {
              id: "포획-확률-100",
              title: "포획 확률 100%",
              codeType: "Action Replay MAX",
              codes: []
            }
          ]
        },
        {
          id: "pokemon.wild.species",
          title: "포켓몬 지정 출현",
          cheats: [
            {
              id: "pokemon.wild.species.generated",
              title: "야생 포켓몬 지정 출현",
              codeType: "Codebreaker",
              codes: [],
              variants: createWildPokemonStructureVariants(),
              note: "원하는 포켓몬을 복사해 적용하면 야생 포켓몬 출현 대상이 바뀝니다."
            }
          ]
        }
      ]
    },
  ]
};
