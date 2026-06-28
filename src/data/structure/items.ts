import type { CheatGroup } from "../../types/cheat";
import {
  createItemStructureVariants,
} from "../structureVariantGenerators";

export const itemsGroup: CheatGroup = {
  id: "items",
  title: "아이템 · 상점 · PC",
  cheats: [
    {
      id: "items.shop.free",
      title: "상점 아이템 가격 0원",
      codeType: "Codebreaker",
      codes: [],
      note: "최대 1개만 선택되는 경우 \"수량 99개 선택\" 치트를 사용해보세요."
    },
    {
      id: "items.shop.count-99",
      title: "수량 99개 선택",
      codeType: "Action Replay MAX",
      codes: [],
      note: "개수 선택 화면에서 L 버튼을 누른 상태로 구매하세요."
    }
  ],
  children: [
    {
      id: "items.shop.change",
      title: "상점 1번 아이템 바꾸기",
      cheats: [
        {
          id: "items.shop.change.generated",
          title: "상점 1번 아이템 바꾸기",
          codeType: "Codebreaker",
          codes: [],
          variants: createItemStructureVariants("item"),
          note: "상점 첫 번째 상품을 선택한 아이템으로 바꿉니다.\n티켓류는 \"미스터리 기프트 NPC · 티켓 이벤트\" 치트를 함께 사용하세요."
        }
      ]
    },
    {
      id: "items.pc.add",
      title: "PC 도구함 아이템 추가",
      cheats: [
        {
          id: "items.pc.add.generated",
          title: "PC 도구함 아이템 추가",
          codeType: "Codebreaker",
          codes: [],
          variants: createItemStructureVariants("pc-item"),
          note: `치트가 활성화 된 상태로 도구함을 열었다 닫았다 하면 동일한 아이템이 계속 늘어나서 공간을 차지합니다. 활성화 상태로 건물을 왔다 갔다 해도(화면 전환이 일어나는 모든 순간) 동일한 아이템이 계속 추가됩니다.\n
                PC 도구함에 여러 개가 추가되지 않게 하는 방법
                1. PC 도구함 [도구를 꺼낸다/도구를 맡긴다/도구를 버린다/취소] 창까지만 열고 치트를 추가
                2. 추가한 치트 즉시 비활성화(삭제는 에뮬레이터에 따라 값이 롤백될 수 있으니 비활성화)
                3. 도구를 꺼낸다를 선택하면 추가한 아이템이 개수 0개로 되어있음
                4. 1개를 꺼내면 남은 개수가 65535개로 바뀌어 글자가 깨지지만 정상입니다.`
        }
      ]
    }
  ]
};
