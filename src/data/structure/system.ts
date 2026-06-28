import type { CheatGroup } from "../../types/cheat";

export const systemGroup: CheatGroup = {
  id: "system",
  title: "진행 · 시스템 · 도감",
  cheats: [
    {
      id: "system.master-code",
      title: "시스템/기타 마스터 코드",
      codeType: "Action Replay MAX",
      codes: [],
      note: "진행 · 시스템 · 도감 관련 코드를 사용할 때 먼저 적용하세요."
    }
  ],
  children: [
    {
      id: "system.badges",
      title: "배지 획득",
      cheats: [
        {
          id: "system.badges.generated",
          title: "배지 획득",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "system.badges.1번째-풀베기-사용-가능-rustboro-city-금탄도시",
              title: "1. 금탄도시(Rustboro City) / 풀베기",
              codes: []
            },
            {
              id: "system.badges.2번째-플래시-사용-가능-dewford-town-무로마을",
              title: "2. 무로마을(Dewford Town) / 플래시",
              codes: []
            },
            {
              id: "system.badges.3번째-바위깨기-사용-가능-mauville-city-보라시티",
              title: "3. 보라시티(Mauville City) / 바위깨기",
              codes: []
            },
            {
              id: "system.badges.4번째-괴력-사용-가능-lavaridge-town-용암마을",
              title: "4. 용암마을(Lavaridge Town) / 괴력",
              codes: []
            },
            {
              id: "system.badges.5번째-파도타기-사용-가능-petalburg-city-등화도시",
              title: "5. 등화도시(Petalburg City) / 파도타기",
              codes: [],
              note: "등화도시로 이동합니다."
            },
            {
              id: "system.badges.6번째-공중날기-사용-가능-fortree-city-검방울시티",
              title: "6. 검방울시티(Fortree City) / 공중날기",
              codes: []
            },
            {
              id: "system.badges.7번째-다이빙-사용-가능-mossdeep-city-이끼시티",
              title: "7. 이끼시티(Mossdeep City) / 다이빙",
              codes: []
            },
            {
              id: "system.badges.8번째-폭포오르기-사용-가능-sootopolis-city-루네시티",
              title: "8. 루네시티(Sootopolis City) / 폭포오르기",
              codes: []
            }
          ],
          note: "L+SELECT를 동시에 누르세요. 등록된 편의 도구를 해제한 다음 실행하세요.\n대화창을 닫으면 배지를 얻고 해당 비전기술을 사용할 수 있게 됩니다."
        }
      ]
    },
    {
      id: "system.progress",
      title: "진행 관련",
      cheats: [
        {
          id: "트레이너-amp-관장과-재-전투",
          title: "트레이너&관장과 재 전투",
          codeType: "Action Replay MAX",
          codes: [],
          note: "대화 도중 L버튼을 누르세요. 대화창을 닫으면 전투가 시작됩니다.\n무로마을(Dewford Town) 관장에게 사용하지 마세요. 더 이상 게임 진행이 불가능해집니다."
        },
        {
          id: "해안시티-타이드립호-활성화",
          title: "해안시티 타이드립호 활성화",
          codeType: "Action Replay MAX",
          codes: [],
          note: "해안시티에서 배를 탈 수 없을 때 사용하세요."
        },
        {
          id: "시간-재-설정",
          title: "시간 재 설정",
          codeType: "Action Replay MAX",
          codes: [],
          note: `가급적 저장을 하세요.
                 조건: 처음 시계를 맞춘 후 아래층에 내려가 대화를 마친 직후부터 사용 가능합니다.
                 대화 도중 L버튼을 누르세요. 대화 창을 닫으면 시간 변경 창이 등장, 바로 R버튼을 누르고 원하는 시간으로 변경합니다.
                 순서를 지키지 않을 경우 게임 진행이 막힐 수 있으니 정확한 순서를 지켜주세요.`
        }
      ]
    },
    {
      id: "system.battle",
      title: "전투 시스템",
      cheats: [
        {
          id: "항상-내-턴",
          title: "항상 내 턴",
          codeType: "Action Replay MAX",
          codes: []
        },
        {
          id: "전투-후-경험치",
          title: "전투 후 경험치",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "battle.exp.250",
              title: "경험치 250",
              codes: []
            },
            {
              id: "battle.exp.500",
              title: "경험치 500",
              codes: []
            },
            {
              id: "battle.exp.1000",
              title: "경험치 1000",
              codes: []
            },
            {
              id: "battle.exp.9999",
              title: "경험치 9999",
              codes: []
            }
          ],
          note: "레벨업을 멈추고 싶다면 치트를 비활성화 하세요\n비활성화시 잔여 경험치만큼 더 레벨업을 하고 멈춥니다"
        },
        {
          id: "배틀-프론티어-배틀-포인트",
          title: "배틀 프론티어 배틀 포인트",
          codeType: "Action Replay MAX",
          codes: [],
          note: "대화 도중 L버튼을 누르세요. 누르고 있는 동안 계속해서 포인트를 획득합니다.(L버튼 누르고 있으면서 A버튼 연타)"
        }
      ]
    },
    {
      id: "system.player",
      title: "플레이어 정보",
      cheats: [
        {
          id: "소지금-최대",
          title: "소지금 최대",
          codeType: "Action Replay MAX",
          codes: [],
          note: "적용 하면 이상한 값으로 나오지만 아무 아이템을 판매하면 999999로 맞춰집니다."
        },
        {
          id: "플레이어-이름-변경",
          title: "플레이어 이름 변경",
          codeType: "Action Replay MAX",
          codes: [],
          note: "가급적 저장을 하세요.\n트레이너 카드를 확인하세요.\n이름 변경 중간에 치트를 절대 비활성화 하지 마세요. 진행 상황이 리셋됩니다."
        }
      ]
    },
    {
      id: "system.dex-event",
      title: "도감 · 이벤트",
      cheats: [
        {
          id: "환상섬-보이기",
          title: "환상섬 보이기",
          codeType: "Action Replay MAX",
          codes: []
        },
        {
          id: "이상한-소포-활성화-mystery-gift",
          title: "이상한 소포 활성화 / (Mystery Gift)",
          codeType: "Action Replay MAX",
          codes: [],
          note: "L+SELECT를 동시에 누르세요.\n등록된 편의 도구를 해제한 다음 실행하세요."
        },
        {
          id: "system.dex-event.mystery-gift-ticket",
          title: "미스터리 기프트 NPC · 티켓 이벤트",
          codeType: "Action Replay MAX",
          codes: [],
          variants: [
            {
              id: "system.dex-event.mystery-gift-ticket.npc",
              title: "미스터리 기프트 NPC 활성화",
              codes: []
            },
            {
              id: "system.dex-event.mystery-gift-ticket.eon",
              title: "무한 티켓 이벤트 / (라티아스/라티오스)",
              codes: []
            },
            {
              id: "system.dex-event.mystery-gift-ticket.mystic",
              title: "신비 티켓 이벤트 / (칠색조/루기아)",
              codes: []
            },
            {
              id: "system.dex-event.mystery-gift-ticket.aurora",
              title: "오로라 티켓 이벤트 / (테오키스)",
              codes: []
            },
            {
              id: "system.dex-event.mystery-gift-ticket.old-sea-map",
              title: "오래된 해도 이벤트 / (뮤)",
              codes: []
            },
            {
              id: "system.dex-event.mystery-gift-ticket.show-mew",
              title: "뮤 보이기",
              note: "머나먼 고도에서 뮤의 위치를 보여줍니다.",
              codes: []
            }
          ],
          note: "L+SELECT를 동시에 누르세요.\n등록된 편의 도구를 해제한 다음 실행하세요."
        },
        {
          id: "전국-도감-활성화",
          title: "전국 도감 활성화",
          codeType: "Action Replay MAX",
          codes: [],
          note: "L+SELECT를 동시에 누르세요.\n등록된 편의 도구를 해제한 다음 실행하세요."
        },
        {
          id: "도감-완성",
          title: "도감 완성",
          codeType: "Action Replay MAX",
          codes: [],
          note: "가급적 가방이나 도감을 한 번 열었다가 닫은 후에 사용하세요.",
          variants: [
            {
              title: "발견 완료",
              codes: [],
              id: "도감-완성.seen"
            },
            {
              title: "포획 완료",
              codes: [],
              id: "도감-완성.caught"
            }
          ]
        }
      ]
    }
  ]
};
