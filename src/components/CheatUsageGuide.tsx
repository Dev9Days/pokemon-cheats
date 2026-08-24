import { CircleQuestionMark, Copy, X } from "lucide-react";
import { useEffect, useRef } from "react";

export function CheatUsageGuide({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="guide-panel" role="dialog" aria-modal="true" aria-labelledby="guide-panel-title">
      <div className="guide-panel__backdrop" onClick={onClose} />
      <div className="guide-panel__body">
        <div className="guide-panel__header">
          <div>
            <CircleQuestionMark size={18} />
            <strong id="guide-panel-title">치트 사용 가이드</strong>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="사용 가이드 닫기">
            <X size={18} />
          </button>
        </div>
        <div className="guide-panel__content">
          <p className="guide-panel__intro">
            에뮬레이터마다 메뉴 이름과 버튼 위치는 다르지만, 아래 순서대로 하면 됩니다.
          </p>

          <section>
            <h3>1. 게임 버전 확인</h3>
            <ol>
              <li>에뮬레이터에서 실제로 실행하는 .gba 파일을 찾습니다.</li>
              <li>
                사이트 상단의 <span className="guide-panel__file-picker-example">GBA 파일 선택</span>을 눌러
                그 파일을 선택합니다. PC에서는 .gba 파일을 이 사이트 화면 위로 끌어와 놓아도 됩니다.
              </li>
              <li>버전이 확인되면 그 버전에 맞는 치트 목록으로 자동으로 바뀝니다.</li>
            </ol>
            <p>
              파일명은 버전 판별에 사용하지 않습니다. 파일은 어디에도 업로드하지 않고, 현재
              브라우저에서 MD5 값만 계산합니다. 등록된 버전과 일치하지 않는다고 나오면 이 사이트의
              치트를 사용할 수 있는지 확인되지 않은 파일입니다.
            </p>
            <p className="guide-panel__patch-link">
              <span>
                한글판 치트는 아래 배포 페이지의 한글패치를 적용한 ROM에서만 사용할 수 있습니다.
              </span>
              <a
                href="https://blog.naver.com/johyunjun58/222052416818"
                target="_blank"
                rel="noreferrer"
              >
                한글패치 받기
              </a>
            </p>
          </section>

          <section>
            <h3>2. 에뮬레이터에 치트 등록</h3>
            <ol>
              <li>
                사용할 치트의
                <span className="icon-button guide-panel__copy-button-example" aria-hidden="true">
                  <Copy size={15} />
                </span>
                버튼을 누릅니다. 화면 아래에
                <span className="guide-panel__toast-example">
                  <span className="toast__icon toast__icon--error" aria-hidden="true">
                    <X size={13} strokeWidth={3} />
                  </span>
                  복사 실패
                </span>
                {"가 표시되면 같은 버튼을 다시 누르세요."}
              </li>
              <li>에뮬레이터에서 치트, Cheats 또는 Cheat Codes 메뉴를 엽니다.</li>
              <li>새 치트를 만들고 복사한 코드를 빠짐없이 붙여넣습니다.</li>
              <li>
                코드 형식을 고르는 메뉴가 있으면 카드에 적힌 <b>Action Replay MAX</b> 또는
                <b> Codebreaker</b>를 그대로 선택합니다.
              </li>
              <li>치트를 저장한 뒤 활성화합니다.</li>
            </ol>
            <p>
              치트에 따라 목록의 <b>포켓몬 관련 마스터 코드</b> 또는 <b>시스템/기타 마스터 코드</b>를 먼저
              등록하고 활성화해야 합니다. 여러 포켓몬이나 아이템이 있는 목록에서는 원하는 항목 하나의
              복사 버튼을 누르세요.
            </p>
          </section>

          <section>
            <h3>3. 치트 발동 방법</h3>
            <div className="guide-panel__activation-types">
              <div>
                <strong>활성화하면 적용되는 치트</strong>
                <p>
                  치트를 켠 뒤 게임을 계속하면 바로 적용되거나, 무한 PP·가격 변경처럼 해당 값이 바뀌는
                  순간 적용됩니다.
                </p>
              </div>
              <div>
                <strong>버튼을 눌러 발동하는 치트</strong>
                <ol>
                  <li>
                    카드에 표시된 <span className="cheat-badge cheat-badge--key-input">L+SELECT</span> 같은
                    조작을 확인합니다.
                  </li>
                  <li>치트를 활성화하고 게임 화면으로 돌아갑니다.</li>
                  <li>표시된 GBA 버튼을 동시에 누릅니다.</li>
                </ol>
                <p>
                  키보드의 L 글자를 그대로 누르는 것이 아닙니다. 키보드·게임패드는 에뮬레이터 설정에서
                  해당 GBA 버튼에 연결된 키를, 모바일은 화면의 GBA 버튼을 누르세요.
                </p>
              </div>
            </div>
            <p>
              원하는 효과가 적용되면 필요하지 않은 치트는 꺼두세요. 카드에 즉시 비활성화, 초기화 코드,
              다른 치트 해제 같은 안내가 있으면 그 안내를 우선해서 따라야 합니다.
            </p>
          </section>

          <section>
            <h3>4. 작동하지 않을 때 확인</h3>
            <ul>
              <li>GBA 파일 선택으로 확인한 버전과 현재 선택한 버전이 같은지 확인합니다.</li>
              <li>Action Replay MAX와 Codebreaker를 바꾸어 입력하지 않았는지 확인합니다.</li>
              <li>여러 줄인 코드를 한 줄도 빠뜨리지 않고 하나의 치트로 등록했는지 확인합니다.</li>
              <li>사용하는 치트에 필요한 마스터 코드도 먼저 활성화했는지 확인합니다.</li>
              <li>L, R, SELECT 등의 실제 키 배치를 에뮬레이터 설정에서 확인합니다.</li>
              <li>다른 치트를 모두 끄고, 확인하려는 치트 하나만 다시 시험합니다.</li>
            </ul>
            <p>
              에뮬레이터가 해당 코드 형식을 지원하지 않으면 같은 코드도 작동하지 않을 수 있습니다.
              치트를 사용하기 전에는 게임 안에서 저장하고 세이브 파일을 따로 백업해두는 것이 좋습니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
