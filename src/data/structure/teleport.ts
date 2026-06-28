import type { CheatGroup } from "../../types/cheat";
import { createTeleportStructureVariants } from "../structureVariantGenerators";

export const teleportGroup: CheatGroup = {
  id: "teleport",
  title: "텔레포트 · 이동",
  children: [
    {
      id: "teleport.destinations",
      title: "텔레포트",
      cheats: [
        {
          id: "teleport.destinations.generated",
          title: "텔레포트 장소 선택",
          codeType: "Codebreaker",
          codes: [],
          variants: createTeleportStructureVariants(),
          note: "마스터 코드가 필요 없습니다. 장소를 복사해 적용한 뒤 화면을 전환하세요."
        },
        {
          id: "같은-지역-2번방",
          title: "같은 지역 2번방",
          codeType: "Codebreaker",
          codes: [],
          note: "레지 시리즈같이 완전 동일한 코드를 사용하지만 방이 나뉜 곳은 이 코드를 함께 사용하세요."
        }
      ]
    },
    {
      id: "teleport.movement",
      title: "이동 편의 기능",
      cheats: [
        {
          id: "벽-뚫기",
          title: "벽 뚫기",
          codeType: "Action Replay MAX",
          codes: [],
          note: "NPC들은 통과할 수 없습니다.\n에뮬레이터에 따라 흔적이 남을 수 있습니다. 비활성화 해도 계속 치트가 적용되고 있다면 초기화 코드를 사용해 주세요",
          variants: [
            {
              title: "켜기",
              codes: [],
              id: "벽-뚫기.on"
            },
            {
              title: "초기화",
              codes: [],
              id: "벽-뚫기.reset"
            }
          ]
        },
        {
          id: "서핑-뱃지x",
          title: "서핑(뱃지X)",
          codeType: "Action Replay MAX",
          codes: [],
          note: "R+SELECT를 동시에 누르세요.\n등록된 편의 도구를 해제한 다음 실행하세요."
        },
        {
          id: "어디서든-공중-날기-뱃지x",
          title: "어디서든 공중 날기(뱃지X)",
          codeType: "Action Replay MAX",
          codes: [],
          note: "메뉴-포켓몬-포켓몬 리스트 화면에서 L+R을 동시에 눌렀다가 떼고 메뉴를 빠져나오세요."
        }
      ]
    }
  ]
};
